'use client'

import { useState } from 'react'
import Image from 'next/image'

interface KenBurnsEffectProps {
  src: string
  alt: string
  className?: string
}

export default function KenBurnsEffect({ src, alt, className = '' }: KenBurnsEffectProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    // Fallback gradient background when image fails to load
    return (
      <div className={`absolute inset-0 overflow-hidden bg-gradient-to-br from-bg-subtle via-bg-light to-bg ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-text-medium">
            <p className="text-sm">Image not found</p>
            <p className="text-xs mt-2">Please add images to /public/slides/</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <div className="absolute inset-0 animate-ken-burns">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          quality={90}
          className="object-cover"
          sizes="100vw"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
            objectPosition: 'center',
          }}
        />
      </div>
    </div>
  )
}
