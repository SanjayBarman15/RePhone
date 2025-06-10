"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Apple, SmartphoneIcon as Android } from "lucide-react";

const categories = [
  {
    id: "iphone",
    name: "iPhone",
    description: "Premium Apple devices",
    image: Apple,
    count: "120+ models",
    color: "from-gray-100 to-gray-200",
  },
  {
    id: "samsung",
    name: "Samsung",
    description: "Galaxy series & more",
    image: Android,
    count: "80+ models",
    color: "from-blue-100 to-blue-200",
  },
  {
    id: "google",
    name: "Google Pixel",
    description: "Pure Android experience",
    image: Android,
    count: "25+ models",
    color: "from-green-100 to-green-200",
  },
  {
    id: "oneplus",
    name: "OnePlus",
    description: "Never settle",
    image: Android,
    count: "15+ models",
    color: "from-red-100 to-red-200",
  },
];

export default function CategoryGrid() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by <span className="text-blue-900">Brand</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find your perfect refurbished smartphone from top brands
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href={`/categories/${category.id}`}>
                <div
                  className={`bg-gradient-to-br ${category.color} rounded-2xl p-6 h-full card-shadow group cursor-pointer`}
                >
                  <div className="text-center">
                    <div className="mb-4 relative flex items-center justify-center">
                      <category.image className="w-16 h-16 md:w-20 md:h-20 text-blue-900 group-hover:scale-110 transition-transform duration-300" />
                    </div>

                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                      {category.name}
                    </h3>

                    <p className="text-sm text-gray-600 mb-3">
                      {category.description}
                    </p>

                    <div className="text-xs font-semibold text-blue-900 bg-white/80 rounded-full px-3 py-1 inline-block">
                      {category.count}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
