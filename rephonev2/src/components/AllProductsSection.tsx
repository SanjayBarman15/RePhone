"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Filter, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/ProductCard";
import AdvancedFilters from "@/components/AdvancedFilters";
import FilterChips from "@/components/FilterChips";
import { product_data } from "@/lib/data";

// Add the FilterState interface and other types here
interface FilterState {
  brands: string[];
  conditions: string[];
  storage: string[];
  priceRange: { min: number; max: number } | null;
  colors: string[];
  features: string[];
  ratings: number[];
  availability: string[];
}

const allProducts = product_data;

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Rating", value: "rating" },
  { label: "Newest", value: "newest" },
];

export default function AllProductsSection() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [productsToShow, setProductsToShow] = useState(8);
  const [filters, setFilters] = useState<FilterState>({
    brands: [],
    conditions: [],
    storage: [],
    priceRange: null,
    colors: [],
    features: [],
    ratings: [],
    availability: [],
  });
  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  // Filter and sort products
  useEffect(() => {
    let filtered = [...allProducts];

    // Apply filters
    if (filters.brands.length > 0) {
      filtered = filtered.filter((product) =>
        filters.brands.some((brand) => product.brand.toLowerCase() === brand)
      );
    }
    if (filters.conditions.length > 0) {
      filtered = filtered.filter((product) =>
        filters.conditions.some(
          (condition) =>
            product.condition.toLowerCase().replace(" ", "-") === condition
        )
      );
    }
    if (filters.storage.length > 0) {
      filtered = filtered.filter((product) =>
        filters.storage.some(
          (storage) => product.storage.toLowerCase() === storage
        )
      );
    }
    if (filters.priceRange) {
      filtered = filtered.filter(
        (product) =>
          product.price >= filters.priceRange!.min &&
          product.price <= filters.priceRange!.max
      );
    }
    if (filters.colors.length > 0) {
      filtered = filtered.filter((product) =>
        filters.colors.some((color) =>
          product.color.toLowerCase().includes(color)
        )
      );
    }
    if (filters.features.length > 0) {
      filtered = filtered.filter((product) =>
        filters.features.every((feature) => product.features?.includes(feature))
      );
    }
    if (filters.ratings.length > 0) {
      const minRating = Math.min(...filters.ratings);
      filtered = filtered.filter((product) => product.rating >= minRating);
    }
    if (filters.availability.length > 0) {
      filtered = filtered.filter((product) =>
        filters.availability.includes(product.availability)
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Keep original order for featured
        break;
    }

    setFilteredProducts(filtered);
  }, [filters, sortBy]);

  const handleApplyFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      brands: [],
      conditions: [],
      storage: [],
      priceRange: null,
      colors: [],
      features: [],
      ratings: [],
      availability: [],
    });
  };

  const getActiveFilterChips = () => {
    const chips: Array<{ id: string; label: string; category: string }> = [];

    // Add brand chips
    filters.brands.forEach((brand) => {
      chips.push({
        id: brand,
        label: brand.charAt(0).toUpperCase() + brand.slice(1),
        category: "brands",
      });
    });

    // Add condition chips
    filters.conditions.forEach((condition) => {
      const label = condition
        .replace("-", " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());
      chips.push({ id: condition, label, category: "conditions" });
    });

    // Add storage chips
    filters.storage.forEach((storage) => {
      chips.push({
        id: storage,
        label: storage.toUpperCase(),
        category: "storage",
      });
    });

    // Add price range chip
    if (filters.priceRange) {
      chips.push({
        id: "price",
        label: `$${filters.priceRange.min} - $${filters.priceRange.max}`,
        category: "priceRange",
      });
    }

    return chips;
  };

  const handleRemoveFilter = (filterId: string, category: string) => {
    setFilters((prev) => {
      if (category === "priceRange") {
        return { ...prev, priceRange: null };
      }
      return {
        ...prev,
        [category]: (prev[category as keyof FilterState] as string[]).filter(
          (id) => id !== filterId
        ),
      };
    });
  };

  const hasActiveFilters = Object.values(filters).some((value) =>
    Array.isArray(value) ? value.length > 0 : value !== null
  );

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            All <span className="text-blue-900">Products</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our complete collection of premium refurbished smartphones
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          className="bg-white rounded-2xl p-4 mb-6 card-shadow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Results Count */}
            <div className="text-gray-600">
              Showing {Math.min(productsToShow, filteredProducts.length)} of{" "}
              {filteredProducts.length} products
            </div>

            <div className="flex items-center gap-4">
              {/* Sort Dropdown */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* View Toggle */}
              <div className="flex items-center gap-1 border rounded-lg p-1 border-gray-300">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={`h-8 w-8 p-0 ${
                    viewMode === "grid"
                      ? "bg-blue-900 text-white"
                      : "text-black"
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={`h-8 w-8 p-0 ${
                    viewMode === "list"
                      ? "bg-blue-900 text-white"
                      : "text-black"
                  }`}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              {/* Advanced Filter Button */}
              <Button
                variant={hasActiveFilters ? "default" : "outline"}
                onClick={() => setShowAdvancedFilters(true)}
                className="relative h-10.5 border-gray-300"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {hasActiveFilters && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                    •
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Active Filter Chips */}
        <FilterChips
          activeFilters={getActiveFilterChips()}
          onRemoveFilter={handleRemoveFilter}
          onClearAll={handleClearFilters}
        />

        {/* Products Grid/List */}
        <motion.div
          className={`${
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "flex flex-col gap-4"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filteredProducts.slice(0, productsToShow).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className={viewMode === "list" ? "w-full" : ""}
            >
              <ProductCard product={product} viewMode={viewMode} />
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-6xl mb-4">📱</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters or search criteria
            </p>
            <Button onClick={handleClearFilters}>Clear Filters</Button>
          </motion.div>
        )}

        {/* Load More Button */}
        {filteredProducts.length > productsToShow && (
          <motion.div
            className="text-center mt-12 "
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button
              variant="outline"
              size="lg"
              className="border-gray-300"
              onClick={() => setProductsToShow((prev) => prev + 8)}
            >
              Load More Products
            </Button>
          </motion.div>
        )}
      </div>

      {/* Advanced Filters Modal */}
      <AdvancedFilters
        isOpen={showAdvancedFilters}
        onClose={() => setShowAdvancedFilters(false)}
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearFilters}
        currentFilters={filters}
        productCount={filteredProducts.length}
      />
    </section>
  );
}
