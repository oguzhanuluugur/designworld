'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FileText, Eye, TrendingUp, Users, Plus, Edit2, Trash2, Languages, Building2 } from 'lucide-react'
import Link from 'next/link'

interface Post {
  id: string
  title: string
  category: string
  lang: string
  excerpt: string
  date: string
  views: number
  image: string
}

interface Project {
  id: string
  title: string
  category: string
  lang: string
  location: string
  year: string
  image: string
  description: string
  createdAt: string
}

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
    fetchProjects()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blog')
      const data = await response.json()
      if (data.success) {
        setPosts(data.posts)
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects')
      const data = await response.json()
      if (data.success) {
        setProjects(data.projects)
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Bu blog yazısını silmek istediğinize emin misiniz?')) {
      return
    }

    try {
      const response = await fetch('/api/blog', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      })

      const result = await response.json()

      if (result.success) {
        alert('Blog başarıyla silindi!')
        fetchPosts()
      } else {
        alert('Hata: ' + (result.error || 'Bilinmeyen hata'))
      }
    } catch (error) {
      console.error('Error deleting post:', error)
      alert('Blog silinirken bir hata oluştu!')
    }
  }

  const handleDeleteProject = async (id: string) => {
    if (!window.confirm('Bu projeyi silmek istediğinize emin misiniz?')) {
      return
    }

    try {
      const response = await fetch('/api/projects', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      })

      const result = await response.json()

      if (result.success) {
        alert('Proje başarıyla silindi!')
        fetchProjects()
      } else {
        alert('Hata: ' + (result.error || 'Bilinmeyen hata'))
      }
    } catch (error) {
      console.error('Error deleting project:', error)
      alert('Proje silinirken bir hata oluştu!')
    }
  }

  const totalViews = posts.reduce((sum, post) => sum + post.views, 0)
  const thisMonth = posts.filter(post => {
    const postDate = new Date(post.date)
    const now = new Date()
    return postDate.getMonth() === now.getMonth() && postDate.getFullYear() === now.getFullYear()
  }).length

  const stats = [
    {
      icon: FileText,
      label: 'Toplam Blog',
      value: posts.length.toString(),
      color: 'bg-blue-500',
      textColor: 'text-blue-500',
    },
    {
      icon: Building2,
      label: 'Toplam Proje',
      value: projects.length.toString(),
      color: 'bg-purple-500',
      textColor: 'text-purple-500',
    },
    {
      icon: Eye,
      label: 'Toplam Görüntülenme',
      value: totalViews.toString(),
      color: 'bg-green-500',
      textColor: 'text-green-500',
    },
    {
      icon: TrendingUp,
      label: 'Bu Ay',
      value: thisMonth.toString(),
      color: 'bg-orange-500',
      textColor: 'text-orange-500',
    },
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Yönetim Paneli</h1>
        <p className="text-gray-600">Design World admin dashboard'una hoş geldiniz</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.label}</h3>
              <p className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</p>
            </motion.div>
          )
        })}
      </div>

      {/* Blog Management Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Blog Yönetimi</h2>
          <Link
            href="/admin/blog/new"
            className="flex items-center gap-2 bg-[#C5A059] text-white px-4 py-2 rounded-lg hover:bg-[#B39149] transition-colors text-sm font-semibold"
          >
            <Plus className="w-4 h-4" />
            Yeni Ekle
          </Link>
        </div>

        {isLoading ? (
          <div className="text-center py-12 text-gray-500">
            <p>Yükleniyor...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>Henüz blog yazısı bulunmuyor</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Görsel
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Başlık
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Dil
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Kategori
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Tarih
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {posts.map((post) => (
                  <motion.tr
                    key={post.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="relative w-16 h-16 rounded overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900 line-clamp-2">{post.title}</p>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-1">{post.excerpt}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold uppercase">
                        {post.lang}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{post.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600">
                        {new Date(post.date).toLocaleDateString('tr-TR')}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/blog/edit/${post.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="Düzenle"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/blog/translate/${post.id}`}
                          className="p-2 text-green-600 hover:bg-green-50 rounded transition-colors"
                          title="Çevir"
                        >
                          <Languages className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Sil"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Project Management Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mt-8"
      >
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Proje Yönetimi</h2>
          <Link
            href="/admin/projects/new"
            className="flex items-center gap-2 bg-[#C5A059] text-white px-4 py-2 rounded-lg hover:bg-[#B39149] transition-colors text-sm font-semibold"
          >
            <Plus className="w-4 h-4" />
            Yeni Ekle
          </Link>
        </div>

        {isLoading ? (
          <div className="text-center py-12 text-gray-500">
            <p>Yükleniyor...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Building2 className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>Henüz proje bulunmuyor</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Görsel
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Proje Adı
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Kategori
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Lokasyon
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Yıl
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Dil
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {projects.map((project) => (
                  <motion.tr
                    key={project.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="relative w-16 h-16 rounded overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">{project.title}</p>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-1">{project.description}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{project.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{project.location}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{project.year}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-semibold uppercase">
                        {project.lang}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/projects/edit/${project.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="Düzenle"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/projects/translate/${project.id}`}
                          className="p-2 text-green-600 hover:bg-green-50 rounded transition-colors"
                          title="Çevir"
                        >
                          <Languages className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Sil"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Quick Actions */}
      {posts.length === 0 && projects.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 bg-gradient-to-r from-[#C5A059] to-[#B39149] rounded-lg p-6 text-white"
        >
          <h2 className="text-xl font-semibold mb-2">Hızlı Başlangıç</h2>
          <p className="mb-4 opacity-90">Yeni bir blog yazısı ekleyerek başlayın</p>
          <Link
            href="/admin/blog/new"
            className="inline-flex items-center gap-2 bg-white text-[#C5A059] px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Blog Ekle
          </Link>
        </motion.div>
      )}
    </div>
  )
}
