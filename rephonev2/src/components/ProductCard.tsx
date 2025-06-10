"use client";

import { motion } from "framer-motion";
import { Star, Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import Link from "next/link";
import CompareButton from "@/components/CompareButton";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  condition: string;
  storage: string;
  color: string;
}

interface ProductCardProps {
  product: Product;
  viewMode?: "grid" | "list";
}

export default function ProductCard({
  product,
  viewMode = "grid",
}: ProductCardProps) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const isFavorite = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
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
      });
    }
  };

  if (viewMode === "list") {
    return (
      <Link href={`/product/${product.id}`}>
        <motion.div
          className="bg-white rounded-2xl p-3 card-shadow flex flex-col sm:flex-row sm:items-center gap-3 w-full min-h-[150px]"
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="flex-shrink-0 flex justify-center">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={120}
              height={120}
              className="w-24 h-24 sm:w-32 sm:h-32 object-contain rounded-xl"
            />
          </div>

          <div className="flex-1 min-w-0 space-y-1.5">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2">
              {product.name}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 line-clamp-1">
              {product.storage} • {product.color}
            </p>
            <div className="flex items-center gap-2">
              <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-xs sm:text-sm font-medium text-gray-700">
                {product.rating}
              </span>
              <span className="text-xs sm:text-sm text-gray-500">
                ({product.reviews})
              </span>
              <Badge className="bg-green-100 text-green-800 text-xs sm:text-sm font-semibold px-2 py-0.5 rounded-full">
                {product.condition}
              </Badge>
            </div>
          </div>

          {/* Price and Action Buttons */}
          <div className="flex flex-col sm:flex-col items-start sm:items-end justify-center gap-2 sm:pl-4">
            <div className="flex flex-col items-start sm:items-end gap-0.5">
              <span className="text-lg sm:text-xl font-bold text-gray-900">
                ${product.price}
              </span>
              <span className="text-sm sm:text-base text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <CompareButton
                product={product}
                className="flex-1 sm:flex-none text-xs sm:text-sm py-1.5 px-2"
              />

              <motion.button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleAddToCart();
                }}
                className="bg-blue-900 text-white px-2 py-1.5 rounded-lg text-xs sm:text-sm font-semibold hover:bg-blue-800 transition-colors flex items-center justify-center gap-1 flex-1 sm:flex-none"
                whileTap={{ scale: 0.98 }}
              >
                <ShoppingCart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Add
              </motion.button>

              <motion.button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleToggleWishlist();
                }}
                className="p-1.5 rounded-full hover:bg-gray-100 flex-shrink-0"
                whileTap={{ scale: 0.9 }}
              >
                <Heart
                  className={`h-4 w-4 sm:h-5 sm:w-5 ${
                    isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
                  }`}
                />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </Link>
    );
  }

  return (
    <Link href={`/product/${product.id}`}>
      <motion.div
        className="bg-white rounded-2xl p-4 card-shadow group cursor-pointer"
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="relative mb-4">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-48 object-contain rounded-xl group-hover:scale-105 transition-transform duration-300"
          />

          <motion.button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleToggleWishlist();
            }}
            className="absolute top-2 right-2 p-2 bg-white/90 rounded-full shadow-md"
            whileTap={{ scale: 0.9 }}
          >
            <Heart
              className={`h-4 w-4 ${
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
              }`}
            />
          </motion.button>

          <div className="absolute top-2 left-2 bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
            {product.condition}
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-900 transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600">
              {product.storage} • {product.color}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-gray-700 ml-1">
                {product.rating}
              </span>
            </div>
            <span className="text-sm text-gray-500">({product.reviews})</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900">
              ${product.price}
            </span>
            <span className="text-sm text-gray-500 line-through">
              ${product.originalPrice}
            </span>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <CompareButton product={product} className="flex-1" />
          </div>

          <motion.button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleAddToCart();
            }}
            className="w-full bg-blue-900 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-800 transition-colors"
            whileTap={{ scale: 0.98 }}
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </motion.button>
        </div>
      </motion.div>
    </Link>
  );
}
