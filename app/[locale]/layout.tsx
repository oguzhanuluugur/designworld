import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import Script from 'next/script';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import '../globals.css';

const playfair = Playfair_Display({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Design World | İstanbul Lüks İç Mimarlık ve Dekorasyon Ofisi',
  description:
    "İstanbul'un ödüllü iç mimarlık ve lüks dekorasyon ofisi. Hayallerinizdeki mekanları sanata dönüştürüyoruz. Premium konut ve ticari alanlar için özel tasarım çözümleri.",
  icons: {
    icon: '/images/logo/de.png',
    shortcut: '/images/logo/de.png',
    apple: '/images/logo/de.png',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ArchitecturalService',
  name: 'Design World',
  description:
    "İstanbul'un ödüllü iç mimarlık ve lüks dekorasyon ofisi. Hayallerinizdeki mekanları sanata dönüştürüyoruz.",
  url: 'https://designworld.com',
  logo: 'https://designworld.com/images/logo/de.png',
  image:
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'İstanbul',
    addressCountry: 'TR',
  },
  areaServed: {
    '@type': 'City',
    name: 'İstanbul',
  },
  serviceType: ['Interior Design', 'Architecture', 'Luxury Decoration'],
  priceRange: '$$$',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: '50',
  },
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  // Fetch messages for the active locale from next-intl's request config
  const messages = await getMessages();

  return (
    <html lang={locale} dir={dir} className="scroll-smooth" suppressHydrationWarning>
      <body className={`${playfair.variable} ${inter.variable}`}>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>

        {/* ARCHITECTURAL CORNER ACCENTS */}
        <div className="fixed inset-0 z-[999] pointer-events-none" aria-hidden="true">
          {/* Top Left */}
          <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-[#C5A059] opacity-90 rounded-tl-sm" />
          {/* Top Right */}
          <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-[#C5A059] opacity-90 rounded-tr-sm" />
          {/* Bottom Left */}
          <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-[#C5A059] opacity-90 rounded-bl-sm" />
          {/* Bottom Right */}
          <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-[#C5A059] opacity-90 rounded-br-sm" />
        </div>
      </body>
    </html>
  );
}

