import { MetadataRoute } from 'next'

const baseUrl = 'https://designworld.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api', '/studio'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
