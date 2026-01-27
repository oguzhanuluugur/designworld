'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Save, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function EditBlogPage() {
  const router = useRouter()
  const params = useParams()
  const blogId = params.id as string

  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [formData, setFormData] = useState({
    title: '',
    lang: 'tr',
    category: 'GREEN BUILDING',
    image: '',
    excerpt: '',
    content: '',
  })

  useEffect(() => {
    fetchBlog()
  }, [])

  const fetchBlog = async () => {
    try {
      const response = await fetch('/api/blog')
      const data = await response.json()
      if (data.success) {
        const blog = data.posts.find((p: any) => p.id === blogId)
        if (blog) {
          setFormData({
            title: blog.title,
            lang: blog.lang,
            category: blog.category,
            image: blog.image,
            excerpt: blog.excerpt,
            content: blog.content,
          })
          setImagePreview(blog.image)
        } else {
          alert('Blog bulunamadı!')
          router.push('/admin/dashboard')
        }
      }
    } catch (error) {
      console.error('Error fetching blog:', error)
      alert('Blog yüklenirken bir hata oluştu!')
    } finally {
      setIsFetching(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      let imageUrl = formData.image

      // If user uploaded a new image file, upload it first
      if (imageFile) {
        try {
          imageUrl = await uploadImage(imageFile)
        } catch (error) {
          alert('Görsel yüklenirken bir hata oluştu!')
          setIsLoading(false)
          return
        }
      }

      const response = await fetch('/api/blog', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: blogId,
          ...formData,
          image: imageUrl,
        }),
      })

      const result = await response.json()

      if (result.success) {
        alert('Blog başarıyla güncellendi!')
        router.push('/admin/dashboard')
      } else {
        alert('Hata: ' + (result.error || 'Bilinmeyen hata'))
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Blog güncellenirken bir hata oluştu!')
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()
      if (result.success) {
        return result.url
      } else {
        throw new Error(result.error || 'Upload failed')
      }
    } catch (error) {
      console.error('Upload error:', error)
      throw error
    }
  }

  if (isFetching) {
    return (
      <div className="max-w-4xl">
        <div className="text-center py-20">
          <p className="text-gray-500">Blog yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog Düzenle</h1>
          <p className="text-gray-600">Değişiklikleri yaptıktan sonra kaydedin</p>
        </div>
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Geri Dön</span>
        </Link>
      </div>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 space-y-6"
      >
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
            Başlık *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/20 transition-all text-lg"
            placeholder="Blog başlığını girin..."
            required
          />
        </div>

        {/* Language & Category Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Language */}
          <div>
            <label htmlFor="lang" className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
              Dil *
            </label>
            <select
              id="lang"
              name="lang"
              value={formData.lang}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/20 transition-all"
              required
            >
              <option value="tr">Türkçe (TR)</option>
              <option value="en">English (EN)</option>
              <option value="ru">Русский (RU)</option>
              <option value="ar">العربية (AR)</option>
              <option value="fr">Français (FR)</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
              Kategori *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/20 transition-all"
              required
            >
              <option value="GREEN BUILDING">Green Building</option>
              <option value="WORKPLACE">Workplace</option>
              <option value="TECHNOLOGY">Technology</option>
            </select>
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="imageFile" className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
            Görsel Değiştir (Opsiyonel)
          </label>
          <div className="space-y-4">
            <input
              type="file"
              id="imageFile"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/20 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#C5A059] file:text-white hover:file:bg-[#B39149] file:cursor-pointer"
            />
            {imagePreview && (
              <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-300">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                {imageFile && (
                  <button
                    type="button"
                    onClick={() => {
                      setImageFile(null)
                      setImagePreview(formData.image)
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>
            )}
          </div>
          <p className="mt-2 text-xs text-gray-500">Yeni görsel yüklemek için dosya seçin. Boş bırakılırsa mevcut görsel korunur.</p>
        </div>

        {/* Excerpt */}
        <div>
          <label htmlFor="excerpt" className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
            Özet *
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/20 transition-all resize-none"
            placeholder="Kısa bir özet yazın (2-3 cümle)..."
            required
          />
        </div>

        {/* Content */}
        <div>
          <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
            İçerik *
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={16}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/20 transition-all resize-none font-mono text-sm"
            placeholder="Blog içeriğini yazın... Paragraflar için boş satır bırakın."
            required
          />
          <p className="mt-2 text-xs text-gray-500">
            İpucu: Paragraflar arasında boş satır bırakın. İçerik otomatik olarak paragraflara bölünecek.
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex items-center gap-4 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-[#C5A059] text-black font-bold py-3 px-6 rounded-lg hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            <span>{isLoading ? 'KAYDEDILIYOR...' : 'DEĞİŞİKLİKLERİ KAYDET'}</span>
          </button>
          <Link
            href="/admin/dashboard"
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-semibold"
          >
            İptal
          </Link>
        </div>
      </motion.form>
    </div>
  )
}
