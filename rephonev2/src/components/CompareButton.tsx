"use client"

import { motion } from "framer-motion"
import { BarChart3, Check } from "lucide-react"
import { useComparison } from "@/contexts/ComparisonContext"

interface CompareButtonProps {
  product: {
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
    specifications?: any
  }
  className?: string
}

export default function CompareButton({ product, className = "" }: CompareButtonProps) {
  const { addToComparison, removeFromComparison, isInComparison, comparedProducts } = useComparison()

  const isComparing = isInComparison(product.id)
  const canAdd = comparedProducts.length < 4

  const handleToggle = () => {
    if (isComparing) {
      removeFromComparison(product.id)
    } else if (canAdd) {
      addToComparison(product)
    }
  }

  return (
    <motion.button
      onClick={handleToggle}
      disabled={!canAdd && !isComparing}
      className={`flex items-center gap-2 px-3 py-2 rounded-xl font-medium text-sm transition-all ${
        isComparing
          ? "bg-blue-100 text-blue-900 border border-blue-200"
          : canAdd
            ? "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
            : "bg-gray-50 text-gray-400 cursor-not-allowed border border-gray-100"
      } ${className}`}
      whileHover={canAdd || isComparing ? { scale: 1.02 } : {}}
      whileTap={canAdd || isComparing ? { scale: 0.98 } : {}}
    >
      {isComparing ? (
        <>
          <Check className="h-4 w-4" />
          Comparing
        </>
      ) : (
        <>
          <BarChart3 className="h-4 w-4" />
          Compare
        </>
      )}
    </motion.button>
  )
}
