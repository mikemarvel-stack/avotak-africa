import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, TrendingUp, Users, Award, ArrowRight, CheckCircle, Globe } from 'lucide-react';
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
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Empowering African Farmers<br />
              <span className="text-green-200">Through Innovation</span>
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto">
              Premium produce, expert consultancy, and sustainable agriculture solutions across East Africa
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/produce"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-700 font-bold rounded-full hover:bg-green-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Explore Our Produce
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-green-700 transition-all"
              >
                Our Services
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent" />
      </section>

      {/* Featured Produce Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Premium African Produce</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Fresh, high-quality produce from East African farms to global markets
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredItems.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden group"
              >
                <div className="relative overflow-hidden h-56">
                  <motion.img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/produce"
              className="inline-flex items-center px-8 py-4 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              View All Produce
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Avotak Africa</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your trusted partner in agricultural excellence across East Africa
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Leaf, title: 'Sustainable Farming', desc: 'Climate-smart practices that protect the environment and boost yields' },
              { icon: Globe, title: 'Market Access', desc: 'Direct connections to premium local and international buyers' },
              { icon: Users, title: 'Expert Support', desc: 'Professional agronomists guiding you at every step' },
              { icon: Award, title: 'Quality Assured', desc: 'International standards (GlobalGAP, HACCP) guaranteed' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="text-center p-6 rounded-2xl hover:bg-gray-50 transition-all"
              >
                <div className="bg-gradient-to-br from-green-100 to-green-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <item.icon className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '200+', label: 'Farmers Supported' },
              { value: '500+', label: 'Hectares Managed' },
              { value: '15+', label: 'Export Markets' },
              { value: '40%', label: 'Income Increase' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-5xl md:text-6xl font-bold mb-2">{stat.value}</div>
                <div className="text-green-100 text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Transform Your Farm?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join 200+ farmers already benefiting from our expert guidance and market access
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Get Started Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-700 font-bold rounded-full hover:bg-gray-50 transition-all shadow-lg border-2 border-green-600"
              >
                Learn More About Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}