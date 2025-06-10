"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Search, Plus } from "lucide-react"
import Image from "next/image"
import { useComparison } from "@/contexts/ComparisonContext"
import { product_data } from "@/lib/data";

// Mock products data
const allProducts = product_data

interface ProductSelectorProps {
  isOpen: boolean
  onClose: () => void
  excludeIds: string[]
}

export default function ProductSelector({ isOpen, onClose, excludeIds }: ProductSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBrand, setSelectedBrand] = useState("all")
  const { addToComparison } = useComparison()

  const brands = ["all", ...Array.from(new Set(allProducts.map((p) => p.brand)))]

  const filteredProducts = allProducts.filter((product) => {
    if (excludeIds.includes(product.id)) return false

    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesBrand = selectedBrand === "all" || product.brand === selectedBrand

    return matchesSearch && matchesBrand
  })

  const handleAddProduct = (product: any) => {
    addToComparison(product)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Add Product to Compare</h2>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Search and Filters */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand === "all" ? "All Brands" : brand}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="p-6 overflow-y-auto max-h-96">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No products found matching your criteria.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors cursor-pointer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      onClick={() => handleAddProduct(product)}
                    >
                      <div className="text-center space-y-3">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={80}
                          height={80}
                          className="w-16 h-16 object-contain mx-auto"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900">{product.name}</h3>
                          <p className="text-sm text-gray-600">
                            {product.storage} • {product.color}
                          </p>
                          <p className="text-lg font-bold text-blue-900">${product.price}</p>
                        </div>
                        <motion.button
                          className="w-full bg-blue-900 text-white py-2 rounded-lg font-medium hover:bg-blue-800 transition-colors flex items-center justify-center gap-2"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Plus className="h-4 w-4" />
                          Add to Compare
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
