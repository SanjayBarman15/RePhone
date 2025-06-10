"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BarChart3, X, ChevronUp, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useComparison } from "@/contexts/ComparisonContext"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function ComparisonFloatingButton() {
  const { comparedProducts, removeFromComparison, clearComparison } = useComparison()
  const [isExpanded, setIsExpanded] = useState(false)

  if (comparedProducts.length === 0) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-20 md:bottom-4 left-4 right-4 md:left-auto md:right-4 z-40 md:max-w-sm"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Header - Always Visible */}
          <motion.div
            className="flex items-center justify-between p-4 bg-blue-50 cursor-pointer md:cursor-default"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-900" />
              <span className="font-semibold text-gray-900">Compare ({comparedProducts.length})</span>
            </div>

            <div className="flex items-center gap-2">
              {/* Clear button - always visible */}
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  clearComparison()
                }}
                className="h-8 w-8 p-0 text-gray-400 hover:text-red-500"
              >
                <X className="h-4 w-4" />
              </Button>

              {/* Expand/Collapse button - mobile only */}
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 md:hidden text-gray-600"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsExpanded(!isExpanded)
                }}
              >
                {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
              </Button>
            </div>
          </motion.div>

          {/* Expandable Content */}
          <AnimatePresence>
            {(isExpanded || window.innerWidth >= 768) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                {/* Products List */}
                <div className="p-4 pt-0 space-y-3 max-h-60 overflow-y-auto">
                  {comparedProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={40}
                        height={40}
                        className="w-8 h-8 md:w-10 md:h-10 object-contain rounded-lg bg-white p-1"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                        <p className="text-xs text-gray-600">${product.price}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromComparison(product.id)}
                        className="h-6 w-6 p-0 text-gray-400 hover:text-red-500 flex-shrink-0"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </motion.div>
                  ))}
                </div>

                {/* Compare Button */}
                <div className="p-4 pt-0">
                  <Link href="/compare" className="block">
                    <Button
                      className="w-full bg-blue-900 hover:bg-blue-800 text-white"
                      onClick={() => setIsExpanded(false)}
                    >
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Compare Now
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile Compact View - When Collapsed */}
          {!isExpanded && (
            <div className="md:hidden">
              <div className="px-4 pb-4">
                <div className="flex items-center gap-2 mb-3">
                  {comparedProducts.slice(0, 2).map((product, index) => (
                    <div key={product.id} className="flex items-center gap-2 flex-1 min-w-0">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={24}
                        height={24}
                        className="w-6 h-6 object-contain rounded bg-gray-100 p-0.5 flex-shrink-0"
                      />
                      <span className="text-xs text-gray-700 truncate">{product.name}</span>
                    </div>
                  ))}
                  {comparedProducts.length > 2 && (
                    <span className="text-xs text-gray-500 flex-shrink-0">+{comparedProducts.length - 2}</span>
                  )}
                </div>

                <Link href="/compare" className="block">
                  <Button className="w-full bg-blue-900 hover:bg-blue-800 text-white text-sm py-2">Compare Now</Button>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Backdrop - When Expanded */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="fixed inset-0 bg-black/20 -z-10 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(false)}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  )
}
