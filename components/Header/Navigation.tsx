'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export default function Navigation() {
  const t = useTranslations('Nav')
  
  const navItems = [
    { label: t('home'), href: '#home' },
    { label: t('projects'), href: '#projects' },
    { label: t('about'), href: '#about' },
    { label: t('contact'), href: '#contact' },
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
    <nav className="hidden md:flex items-center gap-8">
      {navItems.map((item, index) => (
        <motion.a
          key={item.href}
          href={item.href}
          onClick={(e) => handleClick(e, item.href)}
          className="text-text hover:text-gold transition-colors duration-300 text-sm font-medium tracking-wide relative group backdrop-blur-sm px-3 py-1 rounded-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          {item.label}
          <span className="absolute bottom-0 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
        </motion.a>
      ))}
    </nav>
  )
}
