import React from 'react';
import {
  Leaf,
  Truck,
  GraduationCap,
  LineChart,
  Factory,
  Globe,
} from 'lucide-react';
import usePublicContent from '../hooks/usePublicContent';
import Loader from '../components/Loader';

const DEFAULT_SERVICES = [
  {
    _id: '1',
    name: 'Farm Advisory & Consulting',
    description: 'Expert guidance on crop selection, soil management, and sustainable farming practices to maximize yields and profitability.',
    icon: 'Leaf'
  },
  {
    _id: '2',
    name: 'Post-Harvest Handling & Quality Management',
    description: 'Professional support in handling, storage, and quality control to reduce losses and maintain premium standards.',
    icon: 'Truck'
  },
  {
    _id: '3',
    name: 'Market Linkages & Export Facilitation',
    description: 'Direct connections to local and international markets, with full export documentation and logistics support.',
    icon: 'Globe'
  },
  {
    _id: '4',
    name: 'Training & Capacity Building',
    description: 'Comprehensive training programs for farmers on modern agricultural techniques and business management.',
    icon: 'GraduationCap'
  },
  {
    _id: '5',
    name: 'Sustainability & Climate-Smart Agriculture',
    description: 'Implementing eco-friendly practices and climate-resilient farming methods for long-term sustainability.',
    icon: 'LineChart'
  },
  {
    _id: '6',
    name: 'Supply Chain & Value Addition Support',
    description: 'End-to-end supply chain management and value addition services to increase product value and market reach.',
    icon: 'Factory'
  },
];

const iconMap = {
  'Leaf': <Leaf className="w-8 h-8 text-green-600" />,
  'Truck': <Truck className="w-8 h-8 text-green-600" />,
  'Globe': <Globe className="w-8 h-8 text-green-600" />,
  'GraduationCap': <GraduationCap className="w-8 h-8 text-green-600" />,
  'LineChart': <LineChart className="w-8 h-8 text-green-600" />,
  'Factory': <Factory className="w-8 h-8 text-green-600" />,
};

export default function Services() {
  const { content, loading, error } = usePublicContent('/content/services', { services: [] });
  const services = Array.isArray(content?.services) && content.services.length > 0 
    ? content.services 
    : DEFAULT_SERVICES;

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><Loader /></div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">Our Services</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Comprehensive Agricultural Solutions
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            From farm to market, we provide expert guidance and support at every step.
          </p>
        </div>

        <div className="mt-10">
          {services && services.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <div key={service._id || index} className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-md">
                  <div className="-mt-6">
                    <div className="flex items-center justify-center">
                      <span className="p-3 bg-green-50 rounded-md shadow-lg">
                        {iconMap[service.icon] || iconMap['Leaf']}
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight text-center">{service.name}</h3>
                    <p className="mt-5 text-base text-gray-500 text-center">
                      {service.description}
                    </p>
                  </div>
                </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg shadow-md">
              <p className="text-gray-500">No services available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}