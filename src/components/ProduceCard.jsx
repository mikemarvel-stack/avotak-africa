import React from 'react'
import { motion } from 'framer-motion'
// Optional: import a placeholder image if needed
import placeholderImg from '../assets/placeholder-fruit.svg'

export default function ProduceCard({ item }) {
  return (
    <motion.article
      layout
      whileHover={{ y: -6 }}
      className="bg-white rounded-2xl shadow p-4"
    >
      <img
        src={item.image || placeholderImg}
        alt={item.name}
        className="w-full h-40 object-cover rounded-lg mb-3"
      />
      <h3 className="font-semibold text-lg">{item.name}</h3>
      <p className="text-sm text-gray-600">{item.description}</p>
      <div className="mt-3 text-sm text-gray-700">Origin: {item.origin}</div>
    </motion.article>
  )
}
