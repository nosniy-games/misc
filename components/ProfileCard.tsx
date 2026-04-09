'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import GlassCard from './GlassCard'
import { Calendar, User, ExternalLink } from 'lucide-react'

interface ProfileCardProps {
  user: {
    id: number
    name: string
    displayName: string
    description: string
    created: string
    avatarUrl: string | null
  }
}

export default function ProfileCard({ user }: ProfileCardProps) {
  const joinDate = new Date(user.created).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <GlassCard className="overflow-hidden">
      <div className="h-24 bg-gradient-to-r from-dark-purple via-neon-violet/20 to-neon-blue/20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 to-neon-violet/10" />
      </div>

      <div className="px-6 pb-6">
        <div className="flex items-end justify-between -mt-12 mb-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
            className="relative"
          >
            <div className="w-24 h-24 rounded-2xl border-4 border-dark-bg overflow-hidden bg-dark-card shadow-xl shadow-black/50">
              {user.avatarUrl ? (
                <Image
                  src={user.avatarUrl}
                  alt={`${user.name}'s avatar`}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-dark-purple">
                  <User className="w-10 h-10 text-gray-400" />
                </div>
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-400 border-2 border-dark-bg" />
          </motion.div>

          <a
            href={`https://www.roblox.com/users/${user.id}/profile`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-neon-blue/10 border border-neon-blue/20 text-neon-blue text-sm font-medium hover:bg-neon-blue/20 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View on Roblox
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-black text-white">{user.displayName}</h2>
          <p className="text-gray-400 text-sm font-medium mb-1">@{user.name}</p>
          <p className="text-xs text-gray-600 mb-4 flex items-center gap-1">
            <span className="text-gray-500">ID:</span>
            <span className="font-mono text-gray-400">{user.id}</span>
          </p>

          {user.description && (
            <div className="mb-4 p-4 rounded-xl bg-white/5 border border-white/5">
              <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap line-clamp-4">
                {user.description}
              </p>
            </div>
          )}

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Calendar className="w-3.5 h-3.5" />
            <span>Joined {joinDate}</span>
          </div>
        </motion.div>
      </div>
    </GlassCard>
  )
}
