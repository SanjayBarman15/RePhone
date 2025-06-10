"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, ChevronUp, RotateCcw, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface PriceRange {
  min: number;
  max: number;
}

interface FilterState {
  brands: string[];
  conditions: string[];
  storage: string[];
  priceRange: PriceRange | null;
  colors: string[];
  features: string[];
  ratings: number[];
  availability: string[];
}

interface AdvancedFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterState) => void;
  onClearFilters: () => void;
  currentFilters: FilterState;
  productCount: number;
}

const filterOptions = {
  brands: [
    { id: "apple", label: "Apple", count: 45 },
    { id: "samsung", label: "Samsung", count: 38 },
    { id: "google", label: "Google", count: 22 },
    { id: "oneplus", label: "OnePlus", count: 18 },
    { id: "xiaomi", label: "Xiaomi", count: 15 },
    { id: "huawei", label: "Huawei", count: 12 },
  ],
  conditions: [
    { id: "excellent", label: "Excellent", count: 67 },
    { id: "very-good", label: "Very Good", count: 54 },
    { id: "good", label: "Good", count: 29 },
    { id: "fair", label: "Fair", count: 12 },
  ],
  storage: [
    { id: "64gb", label: "64GB", count: 23 },
    { id: "128gb", label: "128GB", count: 78 },
    { id: "256gb", label: "256GB", count: 45 },
    { id: "512gb", label: "512GB", count: 18 },
    { id: "1tb", label: "1TB", count: 8 },
  ],
  colors: [
    { id: "black", label: "Black", count: 89 },
    { id: "white", label: "White", count: 67 },
    { id: "blue", label: "Blue", count: 34 },
    { id: "red", label: "Red", count: 23 },
    { id: "green", label: "Green", count: 19 },
    { id: "purple", label: "Purple", count: 15 },
    { id: "gold", label: "Gold", count: 12 },
    { id: "silver", label: "Silver", count: 28 },
  ],
  features: [
    { id: "5g", label: "5G Ready", count: 98 },
    { id: "wireless-charging", label: "Wireless Charging", count: 76 },
    { id: "water-resistant", label: "Water Resistant", count: 89 },
    { id: "dual-sim", label: "Dual SIM", count: 45 },
    { id: "fast-charging", label: "Fast Charging", count: 112 },
    { id: "face-id", label: "Face ID", count: 34 },
    { id: "fingerprint", label: "Fingerprint", count: 87 },
    { id: "nfc", label: "NFC", count: 95 },
  ],
  availability: [
    { id: "in-stock", label: "In Stock", count: 142 },
    { id: "low-stock", label: "Low Stock", count: 18 },
    { id: "pre-order", label: "Pre-order", count: 5 },
  ],
};

const priceRanges = [
  { min: 0, max: 200, label: "Under $200" },
  { min: 200, max: 400, label: "$200 - $400" },
  { min: 400, max: 600, label: "$400 - $600" },
  { min: 600, max: 800, label: "$600 - $800" },
  { min: 800, max: 1000, label: "$800 - $1000" },
  { min: 1000, max: 9999, label: "$1000+" },
];

