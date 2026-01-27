"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { EffectFade, Autoplay, Pagination } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslations } from "next-intl"
import HeroSlide from "./HeroSlide"
import { heroSlides } from "@/lib/constants"

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0)
  const t = useTranslations("Hero")

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex)
  }

  const currentSlide = heroSlides[activeIndex]

  return (
    <section className="relative h-screen w-full" aria-label="Hero section">
      {/* Background Image Slider */}
      <Swiper
        modules={[EffectFade, Autoplay, Pagination]}
        effect="fade"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={1500}
        loop={true}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet !bg-gold/50 !w-2 !h-2 !opacity-50',
          bulletActiveClass: 'swiper-pagination-bullet-active !bg-gold !opacity-100',
        }}
        onSlideChange={handleSlideChange}
        className="h-full w-full"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id} className="h-full w-full">
            <HeroSlide
              image={slide.image}
              alt={slide.alt}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Dynamic Text Content - Left Aligned Editorial Layout */}
      <div className="absolute inset-0 z-30 flex items-center pointer-events-none">
        <div className="container mx-auto px-6 md:pl-20 lg:pl-24">
          <div className="max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              >
                <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 mb-6 leading-tight">
                  {currentSlide.id === "1"
                    ? t("slide1_title")
                    : currentSlide.id === "2"
                    ? t("slide2_title")
                    : t("slide3_title")}
                </h1>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                  className="text-lg md:text-xl text-gray-700 font-sans font-light leading-relaxed tracking-wide"
                >
                  {currentSlide.id === "1"
                    ? t("slide1_sub")
                    : currentSlide.id === "2"
                    ? t("slide2_sub")
                    : t("slide3_sub")}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Custom Pagination Styling */}
      <style jsx global>{`
        .swiper-pagination {
          bottom: 40px !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          width: auto !important;
          display: flex !important;
          gap: 12px !important;
          z-index: 40 !important;
        }
        .swiper-pagination-bullet {
          transition: all 0.3s ease !important;
        }
      `}</style>
    </section>
  )
}
