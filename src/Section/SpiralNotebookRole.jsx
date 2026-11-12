import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const ROLES = [
  'Full Stack Developer',
  'Software Engineer',
  'Backend Engineer',
  'MERN Stack Developer',
  'MENN Stack Developer',
  'Problem Solver',
  'IoT Engineer',
]

const FLIP_INTERVAL_MS = 2600
const FLIP_DURATION_S = 0.9
const RING_COUNT = 9
const RINGS = Array.from({ length: RING_COUNT })

/* Set to false to use your site's normal sans-serif instead of handwriting */
const USE_HANDWRITING = true
const INK_FONT = USE_HANDWRITING
  ? "'Caveat', 'Segoe Print', 'Bradley Hand', cursive"
  : 'inherit'
const FONT_HREF = 'https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&display=swap'

/* Paper grain (SVG noise) */
const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.4  0 0 0 0 0.33  0 0 0 0 0.2  0 0 0 0.1 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")"

/* Ruled lines every 32px; handwriting sits on the 2nd line */
const LINE_H = 32
const PAPER_STYLE = {
  backgroundImage: [
    GRAIN,
    `repeating-linear-gradient(to bottom, transparent 0px, transparent ${LINE_H - 2}px, rgba(96,165,250,0.42) ${LINE_H - 1}px, rgba(96,165,250,0.42) ${LINE_H}px)`,
    'linear-gradient(180deg, #fffdf5 0%, #fffef9 50%, #faf5e6 100%)',
  ].join(', '),
}

/* Slight per-page variation so every page feels hand-written */
const tiltFor = (i) => (((i * 37) % 7) - 3) * 0.18

/* Metal coil going through a hole punched in the paper */
const Ring = () => (
  <div className="relative h-5 w-7">
    <svg
      viewBox="0 0 28 56"
      className="absolute left-0 top-[-34px] h-14 w-7 overflow-visible"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="hole-depth" cx="0.5" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#0f172a" />
          <stop offset="0.65" stopColor="#334155" />
          <stop offset="1" stopColor="#94a3b8" />
        </radialGradient>
        <filter id="soft" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="1.6" />
        </filter>
      </defs>

      {/* Hole punched in the paper */}
      <ellipse cx="14" cy="46" rx="6.6" ry="4.2" fill="url(#hole-depth)" />
      <ellipse cx="14" cy="47.2" rx="6.6" ry="3.2" fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="0.8" />
      <ellipse cx="14" cy="46" rx="6.6" ry="4.2" fill="none" stroke="#64748b" strokeWidth="0.7" />

      {/* Shadow of the wire on the paper */}
      <path
        d="M11 47 C 7 36, 9 18, 19 8"
        fill="none"
        stroke="#0f172a"
        strokeOpacity="0.35"
        strokeWidth="4"
        strokeLinecap="round"
        transform="translate(4 4)"
        filter="url(#soft)"
      />

      {/* Back run of the wire (disappears behind the sheet at the top) */}
      <path
        d="M19 8 C 22 5, 26 7, 25 12"
        fill="none"
        stroke="#1e293b"
        strokeWidth="3.4"
        strokeLinecap="round"
        opacity="0.9"
      />

      {/* Wire body: outline, base metal, mid tone, specular */}
      <path d="M11 47 C 7 36, 9 18, 19 8" fill="none" stroke="#0b1220" strokeWidth="5.6" strokeLinecap="round" />
      <path d="M11 47 C 7 36, 9 18, 19 8" fill="none" stroke="#64748b" strokeWidth="4.4" strokeLinecap="round" />
      <path d="M11 47 C 7 36, 9 18, 19 8" fill="none" stroke="#cbd5e1" strokeWidth="2.6" strokeLinecap="round" />
      <path
        d="M10.4 43 C 8 34, 10 20, 17.4 11"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.9"
      />
      {/* Darker lower edge to sell the cylinder */}
      <path
        d="M12.8 45 C 9 35, 11 19, 20 9.4"
        fill="none"
        stroke="#334155"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  </div>
)

