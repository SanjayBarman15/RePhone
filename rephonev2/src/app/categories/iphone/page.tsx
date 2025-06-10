"use client";

import { product_data } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";

export default function IphonePage() {
  const iphoneProducts = product_data.filter(
    (product) => product.brand === "Apple"
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-6">
      <div className="container-custom">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            iPhone Models
          </h1>
          <p className="text-gray-600">
            Explore our collection of refurbished iPhones
          </p>
        </motion.div>

        {iphoneProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 space-y-0">
            {iphoneProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ProductCard product={product} viewMode="grid" />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-6xl mb-4">📱</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No iPhones found
            </h3>
            <p className="text-gray-600 mb-6">
              Check back later for more iPhone models!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
