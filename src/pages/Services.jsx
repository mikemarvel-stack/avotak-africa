import { motion } from 'framer-motion';
import api from '../services/api';
import { Briefcase, CheckCircle } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get('/content/services');
        // The API returns an object like { services: [...] }, so we access the 'services' property.
        setServices(response.data.services || []);
      } catch (err) {
        console.error('Failed to fetch services:', err);
        setError('Our services are currently unavailable. Please check back later.');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Our Services
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Providing expert consultancy to elevate your agricultural ventures.
          </p>
        </motion.div>

        {loading && (
          <div className="text-center mt-12">
            <div className="animate-spin rounded-full border-8 border-t-8 border-gray-200 border-t-green-600 h-32 w-32 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading Services...</p>
          </div>
        )}

        {error && (
          <div className="mt-12 text-center bg-red-100 text-red-700 p-4 rounded-lg">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.length > 0 ? (
              services.map((service, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300"
                >
                  <div className="p-8">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Briefcase className="h-8 w-8 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                      </div>
                    </div>
                    <p className="mt-4 text-gray-600">{service.description}</p>
                    {service.points && service.points.length > 0 && (
                      <ul className="mt-4 space-y-2">
                        {service.points.map((point, pIndex) => (
                          <li key={pIndex} className="flex items-start">
                            <CheckCircle className="flex-shrink-0 h-5 w-5 text-green-500 mt-1" />
                            <span className="ml-3 text-gray-600">{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 mt-8">
                No services have been added yet.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;