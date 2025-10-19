import React, { useEffect, useState } from 'react';
import ProduceCard from '../components/ProduceCard';

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

// Category icons (SVG strings or import React icons)
const categoryIcons = {
  Fruit: '🍎',
  Vegetable: '🥕',
  Herb: '🌿',
  Spice: '🌶️',
};

export default function Produce() {
  const [list, setList] = useState([]);

  useEffect(() => {
    setList([
      { id: 1, name: 'Lemon', description: 'Juicy citrus fruit perfect for fresh juices and zesting.', origin: 'Kenya', category: 'Fruit', image: lemonImg, harvestSeason: 'Mar–May', availability: 'Year-round' },
      { id: 2, name: 'Basil', description: 'Aromatic herb ideal for seasoning and garnishing.', origin: 'Tanzania', category: 'Herb', image: basilImg, harvestSeason: '3–4 weeks after sowing', availability: 'Year-round' },
      { id: 3, name: 'Mango', description: 'Sweet tropical fruit, great for desserts and smoothies.', origin: 'Uganda', category: 'Fruit', image: mangoImg, harvestSeason: 'Nov–Mar', availability: 'Nov–Mar' },
      { id: 4, name: 'Rosemary', description: 'Fragrant herb used for flavoring meats and vegetables.', origin: 'Rwanda', category: 'Herb', image: rosemaryImg, harvestSeason: 'Year-round', availability: 'Year-round' },
      { id: 5, name: 'Tomato', description: 'Fresh red vegetable perfect for sauces, salads, and cooking.', origin: 'Kenya', category: 'Vegetable', image: tomatoImg, harvestSeason: 'Jun–Jul, Oct–Nov', availability: 'Year-round' },
      { id: 6, name: 'Spinach', description: 'Green leafy vegetable rich in nutrients and vitamins.', origin: 'Tanzania', category: 'Vegetable', image: spinachImg, harvestSeason: '6–8 weeks after sowing', availability: 'Year-round' },
      { id: 7, name: 'Avocado', description: 'Creamy fruit ideal for toasts, salads, and smoothies.', origin: 'Kenya', category: 'Fruit', image: avocadoImg, harvestSeason: 'Mar–Sep', availability: 'Year-round' },
      { id: 8, name: 'Ginger', description: 'Spicy root used in cooking, teas, and natural remedies.', origin: 'Tanzania', category: 'Spice', image: gingerImg, harvestSeason: '8–10 months after planting', availability: 'Oct–Dec' },
      { id: 9, name: 'Carrot', description: 'Crunchy orange vegetable perfect for salads and cooking.', origin: 'Uganda', category: 'Vegetable', image: carrotImg, harvestSeason: '2–3 months after planting', availability: 'Year-round' },
      { id: 10, name: 'Turmeric', description: 'Golden spice root commonly used for flavoring and natural remedies.', origin: 'Rwanda', category: 'Spice', image: turmericImg, harvestSeason: '8–10 months after planting', availability: 'Mar–May, Oct–Dec' },
      { id: 11, name: 'Banana', description: 'Sweet yellow fruit perfect for snacks, desserts, and smoothies.', origin: 'Uganda', category: 'Fruit', image: bananaImg, harvestSeason: 'Year-round', availability: 'Year-round' },
      { id: 12, name: 'Coriander', description: 'Fresh herb used in seasoning and garnishing various dishes.', origin: 'Kenya', category: 'Herb', image: corianderImg, harvestSeason: '3–4 weeks after sowing', availability: 'Year-round' },
      { id: 13, name: 'Apple', description: 'Crisp sweet fruit perfect for eating fresh or cooking.', origin: 'Kenya', category: 'Fruit', image: appleImg, harvestSeason: 'Mar–Jul', availability: 'Mar–Jul' },
    ]);
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Produce</h1>
      <p className="text-gray-600 mb-8">
        Explore our selection of fresh fruits, vegetables, herbs, and spices sourced from across East Africa (Kenya, Tanzania, Uganda, Rwanda).
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {list.map(item => (
          <ProduceCard
            key={item.id}
            item={{
              ...item,
              categoryIcon: categoryIcons[item.category] || '❓'
            }}
          />
        ))}
      </div>
    </section>
  );
}
