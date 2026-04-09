'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import GlassCard from './GlassCard'

interface CatalogItemProps {
  item: {
    assetId: number
    name: string
    price: number | null
    creatorName: string
    thumbnailUrl: string | null
  }
  index: number
}

export default function CatalogItem({ item, index }: CatalogItemProps) {
  const handleClick = () => {
    window.open(`https://www.roblox.com/catalog/${item.assetId}/`, '_blank', 'noopener,noreferrer')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ scale: 1.03, y: -4 }}
      onClick={handleClick}
      className="cursor-pointer group"
    >
      <GlassCard className="overflow-hidden hover:border-neon-violet/30 transition-all duration-300 hover:shadow-lg hover:shadow-neon-violet/10">
        <div className="relative aspect-square bg-gradient-to-br from-dark-purple to-dark-card overflow-hidden">
          {item.thumbnailUrl ? (
            <Image
              src={item.thumbnailUrl}
              alt={item.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-4xl text-gray-600">
              🎮
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-neon-violet/5" />
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-white text-sm leading-tight line-clamp-2 mb-1 group-hover:text-neon-blue transition-colors">
            {item.name}
          </h3>
          <p className="text-xs text-gray-500 mb-3 truncate">by {item.creatorName}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-neon-violet">
              {item.price !== null ? `R$ ${item.price.toLocaleString()}` : 'Free'}
            </span>
            <span className="text-xs text-gray-500 group-hover:text-neon-blue transition-colors">
              View →
            </span>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}
