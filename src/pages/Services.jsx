import React, { useState } from 'react'
import {
  Leaf,
  Truck,
  GraduationCap,
  LineChart,
  Factory,
  Globe,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Services() {
  const [activeId, setActiveId] = useState(null)

  const services = [
    {
      id: 1,
      title: 'Farm Advisory & Consulting',
      icon: <Leaf className="w-8 h-8 text-green-600" />,
      desc: `Our agronomists work closely with farmers to develop customized production plans 
      that boost yields and profitability. We conduct detailed soil analysis, crop selection guidance, 
      pest and disease management, and irrigation planning. By combining data-driven insights with 
      sustainable practices, we help farmers make informed decisions for every planting season.`,
    },
    {
      id: 2,
      title: 'Post-Harvest Handling & Quality Management',
      icon: <Truck className="w-8 h-8 text-green-600" />,
      desc: `We provide expert guidance on proper post-harvest handling to maintain freshness, reduce losses, 
      and meet international quality standards. Our team trains farmers and aggregators on best practices 
      for sorting, grading, packaging, and cold storage.`,
    },
    {
      id: 3,
      title: 'Market Linkages & Export Facilitation',
      icon: <Globe className="w-8 h-8 text-green-600" />,
      desc: `Avotak Africa connects producers directly with reliable buyers, distributors, and export channels 
      across East Africa and beyond. We assist in meeting compliance and certification requirements, 
      coordinate logistics, and facilitate long-term partnerships for consistent market access.`,
    },
    {
      id: 4,
      title: 'Training & Capacity Building',
      icon: <GraduationCap className="w-8 h-8 text-green-600" />,
      desc: `We organize on-site and virtual training sessions focused on modern agricultural techniques, 
      agribusiness management, and food safety. Our workshops help farmers, youth groups, 
      and agribusiness teams enhance their technical skills and competitiveness.`,
    },
    {
      id: 5,
      title: 'Sustainability & Climate-Smart Agriculture',
      icon: <LineChart className="w-8 h-8 text-green-600" />,
      desc: `Our sustainability programs promote environmentally responsible farming practices. 
      We support climate adaptation through soil conservation, organic inputs, water efficiency, 
      and agroforestry initiatives to build resilient farming systems.`,
    },
    {
      id: 6,
      title: 'Supply Chain & Value Addition Support',
      icon: <Factory className="w-8 h-8 text-green-600" />,
      desc: `From farm to market, we help streamline your supply chain operations and identify 
      opportunities for value addition. Whether through processing, branding, or packaging innovations, 
      Avotak Africa empowers agripreneurs to increase profitability.`,
    },
  ]

  const toggleDescription = (id) => {
    setActiveId(activeId === id ? null : id)
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-green-800">
        Our Services
      </h1>
      <p className="text-gray-700 text-center max-w-3xl mx-auto mb-12">
        Avotak Africa Ltd provides end-to-end agricultural solutions designed to help farmers,
        cooperatives, and agribusinesses thrive — from the soil to the market shelf.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((s) => {
          const isActive = activeId === s.id
          return (
            <motion.article
              key={s.id}
              onClick={() => toggleDescription(s.id)}
              className={`rounded-2xl p-6 cursor-pointer shadow transition-all duration-300 border 
                ${
                  isActive
                    ? 'bg-green-50 border-green-400 shadow-lg'
                    : 'bg-white border-transparent hover:shadow-lg'
                }`}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-3 mb-4">
                {s.icon}
                <h3 className="font-semibold text-xl text-green-700">
                  {s.title}
                </h3>
              </div>

              <AnimatePresence>
                {isActive && (
                  <motion.p
                    key={s.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="text-gray-600 leading-relaxed overflow-hidden"
                  >
                    {s.desc}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}
