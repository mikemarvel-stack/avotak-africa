import React from 'react';
import usePublicContent from '../hooks/usePublicContent';
import Loader from '../components/Loader';
import { Package } from 'lucide-react';
import avocadoImg from '../assets/avocado.jpg';
import mangoImg from '../assets/mango.jpg';
import basilImg from '../assets/basil.jpg';
import gingerImg from '../assets/ginger.jpg';
import tomatoImg from '../assets/tomato.jpg';
import lemonImg from '../assets/lemon.jpg';
import rosemaryImg from '../assets/rosemary.jpg';
import corianderImg from '../assets/coriander.jpg';

const FALLBACK_PRODUCE = [
  { _id: '1', name: 'Hass Avocado', description: 'Premium quality avocados rich in healthy fats', price: 2.50, imageUrl: avocadoImg },
  { _id: '2', name: 'Fresh Mango', description: 'Sweet and juicy tropical mangoes', price: 1.80, imageUrl: mangoImg },
  { _id: '3', name: 'Organic Basil', description: 'Aromatic fresh basil for culinary use', price: 0.99, imageUrl: basilImg },
  { _id: '4', name: 'Fresh Ginger', description: 'Organic ginger root with intense flavor', price: 1.20, imageUrl: gingerImg },
  { _id: '5', name: 'Vine Tomatoes', description: 'Fresh vine-ripened tomatoes', price: 1.50, imageUrl: tomatoImg },
  { _id: '6', name: 'Fresh Lemons', description: 'Zesty organic lemons', price: 0.80, imageUrl: lemonImg },
  { _id: '7', name: 'Rosemary', description: 'Fragrant rosemary herbs', price: 1.10, imageUrl: rosemaryImg },
  { _id: '8', name: 'Coriander', description: 'Fresh coriander leaves', price: 0.90, imageUrl: corianderImg },
];

export default function Produce() {
  const { content, loading, error } = usePublicContent('/content/produce', []);
  
  // Prioritize API data, use fallback only if API fails or returns empty
  let produceList = FALLBACK_PRODUCE;
  if (!loading && !error && Array.isArray(content) && content.length > 0) {
    produceList = content;
  }

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><Loader /></div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">Our Produce</h1>
          <p className="text-lg text-gray-600 mt-2">Fresh from our farms, cultivated with care.</p>
          {loading && <p className="text-sm text-gray-500 mt-2">Loading latest products...</p>}
        </div>
        
        {produceList && produceList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {produceList.map((produce, index) => (
              <div key={produce._id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                {produce.imageUrl && (
                  <img src={produce.imageUrl} alt={produce.name} className="w-full h-48 object-cover" />
                )}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-primary mb-2">{produce.name}</h3>
                  <p className="text-gray-700 mb-4">{produce.description}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-semibold text-green-600">
                      ${produce.price ? produce.price.toFixed(2) : '0.00'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No Produce Available</h3>
            <p className="mt-1 text-sm text-gray-500">Please check back later or contact us for more information.</p>
          </div>
        )}
      </div>
    </div>
  );
}