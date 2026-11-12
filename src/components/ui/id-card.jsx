import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { useTheme } from 'next-themes'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer, useGLTF, useTexture } from '@react-three/drei'
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier'
import { cn } from '@/lib/utils'
import { LANYARD_GLB_DATA_URI } from '@/components/ui/lanyard-glb-data'

const CARD_MODEL_URL = LANYARD_GLB_DATA_URI

// Rope tube radius (a real cylinder, not a flat ribbon).
const ROPE_RADIUS = 0.1

// Rope cross-section smoothness.
const ROPE_RADIAL_SEGMENTS = 24

// Fraction of rope length that tapers to a point instead of a flat cut.
const ROPE_TAPER_FRACTION = 0.06

// Card-local y where the rope ties on, shared with the per-frame curve endpoint below.
const CARD_ROPE_ANCHOR_Y = 1.1

// Extends the rendered rope past the joint's physical slack to close the visual gap.
const ROPE_TOP_EXTENSION = -0.5

// Pin hardware cutout, rendered as a camera-facing plane.
const PIN_IMAGE_URL = 'https://cdn.shadcnstudio.com/ss-assets/template/landing-page/zolt/pin.png'

// Pin image is 1024×1536 with uneven padding — only the bottom pad fraction is needed.
const PIN_IMAGE_ASPECT = 1024 / 1536
const PIN_IMAGE_BOTTOM_PAD_FRACTION = (1536 - 1432) / 1536

// World y of the card's real top edge, where the pin's hook tip should land.
const CARD_TOP_EDGE_Y = 0.93

// Plane keeps the image's raw aspect ratio.
const PIN_PLANE_HEIGHT = 1.4
const PIN_PLANE_WIDTH = PIN_PLANE_HEIGHT * PIN_IMAGE_ASPECT

// Derived so the pin's hook tip lands exactly at CARD_TOP_EDGE_Y at any PIN_PLANE_HEIGHT.
const PIN_PLANE_Y = CARD_TOP_EDGE_Y + PIN_PLANE_HEIGHT * -PIN_IMAGE_BOTTOM_PAD_FRACTION
const PIN_PLANE_X = 0

// Past ROPE_RADIUS so the rope's near-camera bulge doesn't cover the pin.
const PIN_PLANE_Z = ROPE_RADIUS + 0.06

// Real gap in card.glb's mesh (grommet hole), in the card's local coordinate frame.
const HOLE_PATCH_LOCAL_X = 0
const HOLE_PATCH_LOCAL_Y = 0.942
const HOLE_PATCH_LOCAL_SIZE = 0.055

// UV region of `cardMap` sampled for the hole patch.
const HOLE_PATCH_UV_OFFSET = [0.2308, 0.0443]
const HOLE_PATCH_UV_REPEAT = [0.0375, 0.0405]

// Front/back face UVs on the badge's texture atlas.
const FRONT_UV_RECT = { x: 0, y: 0, w: 0.5, h: 0.755 }
const BACK_UV_RECT = { x: 0.5, y: 0, w: 0.5, h: 0.755 }

// Subtle top bezel accent height ratio (0 removes solid color bar over the photo).
const ACCENT_STRIPE_HEIGHT_RATIO = 0
const PORTRAIT_ZOOM = 1.24
const PORTRAIT_FOCUS_Y = 0.42
const TARGET_ATLAS_SIZE = 2048

const getLerped = (body) => {
  if (!body.lerped) {
    body.lerped = new THREE.Vector3().copy(body.translation())
  }
  return body.lerped
}

