"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { X, Plus, Star, ShoppingCart, Heart, Check } from "lucide-react"
import Image from "next/image"
import { useCart } from "@/contexts/CartContext"

interface Product {
  id: string
  name: string
  brand: string
  price: number
  originalPrice: number
  rating: number
  reviews: number
  image: string
  condition: string
  storage: string
  color: string
  specifications: any
}

interface ComparisonTableProps {
  products: Product[]
  onRemoveProduct: (id: string) => void
  onAddProduct: () => void
}

const comparisonCategories = [
  {
    id: "overview",
    title: "Overview",
    fields: [
      { key: "price", label: "Price", type: "price" },
      { key: "originalPrice", label: "Original Price", type: "price" },
      { key: "condition", label: "Condition", type: "badge" },
      { key: "storage", label: "Storage", type: "text" },
      { key: "color", label: "Color", type: "text" },
      { key: "rating", label: "Rating", type: "rating" },
    ],
  },
  {
    id: "display",
    title: "Display",
    fields: [
      { key: "specifications.display.size", label: "Screen Size", type: "text" },
      { key: "specifications.display.type", label: "Display Type", type: "text" },
      { key: "specifications.display.resolution", label: "Resolution", type: "text" },
      { key: "specifications.display.features", label: "Features", type: "list" },
    ],
  },
  {
    id: "performance",
    title: "Performance",
    fields: [
      { key: "specifications.performance.processor", label: "Processor", type: "text" },
      { key: "specifications.performance.ram", label: "RAM", type: "text" },
      { key: "specifications.performance.storage", label: "Storage", type: "text" },
      { key: "specifications.performance.os", label: "Operating System", type: "text" },
    ],
  },
  {
    id: "camera",
    title: "Camera",
    fields: [
      { key: "specifications.camera.rear", label: "Rear Camera", type: "text" },
      { key: "specifications.camera.front", label: "Front Camera", type: "text" },
      { key: "specifications.camera.features", label: "Camera Features", type: "list" },
    ],
  },
  {
    id: "battery",
    title: "Battery & Charging",
    fields: [
      { key: "specifications.battery.capacity", label: "Battery Capacity", type: "text" },
      { key: "specifications.battery.charging", label: "Charging", type: "text" },
      { key: "specifications.battery.life", label: "Battery Life", type: "text" },
    ],
  },
  {
    id: "connectivity",
    title: "Connectivity",
    fields: [
      { key: "specifications.connectivity.network", label: "Network", type: "text" },
      { key: "specifications.connectivity.wifi", label: "Wi-Fi", type: "text" },
      { key: "specifications.connectivity.bluetooth", label: "Bluetooth", type: "text" },
      { key: "specifications.connectivity.other", label: "Other Features", type: "list" },
    ],
  },
  {
    id: "physical",
    title: "Physical",
    fields: [
      { key: "specifications.physical.dimensions", label: "Dimensions", type: "text" },
      { key: "specifications.physical.weight", label: "Weight", type: "text" },
      { key: "specifications.physical.materials", label: "Materials", type: "text" },
      { key: "specifications.physical.colors", label: "Available Colors", type: "list" },
    ],
  },
]

