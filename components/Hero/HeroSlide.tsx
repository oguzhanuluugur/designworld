'use client'

import KenBurnsEffect from './KenBurnsEffect'

interface HeroSlideProps {
  image: string
  alt: string
}

export default function HeroSlide({
  image,
  alt,
}: HeroSlideProps) {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Ken Burns Effect Background Image */}
      <KenBurnsEffect
        src={image}
        alt={alt}
        className="z-0"
      />

      {/* Dark Overlay for Logo and Text Visibility */}
      <div
        className="absolute inset-0 z-10 bg-black/50"
        aria-hidden="true"
      />

      {/* Smart Contrast Scrim - Strong white gradient on left for text readability */}
      <div
        className="absolute inset-0 z-20 bg-gradient-to-r from-white/90 via-white/40 to-transparent"
        aria-hidden="true"
      />
    </div>
  )
}
