import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';

// Dynamically import all images from assets folder
const images = import.meta.glob('../assets/*.{jpg,jpeg,png}', { eager: true, import: 'default', query: '?url' });

// Helper to normalize strings (lowercase, remove spaces & special chars)
const normalize = (str) =>
  str.toLowerCase().replace(/[\s\W]/g, '');

// Initial static data to be used as a fallback
const staticProjects = [
    {
      id: 1,
      title: 'Avocado Export Program',
      description: 'A successful partnership with local farmers to export high-quality Hass avocados to European markets, ensuring fair trade practices and sustainable farming.',
      image: '/src/assets/project-avocado.jpg',
      tags: ['Avocado', 'Export', 'Sustainability']
    },
    {
      id: 2,
      title: 'Herb Cultivation Initiative',
      description: 'Empowering small-scale farmers by providing training and resources for cultivating high-demand herbs like basil and rosemary for local and international markets.',
      image: '/src/assets/project-herbs.jpg',
      tags: ['Herbs', 'Community', 'Training']
    },
    {
      id: 3,
      title: 'Mango Value Addition',
      description: 'A project focused on reducing post-harvest losses by processing fresh mangoes into dried fruit snacks, creating more value for farmers.',
      image: '/src/assets/project-mango.jpg',
      tags: ['Mango', 'Processing', 'Value Addition']
    },
    {
      id: 4,
      title: 'Herb Nursery',
      category: 'Agriculture',
      summary: 'Set up of herb propagation nursery to support local farmers.',
      impact: 'Seed stock for 120 farmers.',
      date: 'Jan 2024 - Mar 2024',
    },
    {
      id: 5,
      title: 'Export Mango Pilot',
      category: 'Export Facilitation',
      summary: 'Implemented quality improvement measures for mango exports.',
      impact: '20% increase in buyer acceptance.',
      date: 'Apr 2024 - Jun 2024',
    },
    {
      id: 6,
      title: 'Export Process Facilitation',
      category: 'Trade & Logistics',
      summary: 'Streamlined export procedures and documentation for small-scale farmers.',
      impact: 'Reduced export lead time by 30%.',
      date: 'Jul 2024 - Sep 2024',
    },
    {
      id: 7,
      title: 'Basil Cultivation Program',
      category: 'Agriculture',
      summary: 'Trained farmers on best practices for basil cultivation.',
      impact: '150 farmers trained; yield improved by 25%.',
      date: 'Oct 2024 - Dec 2024',
    },
    {
      id: 8,
      title: 'Fresh Produce Market Linkages',
      category: 'Market Access',
      summary: 'Connected local farmers to regional supermarkets and buyers.',
      impact: 'Increased farmer revenue by 40%.',
      date: 'Jan 2025 - Present',
    },
];

// Match project title to corresponding image from assets for static data
const getImage = (title) => {
  const normTitle = normalize(title);
  const key = Object.keys(images).find((path) =>
    normalize(path.split('/').pop().split('.')[0]) === normTitle
  );
  return key ? images[key] : '';
};

// Add image URLs to static projects
const initialProjects = staticProjects.map(p => {
  if (p.title && !p.image) {
    return { ...p, image: getImage(p.title) };
  }
  return p;
});

// A reusable card component for displaying a project
const ProjectCard = ({ project }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300"
  >
    <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
    <div className="p-6">
      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
      <p className="text-gray-700 mb-4">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.tags?.map((tag, index) => (
          <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

export default function Projects() {
  const [projects, setProjects] = useState(initialProjects);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await api.get('/projects');
        if (response.data && response.data.length > 0) {
          // Alias imageUrl to image for consistency
          const dynamicProjects = response.data.map(p => ({ ...p, image: p.imageUrl }));
          setProjects(dynamicProjects);
        } else {
          console.warn('API returned no projects, using static data.');
        }
      } catch (err) {
        console.error('Failed to fetch projects, using static data:', err);
        setError('Could not fetch latest projects. Displaying default content.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filters = ['All', ...new Set(projects.map((p) => p.category))];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Our Projects</h1>
      <p className="text-gray-600 mb-8">
        Discover our successful projects in sustainable agriculture and value chain development across East Africa.
      </p>

      {error && <p className="text-center text-amber-600 bg-amber-100 p-2 rounded-md mb-4">{error}</p>}

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === filter
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {loading && <p className="text-center">Loading projects...</p>}

      {/* Projects Grid */}
      {!loading && (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((p) => (
            <ProjectCard key={p._id || p.id} project={p} />
          ))}
        </motion.div>
      )}
    </div>
  );
}