// TubeGeometry with a per-ring radius that tapers to 0 at t=0, instead of a flat cut.
const buildTaperedTubeGeometry = (
  curve,
  tubularSegments,
  radius,
  radialSegments,
  taperFraction
) => {
  const frames = curve.computeFrenetFrames(tubularSegments, false)
  const positions = []
  const normals = []
  const uvs = []
  const indices = []

  const vertex = new THREE.Vector3()
  const normal = new THREE.Vector3()

  for (let i = 0; i <= tubularSegments; i++) {
    const t = i / tubularSegments
    const point = curve.getPointAt(t)
    const N = frames.normals[i]
    const B = frames.binormals[i]

    // t=0 is the pin/card end — taper happens there, not at the fixed top anchor.
    const ringRadius = t < taperFraction ? radius * (t / taperFraction) : radius

    for (let j = 0; j <= radialSegments; j++) {
      const angle = (j / radialSegments) * Math.PI * 2
      const sin = Math.sin(angle)
      const cos = -Math.cos(angle)

      normal.x = cos * N.x + sin * B.x
      normal.y = cos * N.y + sin * B.y
      normal.z = cos * N.z + sin * B.z
      normal.normalize()
      normals.push(normal.x, normal.y, normal.z)

      vertex.x = point.x + ringRadius * normal.x
      vertex.y = point.y + ringRadius * normal.y
      vertex.z = point.z + ringRadius * normal.z
      positions.push(vertex.x, vertex.y, vertex.z)

      uvs.push(t, j / radialSegments)
    }
  }

  for (let j = 1; j <= tubularSegments; j++) {
    for (let i = 1; i <= radialSegments; i++) {
      const a = (radialSegments + 1) * (j - 1) + (i - 1)
      const b = (radialSegments + 1) * j + (i - 1)
      const c = (radialSegments + 1) * j + i
      const d = (radialSegments + 1) * (j - 1) + i

      indices.push(a, b, d)
      indices.push(b, c, d)
    }
  }

  const geometry = new THREE.BufferGeometry()

  geometry.setIndex(indices)
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3))
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))

  return geometry
}