export default function ComparisonTable({ products, onRemoveProduct, onAddProduct }: ComparisonTableProps) {
  const [selectedCategory, setSelectedCategory] = useState("overview")
  const [favorites, setFavorites] = useState<string[]>([])
  const { addToCart } = useCart()

  const maxProducts = 4
  const canAddMore = products.length < maxProducts

  const getNestedValue = (obj: any, path: string) => {
    return path.split(".").reduce((current, key) => current?.[key], obj)
  }

  const renderFieldValue = (product: Product, field: any) => {
    const value = getNestedValue(product, field.key)

    if (!value) return <span className="text-gray-400">-</span>

    switch (field.type) {
      case "price":
        return <span className="font-bold text-lg">${value}</span>
      case "badge":
        return (
          <span
            className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
              value === "Excellent"
                ? "bg-green-100 text-green-800"
                : value === "Very Good"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {value}
          </span>
        )
      case "rating":
        return (
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{value}</span>
          </div>
        )
      case "list":
        if (Array.isArray(value)) {
          return (
            <ul className="text-sm space-y-1">
              {value.map((item, idx) => (
                <li key={idx} className="flex items-center gap-1">
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  {item}
                </li>
              ))}
            </ul>
          )
        }
        return <span>{value}</span>
      default:
        return <span>{value}</span>
    }
  }

  const getBestValue = (products: Product[], field: any) => {
    if (field.type === "price") {
      const prices = products.map((p) => getNestedValue(p, field.key)).filter(Boolean)
      return Math.min(...prices)
    }
    if (field.type === "rating") {
      const ratings = products.map((p) => getNestedValue(p, field.key)).filter(Boolean)
      return Math.max(...ratings)
    }
    return null
  }

  const isBestValue = (product: Product, field: any) => {
    const bestValue = getBestValue(products, field)
    if (bestValue === null) return false
    const currentValue = getNestedValue(product, field.key)
    return currentValue === bestValue
  }

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
  }

  const currentCategory = comparisonCategories.find((cat) => cat.id === selectedCategory)

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="bg-white rounded-2xl p-1 card-shadow">
        <div className="flex flex-wrap gap-1">
          {comparisonCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                selectedCategory === category.id
                  ? "bg-blue-900 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-2xl card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Product Headers */}
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left p-6 w-48">
                  <span className="text-lg font-semibold text-gray-900">{currentCategory?.title}</span>
                </th>
                {products.map((product) => (
                  <th key={product.id} className="p-6 min-w-80">
                    <motion.div
                      className="text-center space-y-4"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Remove Button */}
                      <div className="flex justify-end">
                        <button
                          onClick={() => onRemoveProduct(product.id)}
                          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Product Image */}
                      <div className="relative">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={120}
                          height={120}
                          className="w-24 h-24 object-contain mx-auto rounded-xl"
                        />
                      </div>

                      {/* Product Info */}
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 mb-1">{product.name}</h3>
                        <p className="text-sm text-gray-600">
                          {product.storage} • {product.color}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-center gap-2">
                        <motion.button
                          onClick={() => toggleFavorite(product.id)}
                          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                          whileTap={{ scale: 0.9 }}
                        >
                          <Heart
                            className={`h-4 w-4 ${
                              favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-400"
                            }`}
                          />
                        </motion.button>
                        <motion.button
                          onClick={() => handleAddToCart(product)}
                          className="bg-blue-900 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-800 transition-colors flex items-center gap-1"
                          whileTap={{ scale: 0.98 }}
                        >
                          <ShoppingCart className="h-3 w-3" />
                          Add to Cart
                        </motion.button>
                      </div>
                    </motion.div>
                  </th>
                ))}
                {canAddMore && (
                  <th className="p-6 min-w-80">
                    <motion.button
                      onClick={onAddProduct}
                      className="w-full h-full min-h-64 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center gap-3 text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Plus className="h-8 w-8" />
                      <span className="font-medium">Add Product</span>
                      <span className="text-sm">Compare up to {maxProducts} products</span>
                    </motion.button>
                  </th>
                )}
              </tr>
            </thead>

            {/* Comparison Rows */}
            <tbody>
              {currentCategory?.fields.map((field, index) => (
                <motion.tr
                  key={field.key}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <td className="p-6 font-medium text-gray-900 bg-gray-50">{field.label}</td>
                  {products.map((product) => {
                    const isHighlighted = isBestValue(product, field)
                    return (
                      <td
                        key={product.id}
                        className={`p-6 text-center ${isHighlighted ? "bg-green-50 border-l-4 border-green-500" : ""}`}
                      >
                        <div className="flex items-center justify-center gap-2">
                          {isHighlighted && field.type === "price" && <Check className="h-4 w-4 text-green-600" />}
                          {renderFieldValue(product, field)}
                          {isHighlighted && field.type === "rating" && <Check className="h-4 w-4 text-green-600" />}
                        </div>
                      </td>
                    )
                  })}
                  {canAddMore && <td className="p-6"></td>}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comparison Summary */}
      {products.length > 1 && (
        <motion.div
          className="bg-blue-50 border border-blue-200 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Comparison Summary</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-blue-800">Best Value:</span>
              <span className="ml-2 text-blue-700">
                {products.reduce((best, current) => (current.price < best.price ? current : best)).name}
              </span>
            </div>
            <div>
              <span className="font-medium text-blue-800">Highest Rated:</span>
              <span className="ml-2 text-blue-700">
                {products.reduce((best, current) => (current.rating > best.rating ? current : best)).name}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
