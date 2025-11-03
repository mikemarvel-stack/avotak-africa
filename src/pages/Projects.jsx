import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';
import { Eye } from 'lucide-react';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get('/content/projects');
        // This endpoint returns a direct array of projects
        setProjects(response.data || []);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
        setError('Our projects are currently unavailable. Please check back later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
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
            Our Projects
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Discover the successful agricultural projects we've nurtured from seed to harvest.
          </p>
        </motion.div>

        {loading && (
          <div className="text-center mt-12">
            <div className="animate-spin rounded-full border-8 border-t-8 border-gray-200 border-t-green-600 h-32 w-32 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading Projects...</p>
          </div>
        )}

        {error && (
          <div className="mt-12 text-center bg-red-100 text-red-700 p-4 rounded-lg">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <motion.div
                  key={project._id}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  className="group bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="relative">
                    <img
                      className="h-56 w-full object-cover"
                      src={project.imageUrl || 'https://via.placeholder.com/400x224?text=Avotak+Project'}
                      alt={project.title}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                      <div className="text-white text-center p-4">
                        <h3 className="text-2xl font-bold">{project.title}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600">{project.description}</p>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center mt-4 text-green-600 font-semibold hover:text-green-800 transition"
                      >
                        View Project <Eye className="ml-2 h-5 w-5" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 mt-8">
                No projects have been added yet.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;