"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function CTASection() {
  const t = useTranslations("CTA");

  // Get WhatsApp message from translations and encode it for URL
  const whatsappMessage = t("whatsapp_msg");
  const whatsappUrl = `https://wa.me/905525068994?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section className="relative bg-[#0F0F0F] py-20 md:py-32 overflow-hidden" aria-label="Call to Action">
      {/* Subtle Background Pattern - Architectural Grid */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(to right, #C5A059 1px, transparent 1px),
            linear-gradient(to bottom, #C5A059 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
      />

      {/* Animated Marquee Background Text */}
      <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 pointer-events-none overflow-hidden whitespace-nowrap z-0">
        <motion.div
          animate={{
            x: [0, -1000],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="inline-block font-serif text-[12vw] md:text-[10rem] text-white opacity-[0.03] select-none"
        >
          DESIGN • PLAN • BUILD • DESIGN • PLAN • BUILD • DESIGN • PLAN • BUILD •
        </motion.div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Headline & Sub-headline */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Headline */}
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
              {t("title")}
            </h2>

            {/* Sub-headline */}
            <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl">
              {t("desc")}
            </p>
          </motion.div>

          {/* Right Side - CTA Button */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-start lg:justify-end"
          >
            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-10 py-5 border-2 border-[#C5A059] text-[#C5A059] text-sm uppercase tracking-[0.2em] font-medium transition-all duration-500 hover:text-white overflow-hidden"
            >
              {/* Background fill on hover */}
              <span className="absolute inset-0 bg-[#C5A059] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              
              {/* Button text */}
              <span className="relative z-10 flex items-center gap-3">
                {t("button")}
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </motion.a>
          </motion.div>
        </div>

        {/* Bottom Stats/Trust Indicators (Optional Enhancement) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/10"
        >
          <div className="text-center">
            <div className="font-serif text-3xl md:text-4xl text-[#C5A059] mb-2">50+</div>
            <div className="text-gray-500 text-sm uppercase tracking-wider">
              {t("stat_projects")}
            </div>
          </div>
          <div className="text-center">
            <div className="font-serif text-3xl md:text-4xl text-[#C5A059] mb-2">15+</div>
            <div className="text-gray-500 text-sm uppercase tracking-wider">
              {t("stat_exp")}
            </div>
          </div>
          <div className="text-center">
            <div className="font-serif text-3xl md:text-4xl text-[#C5A059] mb-2">100%</div>
            <div className="text-gray-500 text-sm uppercase tracking-wider">
              {t("stat_satisfaction")}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
