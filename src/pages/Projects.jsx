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
    title: 'Herb Nursery Development',
    category: 'Agriculture',
    description: 'Established a state-of-the-art herb propagation nursery providing quality seedlings to local farmers. The facility includes modern greenhouse technology, drip irrigation systems, and organic growing media. We trained 15 nursery operators on best practices for herb propagation, pest management, and quality control.',
    impact: 'Supplied quality seedlings to 120+ farmers across 5 regions',
    date: 'Jan 2024 - Mar 2024',
    image: herbNurseryImg,
    tags: ['Agriculture', 'Herbs', 'Community', 'Training']
  },
  {
    id: 2,
    title: 'Export Mango Quality Improvement',
    category: 'Export Facilitation',
    description: 'Comprehensive quality improvement program for mango exports targeting European and Middle Eastern markets. Implemented GAP (Good Agricultural Practices), post-harvest handling protocols, and traceability systems. Conducted farmer training on pruning, pest control, and harvest timing to meet international standards.',
    impact: '20% increase in export acceptance rate, 35% premium pricing',
    date: 'Apr 2024 - Jun 2024',
    image: exportMangoImg,
    tags: ['Export', 'Mango', 'Quality', 'International Markets']
  },
  {
    id: 3,
    title: 'Export Process Facilitation',
    category: 'Trade & Logistics',
    description: 'Streamlined export procedures and documentation for small-scale farmers accessing international markets. Provided support with phytosanitary certificates, export permits, customs clearance, and shipping logistics. Established partnerships with freight forwarders and clearing agents to reduce costs.',
    impact: 'Reduced export lead time by 30%, saved farmers 25% on logistics costs',
    date: 'Jul 2024 - Sep 2024',
    image: exportProcessImg,
    tags: ['Export', 'Logistics', 'Efficiency', 'Documentation']
  },
  {
    id: 4,
    title: 'Basil Cultivation Training Program',
    category: 'Agriculture',
    description: 'Intensive training program covering all aspects of commercial basil production - from land preparation and seedling transplanting to pest management and post-harvest handling. Farmers learned about optimal spacing, irrigation scheduling, organic fertilization, and proper harvesting techniques to maximize quality and shelf life.',
    impact: '150 farmers trained, 25% yield increase, 40% reduction in post-harvest losses',
    date: 'Oct 2024 - Dec 2024',
    image: basilCultivationImg,
    tags: ['Training', 'Basil', 'Capacity Building', 'Best Practices']
  },
  {
    id: 5,
    title: 'Fresh Produce Market Linkages',
    category: 'Market Access',
    description: 'Created direct market linkages between smallholder farmers and premium buyers including supermarket chains, hotels, and restaurants. Established farmer aggregation centers, implemented quality grading systems, and negotiated favorable payment terms. Provided market intelligence and demand forecasting to help farmers plan production.',
    impact: 'Increased farmer revenue by 40%, connected 200+ farmers to 15 premium buyers',
    date: 'Jan 2025 - Present',
    image: marketLinkagesImg,
    tags: ['Market Access', 'Revenue', 'Partnership', 'Value Chain']
  },
  {
    id: 6,
    title: 'Sustainable Herb Farming Initiative',
    category: 'Sustainability',
    description: 'Promoting climate-smart and eco-friendly farming practices for herb cultivation. Introduced drip irrigation, mulching, composting, and integrated pest management. Trained farmers on water conservation, soil health management, and biodiversity preservation. Established demonstration plots showcasing sustainable practices.',
    impact: 'Reduced water usage by 35%, improved soil health, 50% reduction in chemical inputs',
    date: 'Ongoing',
    image: herbFieldImg,
    tags: ['Sustainability', 'Herbs', 'Environment', 'Climate-Smart']
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
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          // Use API data - alias imageUrl to image for consistency
          const dynamicProjects = response.data.map(p => ({ 
            ...p, 
            image: p.imageUrl || p.image 
          }));
          setProjects(dynamicProjects);
        }
        // If API returns empty array, keep using initialProjects (fallback)
      } catch (err) {
        console.error("Failed to fetch projects:", err);
        // Keep using initialProjects (fallback) on error
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
          <p className="text-gray-700 max-w-3xl mx-auto mb-6">
            From farm to market, we implement impactful projects that enhance quality, empower communities, and promote sustainable agriculture across Africa.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-green-600 mb-2">200+</div>
              <div className="text-gray-600">Farmers Impacted</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-green-600 mb-2">6</div>
              <div className="text-gray-600">Active Projects</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-green-600 mb-2">5</div>
              <div className="text-gray-600">Regions Covered</div>
            </div>
          </div>
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
