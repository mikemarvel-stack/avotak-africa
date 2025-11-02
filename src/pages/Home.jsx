import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import ProduceCard from '../components/ProduceCard';
import Gallery from '../components/Gallery';
import api from '../services/api';
import Testimonials from '../components/Testimonials';

// Import featured produce images manually
import lemonImg from '../assets/lemon.jpg';
import basilImg from '../assets/basil.jpg';
import mangoImg from '../assets/mango.jpg';
import avocadoImg from '../assets/avocado.jpg';
import appleImg from '../assets/apple.jpg';
import spinachImg from '../assets/spinach.jpg';
import tomatoImg from '../assets/tomato.jpg';

// Default content in case the backend fails
const defaultHomeContent = {
  heroTitle: 'Fresh from Our Farms to Your Table',
  heroSubtitle: 'Discover the taste of quality, sustainably grown produce from the heart of East Africa.',
  sliderImages: [
    '/src/assets/farm-1.jpg',
    '/src/assets/farm-2.jpg',
    '/src/assets/farm-3.jpg',
  ],
};

const defaultFeatured = [
  { id: 1, name: 'Lemon', slug: 'lemon', description: 'Fresh citrus from Kenyan highlands', origin: 'Kiambu', category: 'Fruit', image: lemonImg },
  { id: 2, name: 'Basil', slug: 'basil', description: 'Aromatic culinary herb', origin: 'Nakuru', category: 'Herb', image: basilImg },
  { id: 3, name: 'Mango', slug: 'mango', description: 'Sweet seasonal mango', origin: 'Coast', category: 'Fruit', image: mangoImg },
  { id: 4, name: 'Avocado', slug: 'avocado', description: 'Creamy and nutrient-rich', origin: 'Kenya', category: 'Fruit', image: avocadoImg },
  { id: 5, name: 'Apple', slug: 'apple', description: 'Crisp and juicy fruit', origin: 'Kenya', category: 'Fruit', image: appleImg },
  { id: 6, name: 'Spinach', slug: 'spinach', description: 'Fresh green leafy vegetable', origin: 'Tanzania', category: 'Vegetable', image: spinachImg },
  { id: 7, name: 'Tomato', slug: 'tomato', description: 'Juicy and ripe', origin: 'Kenya', category: 'Vegetable', image: tomatoImg }
];

export default function Home() {
  const [homeContent, setHomeContent] = useState(defaultHomeContent);
  const [featured, setFeatured] = useState(defaultFeatured);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        // Fetch home page content (hero title, subtitle)
        const contentResponse = await api.get('/content/home');
        if (contentResponse.data) {
          setHomeContent(contentResponse.data);
        } else {
          console.warn('API returned no home content, using static data.');
        }

        // Fetch featured produce
        const featuredResponse = await api.get('/content/produce/featured');
        if (featuredResponse.data && featuredResponse.data.length > 0) {
          // Alias imageUrl to image for ProduceCard compatibility
          const dynamicFeatured = featuredResponse.data.map(item => ({ ...item, image: item.imageUrl }));
          setFeatured(dynamicFeatured);
        } else {
          console.warn('API returned no featured produce, using static data.');
        }
      } catch (err) {
        console.error('Failed to fetch home data, using static data:', err);
        setError('Could not fetch latest content. Displaying default content.');
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  return (
    <div>
      <Hero
        title={homeContent.heroTitle}
        subtitle={homeContent.heroSubtitle}
        sliderImages={homeContent.sliderImages || []}
        loading={loading}
      />

      {error && <p className="text-center text-amber-600 bg-amber-100 p-2 rounded-md my-4 max-w-6xl mx-auto">{error}</p>}

      {/* Featured Produce Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center mb-12"
          >
            Featured Produce
          </motion.h2>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            >
              {featured.map((item) => (
                <ProduceCard key={item._id || item.id} item={item} />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Farm Gallery */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center mb-12"
          >
            Our Farm Gallery
          </motion.h2>
          <Gallery />
        </div>
      </section>
    </div>
  );
}