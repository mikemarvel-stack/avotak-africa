import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Target, Users } from 'lucide-react';
import api from '../services/api';
import herbNurseryImg from '../assets/Herb Nursery.jpg';
import exportMangoImg from '../assets/Export Mango Pilot.jpg';
import exportProcessImg from '../assets/Export Process Facilitation.jpg';
import basilCultivationImg from '../assets/Basil Cultivation Program.jpg';
import marketLinkagesImg from '../assets/Fresh Produce Market Linkages.jpg';
import herbFieldImg from '../assets/herb-field.jpg';

// Helper to normalize strings (lowercase, remove spaces & special chars)
const normalize = (str) =>
  str.toLowerCase().replace(/[\s\W]/g, '');

const staticProjects = [
  {
    id: 1,
    title: 'Herb Nursery',
    category: 'Agriculture',
    description: 'Set up of herb propagation nursery to support local farmers with quality seedlings.',
    impact: 'Seed stock for 120 farmers',
    date: 'Jan 2024 - Mar 2024',
    image: herbNurseryImg,
    tags: ['Agriculture', 'Herbs', 'Community']
  },
  {
    id: 2,
    title: 'Export Mango Pilot',
    category: 'Export Facilitation',
    description: 'Implemented quality improvement measures for mango exports to international markets.',
    impact: '20% increase in buyer acceptance',
    date: 'Apr 2024 - Jun 2024',
    image: exportMangoImg,
    tags: ['Export', 'Mango', 'Quality']
  },
  {
    id: 3,
    title: 'Export Process Facilitation',
    category: 'Trade & Logistics',
    description: 'Streamlined export procedures and documentation for small-scale farmers.',
    impact: 'Reduced export lead time by 30%',
    date: 'Jul 2024 - Sep 2024',
    image: exportProcessImg,
    tags: ['Export', 'Logistics', 'Efficiency']
  },
  {
    id: 4,
    title: 'Basil Cultivation Program',
    category: 'Agriculture',
    description: 'Trained farmers on best practices for basil cultivation and post-harvest handling.',
    impact: '150 farmers trained; yield improved by 25%',
    date: 'Oct 2024 - Dec 2024',
    image: basilCultivationImg,
    tags: ['Training', 'Basil', 'Capacity Building']
  },
  {
    id: 5,
    title: 'Fresh Produce Market Linkages',
    category: 'Market Access',
    description: 'Connected local farmers to regional supermarkets and premium buyers.',
    impact: 'Increased farmer revenue by 40%',
    date: 'Jan 2025 - Present',
    image: marketLinkagesImg,
    tags: ['Market Access', 'Revenue', 'Partnership']
  },
  {
    id: 6,
    title: 'Sustainable Herb Farming',
    category: 'Sustainability',
    description: 'Promoting eco-friendly farming practices for herb cultivation.',
    impact: 'Reduced water usage by 35%',
    date: 'Ongoing',
    image: herbFieldImg,
    tags: ['Sustainability', 'Herbs', 'Environment']
  },
];

const initialProjects = staticProjects;

// A reusable card component for displaying a project
const ProjectCard = ({ project }) => (
  <motion.div
    className="bg-white rounded-lg shadow-lg overflow-hidden"
    whileHover={{ y: -5 }}
    transition={{ duration: 0.3 }}
  >
    <img src={project.image} alt={project.title} className="w-full h-56 object-cover" />
    <div className="p-6">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
        <Calendar className="w-4 h-4" />
        <span>{project.date}</span>
      </div>
      <h3 className="text-xl font-bold text-green-800 mb-2">{project.title}</h3>
      <p className="text-gray-700 mb-3">{project.description}</p>
      <div className="flex items-start gap-2 mb-4">
        <Target className="w-4 h-4 text-green-600 mt-1" />
        <p className="text-sm text-green-700 font-medium">{project.impact}</p>
      </div>
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
