"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

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

interface ComparisonContextType {
  comparedProducts: Product[]
  addToComparison: (product: Product) => void
  removeFromComparison: (id: string) => void
  clearComparison: () => void
  isInComparison: (id: string) => boolean
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined)

export function ComparisonProvider({ children }: { children: ReactNode }) {
  const [comparedProducts, setComparedProducts] = useState<Product[]>([])

  const addToComparison = (product: Product) => {
    setComparedProducts((prev) => {
      // Don't add if already exists
      if (prev.find((p) => p.id === product.id)) return prev

      // Limit to 4 products
      if (prev.length >= 4) return prev

      return [...prev, product]
    })
  }

  const removeFromComparison = (id: string) => {
    setComparedProducts((prev) => prev.filter((p) => p.id !== id))
  }

  const clearComparison = () => {
    setComparedProducts([])
  }

  const isInComparison = (id: string) => {
    return comparedProducts.some((p) => p.id === id)
  }

  return (
    <ComparisonContext.Provider
      value={{
        comparedProducts,
        addToComparison,
        removeFromComparison,
        clearComparison,
        isInComparison,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  )
}

export function useComparison() {
  const context = useContext(ComparisonContext)
  if (context === undefined) {
    throw new Error("useComparison must be used within a ComparisonProvider")
  }
  return context
}
