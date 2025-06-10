"use client"

import { motion } from "framer-motion"
import ProductCard from "@/components/ProductCard"

// Mock related products
const relatedProducts = [
  {
    id: "3",
    name: "Pixel 7 Pro",
    brand: "Google",
    price: 449,
    originalPrice: 699,
    rating: 4.6,
    reviews: 67,
    image: "/placeholder.svg?height=300&width=300",
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
    image: "/placeholder.svg?height=300&width=300",
    condition: "Good",
    storage: "256GB",
    color: "Volcanic Black",
  },
  {
    id: "5",
    name: "iPhone 12 Pro Max",
    brand: "Apple",
    price: 599,
    originalPrice: 899,
    rating: 4.7,
    reviews: 156,
    image: "/placeholder.svg?height=300&width=300",
    condition: "Very Good",
    storage: "256GB",
    color: "Pacific Blue",
  },
  {
    id: "6",
    name: "Galaxy S21 FE",
    brand: "Samsung",
    price: 399,
    originalPrice: 599,
    rating: 4.4,
    reviews: 78,
    image: "/placeholder.svg?height=300&width=300",
    condition: "Excellent",
    storage: "128GB",
    color: "Olive",
  },
]

interface RelatedProductsProps {
  currentProduct: {
    id: string
    category: string
  }
}

export default function RelatedProducts({ currentProduct }: RelatedProductsProps) {
  // Filter out current product and show related ones
  const filteredProducts = relatedProducts.filter((product) => product.id !== currentProduct.id)

  return (
    <section className="mt-16 pt-16 border-t border-gray-200">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-4">You Might Also Like</h2>
        <p className="text-gray-600">Similar products that other customers have purchased</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
