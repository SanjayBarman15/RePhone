"use client";

import { motion } from "framer-motion";
import {
  User,
  Settings,
  Heart,
  Package,
  CreditCard,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const menuItems = [
  {
    icon: User,
    label: "Personal Information",
    description: "Update your profile details",
  },
  {
    icon: Package,
    label: "Order History",
    description: "View your past orders",
    href: "/oder-history",
  },
  {
    icon: Heart,
    label: "Wishlist",
    description: "Your saved items",
    href: "/wishlist",
  },
  {
    icon: CreditCard,
    label: "Payment Methods",
    description: "Manage your payment options",
  },
  {
    icon: Settings,
    label: "Settings",
    description: "App preferences and notifications",
  },
  {
    icon: HelpCircle,
    label: "Help & Support",
    description: "Get help and contact support",
    href: "/contact",
  },
];

export default function ProfilePage() {
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
            Profile
          </h1>
          <p className="text-gray-600">Manage your account and preferences</p>
        </motion.div>

        {/* Profile Header */}
        <motion.div
          className="bg-white rounded-2xl p-6 mb-8 card-shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">John Doe</h2>
              <p className="text-gray-600">john.doe@example.com</p>
              <p className="text-sm text-blue-900 font-medium">
                Premium Member
              </p>
            </div>
          </div>
        </motion.div>

        {/* Menu Items */}
        <div className="grid gap-4">
          {menuItems.map((item, index) => (
            <Link href={item.href || "#"} key={index}>
              <motion.button
                className="bg-white rounded-2xl p-6 card-shadow text-left hover:bg-gray-50 transition-colors w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.05 }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-blue-900" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {item.label}
                    </h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              </motion.button>
            </Link>
          ))}
        </div>

        {/* Sign Out Button */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button
            variant="outline"
            className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300 transition-all duration-300 gap-2 px-6"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
