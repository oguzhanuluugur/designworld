"use client"

import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import { useRef, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useTranslations } from 'next-intl'
import LogoAnimation from '../Preloader/LogoAnimation'
import Navigation from './Navigation'
import LanguageSwitcher from '../LanguageSwitcher'
import "flag-icons/css/flag-icons.min.css"

interface HeaderProps {
  showLogo: boolean
}

export default function Header({ showLogo }: HeaderProps) {
  const t = useTranslations('Nav')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hidden, setHidden] = useState(false)

  const { scrollY } = useScroll()
  const lastScrollY = useRef(0)
  const router = useRouter()
  const pathname = usePathname()

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current
    lastScrollY.current = latest

    // At very top of the page – always show, transparent background
    if (latest < 10) {
      setHidden(false)
      setIsScrolled(false)
      return
    }

    // User has scrolled past the hero – enable scrolled state (glass background)
    setIsScrolled(true)

    // Scrolling down & past threshold → hide
    if (latest > previous && latest > 150) {
      setHidden(true)
    }

    // Scrolling up → show immediately
    if (latest < previous) {
      setHidden(false)
    }
  })

  const variants = {
    visible: { y: 0, transition: { duration: 0.35, ease: "easeInOut" } },
    hidden: { y: "-100%", transition: { duration: 0.35, ease: "easeInOut" } },
  }

  // locale handling for mobile language strip
  const languages = [
    { code: 'tr', label: 'TR', flagCode: 'tr' },
    { code: 'en', label: 'EN', flagCode: 'gb' },
    { code: 'ru', label: 'RU', flagCode: 'ru' },
    { code: 'ar', label: 'AR', flagCode: 'sa' },
    { code: 'fr', label: 'FR', flagCode: 'fr' },
  ] as const
  const pathSegments = (pathname || '/').split('/')
  const currentLocaleFromPath =
    languages.find((lang) => lang.code === (pathSegments[1] as any))?.code || 'tr'

  const handleLocaleChange = (code: string) => {
    const segments = (pathname || '/').split('/')
    const langCodes = languages.map(l => l.code)
    if (segments[1] && langCodes.includes(segments[1] as any)) {
      segments[1] = code
    } else {
      segments.splice(1, 0, code)
    }
    const next = segments.join('/') || '/'
    router.push(next)
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-[900] transition-colors duration-500 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-gold/20 shadow-sm'
          : 'bg-white/10 backdrop-blur-md'
      }`}
      variants={variants}
      initial="visible"
      animate={hidden ? "hidden" : "visible"}
    >
      <div className="container mx-auto px-6 md:pl-20 lg:pl-24 md:pr-12 lg:pr-16">
        <div className="flex items-center justify-between h-28 md:h-32">
          {/* Logo */}
          <AnimatePresence>
            {showLogo && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="h-24 md:h-28 flex items-center w-auto"
              >
                <LogoAnimation variant="full" size="small" isScrolled={isScrolled} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop Navigation */}
          <Navigation />

          {/* Right controls: Language switcher + Mobile Menu */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <LanguageSwitcher isScrolled={isScrolled} />
            </div>

            <button
              className={`md:hidden transition-colors ${
                isScrolled ? 'text-text' : 'text-text'
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden pb-4"
            >
              <nav className="flex flex-col gap-4">
                {[
                  { label: t('home'), href: '#home' },
                  { label: t('projects'), href: '#projects' },
                  { label: t('about'), href: '#about' },
                  { label: t('contact'), href: '#contact' },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-text hover:text-gold transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}

                {/* Mobile Language Strip */}
                <div className="pt-4 mt-4 border-t border-gold/20 flex items-center justify-center space-x-4">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => handleLocaleChange(lang.code)}
                      className={`flex flex-col items-center gap-1 ${
                        currentLocaleFromPath === lang.code
                          ? 'opacity-100'
                          : 'opacity-60 hover:opacity-100'
                      } transition-opacity`}
                    >
                      <span className={`fi fi-${lang.flagCode} text-2xl rounded shadow-sm`}></span>
                      <span className={`text-[10px] uppercase tracking-wider ${
                        currentLocaleFromPath === lang.code
                          ? 'font-semibold text-[#C5A059]'
                          : 'font-medium text-gray-500'
                      }`}>
                        {lang.label}
                      </span>
                    </button>
                  ))}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
