"use client"

import { motion } from "framer-motion"
import { Phone, Mail, Clock, Shield, Truck, RotateCcw, Award } from "lucide-react"
import Link from "next/link"

const quickLinks = [
  { label: "Track Order", href: "/track" },
  { label: "Help Center", href: "/help" },
  { label: "Returns", href: "/returns" },
  { label: "Contact", href: "/contact" },
]

const guarantees = [
  { icon: Shield, label: "Quality Guaranteed", description: "Tested & certified" },
  { icon: Truck, label: "Free Shipping", description: "On orders $50+" },
  { icon: RotateCcw, label: "30-Day Returns", description: "Money back guarantee" },
  { icon: Award, label: "1-Year Warranty", description: "Peace of mind" },
]

export default function MobileFooter() {
  return (
    <footer className="bg-gray-900 text-white lg:hidden">
      {/* Guarantees Section */}
      <div className="bg-blue-900 py-6">
        <div className="container-custom">
          <div className="grid grid-cols-2 gap-4">
            {guarantees.map((item, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <item.icon className="h-6 w-6 text-blue-100 mx-auto mb-2" />
                <div className="text-sm font-semibold text-white">{item.label}</div>
                <div className="text-xs text-blue-100">{item.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-custom py-8">
        {/* Brand Section */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/" className="inline-flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span className="text-xl font-bold">
              Re<span className="text-blue-400">Phone</span>
            </span>
          </Link>
          <p className="text-gray-300 text-sm leading-relaxed">
            Your trusted destination for premium refurbished smartphones. Quality guaranteed, planet-friendly choice.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h3 className="text-lg font-semibold mb-4 text-center">Quick Links</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="bg-gray-800 rounded-xl p-3 text-center text-sm font-medium hover:bg-gray-700 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold mb-4 text-center">Get in Touch</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-3 text-gray-300">
              <Phone className="h-4 w-4 text-blue-400" />
              <span className="text-sm">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-gray-300">
              <Mail className="h-4 w-4 text-blue-400" />
              <span className="text-sm">support@rephone.com</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-gray-300">
              <Clock className="h-4 w-4 text-blue-400" />
              <span className="text-sm">Mon-Fri 9AM-6PM EST</span>
            </div>
          </div>
        </motion.div>

        {/* Newsletter */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold mb-4 text-center">Stay Updated</h3>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
            <motion.button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Subscribe
            </motion.button>
          </div>
        </motion.div>

        {/* Bottom */}
        <motion.div
          className="pt-6 border-t border-gray-800 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-gray-400 text-xs mb-4">© 2024 RePhone. All rights reserved.</p>
          <div className="flex justify-center gap-6 text-xs">
            <Link href="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-blue-400 transition-colors">
              Terms
            </Link>
            <Link href="/cookies" className="text-gray-400 hover:text-blue-400 transition-colors">
              Cookies
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
