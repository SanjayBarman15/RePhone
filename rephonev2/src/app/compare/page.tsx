"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"
import ComparisonTable from "@/components/ComparisonTable"
import ProductSelector from "@/components/ProductSelector"
import { useComparison } from "@/contexts/ComparisonContext"

export default function ComparePage() {
  const { comparedProducts, removeFromComparison, clearComparison } = useComparison()
  const [showProductSelector, setShowProductSelector] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/categories"
                className="flex items-center gap-2 text-gray-600 hover:text-blue-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                Back to Products
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Compare Products</h1>
            </div>

            <div className="flex items-center gap-3">
              {comparedProducts.length > 0 && (
                <button onClick={clearComparison} className="text-gray-600 hover:text-red-600 transition-colors">
                  Clear All
                </button>
              )}
              <button className="flex items-center gap-2 text-gray-600 hover:text-blue-900 transition-colors">
                <Share2 className="h-5 w-5" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        {comparedProducts.length === 0 ? (
          <EmptyComparisonState onAddProduct={() => setShowProductSelector(true)} />
        ) : (
          <ComparisonTable
            products={comparedProducts}
            onRemoveProduct={removeFromComparison}
            onAddProduct={() => setShowProductSelector(true)}
          />
        )}
      </div>

      {/* Product Selector Modal */}
      <ProductSelector
        isOpen={showProductSelector}
        onClose={() => setShowProductSelector(false)}
        excludeIds={comparedProducts.map((p) => p.id)}
      />
    </div>
  )
}

function EmptyComparisonState({ onAddProduct }: { onAddProduct: () => void }) {
  return (
    <motion.div
      className="text-center py-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-md mx-auto">
        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Plus className="h-12 w-12 text-blue-900" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Start Comparing</h2>
        <p className="text-gray-600 mb-8">
          Add products to compare their specifications, features, and prices side by side.
        </p>
        <motion.button
          onClick={onAddProduct}
          className="btn-primary"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Add Products to Compare
        </motion.button>
      </div>
    </motion.div>
  )
}
