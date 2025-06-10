"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/ProductCard";
import AdvancedFilters from "@/components/AdvancedFilters";
import FilterChips from "@/components/FilterChips";
import { product_data } from "@/lib/data";
import { useSearchParams } from "next/navigation";

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

const products = product_data;

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
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
  const [filteredProducts, setFilteredProducts] = useState(products);

  const searchParams = useSearchParams();

  // Initialize filters from URL params on component mount
  useEffect(() => {
    const brandParam = searchParams.get("brand");
    if (brandParam && !filters.brands.includes(brandParam)) {
      setFilters((prev) => ({ ...prev, brands: [...prev.brands, brandParam] }));
    }
  }, [searchParams]);

  // Filter products based on search and filters
  useEffect(() => {
    let filtered = [...products];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply advanced filters
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

    setFilteredProducts(filtered);
  }, [searchTerm, filters]);

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

    // Add filter chips logic
    filters.brands.forEach((brand) => {
      chips.push({
        id: brand,
        label: brand.charAt(0).toUpperCase() + brand.slice(1),
        category: "brands",
      });
    });

    filters.conditions.forEach((condition) => {
      const label = condition
        .replace("-", " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());
      chips.push({ id: condition, label, category: "conditions" });
    });

    filters.storage.forEach((storage) => {
      chips.push({
        id: storage,
        label: storage.toUpperCase(),
        category: "storage",
      });
    });

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
    <div className="min-h-screen bg-gray-50 pt-6">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            All Products
          </h1>
          <p className="text-gray-600">
            Discover our complete collection of refurbished smartphones
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="bg-white rounded-2xl p-4 mb-6 card-shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative flex items-center">
              <Search className="absolute left-3 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-1 border border-gray-300 rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={`h-8 w-8 p-0 ${
                  viewMode === "grid" ? "bg-blue-900 text-white" : "text-black"
                }`}
              >
                <Grid className="h-4 w-4 " />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={`h-8 w-8 p-0 ${
                  viewMode === "list" ? "bg-blue-900 text-white" : "text-black"
                }`}
              >
                <List className="h-4 w-4 " />
              </Button>
            </div>

            {/* Advanced Filter Button */}
            <Button
              variant={hasActiveFilters ? "default" : "outline"}
              onClick={() => setShowAdvancedFilters(true)}
              className="relative h-10.5 border border-gray-300"
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
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
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
              Try adjusting your search or filters
            </p>
            <Button onClick={handleClearFilters}>Clear Filters</Button>
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
    </div>
  );
}
