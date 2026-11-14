import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const GREETINGS = [
  'Hello',
  'নমস্কার',
  'नमस्ते',
  'வணக்கம்',
  'నమస్కారం',
  'ನಮಸ್ಕಾರ',
  'നമസ്കാരം',
  'Hallo',
  'Bonjour',
  'Hola',
  'こんにちは',
  '你好',
  'مرحبا',
]
const INTERVAL_MS = 2200

const GreetingWord = () => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % GREETINGS.length)
    }, INTERVAL_MS)

    return () => clearInterval(timer)
  }, [])

  return (
    <span className="inline-grid justify-items-start overflow-hidden align-bottom py-0.5">
      {/* Invisible sizers keep vertical line height uniform across Latin, Indic, CJK, and Arabic scripts */}
      {GREETINGS.map((word) => (
        <span key={word} className="invisible col-start-1 row-start-1 whitespace-nowrap leading-[1.35]" aria-hidden="true">
          {word}
        </span>
      ))}

      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={GREETINGS[index]}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="col-start-1 row-start-1 inline-block whitespace-nowrap leading-[1.35]"
        >
          {GREETINGS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export default GreetingWord

