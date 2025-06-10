"use client";

import { useState, useEffect } from "react";
import { ChevronRight, Smartphone, Shield, Zap } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const heroFeatures = [
  { icon: Shield, text: "Quality Guaranteed" },
  { icon: Zap, text: "Fast Delivery" },
  { icon: Smartphone, text: "Latest Models" },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Premium Refurbished",
      subtitle: "Smartphones",
      description: "Get the latest technology at unbeatable prices",
      image: "/images/phone/i14promax.jpg",
      cta: "Shop Now",
    },
    {
      title: "Eco-Friendly",
      subtitle: "Choice",
      description: "Reduce waste while saving money on quality phones",
      image: "/images/phone/s23ultra.jpg",
      cta: "Learn More",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-900 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-900 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen py-20">
          {/* Content */}
          <motion.div
            className="flex-1 text-center lg:text-left mb-12 lg:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                <span className="text-blue-900">
                  {slides[currentSlide].title}
                </span>
                <br />
                {slides[currentSlide].subtitle}
              </h1>

              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
                {slides[currentSlide].description}
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Link
                href="/categories"
                className="btn-primary inline-flex items-center justify-center"
              >
                {slides[currentSlide].cta}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="/about" className="btn-secondary">
                Learn More
              </Link>
            </motion.div>

            {/* Features */}
            <motion.div
              className="flex flex-wrap justify-center lg:justify-start gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {heroFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2 text-gray-700"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <feature.icon className="h-5 w-5 text-blue-900" />
                  <span className="font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            className="flex-1 relative max-w-md mx-auto lg:max-w-lg"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-[312px] h-[312px] lg:w-[512px] lg:h-[512px]"
            >
              <div className="relative w-full h-full">
                <Image
                  src={slides[currentSlide].image || "/placeholder.svg"}
                  alt="Refurbished Smartphone"
                  fill
                  sizes="(max-width: 1024px) 312px, 512px"
                  className="rounded-3xl shadow-2xl object-contain"
                  priority
                />
              </div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-lg z-10"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <div className="text-2xl font-bold text-blue-900">50%</div>
                <div className="text-sm text-gray-600">OFF</div>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 z-10 bg-blue-900 text-white rounded-2xl p-4 shadow-lg"
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 1.5,
                }}
              >
                <div className="text-sm font-semibold">Quality</div>
                <div className="text-sm">Guaranteed</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-blue-900 w-8" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
