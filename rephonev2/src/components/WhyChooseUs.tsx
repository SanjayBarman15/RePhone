"use client"

import { motion } from "framer-motion"
import { Shield, Truck, RotateCcw, Award, Headphones, Zap } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Quality Guarantee",
    description: "Every device undergoes rigorous testing and comes with our quality guarantee",
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Fast and free delivery on all orders over $50 with tracking included",
  },
  {
    icon: RotateCcw,
    title: "30-Day Returns",
    description: "Not satisfied? Return your device within 30 days for a full refund",
  },
  {
    icon: Award,
    title: "Certified Refurbished",
    description: "All devices are professionally refurbished and certified by our experts",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our customer support team is available around the clock to help you",
  },
  {
    icon: Zap,
    title: "Instant Activation",
    description: "Ready to use out of the box with all major carriers worldwide",
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose <span className="text-blue-900">RePhone</span>?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're committed to providing the best refurbished smartphone experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="text-center group"
            >
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-6 group-hover:bg-blue-900 group-hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <feature.icon className="h-8 w-8 text-blue-900 group-hover:text-white transition-colors duration-300" />
              </motion.div>

              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-900 transition-colors duration-300">
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
