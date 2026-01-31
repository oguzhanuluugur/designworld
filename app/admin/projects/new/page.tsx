'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Save, ArrowLeft, Building2 } from 'lucide-react'
import Link from 'next/link'

export default function NewProjectPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [formData, setFormData] = useState({
    title: '',
    category: 'Residential',
    location: '',
    year: new Date().getFullYear().toString(),
    lang: 'tr',
    image: '',
    description: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      let imageUrl = formData.image

      // If user uploaded an image file, upload it first
      if (imageFile) {
        try {
          imageUrl = await uploadImage(imageFile)
        } catch (error) {
          alert('Görsel yüklenirken bir hata oluştu!')
          setIsLoading(false)
          return
        }
      }

      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          image: imageUrl,
        }),
      })

      const result = await response.json()

      if (result.success) {
        alert('Proje başarıyla eklendi!')
        router.push('/admin/dashboard')
      } else {
        alert('Hata: ' + (result.error || 'Bilinmeyen hata'))
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Proje eklenirken bir hata oluştu!')
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

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Building2 className="w-8 h-8 text-[#C5A059]" />
            Yeni Proje Ekle
          </h1>
          <p className="text-gray-600">Portfolio&apos;ya yeni bir mimari proje ekleyin</p>
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
            Proje Adı *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/20 transition-all text-lg"
            placeholder="Örn: Vadi İstanbul Penthouse"
            required
          />
        </div>

        {/* Category, Location, Year Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Architecture">Architecture</option>
              <option value="Hospitality">Hospitality</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
              Lokasyon *
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/20 transition-all"
              placeholder="İstanbul, Türkiye"
              required
            />
          </div>

          {/* Year */}
          <div>
            <label htmlFor="year" className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
              Yıl *
            </label>
            <input
              type="text"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/20 transition-all"
              placeholder="2026"
              required
            />
          </div>
        </div>

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

        {/* Image Upload */}
        <div>
          <label htmlFor="imageFile" className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
            Proje Görseli (Opsiyonel)
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
                <button
                  type="button"
                  onClick={() => {
                    setImageFile(null)
                    setImagePreview('')
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
          <p className="mt-2 text-xs text-gray-500">Proje görseli yükleyin. Boş bırakılırsa varsayılan görsel kullanılır.</p>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
            Proje Açıklaması *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={8}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/20 transition-all resize-none"
            placeholder="Projenin detaylı açıklamasını yazın..."
            required
          />
          <p className="mt-2 text-xs text-gray-500">
            Projenin özelliklerini, kullanılan malzemeleri ve tasarım konseptini detaylandırın.
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
            <span>{isLoading ? 'KAYDEDILIYOR...' : 'PROJEYİ KAYDET'}</span>
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
