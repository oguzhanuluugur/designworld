import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import Script from 'next/script';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import '../globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const locales = ['tr', 'en', 'ru', 'ar', 'fr'];

const localeDescriptions: Record<string, string> = {
  tr: "İstanbul'un ödüllü iç mimarlık ve lüks dekorasyon ofisi. Hayallerinizdeki mekanları sanata dönüştürüyoruz. Premium konut ve ticari alanlar için özel tasarım çözümleri.",
  en: "Istanbul's award-winning interior architecture and luxury decoration office. We transform your dream spaces into works of art. Special design solutions for premium residential and commercial spaces.",
  ru: "Награжденное архитектурное бюро интерьеров и роскошного декора в Стамбуле. Мы превращаем ваши мечты в произведения искусства. Специальные дизайнерские решения для премиум жилых и коммерческих помещений.",
  ar: "مكتب التصميم الداخلي والديكور الفاخر الحائز على جوائز في إسطنبول. نحول مساحات أحلامك إلى أعمال فنية. حلول تصميم خاصة للمساحات السكنية والتجارية الفاخرة.",
  fr: "Bureau d'architecture d'intérieur et de décoration de luxe primé à Istanbul. Nous transformons vos espaces de rêve en œuvres d'art. Solutions de design spéciales pour les espaces résidentiels et commerciaux premium.",
};

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = await params;
  const description = localeDescriptions[locale] || localeDescriptions.tr;
  const baseUrl = 'https://designworld.com';

  return {
    metadataBase: new URL(baseUrl),
    title: {
      template: '%s | Design World - Luxury Architecture',
      default: 'Design World | İstanbul Lüks İç Mimarlık ve Dekorasyon Ofisi',
    },
    description,
    keywords: [
      'Luxury Interior Design',
      'Architectural Consultancy',
      'Turnkey Projects',
      'İstanbul İç Mimarlık',
      'Lüks Dekorasyon',
      'Premium Architecture',
      'Interior Design Istanbul',
      'Luxury Architecture',
      'High-End Interior Design',
      'Boutique Architecture Firm',
      'Custom Home Design',
      'Commercial Space Design',
    ],
    authors: [{ name: 'Design World' }],
    creator: 'Design World',
    publisher: 'Design World',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'tr': '/tr',
        'en': '/en',
        'ru': '/ru',
        'ar': '/ar',
        'fr': '/fr',
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'ar' ? 'ar_SA' : locale === 'tr' ? 'tr_TR' : locale === 'ru' ? 'ru_RU' : locale === 'fr' ? 'fr_FR' : 'en_US',
      url: `${baseUrl}/${locale}`,
      title: 'Design World | Luxury Architecture & Interior Design',
      description,
      siteName: 'Design World',
      images: [
        {
          url: `${baseUrl}/images/og-default.jpg`,
          width: 1200,
          height: 630,
          alt: 'Design World - Luxury Architecture',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Design World | Luxury Architecture & Interior Design',
      description,
      images: [`${baseUrl}/images/og-default.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: '/images/logo/de.png',
      shortcut: '/images/logo/de.png',
      apple: '/images/logo/de.png',
    },
  };
}

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

