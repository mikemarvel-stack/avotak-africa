import React, { useEffect, useState } from 'react';
import ProduceCard from '../components/ProduceCard';
import useFetch from '../hooks/useFetch'; // Import the hook
import { categoryIcons } from '../components/CategoryIcons'; // Assuming you extract icons

// Import images from src/assets
import lemonImg from '../assets/lemon.jpg';
import basilImg from '../assets/basil.jpg';
import mangoImg from '../assets/mango.jpg';
import rosemaryImg from '../assets/rosemary.jpg';
import tomatoImg from '../assets/tomato.jpg';
import spinachImg from '../assets/spinach.jpg';
import avocadoImg from '../assets/avocado.jpg';
import gingerImg from '../assets/ginger.jpg';
import carrotImg from '../assets/carrot.jpg';
import turmericImg from '../assets/turmeric.jpg';
import bananaImg from '../assets/banana.jpg';
import corianderImg from '../assets/coriander.jpg';
import appleImg from '../assets/apple.jpg';

// Keep staticProduce for fallback
const staticProduce = [
  { id: 1, name: 'Lemon', description: 'Juicy citrus fruit perfect for fresh juices and zesting.', origin: 'Kenya', category: 'Fruit', image: lemonImg, harvestSeason: 'Mar–May', availability: 'Year-round' },
  { id: 2, name: 'Basil', description: 'Aromatic herb ideal for seasoning and garnishing.', origin: 'Tanzania', category: 'Herb', image: basilImg, harvestSeason: '3–4 weeks after sowing', availability: 'Year-round' },
  { id: 3, name: 'Mango', description: 'Sweet tropical fruit, great for desserts and smoothies.', origin: 'Uganda', category: 'Fruit', image: mangoImg, harvestSeason: 'Nov–Mar', availability: 'Nov–Mar' },
  { id: 4, name: 'Rosemary', description: 'Fragrant herb used for flavoring meats and vegetables.', origin: 'Rwanda', category: 'Herb', image: rosemaryImg, harvestSeason: 'Year-round', availability: 'Year-round' },
  { id: 5, name: 'Tomato', description: 'Fresh red vegetable perfect for sauces, salads, and cooking.', origin: 'Kenya', category: 'Vegetable', image: tomatoImg, harvestSeason: 'Jun–Jul, Oct–Nov', availability: 'Year-round' },
  { id: 6, name: 'Spinach', description: 'Green leafy vegetable rich in nutrients and vitamins.', origin: 'Tanzania', category: 'Vegetable', image: spinachImg, harvestSeason: '6–8 weeks after sowing', availability: 'Year-round' },
  { id: 7, name: 'Avocado', description: 'Creamy fruit ideal for toasts, salads, and smoothies.', origin: 'Kenya', category: 'Fruit', image: avocadoImg, harvestSeason: 'Mar–Sep', availability: 'Year-round' },
  { id: 8, name: 'Ginger', description: 'Spicy root used in cooking, teas, and natural remedies.', origin: 'Tanzania', category: 'Spice', image: gingerImg, harvestSeason: '8–10 months after planting', availability: 'Oct–Dec' },
  { id: 9, name: 'Carrot', description: 'Crunchy orange vegetable perfect for salads and cooking.', origin: 'Uganda', category: 'Vegetable', image: carrotImg, harvestSeason: '2–3 months after planting', availability: 'Year-round' },
  { id: 10, name: 'Turmeric', description: 'A vibrant spice known for its earthy flavor and health benefits.', origin: 'Rwanda', category: 'Spice', image: turmericImg, harvestSeason: '9–10 months after planting', availability: 'Jan–Mar' },
  { id: 11, name: 'Banana', description: 'Sweet, energy-rich fruit available in various types.', origin: 'Uganda', category: 'Fruit', image: bananaImg, harvestSeason: 'Year-round', availability: 'Year-round' },
  { id: 12, name: 'Coriander', description: 'A versatile herb with a distinct, fresh flavor used in many cuisines.', origin: 'Kenya', category: 'Herb', image: corianderImg, harvestSeason: '40–50 days after sowing', availability: 'Year-round' },
  { id: 13, name: 'Apple', description: 'Crisp and sweet apples, locally grown.', origin: 'Kenya', category: 'Fruit', image: appleImg, harvestSeason: 'Jan-Feb', availability: 'Jan-Mar' },
];

export default function Produce() {
  const { data: fetchedProduce, loading, error: fetchError } = useFetch('/produce');
  const [produce, setProduce] = useState(staticProduce);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    if (fetchedProduce && fetchedProduce.length > 0) {
      // The backend sends `imageUrl`, but ProduceCard expects `image`. We alias it here.
      const dynamicProduce = fetchedProduce.map(item => ({ ...item, image: item.imageUrl }));
      setProduce(dynamicProduce);
    } else if (fetchedProduce) {
      // If backend returns no data, we keep the static data
      console.warn('API returned no produce, using static data.');
    }
  }, [fetchedProduce]);

  const categories = ['All', ...Object.keys(categoryIcons)];

  const filteredProduce = activeCategory === 'All'
    ? produce
    : produce.filter(item => item.category === activeCategory);

  const error = fetchError ? 'Could not fetch latest produce. Displaying default content.' : null;

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
            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
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
