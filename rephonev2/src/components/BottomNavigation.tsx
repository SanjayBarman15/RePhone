"use client"

import { Home, Grid3X3, ShoppingCart, User, Heart } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCart } from "@/contexts/CartContext"
import { useWishlist } from "@/contexts/WishlistContext"
import { motion } from "framer-motion"

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Grid3X3, label: "Categories", href: "/categories" },
  { icon: Heart, label: "Wishlist", href: "/wishlist" },
  { icon: ShoppingCart, label: "Cart", href: "/cart" },
  { icon: User, label: "Profile", href: "/profile" },
]

export default function BottomNavigation() {
  const pathname = usePathname()
  const { cartItems } = useCart()
  const { getTotalItems } = useWishlist()

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const wishlistItemCount = getTotalItems()

  return (
    <motion.nav
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 lg:hidden"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          const isCart = item.label === "Cart"
          const isWishlist = item.label === "Wishlist"

          return (
            <Link key={item.href} href={item.href} className="flex-1">
              <motion.div
                className={`flex flex-col items-center py-2 px-1 relative ${
                  isActive ? "text-blue-900" : "text-gray-500"
                }`}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="relative">
                  <Icon size={24} className={isActive ? "stroke-2" : "stroke-1.5"} />
                  {isCart && cartItemCount > 0 && (
                    <motion.span
                      className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    >
                      {cartItemCount > 9 ? "9+" : cartItemCount}
                    </motion.span>
                  )}
                  {isWishlist && wishlistItemCount > 0 && (
                    <motion.span
                      className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    >
                      {wishlistItemCount > 9 ? "9+" : wishlistItemCount}
                    </motion.span>
                  )}
                </div>
                <span className={`text-xs mt-1 font-medium ${isActive ? "text-blue-900" : "text-gray-500"}`}>
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    className="absolute -top-1 left w-4 h-1 bg-yellow-600 rounded-full"
                    layoutId="activeIndicator"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.div>
            </Link>
          )
        })}
      </div>
    </motion.nav>
  )
}
