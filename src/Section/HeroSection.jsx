import React, { useState, useEffect, Suspense, lazy } from 'react'
import { Button } from '@/components/ui/button'
import { Marquee } from '@/components/ui/marquee'
import GreetingWord from '@/components/shadcn-studio/blocks/hero-section-44/greeting-word'
import SpiralNotebookRole from './SpiralNotebookRole'
import { ArrowRightIcon } from 'lucide-react'

// Only load Three.js + Rapier WASM on desktop viewports to maintain instant mobile speed
const LazyIdCard = lazy(() => import('@/components/ui/id-card'))

function IdCardDesktop(props) {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const check = () => {
      setIsDesktop(typeof window !== 'undefined' && window.innerWidth >= 1024)
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  if (!isDesktop) return null

  return (
    <Suspense fallback={null}>
      <LazyIdCard {...props} />
    </Suspense>
  )
}

const PROFILE_IMAGE_URL = '/HeroSection.webp'

// Replace '#' with your CV link or file path (e.g. '/Hamim_Reja_CV.pdf')
const CV_URL = '#'

const defaultBrandLogos = [
  {
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
    name: 'Next.js',
  },
  {
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
    name: 'React',
  },
  {
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
    name: 'TypeScript',
  },
  {
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
    name: 'JavaScript',
  },
  {
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
    name: 'Node.js',
  },
  {
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg',
    name: 'Express.js',
  },
  {
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
    name: 'MongoDB',
  },
  {
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg',
    name: 'Redis',
  },
  {
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
    name: 'Tailwind CSS',
  },
  {
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
    name: 'Docker',
  },
  {
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
    name: 'AWS',
  },
  {
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
    name: 'Python',
  },
  {
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg',
    name: 'OpenCV',
  },
  {
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/raspberrypi/raspberrypi-original.svg',
    name: 'Raspberry Pi',
  },
  {
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg',
    name: 'Linux',
  },
  {
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/verilog/verilog-original.svg',
    name: 'Verilog',
  },
  {
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
    name: 'Git',
  },
  {
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg',
    name: 'Kotlin',
  },
  {
    image: 'https://cdn.simpleicons.org/langchain',
    name: 'LangChain',
  },
  {
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg',
    name: 'C++',
  },
]

const HeroSection = ({ brandLogos = defaultBrandLogos }) => {
  return (
    <section
      id="hero"
      aria-label="Full-Stack Software Engineer Introduction"
      itemScope
      itemType="https://schema.org/Person"
      className="relative min-h-[calc(100dvh-4rem)] flex flex-col justify-between text-slate-900 overflow-hidden"
    >
      <meta itemProp="name" content="Hamim Reja" />
      <meta itemProp="jobTitle" content="Full-Stack Software Engineer" />
      <meta itemProp="image" content="https://hamimreja.in/HeroSection.webp" />
      <div className="flex-1 flex items-center pt-10 pb-4 sm:pt-14 sm:pb-6 lg:pt-12 lg:pb-6">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 sm:space-y-5 lg:max-w-[500px]">
            <h1 className="flex flex-col gap-0.5 tracking-tight text-slate-900 dark:text-white">
              <span className="text-2xl sm:text-3xl lg:text-[34px] font-semibold text-cyan-600 dark:text-cyan-400">
                <GreetingWord />
              </span>
              <span className="text-4xl sm:text-5xl lg:text-[58px] font-bold leading-[1.08] tracking-tight text-slate-900 dark:text-white sm:whitespace-nowrap">
                I am Hamim
              </span>
            </h1>

            <SpiralNotebookRole />

            <p
              itemProp="description"
              className="max-w-[480px] text-[15px] sm:text-base font-normal leading-relaxed text-slate-600 dark:text-slate-300"
            >
              Full-Stack Software Engineer &amp; Startup Builder with a strong problem-solving mindset. I architect resilient distributed backends, real-time WebRTC systems, and high-performance Next.js applications that scale from 0 to thousands of users.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <Button
                variant="outline"
                className="h-11 rounded-full px-5 text-sm sm:text-[15px] border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-medium hover:border-slate-400 dark:hover:border-slate-600 hover:ring-1 hover:ring-slate-300 dark:hover:ring-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                render={<a href={CV_URL} />}
                nativeButton={false}
              >
                Download CV
              </Button>

              <Button
                variant="outline"
                className="hover:bg-slate-50 bg-white border-slate-300 text-slate-800 font-medium group h-11 gap-2.5 rounded-full !pr-4 !pl-4 pr-4! pl-4! text-sm sm:text-[15px] transition-[padding,border-color] duration-300 hover:!pl-2 hover:pl-2! hover:border-slate-400 dark:hover:border-slate-600 hover:ring-1 hover:ring-slate-300 dark:hover:ring-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                render={<a href="#contact" />}
                nativeButton={false}
              >
                <span className="bg-cyan-500 relative flex size-2.5 w-2.5 h-2.5 items-center justify-center overflow-hidden rounded-full transition-all duration-300 group-hover:size-6.5 group-hover:w-6 group-hover:h-6">
                  <ArrowRightIcon className="text-white absolute size-4.5 w-4 h-4 -translate-x-3 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                </span>
                Let&apos;s connect
              </Button>
            </div>
          </div>
        </div>
      </div>

      <IdCardDesktop
        frontImage={PROFILE_IMAGE_URL}
        className="mx-auto mt-8 aspect-[4/5] w-full max-w-80 max-lg:hidden lg:absolute lg:-top-[124px] lg:right-0 lg:left-0 lg:z-10 lg:mt-0 lg:aspect-auto lg:h-[728px] lg:max-w-none"
      />

      <div className="relative z-20 shrink-0 mx-auto w-full max-w-5xl pb-6 pt-2">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-16 bg-gradient-to-r from-slate-50 dark:from-slate-950 to-transparent sm:w-[140px]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-16 bg-gradient-to-l from-slate-50 dark:from-slate-950 to-transparent sm:w-[140px]" />
        <div className="mx-auto w-full max-w-5xl overflow-hidden">
          <Marquee pauseOnHover duration={25} gap={2}>
            {brandLogos.map((logo, logoIndex) => (
              <div
                key={`${logo.name}-${logoIndex}`}
                title={logo.name}
                className="bg-white dark:bg-white/95 border border-slate-200/90 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 hover:ring-1 hover:ring-slate-300 dark:hover:ring-slate-600 flex size-16 w-16 h-16 shrink-0 items-center justify-center rounded-xl transition-colors"
              >
                <img
                  src={logo.image}
                  alt={logo.name || ''}
                  loading="lazy"
                  width="40"
                  height="40"
                  decoding="async"
                  className="size-10 w-10 h-10 object-contain grayscale hover:grayscale-0 transition-all"
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
