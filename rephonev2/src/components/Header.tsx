"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Menu,
  X,
  ShoppingCart,
  User,
  Heart,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import ChatInterface from "@/components/ChatInterface";
import { useWishlist } from "@/contexts/WishlistContext";
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartItems } = useCart();
  const { getTotalItems } = useWishlist();

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistItemCount = getTotalItems();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Updated nav items - replaced iPhone/Samsung with AI Chat
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Categories", href: "/categories" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-white/80 backdrop-blur-sm"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <motion.div
                className="w-8 h-8 md:w-10 md:h-10 bg-blue-900 rounded-lg flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-white font-bold text-lg md:text-xl">
                  R
                </span>
              </motion.div>
              <span className="text-xl md:text-2xl font-bold text-gray-900">
                Re<span className="text-blue-900">Phone</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    className="text-gray-700 hover:text-blue-900 font-medium transition-colors relative group"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-900 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </div>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Search */}
              <motion.button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-700 hover:text-blue-900 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Search className="h-5 w-5" />
              </motion.button>

              {/* Wishlist */}
              <Link href="/wishlist">
                <motion.div
                  className="relative p-2 text-gray-700 hover:text-blue-900 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart className="h-5 w-5" />
                  {wishlistItemCount > 0 && (
                    <motion.span
                      className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 15,
                      }}
                    >
                      {wishlistItemCount > 9 ? "9+" : wishlistItemCount}
                    </motion.span>
                  )}
                </motion.div>
              </Link>

              {/* Cart */}
              <Link href="/cart">
                <motion.div
                  className="relative p-2 text-gray-700 hover:text-blue-900 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemCount > 0 && (
                    <motion.span
                      className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 15,
                      }}
                    >
                      {cartItemCount > 9 ? "9+" : cartItemCount}
                    </motion.span>
                  )}
                </motion.div>
              </Link>

              {/* AI Chat  Desktop*/}
              <Link href="">
                <motion.div
                  className="p-2 text-gray-700 hover:text-blue-900 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setIsChatOpen(true);
                    setIsMenuOpen(false);
                  }}
                >
                  <MessageCircle className="h-5 w-5" />
                </motion.div>
              </Link>

              {/* Profile */}
              <Link href="/profile">
                <motion.div
                  className="p-2 text-gray-700 hover:text-blue-900 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <User className="h-5 w-5" />
                </motion.div>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-2 md:hidden">
              <motion.button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-700"
                whileTap={{ scale: 0.95 }}
              >
                <Search className="h-5 w-5" />
              </motion.button>

              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-700"
                whileTap={{ scale: 0.95 }}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="lg:hidden bg-white border-t border-gray-200"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container-custom py-4">
                <nav className="space-y-4">
                  {navItems.map((item) => (
                    <div key={item.label}>
                      <Link
                        href={item.href}
                        className="block text-gray-700 hover:text-blue-900 font-medium py-2 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </div>
                  ))}
                  {/* AI Chat Option in Mobile Dropdown */}
                  <div>
                    <button
                      onClick={() => {
                        setIsChatOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center gap-3 text-gray-700 hover:text-blue-900 font-medium py-2 transition-colors w-full text-left"
                    >
                      <MessageCircle className="h-5 w-5" />
                      AI Chat
                    </button>
                  </div>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 w-full max-w-2xl mx-4"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-4 mb-4">
                <Search className="h-6 w-6 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for phones, brands, models..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 text-lg outline-none"
                  autoFocus
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {searchQuery && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-500 mb-3">Popular searches</p>
                  {[
                    "iPhone 13",
                    "Samsung Galaxy",
                    "Google Pixel",
                    "OnePlus",
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      className="block w-full text-left p-3 hover:bg-gray-50 rounded-xl transition-colors"
                      onClick={() => {
                        setSearchQuery(suggestion);
                        setIsSearchOpen(false);
                      }}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Interface */}
      <ChatInterface isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* Spacer for fixed header */}
      <div className="h-16 md:h-20"></div>
    </>
  );
}
