import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Gold Palette (used sparingly for accents)
        gold: {
          DEFAULT: '#C5A059', // Primary gold from logo
          light: '#D4B575',
          dark: '#A68A4A',
          glow: '#E5C77A', // For glow effects
        },
        // Light Background Palette
        bg: {
          DEFAULT: '#FFFFFF', // Pure white
          subtle: '#F8F9FA', // Subtle off-white
          light: '#FAFBFC',
        },
        // Dark Text Palette (for light mode)
        text: {
          DEFAULT: '#1A1A1A', // Primary dark charcoal
          dark: '#2D2D2D', // Dark slate grey
          medium: '#4A4A4A', // Medium grey
          light: '#6B6B6B', // Light grey
          white: '#FFFFFF', // White text for dark images
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(3rem, 8vw, 6rem)', { lineHeight: '1.1', letterSpacing: '-0.03em' }], // Tighter tracking
        'display': ['clamp(2.5rem, 6vw, 4.5rem)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'ken-burns': 'kenBurns 20s ease-in-out infinite',
        'ken-burns-slow': 'kenBurns 25s ease-in-out infinite',
        'fade-in': 'fadeIn 1s ease-in',
        'scale-in': 'scaleIn 1s ease-out',
      },
      keyframes: {
        kenBurns: {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '100%': { transform: 'scale(1.15) translate(-3%, -3%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C5A059 0%, #D4B575 100%)',
        'gold-glow': 'radial-gradient(circle, rgba(197, 160, 89, 0.3) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
}
export default config
