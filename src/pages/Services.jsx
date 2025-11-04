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

const iconMap = {
  'Farm Advisory & Consulting': <Leaf className="w-8 h-8 text-green-600" />,
  'Post-Harvest Handling & Quality Management': <Truck className="w-8 h-8 text-green-600" />,
  'Market Linkages & Export Facilitation': <Globe className="w-8 h-8 text-green-600" />,
  'Training & Capacity Building': <GraduationCap className="w-8 h-8 text-green-600" />,
  'Sustainability & Climate-Smart Agriculture': <LineChart className="w-8 h-8 text-green-600" />,
  'Supply Chain & Value Addition Support': <Factory className="w-8 h-8 text-green-600" />,
};

export default function Services() {
  const { content: services, loading, error } = usePublicContent('/services', []);

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
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div key={service._id} className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-md">
                  <div className="-mt-6">
                    <div className="flex items-center justify-center">
                      <span className="p-3 bg-green-50 rounded-md shadow-lg">
                        {iconMap[service.name] || <Leaf className="w-8 h-8 text-green-600" />}
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
        </div>
      </div>
    </div>
  );
}