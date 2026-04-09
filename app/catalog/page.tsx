'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import CatalogItem from '@/components/CatalogItem'

const ASSET_IDS = [
  2955592471,
  4819740796,
  6893191715,
  11573370,
  1028606,
  19027209,
  4614495458,
  1029025,
  1365767,
  8330764038,
]

interface CatalogItemData {
  assetId: number
  name: string
  price: number | null
  creatorName: string
  thumbnailUrl: string | null
}

export default function CatalogPage() {
  const [items, setItems] = useState<CatalogItemData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchItems = async () => {
      const results = await Promise.allSettled(
        ASSET_IDS.map(async (assetId) => {
          const res = await fetch(`/api/roblox/catalog?assetId=${assetId}`)
          if (!res.ok) throw new Error('Failed')
          return res.json() as Promise<CatalogItemData>
        })
      )

      const loaded: CatalogItemData[] = results
        .filter((r): r is PromiseFulfilledResult<CatalogItemData> => r.status === 'fulfilled')
        .map((r) => r.value)

      setItems(loaded)
      setLoading(false)
    }

    fetchItems()
  }, [])

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-black mb-4">
            UGC{' '}
            <span className="bg-gradient-to-r from-neon-violet to-neon-pink bg-clip-text text-transparent">
              Catalog
            </span>
          </h1>
          <p className="text-gray-400 text-lg">
            Browse popular Roblox UGC items with live pricing data
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-2xl bg-white/5 animate-pulse border border-white/5"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item, index) => (
              <CatalogItem key={item.assetId} item={item} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
