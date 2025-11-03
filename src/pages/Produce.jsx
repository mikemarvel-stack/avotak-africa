import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';
import ProduceCard from '../components/ProduceCard';

// --- Start of Added Hardcoded Data ---

// Default content in case the backend fails
const staticProduce = [
  {
    _id: 'static-1',
    name: 'Avocado',
    description: 'Creamy and nutritious Hass avocados.',
    category: 'Fruits',
    image: '/images/produce/avocado.jpg',
  },
  {
    _id: 'static-2',
    name: 'Mango',
    description: 'Sweet and juicy Kent mangoes.',
    category: 'Fruits',
    image: '/images/produce/mango.jpg',
  },
  {
    _id: 'static-3',
    name: 'Coffee Beans',
    description: 'Rich Arabica coffee beans.',
    category: 'Grains & Beans',
    image: '/images/produce/coffee.jpg',
  },
  {
    _id: 'static-4',
    name: 'Green Beans',
    description: 'Fresh and crisp green beans.',
    category: 'Vegetables',
    image: '/images/produce/beans.jpg',
  },
];

// Icons for produce categories
const categoryIcons = {
  All: '🌍',
  Fruits: '🥑',
  Vegetables: <FaCarrot className="inline mr-1" />,
  'Grains & Beans': <FaSeedling className="inline mr-1" />,
  Herbs: <FaLeaf className="inline mr-1" />,
};

// --- End of Added Hardcoded Data ---

export default function Produce() {
  const [produce, setProduce] = useState(staticProduce);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const fetchProduce = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get('/content/produce');
        // This endpoint returns a direct array
        setProduce(response.data || []);
      } catch (err) {
        console.error('Failed to fetch produce:', err);
        setError('Our produce list is currently unavailable. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduce();
  }, []);

  const categories = ['All', ...Object.keys(categoryIcons).filter(k => k !== 'All')];

  const filteredProduce = activeCategory === 'All'
    ? produce
    : produce.filter(item => item.category === activeCategory);

  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Our Produce
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Fresh, sustainably-grown produce straight from our farms.
          </p>
        </motion.div>

        {error && <p className="text-center text-amber-600 bg-amber-100 p-2 rounded-md mt-4">{error}</p>}

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition flex items-center ${
                activeCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {categoryIcons[category]} {category}
            </button>
          ))}
        </div>

        {loading && (
          <div className="text-center mt-12">
            <div className="animate-spin rounded-full border-8 border-t-8 border-gray-200 border-t-green-600 h-32 w-32 mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600">Loading produce...</p>
          </div>
        )}

        {/* Produce Grid */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12"
          >
            {filteredProduce.map(item => (
              <ProduceCard key={item._id || item.id} item={item} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
