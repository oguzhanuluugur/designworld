'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // Hardcoded credential check
    if (username === 'admin' && password === '123456') {
      // Set cookie
      document.cookie = 'admin_token=authenticated; path=/; max-age=86400' // 24 hours
      
      // Redirect to dashboard
      router.push('/admin/dashboard')
    } else {
      setError('Kullanıcı adı veya şifre hatalı!')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F0F0F] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <div className="w-14 h-14 bg-[#C5A059] flex items-center justify-center shadow-lg shadow-[#C5A059]/20">
              <span className="text-white font-serif text-3xl font-bold">DW</span>
            </div>
            <div className="text-left">
              <span className="text-2xl font-serif font-semibold text-white block">Design World</span>
              <span className="text-[#C5A059] text-xs tracking-[0.2em] uppercase">Admin Panel</span>
            </div>
          </motion.div>
          <h1 className="font-serif text-3xl text-[#C5A059] mb-2">Yönetim Paneli</h1>
          <p className="text-gray-500 text-sm">Lütfen giriş yapın</p>
        </div>

        {/* Login Card - Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-white/5 backdrop-blur-md rounded-lg p-8 shadow-2xl border border-[#C5A059]/30"
        >

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-xs font-medium text-gray-400 mb-3 uppercase tracking-widest">
                Kullanıcı Adı
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded text-white placeholder-gray-600 focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-all"
                placeholder="admin"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-xs font-medium text-gray-400 mb-3 uppercase tracking-widest">
                Şifre
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded text-white placeholder-gray-600 focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-all"
                placeholder="••••••"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#C5A059] text-black font-bold py-3 rounded hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#C5A059]/20 hover:shadow-xl hover:shadow-[#C5A059]/30"
            >
              {isLoading ? 'GİRİŞ YAPILIYOR...' : 'GİRİŞ YAP'}
            </button>
          </form>

          {/* Helper Text */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-xs text-gray-500 mb-1">Demo Credentials</p>
            <p className="text-sm text-gray-400 font-mono">
              <span className="text-[#C5A059]">admin</span> / <span className="text-[#C5A059]">123456</span>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
