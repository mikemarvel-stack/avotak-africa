import React, { useEffect, useState } from 'react';
import ProduceCard from '../components/ProduceCard';
import useFetch from '../hooks/useFetch';
import { FaCarrot, FaLeaf, FaSeedling } from 'react-icons/fa';

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
  const { data: fetchedProduce, loading, error: fetchError } = useFetch('/content/produce');
  const [produce, setProduce] = useState(staticProduce);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    if (fetchedProduce && fetchedProduce.length > 0) {
      // The backend sends `imageUrl`, but ProduceCard expects `image`. We alias it here.
      const dynamicProduce = fetchedProduce.map(item => ({ ...item, image: item.imageUrl }));
      setProduce(dynamicProduce);
    } else if (fetchError) {
      // If there's an error, we can log it. The 'error' message below will handle UI.
      console.error('Failed to fetch produce:', fetchError);
    }
  }, [fetchedProduce, fetchError]);

  const categories = ['All', ...Object.keys(categoryIcons).filter(k => k !== 'All')];

  const filteredProduce = activeCategory === 'All'
    ? produce
    : produce.filter(item => item.category === activeCategory);

  const error = fetchError ? 'Could not fetch latest produce. Please try again later.' : null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Our Produce</h1>
      <p className="text-gray-600 mb-8">
        Explore our range of high-quality, sustainably sourced produce from East Africa.
      </p>

      {error && <p className="text-center text-amber-600 bg-amber-100 p-2 rounded-md mb-4">{error}</p>}

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
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

      {loading && <p className="text-center">Loading produce...</p>}

      {/* Produce Grid */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProduce.map(item => (
            <ProduceCard key={item._id || item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
