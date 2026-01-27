'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import LogoAnimation from './LogoAnimation'

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [phase, setPhase] = useState<'initial' | 'logo-visible' | 'transitioning' | 'complete'>('initial')

  useEffect(() => {
    // Phase 1: Show logo after 0.3s
    const timer1 = setTimeout(() => {
      setPhase('logo-visible')
    }, 300)

    // Phase 2: Start transition after 2.5s total
    const timer2 = setTimeout(() => {
      setPhase('transitioning')
    }, 2500)

    // Phase 3: Complete after transition
    const timer3 = setTimeout(() => {
      setPhase('complete')
      onComplete()
    }, 3500)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {phase !== 'complete' && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] bg-bg flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={
            phase === 'transitioning'
              ? { opacity: 0, y: '-100%' }
              : { opacity: 1, y: 0 }
          }
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
          {phase !== 'initial' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                phase === 'transitioning'
                  ? { opacity: 0, scale: 0.3, y: -200 }
                  : { opacity: 1, scale: 1 }
              }
              transition={{ duration: 1, ease: 'easeInOut' }}
            >
              <LogoAnimation variant="full" size="large" />
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
