import { motion, AnimatePresence } from 'framer-motion'
import {
  Leaf,
  Truck,
  GraduationCap,
  LineChart,
  Factory,
  Globe,
} from 'lucide-react'
import React, { useState, useEffect } from 'react'
import api from '../services/api'; // Import the api service

// A map to associate service titles with icons, as icons can't be stored in the DB.
const iconMap = {
  'Farm Advisory & Consulting': <Leaf className="w-8 h-8 text-green-600" />,
  'Post-Harvest Handling & Quality Management': <Truck className="w-8 h-8 text-green-600" />,
  'Market Linkages & Export Facilitation': <Globe className="w-8 h-8 text-green-600" />,
  'Training & Capacity Building': <GraduationCap className="w-8 h-8 text-green-600" />,
  'Sustainability & Climate-Smart Agriculture': <LineChart className="w-8 h-8 text-green-600" />,
  'Supply Chain & Value Addition Support': <Factory className="w-8 h-8 text-green-600" />,
};

export default function Services() {
  const [activeId, setActiveId] = useState(null)
  const [services, setServices] = useState([]); // Initialize with an empty array

  useEffect(() => {
    // Fetch services from the backend when the component mounts
    const fetchServices = async () => {
      try {
        const response = await api.get('/content/services');
        // Assuming the backend returns an array of services with _id, title, and desc
        const servicesWithIcons = response.data.map(service => ({
          ...service,
          id: service._id, // Use MongoDB's _id
          icon: iconMap[service.title] || <Leaf className="w-8 h-8 text-green-600" /> // Assign icon
        }));
        setServices(servicesWithIcons);
      } catch (error) {
        console.error("Failed to fetch services:", error);
        // Optionally, set an error state to show a message to the user
      }
    };

    fetchServices();
  }, []); // The empty dependency array ensures this runs only once

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
