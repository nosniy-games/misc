'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProfileCard from '@/components/ProfileCard'
import GlassCard from '@/components/GlassCard'
import { Search, Loader2 } from 'lucide-react'

interface UserData {
  id: number
  name: string
  displayName: string
  description: string
  created: string
  avatarUrl: string | null
}

export default function ProfilePage() {
  const [username, setUsername] = useState('')
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username.trim()) return

    setLoading(true)
    setError(null)
    setUserData(null)

    try {
      const res = await fetch(`/api/roblox/user?username=${encodeURIComponent(username.trim())}`)
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'User not found')
      } else {
        setUserData(data)
      }
    } catch {
      setError('Failed to fetch user data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-black mb-4">
            Profile{' '}
            <span className="bg-gradient-to-r from-neon-blue to-neon-violet bg-clip-text text-transparent">
              Lookup
            </span>
          </h1>
          <p className="text-gray-400 text-lg">
            Search any Roblox username to view their profile
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <form onSubmit={handleSearch} className="flex gap-3 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter Roblox username..."
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue/50 focus:ring-1 focus:ring-neon-blue/30 transition-all backdrop-blur-sm"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !username.trim()}
              className="px-6 py-4 bg-gradient-to-r from-neon-blue to-neon-violet rounded-xl font-semibold text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Search'}
            </button>
          </form>
        </motion.div>

        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-16 gap-4"
            >
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-2 border-neon-blue/30 animate-spin border-t-neon-blue" />
              </div>
              <p className="text-gray-400">Looking up profile...</p>
            </motion.div>
          )}

          {error && !loading && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <GlassCard className="p-6 border-neon-pink/30 bg-neon-pink/5">
                <p className="text-neon-pink text-center font-medium">⚠ {error}</p>
              </GlassCard>
            </motion.div>
          )}

          {userData && !loading && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ProfileCard user={userData} />
            </motion.div>
          )}
        </AnimatePresence>

        {!loading && !userData && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-16"
          >
            <div className="text-8xl mb-4">🔍</div>
            <p className="text-gray-500">Enter a username to get started</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
