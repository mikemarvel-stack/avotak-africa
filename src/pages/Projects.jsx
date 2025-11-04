import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api'; // Ensure you have an api service utility

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
    className="bg-white rounded-lg shadow-lg overflow-hidden"
    whileHover={{ y: -5 }}
    transition={{ duration: 0.3 }}
  >
    <img src={project.image || '/src/assets/placeholder.jpg'} alt={project.title} className="w-full h-48 object-cover" />
    <div className="p-6">
      <h3 className="text-xl font-bold text-green-800 mb-2">{project.title}</h3>
      <p className="text-gray-700 mb-4">{project.description || project.summary}</p>
      {project.tags && (
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, index) => (
            <span key={index} className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  </motion.div>
);

export default function Projects() {
  const [projects, setProjects] = useState(initialProjects);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/content/projects');
        if (response.data && response.data.length > 0) {
          // Alias imageUrl to image for consistency
          const dynamicProjects = response.data.map(p => ({ ...p, image: p.imageUrl }));
          setProjects(dynamicProjects);
        } else {
          console.warn('API returned no projects, using static data.');
        }
      } catch (err) {
        setError('Failed to load projects.');
        console.error("Failed to fetch projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div className="text-center py-16">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-16 text-red-500">{error}</div>;
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
            Our Projects
          </h1>
          <p className="text-gray-700 max-w-3xl mx-auto">
            From farm to market, we are involved in impactful projects that enhance quality, empower communities, and promote sustainable agriculture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project._id || project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
