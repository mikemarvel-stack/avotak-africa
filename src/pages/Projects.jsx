import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Target, MapPin, ArrowRight, Filter, X } from 'lucide-react';
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

const ProjectCard = ({ project, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
    className="bg-white rounded-2xl shadow-lg overflow-hidden group"
  >
    <div className="relative overflow-hidden h-64">
      <motion.img 
        src={project.image} 
        alt={project.title} 
        className="w-full h-full object-cover"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-4 left-4 right-4">
        <span className="inline-block bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
          {project.category}
        </span>
        <h3 className="text-xl font-bold text-white">{project.title}</h3>
      </div>
    </div>
    <div className="p-6">
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>{project.date}</span>
        </div>
      </div>
      <p className="text-gray-700 mb-4 line-clamp-3">{project.description}</p>
      <div className="flex items-start gap-2 p-3 bg-green-50 rounded-lg mb-4">
        <Target className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-green-800 font-medium">{project.impact}</p>
      </div>
      {project.tags && (
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
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
  const [filteredProjects, setFilteredProjects] = useState(initialProjects);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = ['All', ...new Set(staticProjects.map(p => p.category))];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/content/projects');
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          const dynamicProjects = response.data.map(p => ({ 
            ...p, 
            image: p.imageUrl || p.image 
          }));
          setProjects(dynamicProjects);
          setFilteredProjects(dynamicProjects);
        }
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.category === selectedCategory));
    }
  }, [selectedCategory, projects]);

  if (loading) {
    return <div className="text-center py-16">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-16 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-green-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Transforming Agriculture Across East Africa
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Discover our impactful projects empowering farmers and building sustainable food systems
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="-mt-12 relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-xl text-center"
            >
              <div className="text-5xl font-bold text-green-600 mb-2">200+</div>
              <div className="text-gray-600 font-medium">Farmers Impacted</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-xl text-center"
            >
              <div className="text-5xl font-bold text-green-600 mb-2">{projects.length}</div>
              <div className="text-gray-600 font-medium">Active Projects</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-8 rounded-2xl shadow-xl text-center"
            >
              <div className="text-5xl font-bold text-green-600 mb-2">5</div>
              <div className="text-gray-600 font-medium">Regions Covered</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Filter className="w-5 h-5 text-gray-600" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div 
              key={selectedCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project._id || project.id} project={project} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