export default function AdvancedFilters({
  isOpen,
  onClose,
  onApplyFilters,
  onClearFilters,
  currentFilters,
  productCount,
}: AdvancedFiltersProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "brands",
    "conditions",
    "priceRange",
  ]);
  const [customPriceRange, setCustomPriceRange] = useState({
    min: "",
    max: "",
  });

  const handleFilterChange = (
    category: keyof FilterState,
    value: string | number | PriceRange
  ) => {
    const newFilters = { ...currentFilters };
    if (category === "priceRange") {
      newFilters[category] = value as PriceRange;
    } else if (category === "ratings") {
      const ratings = currentFilters.ratings.includes(value as number)
        ? currentFilters.ratings.filter((r) => r !== value)
        : [...currentFilters.ratings, value as number];
      newFilters.ratings = ratings;
    } else {
      const currentValues = currentFilters[category] as string[];
      const newValues = currentValues.includes(value as string)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value as string];
      newFilters[category] = newValues;
    }
    onApplyFilters(newFilters);
  };

  const handleCustomPriceRange = () => {
    const min = Number.parseInt(customPriceRange.min) || 0;
    const max = Number.parseInt(customPriceRange.max) || 9999;
    if (min < max) {
      handleFilterChange("priceRange", { min, max });
    }
  };

  const clearAllFilters = () => {
    const emptyFilters: FilterState = {
      brands: [],
      conditions: [],
      storage: [],
      priceRange: null,
      colors: [],
      features: [],
      ratings: [],
      availability: [],
    };
    onApplyFilters(emptyFilters);
    setCustomPriceRange({ min: "", max: "" });
  };

  const hasActiveFilters = Object.values(currentFilters).some((value) =>
    Array.isArray(value) ? value.length > 0 : value !== null
  );

  const FilterSection = ({
    title,
    sectionKey,
    options,
    selectedValues,
  }: {
    title: string;
    sectionKey: string;
    options: FilterOption[];
    selectedValues: string[];
  }) => {
    const isExpanded = expandedSections.includes(sectionKey);

    return (
      <Collapsible
        open={isExpanded}
        onOpenChange={(open) => {
          if (open) {
            setExpandedSections((prev) => [...prev, sectionKey]);
          } else {
            setExpandedSections((prev) => prev.filter((s) => s !== sectionKey));
          }
        }}
      >
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="w-full justify-between p-0 h-auto py-4"
          >
            <span className="font-semibold text-gray-900">{title}</span>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent className="space-y-3 pb-4">
          <ScrollArea className="max-h-48">
            <div className="space-y-3 pr-4">
              {options.map((option) => (
                <div key={option.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={`${sectionKey}-${option.id}`}
                    checked={selectedValues.includes(option.id)}
                    onCheckedChange={() =>
                      handleFilterChange(
                        sectionKey as keyof FilterState,
                        option.id
                      )
                    }
                  />
                  <Label
                    htmlFor={`${sectionKey}-${option.id}`}
                    className="flex-1 text-sm text-gray-700 cursor-pointer"
                  >
                    {option.label}
                  </Label>
                  {option.count && (
                    <Badge variant="secondary" className="text-xs">
                      {option.count}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CollapsibleContent>
        <Separator />
      </Collapsible>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-[60] flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white w-full max-w-md h-full flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {hasActiveFilters && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {productCount} products found
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="h-auto p-0"
                  >
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Clear All
                  </Button>
                </div>
              )}
            </div>

            {/* Filters Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-0">
                {/* Brands */}
                <FilterSection
                  title="Brand"
                  sectionKey="brands"
                  options={filterOptions.brands}
                  selectedValues={currentFilters.brands}
                />

                {/* Condition */}
                <FilterSection
                  title="Condition"
                  sectionKey="conditions"
                  options={filterOptions.conditions}
                  selectedValues={currentFilters.conditions}
                />

                {/* Price Range */}
                <Collapsible
                  open={expandedSections.includes("priceRange")}
                  onOpenChange={(open) => {
                    if (open) {
                      setExpandedSections((prev) => [...prev, "priceRange"]);
                    } else {
                      setExpandedSections((prev) =>
                        prev.filter((s) => s !== "priceRange")
                      );
                    }
                  }}
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-between p-0 h-auto py-4"
                    >
                      <span className="font-semibold text-gray-900">
                        Price Range
                      </span>
                      {expandedSections.includes("priceRange") ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="space-y-3 pb-4">
                    <RadioGroup
                      value={
                        currentFilters.priceRange
                          ? `${currentFilters.priceRange.min}-${currentFilters.priceRange.max}`
                          : undefined
                      }
                      onValueChange={(value) => {
                        if (value) {
                          const [min, max] = value.split("-").map(Number);
                          handleFilterChange("priceRange", { min, max });
                        }
                      }}
                    >
                      {priceRanges.map((range, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            value={`${range.min}-${range.max}`}
                            id={`price-${index}`}
                          />
                          <Label
                            htmlFor={`price-${index}`}
                            className="text-sm text-gray-700"
                          >
                            {range.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>

                    {/* Custom Price Range */}
                    <div className="pt-3 border-t border-gray-100">
                      <Label className="text-sm font-medium text-gray-900 mb-2 block">
                        Custom Range
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          placeholder="Min"
                          value={customPriceRange.min}
                          onChange={(e) =>
                            setCustomPriceRange((prev) => ({
                              ...prev,
                              min: e.target.value,
                            }))
                          }
                          className="flex-1"
                        />
                        <Input
                          type="number"
                          placeholder="Max"
                          value={customPriceRange.max}
                          onChange={(e) =>
                            setCustomPriceRange((prev) => ({
                              ...prev,
                              max: e.target.value,
                            }))
                          }
                          className="flex-1"
                        />
                        <Button onClick={handleCustomPriceRange} size="sm">
                          Apply
                        </Button>
                      </div>
                    </div>
                  </CollapsibleContent>
                  <Separator />
                </Collapsible>

                {/* Storage */}
                <FilterSection
                  title="Storage"
                  sectionKey="storage"
                  options={filterOptions.storage}
                  selectedValues={currentFilters.storage}
                />

                {/* Colors */}
                <FilterSection
                  title="Color"
                  sectionKey="colors"
                  options={filterOptions.colors}
                  selectedValues={currentFilters.colors}
                />

                {/* Features */}
                <FilterSection
                  title="Features"
                  sectionKey="features"
                  options={filterOptions.features}
                  selectedValues={currentFilters.features}
                />

                {/* Rating */}
                <Collapsible
                  open={expandedSections.includes("ratings")}
                  onOpenChange={(open) => {
                    if (open) {
                      setExpandedSections((prev) => [...prev, "ratings"]);
                    } else {
                      setExpandedSections((prev) =>
                        prev.filter((s) => s !== "ratings")
                      );
                    }
                  }}
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-between p-0 h-auto py-4"
                    >
                      <span className="font-semibold text-gray-900">
                        Minimum Rating
                      </span>
                      {expandedSections.includes("ratings") ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="space-y-3 pb-4">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-3">
                        <Checkbox
                          id={`rating-${rating}`}
                          checked={currentFilters.ratings.includes(rating)}
                          onCheckedChange={() =>
                            handleFilterChange("ratings", rating)
                          }
                        />
                        <Label
                          htmlFor={`rating-${rating}`}
                          className="flex items-center gap-1 cursor-pointer"
                        >
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-3 h-3 ${
                                i < rating ? "bg-yellow-400" : "bg-gray-200"
                              } rounded-sm`}
                            />
                          ))}
                          <span className="text-sm text-gray-700 ml-1">
                            & up
                          </span>
                        </Label>
                      </div>
                    ))}
                  </CollapsibleContent>
                  <Separator />
                </Collapsible>

                {/* Availability */}
                <FilterSection
                  title="Availability"
                  sectionKey="availability"
                  options={filterOptions.availability}
                  selectedValues={currentFilters.availability}
                />
              </div>
            </div>

            {/* Footer - Fixed at bottom */}
            <div className="p-6 border-t border-gray-200 bg-white">
              <Button
                onClick={() => {
                  onApplyFilters(currentFilters);
                  onClose();
                }}
                className="w-full"
                size="lg"
              >
                <Check className="h-4 w-4 mr-2" />
                Apply Filters ({productCount})
              </Button>

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  onClick={() => {
                    clearAllFilters();
                    onClearFilters();
                  }}
                  className="w-full"
                >
                  Clear All Filters
                </Button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
