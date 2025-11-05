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
    description: 'Expert guidance on crop selection, soil management, and sustainable farming practices to maximize yields and profitability. Our agronomists provide on-site assessments, customized farm plans, and ongoing support. Services include soil testing, crop rotation planning, pest and disease management, irrigation design, and organic certification support.',
    icon: 'Leaf',
    features: ['Soil Analysis', 'Crop Planning', 'Pest Management', 'Irrigation Design']
  },
  {
    _id: '2',
    name: 'Post-Harvest Handling & Quality Management',
    description: 'Professional support in handling, storage, and quality control to reduce losses and maintain premium standards. We help farmers implement proper harvesting techniques, cooling systems, packaging solutions, and quality grading. Our services ensure your produce meets international quality standards and maintains freshness throughout the supply chain.',
    icon: 'Truck',
    features: ['Quality Grading', 'Cold Chain', 'Packaging Solutions', 'Loss Reduction']
  },
  {
    _id: '3',
    name: 'Market Linkages & Export Facilitation',
    description: 'Direct connections to local and international markets, with full export documentation and logistics support. We connect farmers to premium buyers, negotiate favorable contracts, and handle all export procedures including phytosanitary certificates, customs clearance, and shipping logistics. Our network includes supermarkets, hotels, restaurants, and international importers.',
    icon: 'Globe',
    features: ['Buyer Connections', 'Export Documentation', 'Contract Negotiation', 'Logistics Support']
  },
  {
    _id: '4',
    name: 'Training & Capacity Building',
    description: 'Comprehensive training programs for farmers on modern agricultural techniques and business management. Our courses cover Good Agricultural Practices (GAP), financial literacy, record keeping, group dynamics, and entrepreneurship. We offer both classroom and hands-on field training with demonstration plots and farmer field schools.',
    icon: 'GraduationCap',
    features: ['GAP Training', 'Financial Literacy', 'Field Schools', 'Business Skills']
  },
  {
    _id: '5',
    name: 'Sustainability & Climate-Smart Agriculture',
    description: 'Implementing eco-friendly practices and climate-resilient farming methods for long-term sustainability. We promote water conservation, soil health, biodiversity, renewable energy, and carbon sequestration. Our approach helps farmers adapt to climate change while reducing environmental impact and improving long-term productivity.',
    icon: 'LineChart',
    features: ['Water Conservation', 'Soil Health', 'Climate Adaptation', 'Carbon Farming']
  },
  {
    _id: '6',
    name: 'Supply Chain & Value Addition Support',
    description: 'End-to-end supply chain management and value addition services to increase product value and market reach. We help farmers process, package, and brand their products for premium markets. Services include aggregation center setup, processing equipment sourcing, packaging design, branding, and certification support (organic, fair trade, etc.).',
    icon: 'Factory',
    features: ['Processing Support', 'Branding & Packaging', 'Certification', 'Aggregation Centers']
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
  
  // Use API data, fallback to defaults only on error
  const services = (!loading && content?.services && content.services.length > 0) 
    ? content.services.map(s => ({
        ...s,
        name: s.title || s.name,
        icon: s.icon || 'Leaf'
      }))
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
            From farm to market, we provide expert guidance and support at every step of your agricultural journey.
          </p>
          <div className="mt-8 bg-green-50 border-l-4 border-green-600 p-6 max-w-3xl mx-auto rounded-r-lg">
            <p className="text-gray-700 text-left">
              <span className="font-semibold text-green-800">Why Choose Avotak Africa?</span> We combine local knowledge with international standards, offering practical solutions tailored to African farming conditions. Our team of experienced agronomists, market specialists, and trainers work directly with farmers to ensure sustainable success.
            </p>
          </div>
        </div>

        <div className="mt-10">
          {services && services.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <div key={service._id || index} className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-md hover:shadow-xl transition-shadow duration-300">
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
                    {service.features && (
                      <div className="mt-6 space-y-2">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center text-sm text-gray-600">
                            <svg className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}
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