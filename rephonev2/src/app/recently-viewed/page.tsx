"use client"

import { motion } from "framer-motion"
import { Clock, ShoppingCart, Heart, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRecentlyViewed } from "@/contexts/RecentlyViewedContext"
import { useCart } from "@/contexts/CartContext"
import { useWishlist } from "@/contexts/WishlistContext"

export default function RecentlyViewedPage() {
  const { recentlyViewedItems, clearRecentlyViewed } = useRecentlyViewed()
  const { addToCart } = useCart()
  const { addToWishlist, isInWishlist } = useWishlist()

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
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours} hours ago`

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays} days ago`

    return date.toLocaleDateString()
  }

  if (recentlyViewedItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-6">
        <div className="container-custom">
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
              <Clock className="h-12 w-12 text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">No recently viewed items</h1>
            <p className="text-gray-600 mb-8">Start browsing products to see your viewing history here</p>
            <Link href="/categories">
              <Button className="btn-primary">Start Shopping</Button>
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-6">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-blue-900" />
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Recently Viewed</h1>
                <p className="text-gray-600">
                  {recentlyViewedItems.length} item{recentlyViewedItems.length !== 1 ? "s" : ""} in your history
                </p>
              </div>
            </div>

            <Button onClick={clearRecentlyViewed} variant="outline" className="text-red-600 hover:text-red-700">
              <Trash2 className="h-4 w-4 mr-2" />
              Clear History
            </Button>
          </div>
        </motion.div>

        {/* Recently Viewed Items */}
        <div className="grid gap-6">
          {recentlyViewedItems.map((item, index) => (
            <motion.div
              key={`${item.id}-${item.viewedAt.getTime()}`}
              className="bg-white rounded-2xl p-6 card-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Product Image */}
                <div className="flex-shrink-0">
                  <Link href={`/product/${item.id}`}>
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={200}
                      height={200}
                      className="w-full md:w-48 h-48 object-contain rounded-xl hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                </div>

                {/* Product Info */}
                <div className="flex-1 space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{item.brand}</Badge>
                      <Badge
                        variant="outline"
                        className={
                          item.condition === "Excellent"
                            ? "border-green-200 text-green-800"
                            : item.condition === "Very Good"
                              ? "border-blue-200 text-blue-800"
                              : "border-yellow-200 text-yellow-800"
                        }
                      >
                        {item.condition}
                      </Badge>
                      <Badge variant="outline" className="border-gray-200 text-gray-600">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatTimeAgo(item.viewedAt)}
                      </Badge>
                    </div>
                    <Link href={`/product/${item.id}`}>
                      <h3 className="text-xl font-bold text-gray-900 hover:text-blue-900 transition-colors">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-gray-600">
                      {item.storage} • {item.color}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(item.rating) ? "bg-yellow-400" : "bg-gray-200"
                          } rounded-sm mr-1`}
                        />
                      ))}
                      <span className="text-sm font-medium text-gray-700 ml-1">{item.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({item.reviews} reviews)</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-gray-900">${item.price}</span>
                    <span className="text-lg text-gray-500 line-through">${item.originalPrice}</span>
                    <Badge className="bg-red-100 text-red-800">
                      {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                    </Badge>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3">
                    <Button onClick={() => handleAddToCart(item)} className="flex items-center gap-2">
                      <ShoppingCart className="h-4 w-4" />
                      Add to Cart
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => handleAddToWishlist(item)}
                      disabled={isInWishlist(item.id)}
                      className={`flex items-center gap-2 ${
                        isInWishlist(item.id) ? "text-red-600 border-red-200" : ""
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${isInWishlist(item.id) ? "fill-current" : ""}`} />
                      {isInWishlist(item.id) ? "In Wishlist" : "Add to Wishlist"}
                    </Button>

                    <Link href={`/product/${item.id}`}>
                      <Button variant="ghost">View Details</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recommendations */}
        <motion.div
          className="mt-16 pt-8 border-t border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Continue Shopping</h2>
          <p className="text-gray-600 mb-8">Discover more products you might like</p>

          <div className="text-center">
            <Link href="/categories">
              <Button variant="outline">Browse All Products</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
