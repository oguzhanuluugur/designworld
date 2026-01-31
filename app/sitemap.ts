import { MetadataRoute } from 'next'

const baseUrl = 'https://designworld.com'
const locales = ['tr', 'en', 'ru', 'ar', 'fr']

interface BlogPost {
  id: string
  title: string
  lang: string
  date: string
}

interface Project {
  id: string
  title: string
  lang: string
}

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const fs = require('fs')
    const path = require('path')
    const postsPath = path.join(process.cwd(), 'data', 'posts.json')
    
    if (fs.existsSync(postsPath)) {
      const fileContents = fs.readFileSync(postsPath, 'utf8')
      const posts = JSON.parse(fileContents)
      return Array.isArray(posts) ? posts : []
    }
    return []
  } catch (error) {
    console.error('Error reading blog posts:', error)
    return []
  }
}

async function getProjects(): Promise<Project[]> {
  try {
    const fs = require('fs')
    const path = require('path')
    const projectsPath = path.join(process.cwd(), 'data', 'projects.json')
    
    if (fs.existsSync(projectsPath)) {
      const fileContents = fs.readFileSync(projectsPath, 'utf8')
      const projects = JSON.parse(fileContents)
      return Array.isArray(projects) ? projects : []
    }
    return []
  } catch (error) {
    console.error('Error reading projects:', error)
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await getBlogPosts()
  const projects = await getProjects()

  // Static routes for each locale
  const staticRoutes = [
    '',
    '/insights',
  ]

  const routes: MetadataRoute.Sitemap = []

  // Add static routes for each locale
  for (const locale of locales) {
    for (const route of staticRoutes) {
      routes.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1 : 0.8,
      })
    }
  }

  // Add dynamic blog post routes
  for (const post of blogPosts) {
    // Create slug from title (simple version)
    const slug = post.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    
    routes.push({
      url: `${baseUrl}/${post.lang}/insights/${slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  }

  // Add dynamic project routes (if you have project detail pages)
  // Uncomment if you create project detail pages
  // for (const project of projects) {
  //   const slug = project.title
  //     .toLowerCase()
  //     .replace(/[^a-z0-9]+/g, '-')
  //     .replace(/(^-|-$)/g, '')
  //   
  //   routes.push({
  //     url: `${baseUrl}/${project.lang}/projects/${slug}`,
  //     lastModified: new Date(),
  //     changeFrequency: 'monthly',
  //     priority: 0.6,
  //   })
  // }

  return routes
}