const Band = ({ frontImage, isMobile, accentColor }) => {
  let isDark = false
  if (typeof document !== 'undefined') {
    isDark = document.documentElement.classList.contains('dark')
  }
  try {
    const themeContext = useTheme()
    if (themeContext?.resolvedTheme) {
      isDark = themeContext.resolvedTheme === 'dark'
    }
  } catch (e) {
    isDark = false
  }

  const rope = useRef(null)
  const fixed = useRef(null)
  const j1 = useRef(null)
  const j2 = useRef(null)
  const j3 = useRef(null)
  const card = useRef(null)

  const vec = useMemo(() => new THREE.Vector3(), [])
  const ang = useMemo(() => new THREE.Vector3(), [])
  const rot = useMemo(() => new THREE.Vector3(), [])
  const dir = useMemo(() => new THREE.Vector3(), [])
  const cardQuat = useMemo(() => new THREE.Quaternion(), [])

  const segmentProps = {
    type: 'dynamic',
    canSleep: true,
    colliders: false,
    angularDamping: 1.5,
    linearDamping: 1.5,
  }

  const { nodes, materials } = useGLTF(CARD_MODEL_URL)
  const frontTexture = useTexture(frontImage)
  const pinTexture = useTexture(PIN_IMAGE_URL)

  const cardMap = useMemo(() => {
    const baseMap = materials.base.map
    const baseImage = baseMap.image
    const width = TARGET_ATLAS_SIZE
    const height = TARGET_ATLAS_SIZE

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height

    const ctx = canvas.getContext('2d')
    if (!ctx) return baseMap

    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'
    ctx.drawImage(baseImage, 0, 0, width, height)

    const image = frontTexture.image

    for (const uvRect of [FRONT_UV_RECT, BACK_UV_RECT]) {
      const rx = uvRect.x * width
      const ry = uvRect.y * height
      const rw = uvRect.w * width
      const rh = uvRect.h * height
      const scale = Math.max(rw / image.width, rh / image.height) * PORTRAIT_ZOOM
      const dw = image.width * scale
      const dh = image.height * scale
      const dx = rx + (rw - dw) / 2
      const dy = THREE.MathUtils.clamp(ry + rh * 0.45 - dh * PORTRAIT_FOCUS_Y, ry + rh - dh, ry)

      ctx.save()
      ctx.beginPath()
      ctx.rect(rx, ry, rw, rh)
      ctx.clip()

      ctx.filter = 'contrast(1.06) saturate(1.07) brightness(1.02)'
      ctx.drawImage(image, dx, dy, dw, dh)
      ctx.filter = 'none'

      // Soft bottom vignette keeps light clothing edges crisp against the light page background
      const bottomShade = ctx.createLinearGradient(rx, ry + rh * 0.72, rx, ry + rh)
      bottomShade.addColorStop(0, 'rgba(15, 23, 42, 0)')
      bottomShade.addColorStop(1, 'rgba(15, 23, 42, 0.34)')
      ctx.fillStyle = bottomShade
      ctx.fillRect(rx, ry + rh * 0.72, rw, rh * 0.28)

      if (ACCENT_STRIPE_HEIGHT_RATIO > 0) {
        ctx.fillStyle = accentColor
        ctx.fillRect(rx, ry, rw, rh * ACCENT_STRIPE_HEIGHT_RATIO)
      }

      // Subtle hairline border so the card silhouette separates cleanly
      ctx.strokeStyle = 'rgba(15, 23, 42, 0.14)'
      ctx.lineWidth = Math.max(2, rw * 0.004)
      ctx.strokeRect(rx + ctx.lineWidth / 2, ry + ctx.lineWidth / 2, rw - ctx.lineWidth, rh - ctx.lineWidth)
      ctx.restore()
    }

    const composite = new THREE.CanvasTexture(canvas)
    composite.colorSpace = THREE.SRGBColorSpace
    composite.flipY = baseMap.flipY
    composite.anisotropy = 16
    composite.needsUpdate = true

    return composite
  }, [frontTexture, materials.base.map, accentColor])

  const holePatchTexture = useMemo(() => {
    const texture = cardMap.clone()
    texture.offset.set(...HOLE_PATCH_UV_OFFSET)
    texture.repeat.set(...HOLE_PATCH_UV_REPEAT)
    texture.needsUpdate = true
    return texture
  }, [cardMap])

  const [curve] = useState(() => {
    const ropeCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
    ])
    ropeCurve.curveType = 'chordal'
    return ropeCurve
  })

  const [dragged, drag] = useState(false)

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 0.85])
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 0.85])
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 0.85])
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, CARD_ROPE_ANCHOR_Y, 0],
  ])

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
      dir.copy(vec).sub(state.camera.position).normalize()
      vec.add(dir.multiplyScalar(state.camera.position.length()))
      ;[card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp())
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      })
    }

    if (fixed.current) {
      ;[j1, j2].forEach((ref) => {
        const lerped = getLerped(ref.current)
        const clampedDistance = Math.max(0.1, Math.min(1, lerped.distanceTo(ref.current.translation())))
        lerped.lerp(ref.current.translation(), delta * 50 * clampedDistance)
      })

      const cardPos = card.current.translation()
      const cardRot = card.current.rotation()

      cardQuat.set(cardRot.x, cardRot.y, cardRot.z, cardRot.w)
      curve.points[0]
        .set(0, CARD_ROPE_ANCHOR_Y + ROPE_TOP_EXTENSION, 0)
        .applyQuaternion(cardQuat)
        .add(vec.set(cardPos.x, cardPos.y, cardPos.z))
      curve.points[1].copy(getLerped(j2.current))
      curve.points[2].copy(getLerped(j1.current))
      curve.points[3].copy(fixed.current.translation())

      const oldRopeGeometry = rope.current.geometry

      rope.current.geometry = buildTaperedTubeGeometry(
        curve,
        isMobile ? 16 : 32,
        ROPE_RADIUS,
        ROPE_RADIAL_SEGMENTS,
        ROPE_TAPER_FRACTION
      )
      oldRopeGeometry?.dispose()

      ang.copy(card.current.angvel())
      rot.copy(card.current.rotation())
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z }, true)
    }
  })

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.425, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[0.85, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.275, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.7, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[1.42, 2.0, 0.018]} />
          <group
            scale={4}
            position={[0, -3.16, -0.09]}
            onPointerUp={(e) => {
              e.target.releasePointerCapture?.(e.pointerId)
              drag(false)
              document.body.style.userSelect = ''
            }}
            onPointerDown={(e) => {
              e.target.setPointerCapture?.(e.pointerId)
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())))
              document.body.style.userSelect = 'none'
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshBasicMaterial map={cardMap} toneMapped={false} />
            </mesh>

            <mesh position={[HOLE_PATCH_LOCAL_X, HOLE_PATCH_LOCAL_Y, 0.006]}>
              <planeGeometry args={[HOLE_PATCH_LOCAL_SIZE, HOLE_PATCH_LOCAL_SIZE]} />
              <meshBasicMaterial map={holePatchTexture} toneMapped={false} />
            </mesh>
          </group>

          <mesh position={[PIN_PLANE_X, PIN_PLANE_Y, PIN_PLANE_Z]}>
            <planeGeometry args={[PIN_PLANE_WIDTH, PIN_PLANE_HEIGHT]} />
            <meshBasicMaterial map={pinTexture} transparent alphaTest={0.1} toneMapped={false} />
          </mesh>
        </RigidBody>
      </group>

      <mesh ref={rope} frustumCulled={false}>
        <meshStandardMaterial color={isDark ? '#d4d4d8' : '#262626'} roughness={0.55} metalness={0.15} />
      </mesh>
    </>
  )
}