/* Handwritten role, with a hint of ink bleed */
const PageFace = ({ text, tilt }) => (
  <>
    {/* Left margin: double red line */}
    <div className="pointer-events-none absolute inset-y-0 left-10 w-px bg-rose-400/65" />
    <div className="pointer-events-none absolute inset-y-0 left-[43px] w-px bg-rose-400/35" />
    <p
      style={{
        fontFamily: INK_FONT,
        height: LINE_H,
        lineHeight: `${LINE_H}px`,
        transform: `rotate(${tilt}deg)`,
        transformOrigin: 'left bottom',
        color: '#1b2547',
        textShadow: '0 0 0.6px rgba(27,37,71,0.55), 0.3px 0.4px 0.8px rgba(27,37,71,0.18)',
        mixBlendMode: 'multiply',
      }}
      className="whitespace-nowrap pl-[58px] pr-4 pt-0 text-[30px] font-bold tracking-tight"
    >
      {text}
    </p>
  </>
)

const SpiralNotebookRole = () => {
  const [index, setIndex] = useState(0)
  const [flip, setFlip] = useState(null)
  const [isPaused, setIsPaused] = useState(false)
  const indexRef = useRef(0)
  const flipKeyRef = useRef(0)
  const reduceMotion = useReducedMotion()

  /* Load the handwriting font once */
  useEffect(() => {
    if (!USE_HANDWRITING || document.querySelector(`link[href="${FONT_HREF}"]`)) return
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = FONT_HREF
    document.head.appendChild(link)
  }, [])

  const triggerFlip = () => {
    const current = indexRef.current
    const next = (current + 1) % ROLES.length
    indexRef.current = next
    const key = ++flipKeyRef.current
    setFlip(reduceMotion ? null : { from: current, key })
    setIndex(next)
  }

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(triggerFlip, FLIP_INTERVAL_MS)
    return () => clearInterval(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused])

  return (
    <div
      className="relative w-full max-w-[480px] select-none pt-9"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Soft contact shadow on the desk */}
      <div className="pointer-events-none absolute inset-x-6 -bottom-5 h-8 rounded-[50%] bg-slate-900/25 blur-xl" />

      {/* Cardboard back cover + lower sheets, slightly misaligned */}
      <div className="absolute inset-x-2.5 -bottom-[9px] h-6 rotate-[0.25deg] rounded-b-xl border border-[#a89a7c] bg-gradient-to-b from-[#c9bb9a] to-[#b3a483]" />
      <div className="absolute inset-x-3 -bottom-[6px] h-5 -rotate-[0.35deg] rounded-b-xl border border-slate-300 bg-[#f1ede0]" />
      <div className="absolute inset-x-2 -bottom-[3px] h-5 rotate-[0.25deg] rounded-b-xl border border-slate-300 bg-[#f6f2e6]" />
      <div className="absolute inset-x-1 -bottom-[1px] h-5 rounded-b-xl border border-slate-300/90 bg-[#fbf9f0]" />

      <div
        onClick={triggerFlip}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            triggerFlip()
          }
        }}
        title="Click to flip page"
        className="relative cursor-pointer rounded-xl shadow-[0_14px_28px_-10px_rgba(15,23,42,0.4),0_2px_5px_rgba(15,23,42,0.14)] transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_34px_-10px_rgba(15,23,42,0.45),0_3px_7px_rgba(15,23,42,0.16)]"
      >
        {/* Header band of the top sheet: holes + tear-off perforation */}
        <div
          style={PAPER_STYLE}
          className="relative z-30 flex items-end justify-around rounded-t-xl border border-b-0 border-slate-300/90 px-3 pb-2 pt-5"
        >
          {RINGS.map((_, i) => (
            <Ring key={i} />
          ))}
          <div className="pointer-events-none absolute inset-x-3 bottom-0 border-b-2 border-dotted border-slate-400/60" />
          <div className="pointer-events-none absolute inset-0 rounded-t-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]" />
        </div>

        {/* Page stage */}
        <div
          className="relative rounded-b-xl border border-t-0 border-slate-300/90"
          style={{ perspective: '1100px', perspectiveOrigin: '50% 0%', minHeight: LINE_H * 3 }}
        >
          {/* Resting page */}
          <motion.div
            key={`base-${index}`}
            initial={flip ? { scale: 0.985, y: 3 } : false}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ ...PAPER_STYLE, minHeight: LINE_H * 3, paddingTop: LINE_H }}
            className="relative z-10 overflow-hidden rounded-b-xl"
          >
            <PageFace text={ROLES[index]} tilt={tiltFor(index)} />

            {/* Ambient occlusion under the binding */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-slate-900/15 to-transparent" />
            {/* Aged edges */}
            <div className="pointer-events-none absolute inset-0 rounded-b-xl shadow-[inset_0_-8px_12px_-8px_rgba(130,105,55,0.3),inset_6px_0_10px_-8px_rgba(130,105,55,0.18),inset_-6px_0_10px_-8px_rgba(130,105,55,0.18)]" />
            {/* Curled bottom-right corner */}
            <div
              className="pointer-events-none absolute bottom-0 right-0 h-7 w-7"
              style={{
                background:
                  'linear-gradient(135deg, transparent 48%, rgba(80,65,30,0.22) 50%, #f3ecd5 56%, #fffdf3 100%)',
                borderBottomRightRadius: '0.75rem',
                boxShadow: '-2px -2px 5px rgba(60,45,15,0.18)',
              }}
            />
          </motion.div>

          {/* Shadow of the lifting page falling on the one below */}
          {flip && (
            <motion.div
              key={`shadow-${flip.key}`}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: [0.5, 0.35, 0] }}
              transition={{ duration: FLIP_DURATION_S, times: [0, 0.45, 1], ease: 'easeOut' }}
              className="pointer-events-none absolute inset-0 z-[15] rounded-b-xl bg-gradient-to-b from-slate-900/35 via-slate-900/12 to-transparent"
            />
          )}

          {/* Outgoing sheet: lifts, bends slightly, flips over the coil */}
          {flip && (
            <motion.div
              key={`flip-${flip.key}`}
              initial={{ rotateX: 0, rotateZ: 0, y: 0 }}
              animate={{
                rotateX: [0, 28, 96, 168],
                rotateZ: [0, -0.8, 0.6, 0],
                y: [0, -2, -6, -10],
              }}
              transition={{
                duration: FLIP_DURATION_S,
                times: [0, 0.22, 0.6, 1],
                ease: ['easeIn', 'easeInOut', 'easeOut'],
              }}
              onAnimationComplete={() => {
                if (flipKeyRef.current === flip.key) setFlip(null)
              }}
              style={{ transformOrigin: 'top center', transformStyle: 'preserve-3d' }}
              className="pointer-events-none absolute inset-0 z-20"
            >
              {/* Front face */}
              <div
                style={{
                  ...PAPER_STYLE,
                  paddingTop: LINE_H,
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
                className="absolute inset-0 overflow-hidden rounded-b-xl border-b border-slate-300/80 shadow-[0_10px_18px_-6px_rgba(15,23,42,0.45)]"
              >
                <PageFace text={ROLES[flip.from]} tilt={tiltFor(flip.from)} />
                {/* Falls out of the light as it tilts */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.15, 0.55] }}
                  transition={{ duration: FLIP_DURATION_S, times: [0, 0.4, 1] }}
                  className="absolute inset-0 bg-gradient-to-b from-slate-900/10 via-slate-900/35 to-slate-900/60"
                />
                {/* Light sweeping across the page as it bends */}
                <motion.div
                  initial={{ opacity: 0, y: '-100%' }}
                  animate={{ opacity: [0, 0.7, 0], y: ['-100%', '0%', '100%'] }}
                  transition={{ duration: FLIP_DURATION_S * 0.8, times: [0, 0.5, 1], ease: 'easeInOut' }}
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-white/70 to-transparent"
                />
              </div>

              {/* Back face: blank paper, text faintly showing through */}
              <div
                style={{
                  backgroundImage: `${GRAIN}, linear-gradient(0deg, #fbf8ec, #f0ead7)`,
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateX(180deg)',
                }}
                className="absolute inset-0 overflow-hidden rounded-b-xl border-b border-slate-300/80"
              >
                <div
                  style={{ paddingTop: LINE_H, opacity: 0.1, transform: 'scaleY(-1)' }}
                  className="absolute inset-0"
                >
                  <PageFace text={ROLES[flip.from]} tilt={0} />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SpiralNotebookRole