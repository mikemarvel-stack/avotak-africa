import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Award, Globe } from 'lucide-react';
import usePublicContent from '../hooks/usePublicContent';
import Loader from '../components/Loader';
import avocadoImg from '../assets/avocado.jpg';
import mangoImg from '../assets/mango.jpg';
import basilImg from '../assets/basil.jpg';
import gingerImg from '../assets/ginger.jpg';
import tomatoImg from '../assets/tomato.jpg';
import rosemaryImg from '../assets/rosemary.jpg';
import corianderImg from '../assets/coriander.jpg';
import turmericImg from '../assets/turmeric.jpg';
import spinachImg from '../assets/spinach.jpg';
import carrotImg from '../assets/carrot.jpg';
import bananaImg from '../assets/banana.jpg';
import appleImg from '../assets/apple.jpg';

const FALLBACK_PRODUCE = [
  { 
    _id: '1', 
    name: 'Hass Avocado', 
    description: 'Premium export-quality avocados, rich in healthy fats and nutrients. Perfect for international markets.',
    category: 'Fruits',
    imageUrl: avocadoImg 
  },
  { 
    _id: '2', 
    name: 'Fresh Mango', 
    description: 'Sweet, juicy tropical mangoes grown in optimal conditions. High demand in European and Asian markets.',
    category: 'Fruits',
    imageUrl: mangoImg 
  },
  { 
    _id: '3', 
    name: 'Organic Basil', 
    description: 'Aromatic fresh basil cultivated using sustainable practices. Ideal for culinary and medicinal use.',
    category: 'Herbs',
    imageUrl: basilImg 
  },
  { 
    _id: '4', 
    name: 'Fresh Ginger', 
    description: 'Organic ginger root with intense flavor and aroma. Known for its health benefits and culinary versatility.',
    category: 'Spices',
    imageUrl: gingerImg 
  },
  { 
    _id: '5', 
    name: 'Vine Tomatoes', 
    description: 'Fresh vine-ripened tomatoes bursting with flavor. Grown using climate-smart agricultural practices.',
    category: 'Vegetables',
    imageUrl: tomatoImg 
  },
  { 
    _id: '6', 
    name: 'Fresh Rosemary', 
    description: 'Fragrant rosemary herbs perfect for seasoning and aromatherapy. Sustainably harvested.',
    category: 'Herbs',
    imageUrl: rosemaryImg 
  },
  { 
    _id: '7', 
    name: 'Coriander', 
    description: 'Fresh coriander leaves with distinctive flavor. Essential ingredient in African and Asian cuisine.',
    category: 'Herbs',
    imageUrl: corianderImg 
  },
  { 
    _id: '8', 
    name: 'Organic Turmeric', 
    description: 'Golden turmeric root known for its anti-inflammatory properties. Organically grown and processed.',
    category: 'Spices',
    imageUrl: turmericImg 
  },
  { 
    _id: '9', 
    name: 'Fresh Spinach', 
    description: 'Nutrient-rich spinach leaves packed with vitamins and minerals. Ideal for health-conscious consumers.',
    category: 'Vegetables',
    imageUrl: spinachImg 
  },
  { 
    _id: '10', 
    name: 'Organic Carrots', 
    description: 'Crisp, sweet carrots grown without pesticides. Perfect for fresh consumption and processing.',
    category: 'Vegetables',
    imageUrl: carrotImg 
  },
  { 
    _id: '11', 
    name: 'Sweet Bananas', 
    description: 'Premium quality bananas rich in potassium. A staple fruit loved across all markets.',
    category: 'Fruits',
    imageUrl: bananaImg 
  },
  { 
    _id: '12', 
    name: 'Fresh Apples', 
    description: 'Crisp and juicy apples with excellent shelf life. Grown in highland regions for optimal quality.',
    category: 'Fruits',
    imageUrl: appleImg 
  },
];

export default function Produce() {
  const { content, loading, error } = usePublicContent('/content/produce', []);
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  
  // Prioritize API data, use fallback only if API fails or returns empty
  let produceList = FALLBACK_PRODUCE;
  if (!loading && !error && Array.isArray(content) && content.length > 0) {
    produceList = content;
  }

  const categories = ['All', 'Fruits', 'Vegetables', 'Herbs', 'Spices'];

  const filteredProduce = selectedCategory === 'All' 
    ? produceList 
    : produceList.filter(p => p.category === selectedCategory);

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><Loader /></div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gradient-to-b from-green-50 to-white py-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <motion.h1 
            className="text-5xl font-bold text-green-800 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Premium African Produce
          </motion.h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Fresh from our farms to your table. Sustainably grown, expertly handled, and delivered with care.
          </p>
          {loading && <p className="text-sm text-gray-500">Loading latest products...</p>}
          
          {/* Features */}
          <div className="flex justify-center gap-8 mt-8 flex-wrap">
            <div className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium">100% Organic</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium">Export Quality</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium">International Standards</span>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full font-medium transition ${
                selectedCategory === cat
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-green-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        {/* Produce Grid */}
        {filteredProduce && filteredProduce.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProduce.map((produce, index) => (
              <motion.div 
                key={produce._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="relative overflow-hidden">
                  {produce.imageUrl && (
                    <img 
                      src={produce.imageUrl} 
                      alt={produce.name} 
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300" 
                    />
                  )}
                  {produce.category && (
                    <span className="absolute top-3 right-3 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {produce.category}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{produce.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{produce.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl shadow-md">
            <Leaf className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Produce Available</h3>
            <p className="text-gray-500">Check back soon for fresh updates!</p>
          </div>
        )}
      </div>
    </div>
  );
}