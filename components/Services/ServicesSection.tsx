"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface Service {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
}

export default function ServicesSection() {
  const t = useTranslations("Services");

  const services: Service[] = [
    {
      id: 1,
      title: t("s1_title"),
      description: t("s1_desc"),
      imageUrl:
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2831&auto=format&fit=crop",
      imageAlt: "Architectural sketch and blueprint design concept",
    },
    {
      id: 2,
      title: t("s2_title"),
      description: t("s2_desc"),
      imageUrl:
        "https://images.unsplash.com/photo-1503387837-b154d5074bd2?q=80&w=2831&auto=format&fit=crop",
      imageAlt: "Technical CAD drawing and engineering plans",
    },
    {
      id: 3,
      title: t("s3_title"),
      description: t("s3_desc"),
      imageUrl:
        "https://images.unsplash.com/photo-1618219740975-d40978bb7378?q=80&w=2848&auto=format&fit=crop",
      imageAlt: "Luxury interior with marble texture and elegant materials",
    },
    {
      id: 4,
      title: t("s4_title"),
      description: t("s4_desc"),
      imageUrl:
        "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2940&auto=format&fit=crop",
      imageAlt: "Construction site with architect supervision and project management",
    },
  ];

  return (
    <section className="relative bg-white py-20 md:py-32" aria-label="Services">
      {/* Section Header */}
      <div className="container mx-auto px-6 mb-16 md:mb-24 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-4"
        >
          {t("title")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto"
        >
          {t("subtitle")}
        </motion.p>
      </div>

      {/* Timeline Container */}
      <div className="relative container mx-auto px-6">
        {/* Central Vertical Axis Line - Gold/Beige */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#C5A059]/30 hidden md:block -translate-x-1/2" />

        {/* Services Timeline Items */}
        <div className="space-y-20 md:space-y-32">
          {services.map((service, index) => {
            const isOdd = index % 2 === 0;

            return (
              <div
                key={service.id}
                className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
              >
                {/* ODD LAYOUT: Text Left, Image Center-Right */}
                {isOdd ? (
                  <>
                    {/* Text Content - Left Side (Align Right) */}
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 1.0, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      className="md:text-right order-2 md:order-1"
                    >
                      <h3 className="font-serif text-3xl md:text-4xl text-gray-900 mb-4">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                        {service.description}
                      </p>
                      {/* Connector Line (Desktop) */}
                      <div className="hidden md:flex justify-end mt-6">
                        <div className="w-12 h-px bg-[#C5A059]/50" />
                      </div>
                    </motion.div>

                    {/* Image Node - Center */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                      className="flex justify-center md:justify-start order-1 md:order-2"
                    >
                      <div className="relative w-48 h-48 md:w-64 md:h-64">
                        <Image
                          src={service.imageUrl}
                          alt={service.imageAlt}
                          fill
                          className="rounded-full object-cover shadow-2xl border border-gray-100"
                          sizes="(max-width: 768px) 192px, 256px"
                        />
                        {/* Gold Ring Accent */}
                        <div className="absolute inset-0 rounded-full border-2 border-[#C5A059]/20" />
                      </div>
                    </motion.div>
                  </>
                ) : (
                  /* EVEN LAYOUT: Image Center-Left, Text Right */
                  <>
                    {/* Image Node - Center */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                      className="flex justify-center md:justify-end order-1"
                    >
                      <div className="relative w-48 h-48 md:w-64 md:h-64">
                        <Image
                          src={service.imageUrl}
                          alt={service.imageAlt}
                          fill
                          className="rounded-full object-cover shadow-2xl border border-gray-100"
                          sizes="(max-width: 768px) 192px, 256px"
                        />
                        {/* Gold Ring Accent */}
                        <div className="absolute inset-0 rounded-full border-2 border-[#C5A059]/20" />
                      </div>
                    </motion.div>

                    {/* Text Content - Right Side (Align Left) */}
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 1.0, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      className="md:text-left order-2"
                    >
                      <h3 className="font-serif text-3xl md:text-4xl text-gray-900 mb-4">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                        {service.description}
                      </p>
                      {/* Connector Line (Desktop) */}
                      <div className="hidden md:flex justify-start mt-6">
                        <div className="w-12 h-px bg-[#C5A059]/50" />
                      </div>
                    </motion.div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
