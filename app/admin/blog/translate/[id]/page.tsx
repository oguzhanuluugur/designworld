'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Save, ArrowLeft, Languages } from 'lucide-react'
import Link from 'next/link'

export default function TranslateBlogPage() {
  const router = useRouter()
  const params = useParams()
  const sourceId = params.id as string

  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [sourceBlog, setSourceBlog] = useState<any>(null)
  const [targetLang, setTargetLang] = useState('en')
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
  })

  useEffect(() => {
    fetchSourceBlog()
  }, [])

  const fetchSourceBlog = async () => {
    try {
      const response = await fetch('/api/blog')
      const data = await response.json()
      if (data.success) {
        const blog = data.posts.find((p: any) => p.id === sourceId)
        if (blog) {
          setSourceBlog(blog)
        } else {
          alert('Kaynak blog bulunamadı!')
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
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          category: sourceBlog.category,
          lang: targetLang,
          image: sourceBlog.image,
          excerpt: formData.excerpt,
          content: formData.content,
        }),
      })

      const result = await response.json()

      if (result.success) {
        alert(`Blog ${targetLang.toUpperCase()} diline çevrildi!`)
        router.push('/admin/dashboard')
      } else {
        alert('Hata: ' + (result.error || 'Bilinmeyen hata'))
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Blog çevrilirken bir hata oluştu!')
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
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

  if (!sourceBlog) {
    return null
  }

  const availableLanguages = [
    { code: 'en', name: 'English' },
    { code: 'ru', name: 'Русский' },
    { code: 'ar', name: 'العربية' },
    { code: 'fr', name: 'Français' },
  ].filter(lang => lang.code !== sourceBlog.lang)

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Languages className="w-8 h-8 text-[#C5A059]" />
            Blog Çevir
          </h1>
          <p className="text-gray-600">
            Kaynak: <span className="font-semibold">{sourceBlog.title}</span> ({sourceBlog.lang.toUpperCase()})
          </p>
        </div>
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Geri Dön</span>
        </Link>
      </div>

      {/* Source Blog Preview */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 className="text-sm font-semibold text-blue-900 mb-3 uppercase tracking-wide">Kaynak Blog</h3>
        <div className="space-y-2 text-sm">
          <p><span className="font-semibold">Başlık:</span> {sourceBlog.title}</p>
          <p><span className="font-semibold">Kategori:</span> {sourceBlog.category}</p>
          <p><span className="font-semibold">Dil:</span> {sourceBlog.lang.toUpperCase()}</p>
          <p><span className="font-semibold">Özet:</span> {sourceBlog.excerpt}</p>
        </div>
      </div>

      {/* Translation Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 space-y-6"
      >
        {/* Target Language */}
        <div>
          <label htmlFor="targetLang" className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
            Hedef Dil *
          </label>
          <select
            id="targetLang"
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/20 transition-all text-lg"
            required
          >
            {availableLanguages.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.name} ({lang.code.toUpperCase()})
              </option>
            ))}
          </select>
          <p className="mt-2 text-xs text-gray-500">Bu blogun çevrileceği dili seçin</p>
        </div>

        {/* Translated Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
            Çevrilmiş Başlık *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/20 transition-all text-lg"
            placeholder={`"${sourceBlog.title}" başlığını ${targetLang.toUpperCase()} diline çevirin...`}
            required
          />
        </div>

        {/* Translated Excerpt */}
        <div>
          <label htmlFor="excerpt" className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
            Çevrilmiş Özet *
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/20 transition-all resize-none"
            placeholder="Özeti çevirin..."
            required
          />
          <details className="mt-2">
            <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700">
              Orijinal Özet (Tıkla)
            </summary>
            <p className="mt-2 text-xs text-gray-600 bg-gray-50 p-3 rounded border border-gray-200">
              {sourceBlog.excerpt}
            </p>
          </details>
        </div>

        {/* Translated Content */}
        <div>
          <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
            Çevrilmiş İçerik *
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={16}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/20 transition-all resize-none font-mono text-sm"
            placeholder="İçeriği çevirin... Paragraflar için boş satır bırakın."
            required
          />
          <details className="mt-2">
            <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700">
              Orijinal İçerik (Tıkla)
            </summary>
            <p className="mt-2 text-xs text-gray-600 bg-gray-50 p-3 rounded border border-gray-200 whitespace-pre-wrap">
              {sourceBlog.content}
            </p>
          </details>
        </div>

        {/* Info Box */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-sm text-amber-800">
            <strong>Not:</strong> Kategori ve görsel otomatik olarak orijinal blogdan kopyalanacak. 
            Sadece başlık, özet ve içeriği çevirmeniz yeterli.
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
            <span>{isLoading ? 'KAYDEDILIYOR...' : `${targetLang.toUpperCase()} ÇEVİRİSİNİ KAYDET`}</span>
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
