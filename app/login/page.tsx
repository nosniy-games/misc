'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GlassCard from '@/components/GlassCard'
import { Eye, EyeOff, LogIn, CheckCircle, AlertCircle } from 'lucide-react'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [error, setError] = useState('')
  const [storedUser, setStoredUser] = useState<string | null>(null)

  useEffect(() => {
    const user = localStorage.getItem('rblxhub_user')
    setStoredUser(user)
    if (user) setLoggedIn(true)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!username.trim() || !password.trim()) {
      setError('Please fill in all fields.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))

    localStorage.setItem('rblxhub_user', username.trim())
    setStoredUser(username.trim())
    setLoggedIn(true)
    setLoading(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('rblxhub_user')
    setStoredUser(null)
    setLoggedIn(false)
    setUsername('')
    setPassword('')
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 flex items-start justify-center">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-5xl font-black mb-4">
            {loggedIn ? 'Welcome' : 'Sign'}{' '}
            <span className="bg-gradient-to-r from-neon-pink to-neon-violet bg-clip-text text-transparent">
              {loggedIn ? 'Back' : 'In'}
            </span>
          </h1>
          <p className="text-gray-400">
            {loggedIn ? `You're signed in as ${storedUser}` : 'Access your RBLX HUB account'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 flex items-center gap-2 p-3 rounded-xl bg-neon-blue/10 border border-neon-blue/20 text-sm text-neon-blue"
        >
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>
            <strong>Demo Mode:</strong> This is a simulated login. No real authentication is performed.
          </span>
        </motion.div>

        <AnimatePresence mode="wait">
          {loggedIn ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <GlassCard className="p-8 text-center border-green-500/20 bg-green-500/5">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                  className="flex justify-center mb-4"
                >
                  <CheckCircle className="w-16 h-16 text-green-400" />
                </motion.div>
                <h2 className="text-2xl font-bold text-white mb-2">Successfully Signed In!</h2>
                <p className="text-gray-400 mb-2">
                  Welcome back,{' '}
                  <span className="text-neon-blue font-semibold">{storedUser}</span>!
                </p>
                <p className="text-gray-500 text-sm mb-8">
                  Your session is stored in your browser&apos;s local storage.
                </p>
                <button
                  onClick={handleLogout}
                  className="w-full py-3 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 hover:text-white transition-all"
                >
                  Sign Out
                </button>
              </GlassCard>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <GlassCard className="p-8">
                <form onSubmit={handleLogin} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Your username"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-neon-violet/50 focus:ring-1 focus:ring-neon-violet/30 transition-all"
                      autoComplete="username"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-neon-violet/50 focus:ring-1 focus:ring-neon-violet/30 transition-all"
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <AnimatePresence>
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-neon-pink text-sm"
                      >
                        {error}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-neon-pink to-neon-violet rounded-xl font-semibold text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        <LogIn className="w-5 h-5" />
                        Sign In
                      </>
                    )}
                  </button>
                </form>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
