"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Star, ThumbsUp, ThumbsDown, MessageCircle, Filter, ChevronDown } from "lucide-react"
import Image from "next/image"

// Mock reviews data
const mockReviews = [
  {
    id: "1",
    user: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    rating: 5,
    title: "Excellent condition, works perfectly!",
    content:
      "I was skeptical about buying a refurbished phone, but this iPhone 13 Pro exceeded my expectations. The condition is truly excellent - no scratches, perfect screen, and battery life is amazing. Delivery was fast and packaging was professional.",
    date: "2024-01-15",
    helpful: 24,
    notHelpful: 2,
    verified: true,
    pros: ["Perfect condition", "Fast delivery", "Great battery life"],
    cons: ["None"],
  },
  {
    id: "2",
    user: {
      name: "Mike Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    rating: 4,
    title: "Great value for money",
    content:
      "Very happy with this purchase. The phone looks and feels like new. Camera quality is outstanding and performance is smooth. Only minor issue is a tiny scuff on the back that's barely noticeable.",
    date: "2024-01-10",
    helpful: 18,
    notHelpful: 1,
    verified: true,
    pros: ["Excellent camera", "Smooth performance", "Good price"],
    cons: ["Minor cosmetic wear"],
  },
  {
    id: "3",
    user: {
      name: "Emily Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
    },
    rating: 5,
    title: "Better than expected!",
    content:
      "This is my second refurbished phone from RePhone and I'm impressed again. The quality control is excellent. Phone came with 98% battery health and all accessories. Highly recommend!",
    date: "2024-01-08",
    helpful: 15,
    notHelpful: 0,
    verified: true,
    pros: ["High battery health", "Complete accessories", "Quality control"],
    cons: [],
  },
  {
    id: "4",
    user: {
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    rating: 4,
    title: "Solid phone, minor issues",
    content:
      "Overall satisfied with the purchase. Phone works great and looks good. Had some initial setup issues but customer service was helpful. Would buy again.",
    date: "2024-01-05",
    helpful: 12,
    notHelpful: 3,
    verified: true,
    pros: ["Good performance", "Helpful customer service"],
    cons: ["Initial setup issues"],
  },
]

interface ProductReviewsProps {
  productId: string
  rating: number
}

export default function ProductReviews({ productId, rating }: ProductReviewsProps) {
  const [sortBy, setSortBy] = useState("newest")
  const [filterRating, setFilterRating] = useState("all")
  const [showWriteReview, setShowWriteReview] = useState(false)

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "highest", label: "Highest Rating" },
    { value: "lowest", label: "Lowest Rating" },
    { value: "helpful", label: "Most Helpful" },
  ]

  const ratingDistribution = [
    { stars: 5, count: 78, percentage: 63 },
    { stars: 4, count: 32, percentage: 26 },
    { stars: 3, count: 8, percentage: 6 },
    { stars: 2, count: 4, percentage: 3 },
    { stars: 1, count: 2, percentage: 2 },
  ]

  const totalReviews = ratingDistribution.reduce((sum, item) => sum + item.count, 0)

  return (
    <div className="space-y-8">
      {/* Reviews Summary */}
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h3>
          <div className="flex items-center gap-4 mb-6">
            <div className="text-5xl font-bold text-gray-900">{rating}</div>
            <div>
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-600">Based on {totalReviews} reviews</p>
            </div>
          </div>

          <button onClick={() => setShowWriteReview(true)} className="btn-primary w-full md:w-auto">
            Write a Review
          </button>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Rating Distribution</h4>
          <div className="space-y-3">
            {ratingDistribution.map((item) => (
              <div key={item.stars} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-16">
                  <span className="text-sm text-gray-600">{item.stars}</span>
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-8">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50 p-4 rounded-xl">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Filter by rating:</span>
          </div>
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="all">All ratings</option>
            <option value="5">5 stars</option>
            <option value="4">4 stars</option>
            <option value="3">3 stars</option>
            <option value="2">2 stars</option>
            <option value="1">1 star</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Sort by:</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none border border-gray-200 rounded-lg px-3 py-1 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {mockReviews.map((review, index) => (
          <motion.div
            key={review.id}
            className="bg-white border border-gray-200 rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            {/* Review Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <Image
                  src={review.user.avatar || "/placeholder.svg"}
                  alt={review.user.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">{review.user.name}</span>
                    {review.verified && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Review Content */}
            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
              <p className="text-gray-700 leading-relaxed">{review.content}</p>
            </div>

            {/* Pros and Cons */}
            {(review.pros.length > 0 || review.cons.length > 0) && (
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                {review.pros.length > 0 && (
                  <div>
                    <h5 className="font-medium text-green-800 mb-2">Pros:</h5>
                    <ul className="space-y-1">
                      {review.pros.map((pro, idx) => (
                        <li key={idx} className="text-sm text-green-700 flex items-center gap-2">
                          <div className="w-1 h-1 bg-green-600 rounded-full"></div>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {review.cons.length > 0 && (
                  <div>
                    <h5 className="font-medium text-red-800 mb-2">Cons:</h5>
                    <ul className="space-y-1">
                      {review.cons.map((con, idx) => (
                        <li key={idx} className="text-sm text-red-700 flex items-center gap-2">
                          <div className="w-1 h-1 bg-red-600 rounded-full"></div>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Review Actions */}
            <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
              <span className="text-sm text-gray-600">Was this helpful?</span>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-green-600 transition-colors">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{review.helpful}</span>
                </button>
                <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-600 transition-colors">
                  <ThumbsDown className="h-4 w-4" />
                  <span>{review.notHelpful}</span>
                </button>
              </div>
              <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 transition-colors ml-auto">
                <MessageCircle className="h-4 w-4" />
                Reply
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load More Reviews */}
      <div className="text-center">
        <button className="btn-secondary">Load More Reviews</button>
      </div>
    </div>
  )
}
