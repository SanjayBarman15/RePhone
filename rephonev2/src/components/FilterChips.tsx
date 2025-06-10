"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface FilterChip {
  id: string
  label: string
  category: string
}

interface FilterChipsProps {
  activeFilters: FilterChip[]
  onRemoveFilter: (filterId: string, category: string) => void
  onClearAll: () => void
}

export default function FilterChips({ activeFilters, onRemoveFilter, onClearAll }: FilterChipsProps) {
  if (activeFilters.length === 0) return null

  return (
    <motion.div
      className="flex flex-wrap items-center gap-2 p-4 bg-blue-50 border border-blue-200 rounded-xl mb-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <span className="text-sm font-medium text-blue-900">Active filters:</span>

      <AnimatePresence>
        {activeFilters.map((filter) => (
          <motion.div
            key={`${filter.category}-${filter.id}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <Badge variant="secondary" className="flex items-center gap-1 pr-1">
              <span className="text-sm">{filter.label}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveFilter(filter.id, filter.category)}
                className="h-4 w-4 p-0 hover:bg-gray-200 rounded-full"
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          </motion.div>
        ))}
      </AnimatePresence>

      {activeFilters.length > 1 && (
        <Button variant="ghost" size="sm" onClick={onClearAll} className="h-auto p-1 text-blue-900 hover:text-blue-700">
          Clear all
        </Button>
      )}
    </motion.div>
  )
}
