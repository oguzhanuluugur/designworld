"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

interface Article {
  id: number | string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  imageUrl: string;
  imageAlt: string;
  slug: string;
  content: string[];
}

interface BlogPost {
  id: string;
  title: string;
  category: string;
  lang: string;
  image: string;
  excerpt: string;
  content: string;
  date: string;
  views: number;
}

export default function InsightsSection() {
  const t = useTranslations("Insights");
  const params = useParams();
  const currentLocale = (params?.locale as string) || 'tr';
  
  // All hooks must be declared before any conditional returns
  const [isMounted, setIsMounted] = useState(false);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blog');
      const data = await response.json();
      if (data.success) {
        // Filter by current locale
        const localizedBlogs = data.posts.filter((post: BlogPost) => post.lang === currentLocale);
        setBlogs(localizedBlogs);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setIsLoadingBlogs(false);
    }
  };

  // Body scroll lock effect for modal
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (selectedArticle) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [selectedArticle]);

  // Prevent hydration error - render nothing on server
  if (!isMounted) {
    return null;
  }

  // Static articles from translations
  const staticArticles: Article[] = [
    {
      id: 1,
      title: t("a1_title"),
      category: t("a1_cat"),
      date: "2026",
      excerpt: t("a1_excerpt"),
      imageUrl:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop",
      imageAlt: "Sustainable architecture with vertical garden green building",
      slug: "a1",
      content: t("a1_content").split("\n\n"),
    },
    {
      id: 2,
      title: t("a2_title"),
      category: t("a2_cat"),
      date: "2025",
      excerpt: t("a2_excerpt"),
      imageUrl:
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2669&auto=format&fit=crop",
      imageAlt: "Modern open office workspace design post-pandemic",
      slug: "a2",
      content: t("a2_content").split("\n\n"),
    },
    {
      id: 3,
      title: t("a3_title"),
      category: t("a3_cat"),
      date: "2025",
      excerpt: t("a3_excerpt"),
      imageUrl:
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2670&auto=format&fit=crop",
      imageAlt: "Smart home minimalist technology integration",
      slug: "a3",
      content: t("a3_content").split("\n\n"),
    },
  ];

  // Convert fetched blogs to Article format
  const dynamicArticles: Article[] = blogs.map(blog => ({
    id: blog.id,
    title: blog.title,
    category: blog.category,
    date: new Date(blog.date).getFullYear().toString(),
    excerpt: blog.excerpt,
    imageUrl: blog.image,
    imageAlt: blog.title,
    slug: blog.id,
    content: blog.content.split('\n\n').filter(p => p.trim()),
  }));

  // Combine: Show static articles first (always 3), then add dynamic blogs
  let articles: Article[] = [];
  if (!isLoadingBlogs) {
    // Always show 3 static articles first
    articles = [...staticArticles];
    // Add all dynamic blogs after them
    articles = [...articles, ...dynamicArticles];
  } else {
    // While loading, show static articles
    articles = staticArticles;
  }

  return (
    <section className="relative bg-white py-20 md:py-32" aria-label="Insights and Trends">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-gray-900">
            {t("title")}
          </h2>
          <p className="text-gray-500 text-sm md:text-base mt-2 uppercase tracking-wider">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
            {articles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group"
            >
              {/* Image Container */}
              <button
                type="button"
                onClick={() => setSelectedArticle(article)}
                className="block mb-6 w-full text-left group/image"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <Image
                    src={article.imageUrl}
                    alt={article.imageAlt}
                    fill
                    className="object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </button>

              {/* Meta Data */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs uppercase tracking-wider text-[#C5A059] font-medium">
                  {article.category}
                </span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs uppercase tracking-wider text-gray-400">
                  {article.date}
                </span>
              </div>

              {/* Title */}
              <button
                type="button"
                onClick={() => setSelectedArticle(article)}
                className="text-left"
              >
                <h3 className="font-serif text-2xl md:text-3xl text-gray-900 mb-4 leading-tight group-hover:underline decoration-2 underline-offset-4 transition-all duration-300">
                  {article.title}
                </h3>
              </button>

              {/* Excerpt */}
              <p className="text-gray-500 text-base leading-relaxed mb-6 line-clamp-3">
                {article.excerpt}
              </p>

              {/* Read More Link */}
              <button
                type="button"
                onClick={() => setSelectedArticle(article)}
                className="inline-flex items-center text-sm uppercase tracking-wider text-gray-900 hover:text-[#C5A059] transition-colors duration-300 group/link"
              >
                <span>{t("readMore")}</span>
                <svg
                  className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/link:translate-x-1"
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
            </motion.article>
          ))}
        </div>

        {/* Full-screen Article Overlay */}
        <AnimatePresence>
          {selectedArticle && (
            <motion.div
              key={selectedArticle.id}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-50 bg-white overflow-y-auto"
            >
              {/* Close button */}
              <div className="sticky top-0 z-10 flex justify-end bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4">
                <button
                  type="button"
                  onClick={() => setSelectedArticle(null)}
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
              <div className="relative h-[50vh] w-full bg-gray-100">
                <Image
                  src={selectedArticle.imageUrl}
                  alt={selectedArticle.imageAlt}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>

              {/* Article Body */}
              <div className="px-6 md:px-10 lg:px-16 py-12 md:py-16">
                <div className="max-w-3xl mx-auto">
                  <p className="text-xs uppercase tracking-[0.25em] text-gray-400 mb-4">
                    {selectedArticle.category} • {selectedArticle.date}
                  </p>
                  <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-8 leading-tight">
                    {selectedArticle.title}
                  </h2>

                  <div className="space-y-6 md:space-y-7 text-lg md:text-xl leading-relaxed text-gray-700">
                    {selectedArticle.content.map((paragraph, index) => (
                      <p
                        key={index}
                        className={index === 0 ? "first-letter:text-5xl first-letter:md:text-6xl first-letter:font-serif first-letter:float-left first-letter:mr-3 first-letter:mt-1" : ""}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
