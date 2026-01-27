"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function PhilosophySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("Philosophy");

  // Track scroll progress - this creates the "pinning" effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Text moves strictly LEFT: 0% -> -50% (slower, smoother exit)
  const textX = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  // Image moves strictly RIGHT: 0% -> 25% (subtle shift)
  const imageX = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <section
      ref={containerRef}
      className="relative h-[300vh] bg-white"
      aria-label="Philosophy section"
    >
      {/* Sticky wrapper - CSS Grid forces overlap - High-End Professional */}
      <div className="sticky top-0 h-screen overflow-hidden grid grid-cols-1 grid-rows-1 bg-white">
        {/* Image Container - BACK LAYER (Z-0) - Cinematic Architecture Photography */}
        <motion.div
          style={{
            x: imageX,
            willChange: "transform",
          }}
          className="z-0 col-start-1 row-start-1 w-full h-full flex items-center justify-center"
        >
          <div className="relative w-full h-[85vh]">
            <Image
              src="https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=2074&auto=format&fit=crop"
              alt="Modern luxury architectural interior"
              fill
              className="object-cover w-full h-full grayscale-[20%] brightness-[0.85] contrast-110"
              sizes="100vw"
              priority
            />
            {/* Cinematic Vignette Overlay - Professional Focus */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 z-10" />
          </div>
        </motion.div>

        {/* Text Container - FRONT LAYER (Z-20) - Luxury Magazine Typography */}
        <motion.div
          style={{
            x: textX,
            mixBlendMode: "difference",
            willChange: "transform",
          }}
          className="z-20 col-start-1 row-start-1 flex items-center justify-center px-6 md:px-12 lg:px-20"
        >
          <h2 className="font-serif font-thin text-white leading-tight tracking-[0.4em] md:tracking-[0.5em] select-none pointer-events-none">
            <div className="text-6xl md:text-8xl">{t("title1")}</div>
            <div className="text-6xl md:text-8xl">{t("title2")}</div>
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
