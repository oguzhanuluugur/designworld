import { Inter, Playfair_Display } from 'next/font/google'
import AdminLayoutClient from './AdminLayoutClient'
import '../globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${inter.variable} ${playfair.variable}`}>
      <body className={`${inter.className} antialiased`}>
        <AdminLayoutClient>{children}</AdminLayoutClient>
      </body>
    </html>
  )
}
