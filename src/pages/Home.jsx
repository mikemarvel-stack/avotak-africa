import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, TrendingUp, Users, Award } from 'lucide-react';
import HomeSlider from '../components/HomeSlider';
import Gallery from '../components/Gallery';
import useFetch from '../hooks/useFetch';
import avocadoImg from '../assets/avocado.jpg';
import mangoImg from '../assets/mango.jpg';
import basilImg from '../assets/basil.jpg';
import gingerImg from '../assets/ginger.jpg';

const FALLBACK_PRODUCE = [
  { _id: '1', name: 'Hass Avocado', description: 'Premium quality avocados', image: avocadoImg },
  { _id: '2', name: 'Fresh Mango', description: 'Sweet tropical mangoes', image: mangoImg },
  { _id: '3', name: 'Organic Basil', description: 'Aromatic fresh basil', image: basilImg },
  { _id: '4', name: 'Fresh Ginger', description: 'Organic ginger root', image: gingerImg },
];

export default function Home() {
  const { data: homeContent, loading: loadingHome, error: errorHome } = useFetch('/content/home');
  const { data: featuredProduce, loading: loadingProduce, error: errorProduce } = useFetch('/content/produce/featured');

  const sliderImages = homeContent?.sliderImages || [];
  
  // Prioritize API data, use fallback only if API fails or returns empty
  let featuredItems = FALLBACK_PRODUCE;
  if (!loadingProduce && !errorProduce && Array.isArray(featuredProduce) && featuredProduce.length > 0) {
    featuredItems = featuredProduce.map(item => ({ 
      ...item, 
      image: item.imageUrl || item.image 
    }));
  }

  const isLoading = loadingHome || loadingProduce;
  const hasError = errorHome || errorProduce;

  return (
    <div>
      {/* Hero Section with Slider */}
      <HomeSlider
        images={sliderImages}
        title={homeContent?.heroTitle}
        subtitle={homeContent?.heroSubtitle}
        loading={loadingHome}
      />

      {/* Featured Produce Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Featured Produce</h2>
          <p className="text-gray-600 mb-8">
            A selection of our finest, freshly harvested produce.
          </p>
          {loadingProduce && <p className="text-sm text-gray-500 mb-4">Loading latest products...</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredItems.map((item, index) => (
              <motion.div
                key={item._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-12">
            <Link
              to="/produce"
              className="bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-primary-dark transition-colors"
            >
              View All Produce
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Avotak Africa</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Sustainable Farming</h3>
              <p className="text-gray-600 text-sm">Eco-friendly practices for better yields</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Market Access</h3>
              <p className="text-gray-600 text-sm">Direct links to premium markets</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Expert Support</h3>
              <p className="text-gray-600 text-sm">Professional guidance at every step</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Quality Assured</h3>
              <p className="text-gray-600 text-sm">Premium standards guaranteed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <Gallery />
    </div>
  );
}