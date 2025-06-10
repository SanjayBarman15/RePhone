"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

import { Shield, Truck, Clock, Users } from "lucide-react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import MobileFooter from "@/components/MobileFooter";

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const stats = [
    { label: "Happy Customers", value: "10K+" },
    { label: "Phones Refurbished", value: "50K+" },
    { label: "Years Experience", value: "5+" },
    { label: "Team Members", value: "50+" },
  ];

  const features = [
    {
      icon: Shield,
      title: "Quality Guaranteed",
      description:
        "Every phone undergoes rigorous testing and quality checks to ensure the highest standards.",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description:
        "Quick and reliable shipping with real-time tracking to your doorstep.",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description:
        "Round-the-clock customer support to assist you with any queries.",
    },
    {
      icon: Users,
      title: "Expert Team",
      description:
        "Our team of certified technicians ensures the best refurbishment process.",
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "/images/team/m1.svg",
      bio: "With over 15 years in tech, Sarah leads RePhone's vision for sustainable technology and innovation.",
      linkedin: "https://linkedin.com/in/sarah-johnson",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "/images/team/m2.svg",
      bio: "Michael brings 12 years of experience in mobile technology and leads our technical operations.",
      linkedin: "https://linkedin.com/in/michael-chen",
    },
    {
      name: "Emma Rodriguez",
      role: "Head of Operations",
      image: "/images/team/m3.svg",
      bio: "Emma ensures our refurbishment process meets the highest quality standards and efficiency.",
      linkedin: "https://linkedin.com/in/emma-rodriguez",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gray-50 overflow-x-hidden"
    >
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative h-[60vh] md:h-[70vh] bg-gradient-to-r from-blue-900 to-blue-800 overflow-hidden"
      >
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="container-custom text-center text-white z-10 px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              About RePhone
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto"
            >
              Transforming the way people think about refurbished phones with
              quality, trust, and innovation.
            </motion.p>
          </div>
        </motion.div>
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>

      {/* Stats Section */}
      <div className="container-custom py-16 md:py-24 px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <h3 className="text-2xl md:text-4xl font-bold text-blue-900 mb-2">
                {stat.value}
              </h3>
              <p className="text-sm md:text-base text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Our Story Section */}
      <div className="bg-white py-16 md:py-24">
        <div className="container-custom px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-gray-600 mb-6">
                Founded in 2019, RePhone emerged from a simple idea: to make
                quality smartphones accessible to everyone while reducing
                electronic waste. What started as a small team of passionate
                tech enthusiasts has grown into a trusted name in the
                refurbished phone industry.
              </p>
              <p className="text-gray-600">
                Today, we&apos;re proud to serve thousands of customers
                worldwide, providing them with premium refurbished phones that
                look and perform like new, all while contributing to a more
                sustainable future.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden"
            >
              <Image
                src="/images/hero.svg"
                alt="Our Story"
                fill
                className="object-contain"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="container-custom px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We&apos;re committed to providing the best refurbished phone
              experience with our comprehensive services and quality assurance.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-4 md:p-6 h-full hover:shadow-lg transition-shadow">
                  <feature.icon className="h-10 w-10 md:h-12 md:w-12 text-blue-900 mb-4" />
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white py-16 md:py-24">
        <div className="container-custom px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Leadership Team
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet the passionate individuals driving innovation and excellence
              at RePhone.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="h-full"
              >
                <Card className="overflow-hidden group h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="relative h-48 md:h-64 flex-shrink-0 overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-contain transition-all duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </div>
                  <div className="p-4 md:p-6 flex flex-col flex-grow transition-colors duration-300 group-hover:bg-gray-50">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1 group-hover:text-blue-900 transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-blue-900 mb-2 md:mb-4 group-hover:text-blue-700 transition-colors duration-300">
                      {member.role}
                    </p>
                    <p className="text-sm md:text-base text-gray-600 mb-4 flex-grow group-hover:text-gray-700 transition-colors duration-300">
                      {member.bio}
                    </p>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-900 hover:text-blue-700 font-medium inline-flex items-center gap-2 transition-all duration-300 mt-auto group-hover:translate-x-1"
                    >
                      <svg
                        className="w-4 h-4 md:w-5 md:h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      Connect on LinkedIn
                    </a>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-900  py-16 md:py-24">
        <div className="container-custom text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Our Journey
            </h2>
            <p className="text-blue-100 mb-8">
              Experience the difference with RePhone. Quality refurbished
              phones, exceptional service, and a commitment to sustainability.
            </p>
            <Button
              size="lg"
              className="bg-white text-blue-900 hover:bg-blue-50 px-6 md:px-8 py-4 md:py-6 text-base md:text-lg"
            >
              Shop Now
            </Button>
          </motion.div>
        </div>
      </div>
      <MobileFooter/>
    </div>
  );
}
