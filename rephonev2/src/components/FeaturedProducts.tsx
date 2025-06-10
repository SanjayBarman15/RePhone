"use client"

import { motion } from "framer-motion"
import { Star, Heart, ShoppingCart } from "lucide-react"
import Image from "next/image"
import { useCart } from "@/contexts/CartContext"
import { useWishlist } from "@/contexts/WishlistContext"
import Link from "next/link"

const featuredProducts = [
  {
    id: "1",
    name: "iPhone 13 Pro",
    brand: "Apple",
    price: 699,
    originalPrice: 999,
    rating: 4.8,
    reviews: 124,
    image:  "/images/phone/i14promax.jpg",
    condition: "Excellent",
    storage: "128GB",
    color: "Graphite",
  },
  {
    id: "2",
    name: "Galaxy S22 Ultra",
    brand: "Samsung",
    price: 599,
    originalPrice: 899,
    rating: 4.7,
    reviews: 89,
    image: "/images/phone/s23ultra.jpg",
    condition: "Very Good",
    storage: "256GB",
    color: "Phantom Black",
  },
  {
    id: "3",
    name: "Pixel 7 Pro",
    brand: "Google",
    price: 449,
    originalPrice: 699,
    rating: 4.6,
    reviews: 67,
    image:  "/images/phone/pixel7pro.jpg",
    condition: "Excellent",
    storage: "128GB",
    color: "Snow",
  },
  {
    id: "4",
    name: "OnePlus 10 Pro",
    brand: "OnePlus",
    price: 399,
    originalPrice: 599,
    rating: 4.5,
    reviews: 45,
    image:  "/images/phone/i14promax2.jpg",
    condition: "Good",
    storage: "256GB",
    color: "Volcanic Black",
  },
]

export default function FeaturedProducts() {
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const handleAddToCart = (product: (typeof featuredProducts)[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  }

  const handleToggleWishlist = (product: (typeof featuredProducts)[0]) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        originalPrice: product.originalPrice,
        rating: product.rating,
        reviews: product.reviews,
        image: product.image,
        condition: product.condition,
        storage: product.storage,
        color: product.color,
      })
    }
  }

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container-custom">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured <span className="text-blue-900">Products</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hand-picked premium refurbished smartphones with the best value
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-4 card-shadow group cursor-pointer"
            >
              {/* Product Image */}
              <div className="relative mb-4">
                <Link href={`/product/${product.id}`}>
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-48 object-contain rounded-xl group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>

                {/* Favorite Button */}
                <motion.button
                  onClick={() => handleToggleWishlist(product)}
                  className="absolute top-2 right-2 p-2 bg-white/90 rounded-full shadow-md"
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart
                    className={`h-4 w-4 ${isInWishlist(product.id) ? "fill-red-500 text-red-500" : "text-gray-400"}`}
                  />
                </motion.button>

                {/* Condition Badge */}
                <div className="absolute top-2 left-2 bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                  {product.condition}
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-3">
                <div>
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-900 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-600">
                    {product.storage} • {product.color}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-700 ml-1">{product.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({product.reviews})</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-gray-900">${product.price}</span>
                  <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                </div>

                {/* Add to Cart Button */}
                <motion.button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-blue-900 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-800 transition-colors"
                  whileTap={{ scale: 0.98 }}
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link href="/categories" className="btn-primary">
            View All Products
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