const StudioLighting = () => (
  <Environment blur={0.75}>
    <Lightformer
      intensity={2}
      color="white"
      position={[0, -1, 5]}
      rotation={[0, 0, Math.PI / 3]}
      scale={[100, 0.1, 1]}
    />
    <Lightformer
      intensity={3}
      color="white"
      position={[-1, -1, 1]}
      rotation={[0, 0, Math.PI / 3]}
      scale={[100, 0.1, 1]}
    />
    <Lightformer
      intensity={3}
      color="white"
      position={[1, 1, 1]}
      rotation={[0, 0, Math.PI / 3]}
      scale={[100, 0.1, 1]}
    />
    <Lightformer
      intensity={10}
      color="white"
      position={[-10, 0, 14]}
      rotation={[0, Math.PI / 2, Math.PI / 3]}
      scale={[100, 10, 1]}
    />
  </Environment>
)

const REFERENCE_HEIGHT_PX = 610
const CAMERA_Z = 20
const CAMERA_FOV_DEG = 20
const WORLD_UNITS_PER_PX = (2 * CAMERA_Z * Math.tan((CAMERA_FOV_DEG / 2) * (Math.PI / 180))) ** -1
const PX_PER_WORLD_UNIT = REFERENCE_HEIGHT_PX * WORLD_UNITS_PER_PX
const TARGET_FROM_RIGHT_FRACTION = 0.3
const TARGET_FROM_RIGHT_FRACTION_AT_LG = 0.15
const LG_BREAKPOINT_PX = 1024
const XL_BREAKPOINT_PX = 1280

const CameraAlign = () => {
  useFrame((state) => {
    const widthT = THREE.MathUtils.clamp(
      (state.size.width - LG_BREAKPOINT_PX) / (XL_BREAKPOINT_PX - LG_BREAKPOINT_PX),
      0,
      1
    )

    const targetFromRightFraction = THREE.MathUtils.lerp(
      TARGET_FROM_RIGHT_FRACTION_AT_LG,
      TARGET_FROM_RIGHT_FRACTION,
      widthT
    )

    const targetFromRightPx = targetFromRightFraction * state.size.width
    state.camera.position.x = (targetFromRightPx - state.size.width / 2) / PX_PER_WORLD_UNIT
    state.camera.position.z = CAMERA_Z * (state.size.height / REFERENCE_HEIGHT_PX)
  })

  return null
}

const IdCard = ({ frontImage, className }) => {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768)
  const [contextLossKey, setContextLossKey] = useState(0)
  const eventSourceRef = useRef(typeof document !== 'undefined' ? document.body : null)
  const primaryProbeRef = useRef(null)
  const [accentColor, setAccentColor] = useState('#000000')

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const updateAccentColor = () => {
      if (primaryProbeRef.current) {
        setAccentColor(getComputedStyle(primaryProbeRef.current).fill)
      }
    }

    updateAccentColor()

    const observers = []
    for (let node = primaryProbeRef.current; node; node = node.parentElement) {
      const observer = new MutationObserver(updateAccentColor)
      observer.observe(node, { attributes: true, attributeFilter: ['class', 'style'] })
      observers.push(observer)
    }

    return () => observers.forEach((observer) => observer.disconnect())
  }, [])

  return (
    <div className={cn('pointer-events-none drop-shadow-xl', className)}>
      <span ref={primaryProbeRef} className="fill-primary hidden" aria-hidden />
      <Canvas
        key={contextLossKey}
        eventSource={eventSourceRef}
        camera={{ position: [0, 0, 20], fov: 20 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true, powerPreference: 'default' }}
        onCreated={(state) => {
          state.gl.setClearColor(new THREE.Color(0x000000), 0)

          state.gl.domElement.addEventListener('webglcontextlost', (event) => {
            event.preventDefault()
            setContextLossKey((key) => key + 1)
          })

          state.setEvents({
            compute: (event, s) => {
              const rect = s.gl.domElement.getBoundingClientRect()
              const x = event.clientX - rect.left
              const y = event.clientY - rect.top

              s.pointer.set((x / s.size.width) * 2 - 1, -(y / s.size.height) * 2 + 1)
              s.raycaster.setFromCamera(s.pointer, s.camera)
            },
          })
        }}
      >
        <CameraAlign />
        <ambientLight intensity={Math.PI} />
        <Physics gravity={[0, -40, 0]} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band frontImage={frontImage} isMobile={isMobile} accentColor={accentColor} />
        </Physics>
        <StudioLighting />
      </Canvas>
    </div>
  )
}

export default IdCard

