'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Instagram, Linkedin, MessageCircle, Mail, MapPin, Phone } from 'lucide-react'

export default function Footer() {
  const t = useTranslations('Footer')
  const tNav = useTranslations('Nav')

  const navLinks = [
    { label: tNav('home'), href: '#home' },
    { label: tNav('projects'), href: '#projects' },
    { label: tNav('about'), href: '#about' },
    { label: tNav('contact'), href: '#contact' },
  ]

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <footer className="bg-[#0F0F0F] text-white pt-16 pb-8">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#C5A059] flex items-center justify-center">
                <span className="text-white font-serif text-2xl font-bold">DW</span>
              </div>
              <span className="text-xl font-serif font-semibold">Design World</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              {t('desc')}
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#C5A059] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#C5A059] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/905525068994"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#C5A059] transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 tracking-wide">
              {t('links')}
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className="text-gray-400 hover:text-[#C5A059] transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 tracking-wide">
              {t('contact')}
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C5A059] flex-shrink-0 mt-0.5" />
                <span>Nişantaşı, Teşvikiye Cad. No:42<br />Şişli, İstanbul</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#C5A059] flex-shrink-0" />
                <a
                  href="mailto:info@designworld.com"
                  className="hover:text-[#C5A059] transition-colors"
                >
                  info@designworld.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#C5A059] flex-shrink-0" />
                <a
                  href="tel:+905525068994"
                  className="hover:text-[#C5A059] transition-colors"
                >
                  +90 552 506 89 94
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} Design World. {t('copyright')}
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="hover:text-[#C5A059] transition-colors"
            >
              {t('privacy')}
            </Link>
            <Link
              href="/terms"
              className="hover:text-[#C5A059] transition-colors"
            >
              {t('terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
