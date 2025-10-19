import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HomeSlider from '../components/HomeSlider';
import ProduceCard from '../components/ProduceCard';
import Gallery from '../components/Gallery';

// Import featured produce images manually
import lemonImg from '../assets/lemon.jpg';
import basilImg from '../assets/basil.jpg';
import mangoImg from '../assets/mango.jpg';
import avocadoImg from '../assets/avocado.jpg';
import appleImg from '../assets/apple.jpg';
import spinachImg from '../assets/spinach.jpg';
import tomatoImg from '../assets/tomato.jpg';

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    setFeatured([
      { id: 1, name: 'Lemon', description: 'Fresh citrus from Kenyan highlands', origin: 'Kiambu', category: 'Fruit', image: lemonImg },
      { id: 2, name: 'Basil', description: 'Aromatic culinary herb', origin: 'Nakuru', category: 'Herb', image: basilImg },
      { id: 3, name: 'Mango', description: 'Sweet seasonal mango', origin: 'Coast', category: 'Fruit', image: mangoImg },
      { id: 4, name: 'Avocado', description: 'Creamy and nutrient-rich', origin: 'Kenya', category: 'Fruit', image: avocadoImg },
      { id: 5, name: 'Apple', description: 'Crisp and juicy fruit', origin: 'Kenya', category: 'Fruit', image: appleImg },
      { id: 6, name: 'Spinach', description: 'Fresh green leafy vegetable', origin: 'Tanzania', category: 'Vegetable', image: spinachImg },
      { id: 7, name: 'Tomato', description: 'Juicy and ripe', origin: 'Kenya', category: 'Vegetable', image: tomatoImg }
    ]);
  }, []);

  return (
    <div>
      {/* Slider with Hero overlay */}
      <HomeSlider>
        <div className="text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">Welcome to Our Farm</h1>
          <p className="text-lg md:text-xl mb-6 drop-shadow-md">
            Fresh, organic produce straight from our fields
          </p>
          <Link to="/produce">
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition">
              Our Produce
            </button>
          </Link>
        </div>
      </HomeSlider>

      {/* Featured Produce */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold mb-6">Featured Produce</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featured.map(f => <ProduceCard key={f.id} item={f} />)}
        </div>
      </section>

      {/* Farm Gallery */}
      <section className="bg-green-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-4">Our Farm Gallery</h2>
          {/* Dynamic Gallery now fetches all images from assets */}
          <Gallery />
        </div>
      </section>
    </div>
  );
}
