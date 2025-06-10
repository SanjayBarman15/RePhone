"use client"

import { motion } from "framer-motion"
import { Clock, X, ShoppingCart, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRecentlyViewed } from "@/contexts/RecentlyViewedContext"
import { useCart } from "@/contexts/CartContext"
import { useWishlist } from "@/contexts/WishlistContext"

interface RecentlyViewedProps {
  limit?: number
  showHeader?: boolean
  className?: string
}

export default function RecentlyViewed({ limit = 6, showHeader = true, className = "" }: RecentlyViewedProps) {
  const { recentlyViewedItems, clearRecentlyViewed } = useRecentlyViewed()
  const { addToCart } = useCart()
  const { addToWishlist, isInWishlist } = useWishlist()

  const displayItems = recentlyViewedItems.slice(0, limit)

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    })
  }

  const handleAddToWishlist = (item: any) => {
    if (!isInWishlist(item.id)) {
      addToWishlist({
        id: item.id,
        name: item.name,
        brand: item.brand,
        price: item.price,
        originalPrice: item.originalPrice,
        rating: item.rating,
        reviews: item.reviews,
        image: item.image,
        condition: item.condition,
        storage: item.storage,
        color: item.color,
        category: item.category,
      })
    }
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h ago`

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`

    return date.toLocaleDateString()
  }

  if (displayItems.length === 0) {
    return null
  }

  return (
    <section className={`py-8 ${className}`}>
      <div className="container-custom">
        {showHeader && (
          <motion.div
            className="flex items-center justify-between mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3">
              <Clock className="h-6 w-6 text-blue-900" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Recently Viewed</h2>
                <p className="text-gray-600">Continue where you left off</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={clearRecentlyViewed}>
              <X className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          </motion.div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {displayItems.map((item, index) => (
            <motion.div
              key={`${item.id}-${item.viewedAt.getTime()}`}
              className="bg-white rounded-xl p-4 card-shadow group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              <Link href={`/product/${item.id}`}>
                <div className="relative mb-3">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={200}
                    height={200}
                    className="w-full h-32 object-contain rounded-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                    {formatTimeAgo(item.viewedAt)}
                  </div>
                </div>
              </Link>

              <div className="space-y-2">
                <Link href={`/product/${item.id}`}>
                  <h3 className="font-semibold text-sm text-gray-900 group-hover:text-blue-900 transition-colors line-clamp-2">
                    {item.name}
                  </h3>
                </Link>

                <div className="flex items-center gap-1">
                  <span className="text-lg font-bold text-gray-900">${item.price}</span>
                  <span className="text-xs text-gray-500 line-through">${item.originalPrice}</span>
                </div>

                <div className="flex items-center gap-1">
                  <Button size="sm" onClick={() => handleAddToCart(item)} className="flex-1 h-8 text-xs bg-blue-900">
                    <ShoppingCart className="h-3 w-3 mr-1" />
                    Add
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleAddToWishlist(item)}
                    className="h-8 w-8 p-0"
                    disabled={isInWishlist(item.id)}
                  >
                    <Heart className={`h-3 w-3 ${isInWishlist(item.id) ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {recentlyViewedItems.length > limit && (
          <motion.div
            className="text-center mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/recently-viewed">
              <Button variant="outline">View All ({recentlyViewedItems.length})</Button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}
