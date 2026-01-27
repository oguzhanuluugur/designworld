"use client";

import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination, Mousewheel, Autoplay } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Project {
  id: number | string;
  title: string;
  type: string;
  location: string;
  year: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
}

interface AdminProject {
  id: string;
  title: string;
  category: string;
  lang: string;
  location: string;
  year: string;
  image: string;
  description: string;
  createdAt: string;
}

export default function ProjectsShowcase() {
  const swiperRef = useRef<SwiperType>();
  const t = useTranslations("Projects");
  const params = useParams();
  const currentLocale = (params?.locale as string) || 'tr';

  const [isMounted, setIsMounted] = useState(false);
  const [adminProjects, setAdminProjects] = useState<AdminProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    setIsMounted(true);
    fetchProjects();
  }, []);

  // Body scroll lock for modal
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (selectedProject) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [selectedProject]);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      if (data.success) {
        // Filter by current locale
        const localizedProjects = data.projects.filter((p: AdminProject) => p.lang === currentLocale);
        setAdminProjects(localizedProjects);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) {
    return null;
  }

  const staticProjects: Project[] = [
    {
      id: 1,
      title: "Vadi İstanbul Penthouse",
      type: t("p1_type"),
      location: "İstanbul",
      year: "2025",
      description: t("p1_desc"),
      imageUrl:
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2574&auto=format&fit=crop",
      imageAlt: "Vadi Istanbul luxury penthouse living room interior",
    },
    {
      id: 2,
      title: "Maslak Plaza Ofis",
      type: t("p2_type"),
      location: "Maslak, İstanbul",
      year: "2024",
      description: t("p2_desc"),
      imageUrl:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2669&auto=format&fit=crop",
      imageAlt: "Maslak Plaza modern luxury office workspace",
    },
    {
      id: 3,
      title: "Bodrum Yalıkavak Villa",
      type: t("p3_type"),
      location: "Bodrum",
      year: "2025",
      description: t("p3_desc"),
      imageUrl:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2671&auto=format&fit=crop",
      imageAlt: "Bodrum Yalikavak luxury villa with infinity pool",
    },
    {
      id: 4,
      title: "Galataport Restoran",
      type: t("p4_type"),
      location: "Galataport, İstanbul",
      year: "2024",
      description: t("p4_desc"),
      imageUrl:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2670&auto=format&fit=crop",
      imageAlt: "Galataport luxury fine dining restaurant interior",
    },
  ];

  // Convert admin projects to Project format
  const dynamicProjects: Project[] = adminProjects.map(proj => ({
    id: proj.id,
    title: proj.title,
    type: proj.category,
    location: proj.location,
    year: proj.year,
    description: proj.description,
    imageUrl: proj.image,
    imageAlt: proj.title,
  }));

  // Combine: Show static projects first, then add dynamic projects
  const allProjects = [...staticProjects, ...dynamicProjects];

  return (
    <section className="relative bg-white py-20 md:py-32" aria-label="Projects Showcase">
      {/* Section Header */}
      <div className="container mx-auto px-6 mb-12 md:mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-gray-900 text-center mb-4"
        >
          {t("title")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-gray-600 text-lg md:text-xl text-center max-w-2xl mx-auto"
        >
          {t("subtitle")}
        </motion.p>
      </div>

      {/* Swiper Container */}
      <div className="relative">
        <Swiper
          modules={[EffectFade, Navigation, Pagination, Mousewheel, Autoplay]}
          effect="fade"
          fadeEffect={{
            crossFade: true,
          }}
          slidesPerView={1}
          spaceBetween={0}
          speed={1000}
          mousewheel={{
            forceToAxis: true,
            sensitivity: 1,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={{
            prevEl: ".swiper-button-prev-custom",
            nextEl: ".swiper-button-next-custom",
          }}
          pagination={{
            el: ".swiper-pagination-custom",
            type: "fraction",
            formatFractionCurrent: (number) => String(number).padStart(2, "0"),
            formatFractionTotal: (number) => String(number).padStart(2, "0"),
          }}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="w-full"
        >
          {allProjects.map((project) => (
            <SwiperSlide key={project.id} className="bg-white">
              {/* Split Screen Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[70vh] lg:min-h-[80vh] bg-white">
                {/* Left Side - Image (60%) */}
                <div className="relative lg:col-span-3 h-[50vh] lg:h-auto">
                  <Image
                    src={project.imageUrl}
                    alt={project.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority
                  />
                  {/* Subtle gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent lg:hidden" />
                </div>

                {/* Right Side - Content (40%) */}
                <div className="lg:col-span-2 flex items-center justify-center p-8 md:p-12 lg:p-16 bg-white">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-xl"
                  >
                    {/* Meta Tags */}
                    <div className="flex flex-wrap gap-3 mb-6">
                      <span className="text-xs uppercase tracking-wider text-[#C5A059] font-medium">
                        {project.type}
                      </span>
                      <span className="text-xs uppercase tracking-wider text-gray-400">
                        •
                      </span>
                      <span className="text-xs uppercase tracking-wider text-gray-500">
                        {project.location}
                      </span>
                      <span className="text-xs uppercase tracking-wider text-gray-400">
                        •
                      </span>
                      <span className="text-xs uppercase tracking-wider text-gray-500">
                        {project.year}
                      </span>
                    </div>

                    {/* Project Title */}
                    <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-6 leading-tight">
                      {project.title}
                    </h3>

                    {/* Project Description */}
                    <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
                      {project.description}
                    </p>

                    {/* View Details Link */}
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center text-sm uppercase tracking-wider text-gray-900 hover:text-[#C5A059] transition-colors duration-300 group"
                    >
                      <span>{t("viewDetails")}</span>
                      <svg
                        className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </button>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <div className="absolute bottom-8 right-8 z-10 flex items-center gap-4">
          {/* Pagination Fraction */}
          <div className="swiper-pagination-custom text-sm font-light text-gray-400 tracking-wider" />

          {/* Previous Button */}
          <button
            className="swiper-button-prev-custom w-12 h-12 rounded-full border border-gray-300 hover:border-[#C5A059] flex items-center justify-center transition-all duration-300 hover:scale-110 bg-white/80 backdrop-blur-sm"
            aria-label="Previous project"
          >
            <svg
              className="w-5 h-5 text-gray-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Next Button */}
          <button
            className="swiper-button-next-custom w-12 h-12 rounded-full border border-gray-300 hover:border-[#C5A059] flex items-center justify-center transition-all duration-300 hover:scale-110 bg-white/80 backdrop-blur-sm"
            aria-label="Next project"
          >
            <svg
              className="w-5 h-5 text-gray-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Full-screen Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            key={selectedProject.id}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[9999] bg-white overflow-y-auto"
          >
            {/* Close button */}
            <div className="sticky top-0 z-10 flex justify-end bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 py-4">
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 hover:border-gray-500 hover:bg-gray-50 transition-colors"
                aria-label="Kapat"
              >
                <svg
                  className="w-5 h-5 text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Hero Image */}
            <div className="relative h-[60vh] w-full bg-gray-100">
              <Image
                src={selectedProject.imageUrl}
                alt={selectedProject.imageAlt}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              
              {/* Project Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16">
                <div className="max-w-4xl mx-auto">
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="text-xs uppercase tracking-wider text-[#C5A059] font-medium bg-black/30 backdrop-blur-sm px-3 py-1 rounded">
                      {selectedProject.type}
                    </span>
                    <span className="text-xs uppercase tracking-wider text-white bg-black/30 backdrop-blur-sm px-3 py-1 rounded">
                      {selectedProject.location}
                    </span>
                    <span className="text-xs uppercase tracking-wider text-white bg-black/30 backdrop-blur-sm px-3 py-1 rounded">
                      {selectedProject.year}
                    </span>
                  </div>
                  <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight">
                    {selectedProject.title}
                  </h2>
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="px-6 md:px-10 lg:px-16 py-12 md:py-16">
              <div className="max-w-4xl mx-auto">
                {/* Project Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 pb-12 border-b border-gray-200">
                  <div>
                    <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-2 font-semibold">
                      Kategori
                    </h3>
                    <p className="text-lg text-gray-900 font-medium">{selectedProject.type}</p>
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-2 font-semibold">
                      Lokasyon
                    </h3>
                    <p className="text-lg text-gray-900 font-medium">{selectedProject.location}</p>
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-2 font-semibold">
                      Tamamlanma Yılı
                    </h3>
                    <p className="text-lg text-gray-900 font-medium">{selectedProject.year}</p>
                  </div>
                </div>

                {/* Project Description */}
                <div>
                  <h3 className="font-serif text-3xl text-gray-900 mb-6">Proje Hakkında</h3>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
                      {selectedProject.description}
                    </p>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <a
                    href={`https://wa.me/905525068994?text=${encodeURIComponent(t("whatsapp_msg_project"))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#C5A059] text-white px-8 py-4 rounded-lg hover:bg-[#B39149] transition-all shadow-lg hover:shadow-xl font-semibold text-lg"
                  >
                    <span>{t("whatsapp_msg_project")}</span>
                    <svg
                      className="w-5 h-5"
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
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
