// Hero slider data with unique SEO-optimized content
export interface HeroSlide {
  id: string
  image: string
  heading: string
  subtitle: string
  alt: string
  keywordFocus: string
}

export const heroSlides: HeroSlide[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1920&q=80',
    heading: 'Estetik ve Fonksiyonun Mükemmel Uyumu',
    subtitle: 'Yaşam alanlarınızı, kişiliğinizi yansıtan sanat eserlerine dönüştürüyoruz.',
    alt: 'Luxury minimalist living room interior design with modern furniture and elegant architecture',
    keywordFocus: 'Interior Design',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=80',
    heading: 'Sürdürülebilir ve Yenilikçi Mimari',
    subtitle: 'Doğayla bütünleşen, modern ve zamansız yapılar tasarlıyoruz.',
    alt: 'Modern sustainable villa architecture with innovative design and natural integration',
    keywordFocus: 'Architecture & Engineering',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1920&q=80',
    heading: 'Detaylarda Gizli Kusursuzluk',
    subtitle: 'Malzeme kalitesi ve ince işçilikle lüksü yeniden tanımlıyoruz.',
    alt: 'Premium marble texture and luxury materials with exquisite craftsmanship detail',
    keywordFocus: 'Luxury Application & Materials',
  },
]
