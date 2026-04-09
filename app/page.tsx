'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import HeroSection from '@/components/HeroSection'
import GlassCard from '@/components/GlassCard'
import { Search, Grid, Users } from 'lucide-react'

const features = [
  {
    icon: <Search className="w-8 h-8 text-neon-blue" />,
    title: 'Profile Lookup',
    description: 'Search any Roblox user by username and instantly view their profile, avatar, and account details in a beautiful card.',
    href: '/profile',
    gradient: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    icon: <Grid className="w-8 h-8 text-neon-violet" />,
    title: 'UGC Catalog',
    description: 'Explore a curated collection of popular Roblox UGC items with live pricing data and creator information.',
    href: '/catalog',
    gradient: 'from-violet-500/20 to-purple-500/20',
  },
  {
    icon: <Users className="w-8 h-8 text-neon-pink" />,
    title: 'Community',
    description: 'Join the RBLX HUB community. Sign in to access exclusive features and connect with other Roblox enthusiasts.',
    href: '/login',
    gradient: 'from-pink-500/20 to-rose-500/20',
  },
]

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <HeroSection />

      <section className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Everything You Need in{' '}
              <span className="bg-gradient-to-r from-neon-blue to-neon-violet bg-clip-text text-transparent">
                One Place
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              RBLX HUB brings together the best Roblox tools and community features in a sleek, modern interface.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                <Link href={feature.href}>
                  <GlassCard className={`p-8 h-full cursor-pointer group bg-gradient-to-br ${feature.gradient} hover:border-white/20 transition-all duration-300`}>
                    <div className="mb-6 p-3 rounded-xl bg-white/5 w-fit group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                    <div className="mt-6 flex items-center gap-2 text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                      Explore →
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { value: '60M+', label: 'Daily Active Players' },
              { value: '40M+', label: 'UGC Items Available' },
              { value: '∞', label: 'Possibilities' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl font-black bg-gradient-to-r from-neon-blue via-neon-violet to-neon-pink bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
