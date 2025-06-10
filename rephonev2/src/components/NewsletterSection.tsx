"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, CheckCircle } from "lucide-react"

export default function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-blue-900 to-blue-800">
      <div className="container-custom">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6">
            <Mail className="h-8 w-8 text-white" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Stay Updated</h2>

          <p className="text-lg text-blue-100 mb-8">Get notified about new arrivals, exclusive deals, and tech tips</p>

          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-white/50 focus:outline-none text-gray-900 bg-white"
              required
            />

            <motion.button
              type="submit"
              className="bg-white text-blue-900 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
              whileTap={{ scale: 0.98 }}
              disabled={isSubscribed}
            >
              {isSubscribed ? (
                <>
                  <CheckCircle className="h-5 w-5" />
                  Subscribed!
                </>
              ) : (
                "Subscribe"
              )}
            </motion.button>
          </motion.form>

          {isSubscribed && (
            <motion.p
              className="text-green-300 mt-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              Thank you for subscribing! Check your email for confirmation.
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
