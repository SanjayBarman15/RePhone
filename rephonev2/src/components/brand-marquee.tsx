"use client";

import { Apple, Smartphone, Zap, Cpu, Wifi, Battery } from "lucide-react";

export default function BrandMarquee() {
  const brands = [
    { name: "Apple", icon: Apple },
    { name: "Samsung", icon: Smartphone },
    { name: "Google", icon: Smartphone },
    { name: "OnePlus", icon: Zap },
    { name: "Xiaomi", icon: Smartphone },
    { name: "Huawei", icon: Wifi },
    { name: "Sony", icon: Smartphone },
    { name: "Motorola", icon: Smartphone },
    { name: "Nokia", icon: Battery },
    { name: "Oppo", icon: Cpu },
    { name: "Vivo", icon: Smartphone },
    { name: "Realme", icon: Smartphone },
  ];

  return (
    <section className="py-8 bg-gradient-to-r from-gray-50 to-white">
      <div className="mb-6 text-center">
        <p className="text-sm text-gray-600 font-medium">
          Trusted by millions worldwide
        </p>
      </div>

      <div className="relative overflow-hidden">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white to-transparent z-10"></div>

        {/* Marquee container */}
        <div className="flex whitespace-nowrap">
          {/* First set of brands */}
          <div className="flex animate-marquee animate-marquee-pause">
            {brands.map((brand, index) => {
              const Icon = brand.icon;
              return (
                <div
                  key={`${brand.name}-${index}`}
                  className="flex items-center justify-center min-w-[200px] px-8 py-4 mx-4"
                >
                  <div className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 transition-colors duration-300">
                    <Icon className="w-8 h-8" />
                    <span className="text-lg font-semibold whitespace-nowrap">
                      {brand.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Duplicate set for seamless loop */}
          <div
            className="flex animate-marquee animate-marquee-pause"
            aria-hidden="true"
          >
            {brands.map((brand, index) => {
              const Icon = brand.icon;
              return (
                <div
                  key={`${brand.name}-${index}-duplicate`}
                  className="flex items-center justify-center min-w-[200px] px-8 py-4 mx-4"
                >
                  <div className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 transition-colors duration-300">
                    <Icon className="w-8 h-8" />
                    <span className="text-lg font-semibold whitespace-nowrap">
                      {brand.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
