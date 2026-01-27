'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface LogoAnimationProps {
  variant?: 'full' | 'icon'
  size?: 'large' | 'small'
  className?: string
  isScrolled?: boolean
}

export default function LogoAnimation({
  variant = 'full',
  size = 'large',
  className = '',
  isScrolled = false,
}: LogoAnimationProps) {
  const dimensions = size === 'large' 
    ? { width: 700, height: 700 }
    : { width: 500, height: 200 }

  return (
    <motion.div
      className={`${className} ${size === 'small' ? 'h-full' : ''}`}
      initial={size === 'large' ? { opacity: 0, scale: 0.8 } : false}
      animate={size === 'large' ? { opacity: 1, scale: 1 } : false}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <Image
        src="/images/logo/de.png"
        alt="Design World Logo"
        width={dimensions.width}
        height={dimensions.height}
        priority
        className="object-contain w-auto h-full max-w-none transition-all duration-300"
        style={{
          filter: isScrolled
            ? 'sepia(1) saturate(2.5) hue-rotate(15deg) brightness(1.3) contrast(1.2) drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3))' // Altın renk (scroll'da beyaz navbar)
            : size === 'large' 
              ? 'drop-shadow(0 0 60px rgba(197, 160, 89, 1)) sepia(1) saturate(2.5) hue-rotate(15deg) brightness(1.3) contrast(1.2)' // Altın renk + gold glow (preloader)
              : 'sepia(1) saturate(2.5) hue-rotate(15deg) brightness(1.3) contrast(1.2)', // Altın renk (navbar, scroll yok)
        }}
        unoptimized
      />
    </motion.div>
  )
}
