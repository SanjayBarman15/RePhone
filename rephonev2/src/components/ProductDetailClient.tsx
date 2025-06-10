"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Heart,
  ShoppingCart,
  Share2,
  Shield,
  Truck,
  RotateCcw,
  Check,
  Minus,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useRecentlyViewed } from "@/contexts/RecentlyViewedContext";
import ProductImageGallery from "@/components/ProductImageGallery";
import ProductSpecifications from "@/components/ProductSpecifications";
import ProductReviews from "@/components/ProductReviews";
import RelatedProducts from "@/components/RelatedProducts";
import CompareButton from "@/components/CompareButton";

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  gallery_images: string[];
  condition: string;
  storage: string;
  color: string;
  category: string;
  description: string;
  specifications: {
    display: {
      size: string;
      type: string;
      resolution: string;
      features: string[];
    };
    performance: {
      processor: string;
      ram: string;
      storage: string;
      os: string;
    };
    camera: {
      rear: string;
      front: string;
      features: string[];
    };
    battery: {
      capacity: string;
      charging: string;
      life: string;
    };
    connectivity: {
      network: string;
      wifi: string;
      bluetooth: string;
      other: string[];
    };
    physical: {
      dimensions: string;
      weight: string;
      materials: string;
      colors: string[];
    };
  };
  warranty: string;
  inStock: boolean;
  stockCount: number;
  features: string[];
}

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({
  product,
}: ProductDetailClientProps) {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToRecentlyViewed } = useRecentlyViewed();
  const hasAddedToRecentlyViewed = useRef(false);

  const isFavorite = isInWishlist(product.id);

  // Add to recently viewed when component mounts
  useEffect(() => {
    if (!hasAddedToRecentlyViewed.current) {
      addToRecentlyViewed({
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        originalPrice: product.originalPrice,
        rating: product.rating,
        reviews: product.reviews,
        image: product.image,
        condition: product.condition,
        storage: product.storage,
        color: product.color,
        category: product.category,
      });
      hasAddedToRecentlyViewed.current = true;
    }
  }, [product.id]); // Only depend on product.id since that's what we care about

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "specifications", label: "Specifications" },
    { id: "reviews", label: "Reviews" },
  ];

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
    });
  };

  const handleToggleWishlist = () => {
    if (isFavorite) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        originalPrice: product.originalPrice,
        rating: product.rating,
        reviews: product.reviews,
        image: product.image,
        condition: product.condition,
        storage: product.storage,
        color: product.color,
        category: product.category,
      });
    }
  };

  const savings = product.originalPrice - product.price;
  const savingsPercentage = Math.round((savings / product.originalPrice) * 100);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container-custom">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-900 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/categories"
              className="hover:text-blue-900 transition-colors"
            >
              Categories
            </Link>
            <span>/</span>
            <Link
              href={`/categories/${product.category.toLowerCase()}`}
              className="hover:text-blue-900 transition-colors"
            >
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ProductImageGallery
              images={[product.image, ...product.gallery_images]}
              productName={product.name}
            />
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium text-blue-900 bg-blue-100 px-2 py-1 rounded-full">
                  {product.brand}
                </span>
                <span className="text-sm font-medium text-green-800 bg-green-100 px-2 py-1 rounded-full">
                  {product.condition}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-gray-600">
                {product.storage} • {product.color}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-lg font-semibold text-gray-900 ml-2">
                  {product.rating}
                </span>
              </div>
              <span className="text-gray-600">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-gray-900">
                  ${product.price}
                </span>
                <span className="text-2xl text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600 font-semibold">
                  Save ${savings}
                </span>
                <span className="bg-red-100 text-red-800 text-sm font-semibold px-2 py-1 rounded-full">
                  {savingsPercentage}% OFF
                </span>
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              {product.inStock ? (
                <>
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-green-600 font-medium">
                    In Stock ({product.stockCount} available)
                  </span>
                </>
              ) : (
                <span className="text-red-600 font-medium">Out of Stock</span>
              )}
            </div>

            {/* Key Features */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                Key Features{" "}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-200 rounded-xl">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-50 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-3 font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-gray-50 transition-colors"
                    disabled={quantity >= product.stockCount}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-gray-600">
                  Total:{" "}
                  <span className="font-semibold text-gray-900">
                    ${(product.price * quantity).toFixed(2)}
                  </span>
                </span>
              </div>

              <div className="flex gap-3">
                <motion.button
                  onClick={handleAddToCart}
                  className="flex-1 bg-blue-900 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  whileTap={{ scale: 0.98 }}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </motion.button>

                <CompareButton product={product} />

                <motion.button
                  onClick={handleToggleWishlist}
                  className="p-4 border-2 border-gray-200 rounded-xl hover:border-red-300 transition-colors"
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart
                    className={`h-5 w-5 ${
                      isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
                    }`}
                  />
                </motion.button>

                <motion.button
                  className="p-4 border-2 border-gray-200 rounded-xl hover:border-blue-300 transition-colors"
                  whileTap={{ scale: 0.95 }}
                >
                  <Share2 className="h-5 w-5 text-gray-400" />
                </motion.button>
              </div>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center">
                <Shield className="h-8 w-8 text-blue-900 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-900">
                  {product.warranty}
                </div>
                <div className="text-xs text-gray-600">Warranty</div>
              </div>
              <div className="text-center">
                <Truck className="h-8 w-8 text-blue-900 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-900">
                  Free Shipping
                </div>
                <div className="text-xs text-gray-600">2-3 days</div>
              </div>
              <div className="text-center">
                <RotateCcw className="h-8 w-8 text-blue-900 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-900">
                  30-Day Returns
                </div>
                <div className="text-xs text-gray-600">Money back</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 mb-8">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    selectedTab === tab.id
                      ? "border-blue-900 text-blue-900"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                  {tab.id === "reviews" && (
                    <span className="ml-2 bg-gray-100 text-gray-600 py-1 px-2 rounded-full text-xs">
                      {product.reviews}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {selectedTab === "overview" && (
                <div className="prose max-w-none">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Product Overview
                  </h3>
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    {product.description}
                  </p>

                  <div className="grid md:grid-cols-2 gap-8 not-prose">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">
                        What's Included
                      </h4>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-600" />
                          <span className="text-gray-700">{product.name}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-600" />
                          <span className="text-gray-700">Charging cable</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-600" />
                          <span className="text-gray-700">Documentation</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-600" />
                          <span className="text-gray-700">
                            {product.warranty} warranty
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">
                        Condition Details
                      </h4>
                      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="font-semibold text-green-800">
                            {product.condition}
                          </span>
                        </div>
                        <p className="text-green-700 text-sm">
                          {product.condition === "Excellent"
                            ? "Like new with minimal signs of use. Screen and body in pristine condition."
                            : product.condition === "Very Good"
                            ? "Minor cosmetic wear that doesn't affect functionality. Screen is perfect."
                            : "Some visible wear but fully functional. Great value for money."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedTab === "specifications" && (
                <ProductSpecifications
                  specifications={product.specifications}
                />
              )}

              {selectedTab === "reviews" && (
                <ProductReviews
                  productId={product.id}
                  rating={product.rating}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Related Products */}
        <RelatedProducts currentProduct={product} />
      </div>
    </div>
  );
}
