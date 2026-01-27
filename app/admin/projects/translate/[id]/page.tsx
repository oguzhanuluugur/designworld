'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Save, ArrowLeft, Languages, Building2 } from 'lucide-react'
import Link from 'next/link'

export default function TranslateProjectPage() {
  const router = useRouter()
  const params = useParams()
  const sourceId = params.id as string

  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [sourceProject, setSourceProject] = useState<any>(null)
  const [targetLang, setTargetLang] = useState('en')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  })

  useEffect(() => {
    fetchSourceProject()
  }, [])

  const fetchSourceProject = async () => {
    try {
      const response = await fetch('/api/projects')
      const data = await response.json()
      if (data.success) {
        const project = data.projects.find((p: any) => p.id === sourceId)
        if (project) {
          setSourceProject(project)
        } else {
          alert('Kaynak proje bulunamadı!')
          router.push('/admin/dashboard')
        }
      }
    } catch (error) {
      console.error('Error fetching project:', error)
      alert('Proje yüklenirken bir hata oluştu!')
    } finally {
      setIsFetching(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          category: sourceProject.category,
          location: sourceProject.location,
          year: sourceProject.year,
          lang: targetLang,
          image: sourceProject.image,
          description: formData.description,
        }),
      })

      const result = await response.json()

      if (result.success) {
        alert(`Proje ${targetLang.toUpperCase()} diline çevrildi!`)
        router.push('/admin/dashboard')
      } else {
        alert('Hata: ' + (result.error || 'Bilinmeyen hata'))
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Proje çevrilirken bir hata oluştu!')
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (isFetching) {
    return (
      <div className="max-w-4xl">
        <div className="text-center py-20">
          <p className="text-gray-500">Proje yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (!sourceProject) {
    return null
  }

  const availableLanguages = [
    { code: 'en', name: 'English' },
    { code: 'ru', name: 'Русский' },
    { code: 'ar', name: 'العربية' },
    { code: 'fr', name: 'Français' },
    { code: 'tr', name: 'Türkçe' },
  ].filter(lang => lang.code !== sourceProject.lang)

  return (
    <div className="max-w-4xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Languages className="w-8 h-8 text-[#C5A059]" />
            Proje Çevir
          </h1>
          <p className="text-gray-600">
            Kaynak: <span className="font-semibold">{sourceProject.title}</span> ({sourceProject.lang.toUpperCase()})
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

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 className="text-sm font-semibold text-blue-900 mb-3 uppercase tracking-wide flex items-center gap-2">
          <Building2 className="w-4 h-4" />
          Kaynak Proje
        </h3>
        <div className="space-y-2 text-sm">
          <p><span className="font-semibold">Başlık:</span> {sourceProject.title}</p>
          <p><span className="font-semibold">Kategori:</span> {sourceProject.category}</p>
          <p><span className="font-semibold">Lokasyon:</span> {sourceProject.location}</p>
          <p><span className="font-semibold">Yıl:</span> {sourceProject.year}</p>
          <p><span className="font-semibold">Dil:</span> {sourceProject.lang.toUpperCase()}</p>
        </div>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 space-y-6"
      >
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
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
            Çevrilmiş Proje Adı *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/20 transition-all text-lg"
            placeholder={`"${sourceProject.title}" başlığını ${targetLang.toUpperCase()} diline çevirin...`}
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
            Çevrilmiş Açıklama *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={8}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/20 transition-all resize-none"
            placeholder="Açıklamayı çevirin..."
            required
          />
          <details className="mt-2">
            <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700">
              Orijinal Açıklama (Tıkla)
            </summary>
            <p className="mt-2 text-xs text-gray-600 bg-gray-50 p-3 rounded border border-gray-200 whitespace-pre-wrap">
              {sourceProject.description}
            </p>
          </details>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-sm text-amber-800">
            <strong>Not:</strong> Kategori, lokasyon, yıl ve görsel otomatik olarak orijinal projeden kopyalanacak.
          </p>
        </div>

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
