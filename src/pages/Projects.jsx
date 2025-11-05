import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Target, MapPin, ArrowRight, Filter, X } from 'lucide-react';
import api from '../services/api';
import avocadoImg from '../assets/avocado.jpg';
import mangoImg from '../assets/mango.jpg';
import basilImg from '../assets/basil.jpg';
import gingerImg from '../assets/ginger.jpg';
import herbFieldImg from '../assets/herb-field.jpg';
import tomatoImg from '../assets/tomato.jpg';
import rosemaryImg from '../assets/rosemary.jpg';
import corianderImg from '../assets/coriander.jpg';

// Helper to normalize strings (lowercase, remove spaces & special chars)
const normalize = (str) =>
  str.toLowerCase().replace(/[\s\W]/g, '');

const staticProjects = [
  {
    id: 1,
    title: 'Hass Avocado Export Program',
    category: 'Export',
    description: 'Established direct export channels for premium Hass avocados from Kenya to European markets. Trained 80 farmers on GAP standards, post-harvest handling, and quality grading. Implemented traceability systems and obtained GlobalGAP certification. Negotiated contracts with importers in Netherlands, UK, and France ensuring fair prices and consistent demand.',
    impact: '80 farmers exporting, 200 tons annually, 40% income increase',
    date: 'Jan 2024 - Ongoing',
    image: avocadoImg,
    tags: ['Avocado', 'Export', 'Europe', 'Premium']
  },
  {
    id: 2,
    title: 'Kent Mango Quality Improvement',
    category: 'Training',
    description: 'Comprehensive training program for mango farmers focusing on pruning, pest management, and harvest timing. Introduced hot water treatment for fruit flies and improved packaging. Established collection centers with quality grading equipment. Connected farmers to premium buyers in Middle East and Asia.',
    impact: '120 farmers trained, 35% premium pricing, reduced rejections by 60%',
    date: 'Mar 2024 - Present',
    image: mangoImg,
    tags: ['Mango', 'Quality', 'Training', 'Markets']
  },
  {
    id: 3,
    title: 'Fresh Basil Production for Export',
    category: 'Export',
    description: 'Developed commercial basil production for European supermarkets. Provided seedlings, drip irrigation kits, and technical support to 50 farmers. Established cold chain from farm to airport. Trained farmers on harvesting, bunching, and packaging to meet buyer specifications. Weekly airfreight to UK and Germany.',
    impact: '50 farmers, 5 tons weekly exports, consistent year-round income',
    date: 'Feb 2024 - Ongoing',
    image: basilImg,
    tags: ['Basil', 'Herbs', 'Export', 'Fresh']
  },
  {
    id: 4,
    title: 'Organic Ginger Certification Project',
    category: 'Training',
    description: 'Supported 30 farmer groups to achieve organic certification for ginger production. Provided training on organic farming practices, composting, and natural pest control. Facilitated certification process and connected farmers to organic buyers in Europe and USA. Premium prices justified the 3-year transition period.',
    impact: '30 groups certified, 50% price premium, 150 farmers benefiting',
    date: 'Jan 2023 - Dec 2024',
    image: gingerImg,
    tags: ['Ginger', 'Organic', 'Certification', 'Premium']
  },
  {
    id: 5,
    title: 'Sustainable Herb Farming Initiative',
    category: 'Training',
    description: 'Promoted climate-smart practices for rosemary, coriander, and basil cultivation. Introduced drip irrigation, mulching, and integrated pest management. Established demonstration plots and farmer field schools. Trained 200 farmers on water conservation, soil health, and biodiversity. Reduced chemical use while maintaining yields.',
    impact: '200 farmers trained, 40% water savings, 50% less chemicals',
    date: 'Jun 2024 - Ongoing',
    image: herbFieldImg,
    tags: ['Herbs', 'Sustainability', 'Climate-Smart', 'Water']
  },
  {
    id: 6,
    title: 'Cherry Tomato Market Linkages',
    category: 'Export',
    description: 'Connected smallholder farmers to premium cherry tomato markets in regional supermarkets and hotels. Provided greenhouse technology, quality seeds, and technical support. Established aggregation centers with cooling facilities. Negotiated contracts ensuring stable prices and consistent offtake. Farmers receive payment within 7 days.',
    impact: '60 farmers linked, 15 premium buyers, 45% revenue increase',
    date: 'Apr 2024 - Present',
    image: tomatoImg,
    tags: ['Tomato', 'Markets', 'Greenhouse', 'Premium']
  },
  {
    id: 7,
    title: 'Fresh Rosemary Export Development',
    category: 'Export',
    description: 'Developed fresh rosemary supply chain for European markets. Trained farmers on proper harvesting, bunching, and post-harvest handling. Established cold storage and packaging facility. Implemented quality control systems and traceability. Weekly airfreight to UK, Netherlands, and Germany. Consistent quality and supply maintained.',
    impact: '40 farmers exporting, 2 tons weekly, new income stream created',
    date: 'May 2024 - Ongoing',
    image: rosemaryImg,
    tags: ['Rosemary', 'Herbs', 'Export', 'Europe']
  },
  {
    id: 8,
    title: 'Coriander Production Training',
    category: 'Training',
    description: 'Intensive training program on commercial coriander production for local and export markets. Covered land preparation, seed selection, irrigation, pest management, and harvesting. Provided quality seeds and drip irrigation kits. Connected farmers to buyers in hotels, restaurants, and supermarkets. Established farmer groups for collective marketing.',
    impact: '100 farmers trained, 30% yield increase, reliable market access',
    date: 'Jul 2024 - Present',
    image: corianderImg,
    tags: ['Coriander', 'Training', 'Production', 'Markets']
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

  const categories = ['All', 'Export', 'Training'];

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
