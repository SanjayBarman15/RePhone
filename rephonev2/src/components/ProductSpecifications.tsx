"use client"

import { motion } from "framer-motion"
import { Monitor, Cpu, Camera, Battery, Wifi, Smartphone } from "lucide-react"

interface SpecificationSection {
  [key: string]: string | string[]
}

interface Specifications {
  display: SpecificationSection
  performance: SpecificationSection
  camera: SpecificationSection
  battery: SpecificationSection
  connectivity: SpecificationSection
  physical: SpecificationSection
}

interface ProductSpecificationsProps {
  specifications: Specifications
}

const sectionIcons = {
  display: Monitor,
  performance: Cpu,
  camera: Camera,
  battery: Battery,
  connectivity: Wifi,
  physical: Smartphone,
}

const sectionTitles = {
  display: "Display",
  performance: "Performance",
  camera: "Camera",
  battery: "Battery",
  connectivity: "Connectivity",
  physical: "Physical",
}

export default function ProductSpecifications({ specifications }: ProductSpecificationsProps) {
  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold text-gray-900">Technical Specifications</h3>

      <div className="grid gap-8">
        {Object.entries(specifications).map(([sectionKey, section], index) => {
          const Icon = sectionIcons[sectionKey as keyof typeof sectionIcons]
          const title = sectionTitles[sectionKey as keyof typeof sectionTitles]

          return (
            <motion.div
              key={sectionKey}
              className="bg-gray-50 rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-900 rounded-xl flex items-center justify-center">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900">{title}</h4>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(section).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between items-start py-3 border-b border-gray-200 last:border-b-0"
                  >
                    <span className="text-gray-600 capitalize font-medium">
                      {key.replace(/([A-Z])/g, " $1").trim()}:
                    </span>
                    <div className="text-right">
                      {Array.isArray(value) ? (
                        <div className="space-y-1">
                          {value.map((item, idx) => (
                            <div key={idx} className="text-gray-900 text-sm">
                              {item}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-900 font-medium">{value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
