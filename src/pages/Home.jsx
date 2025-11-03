import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import HomeSlider from '../components/HomeSlider';
import Gallery from '../components/Gallery';
import useFetch from '../hooks/useFetch';

export default function Home() {
  const { data: homeContent, loading: loadingHome, error: errorHome } = useFetch('/content/home');
  const { data: featuredProduce, loading: loadingProduce, error: errorProduce } = useFetch('/content/produce/featured');

  const sliderImages = homeContent?.sliderImages || [];
  const featuredItems = featuredProduce?.map(item => ({ ...item, image: item.imageUrl })) || [];

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
          {isLoading && <p>Loading featured produce...</p>}
          {hasError && !isLoading && <p className="text-amber-600">Could not load featured produce.</p>}
          {!isLoading && !hasError && featuredItems.length === 0 && <p>No featured produce available at the moment.</p>}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredItems.map((item) => (
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

      {/* Gallery Section */}
      <Gallery />
    </div>
  );
}