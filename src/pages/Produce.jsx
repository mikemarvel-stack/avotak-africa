import React from 'react';
import usePublicContent from '../hooks/usePublicContent';
import Loader from '../components/Loader';
import { Package } from 'lucide-react';

export default function Produce() {
  const { content: produceList, loading, error } = usePublicContent('/content/produce', []);

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
        </div>
        
        {produceList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {produceList.map((produce) => (
              <div key={produce._id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-primary mb-2">{produce.name}</h3>
                  <p className="text-gray-700 mb-4 h-24 overflow-y-auto">{produce.description}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-semibold text-soil">
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