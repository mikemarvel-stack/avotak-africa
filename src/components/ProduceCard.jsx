import React from 'react';
import { motion } from 'framer-motion';
import placeholderImg from '../assets/placeholder-fruit.svg';

export default function ProduceCard({ item }) {
  const categoryColors = {
    Fruit: 'bg-green-200 text-green-800',
    Vegetable: 'bg-yellow-200 text-yellow-800',
    Herb: 'bg-blue-200 text-blue-800',
    Spice: 'bg-red-200 text-red-800',
  };

  return (
    <motion.article
      layout
      className="relative bg-white rounded-2xl shadow-lg overflow-hidden"
      whileHover={{ scale: 1.03 }}
    >
      <img
        src={item.image || placeholderImg}
        alt={item.name}
        className="w-full h-40 object-cover rounded-t-2xl"
      />
      {/* Hover overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-4 rounded-t-2xl text-center"
      >
        {item.harvestSeason && <div className="text-sm mb-1">Harvest: {item.harvestSeason}</div>}
        {item.availability && <div className="text-sm">Availability: {item.availability}</div>}
      </motion.div>

      <div className="p-4">
        {/* Category badge with icon */}
        <span
          className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full ${
            categoryColors[item.category] || 'bg-gray-200 text-gray-800'
          }`}
        >
          {item.categoryIcon && <span>{item.categoryIcon}</span>}
          {item.category}
        </span>

        <h3 className="font-semibold text-lg mt-2">{item.name}</h3>
        <p className="text-sm text-gray-600">{item.description}</p>
        <div className="mt-2 text-sm text-gray-700">Origin: {item.origin}</div>
      </div>
    </motion.article>
  );
}
