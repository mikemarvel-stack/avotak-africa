import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Service from '../models/Service.js';
import Project from '../models/Project.js';
import Produce from '../models/Produce.js';
import HomeContent from '../models/HomeContent.js';
import AboutContent from '../models/AboutContent.js';

dotenv.config();

const services = [
  {
    title: 'Farm Advisory & Consulting',
    description: 'Expert guidance on crop selection, soil management, and sustainable farming practices to maximize yields and profitability. Our agronomists provide on-site assessments, customized farm plans, and ongoing support.',
    icon: 'Leaf',
    order: 0
  },
  {
    title: 'Post-Harvest Handling & Quality Management',
    description: 'Professional support in handling, storage, and quality control to reduce losses and maintain premium standards. We help farmers implement proper harvesting techniques, cooling systems, and packaging solutions.',
    icon: 'Truck',
    order: 1
  },
  {
    title: 'Market Linkages & Export Facilitation',
    description: 'Direct connections to local and international markets, with full export documentation and logistics support. We connect farmers to premium buyers and handle all export procedures.',
    icon: 'Globe',
    order: 2
  },
  {
    title: 'Training & Capacity Building',
    description: 'Comprehensive training programs for farmers on modern agricultural techniques and business management. Our courses cover Good Agricultural Practices, financial literacy, and entrepreneurship.',
    icon: 'GraduationCap',
    order: 3
  },
  {
    title: 'Sustainability & Climate-Smart Agriculture',
    description: 'Implementing eco-friendly practices and climate-resilient farming methods for long-term sustainability. We promote water conservation, soil health, and biodiversity.',
    icon: 'LineChart',
    order: 4
  },
  {
    title: 'Supply Chain & Value Addition Support',
    description: 'End-to-end supply chain management and value addition services to increase product value and market reach. We help farmers process, package, and brand their products.',
    icon: 'Factory',
    order: 5
  }
];

const projects = [
  {
    title: 'Hass Avocado Export Program',
    description: 'Established direct export channels for premium Hass avocados from Kenya to European markets. Trained 80 farmers on GAP standards, post-harvest handling, and quality grading.',
    category: 'Export',
    impact: '80 farmers exporting, 200 tons annually, 40% income increase',
    duration: 'Jan 2024 - Ongoing',
    order: 0
  },
  {
    title: 'Kent Mango Quality Improvement',
    description: 'Comprehensive training program for mango farmers focusing on pruning, pest management, and harvest timing. Established collection centers with quality grading equipment.',
    category: 'Training',
    impact: '120 farmers trained, 35% premium pricing, reduced rejections by 60%',
    duration: 'Mar 2024 - Present',
    order: 1
  },
  {
    title: 'Fresh Basil Production for Export',
    description: 'Developed commercial basil production for European supermarkets. Provided seedlings, drip irrigation kits, and technical support to 50 farmers.',
    category: 'Export',
    impact: '50 farmers, 5 tons weekly exports, consistent year-round income',
    duration: 'Feb 2024 - Ongoing',
    order: 2
  },
  {
    title: 'Organic Ginger Certification Project',
    description: 'Supported 30 farmer groups to achieve organic certification for ginger production. Provided training on organic farming practices and connected farmers to organic buyers.',
    category: 'Training',
    impact: '30 groups certified, 50% price premium, 150 farmers benefiting',
    duration: 'Jan 2023 - Dec 2024',
    order: 3
  },
  {
    title: 'Sustainable Herb Farming Initiative',
    description: 'Promoted climate-smart practices for rosemary, coriander, and basil cultivation. Introduced drip irrigation, mulching, and integrated pest management.',
    category: 'Training',
    impact: '200 farmers trained, 40% water savings, 50% less chemicals',
    duration: 'Jun 2024 - Ongoing',
    order: 4
  },
  {
    title: 'Cherry Tomato Market Linkages',
    description: 'Connected smallholder farmers to premium cherry tomato markets in regional supermarkets and hotels. Provided greenhouse technology and quality seeds.',
    category: 'Export',
    impact: '60 farmers linked, 15 premium buyers, 45% revenue increase',
    duration: 'Apr 2024 - Present',
    order: 5
  },
  {
    title: 'Fresh Rosemary Export Development',
    description: 'Developed fresh rosemary supply chain for European markets. Trained farmers on proper harvesting, bunching, and post-harvest handling.',
    category: 'Export',
    impact: '40 farmers exporting, 2 tons weekly, new income stream created',
    duration: 'May 2024 - Ongoing',
    order: 6
  },
  {
    title: 'Coriander Production Training',
    description: 'Intensive training program on commercial coriander production for local and export markets. Provided quality seeds and drip irrigation kits.',
    category: 'Training',
    impact: '100 farmers trained, 30% yield increase, reliable market access',
    duration: 'Jul 2024 - Present',
    order: 7
  }
];

const produce = [
  { name: 'Hass Avocado', description: 'Premium export-quality avocados, rich in healthy fats and nutrients.', category: 'Fruits', featured: true },
  { name: 'Fresh Mango', description: 'Sweet, juicy tropical mangoes grown in optimal conditions.', category: 'Fruits', featured: true },
  { name: 'Organic Basil', description: 'Aromatic fresh basil cultivated using sustainable practices.', category: 'Herbs', featured: true },
  { name: 'Fresh Ginger', description: 'Organic ginger root with intense flavor and aroma.', category: 'Spices', featured: true },
  { name: 'Vine Tomatoes', description: 'Fresh vine-ripened tomatoes bursting with flavor.', category: 'Vegetables' },
  { name: 'Fresh Rosemary', description: 'Fragrant rosemary herbs perfect for seasoning.', category: 'Herbs' },
  { name: 'Coriander', description: 'Fresh coriander leaves with distinctive flavor.', category: 'Herbs' },
  { name: 'Organic Turmeric', description: 'Golden turmeric root known for its anti-inflammatory properties.', category: 'Spices' },
  { name: 'Fresh Spinach', description: 'Nutrient-rich spinach leaves packed with vitamins.', category: 'Vegetables' },
  { name: 'Organic Carrots', description: 'Crisp, sweet carrots grown without pesticides.', category: 'Vegetables' },
  { name: 'Sweet Bananas', description: 'Premium quality bananas rich in potassium.', category: 'Fruits' },
  { name: 'Fresh Apples', description: 'Crisp and juicy apples with excellent shelf life.', category: 'Fruits' }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    await Service.deleteMany({});
    await Project.deleteMany({});
    await Produce.deleteMany({});
    console.log('🗑️  Cleared existing data');

    await Service.insertMany(services);
    console.log(`✅ Inserted ${services.length} services`);

    await Project.insertMany(projects);
    console.log(`✅ Inserted ${projects.length} projects`);
    console.log('   Projects: Avocado, Mango, Basil, Ginger, Herbs, Tomato, Rosemary, Coriander');

    await Produce.insertMany(produce);
    console.log(`✅ Inserted ${produce.length} produce items`);

    await HomeContent.findOneAndUpdate({}, {
      heroTitle: 'Empowering African Farmers Through Innovation',
      heroSubtitle: 'Premium produce, expert consultancy, and sustainable agriculture solutions'
    }, { upsert: true });
    console.log('✅ Updated home content');

    await AboutContent.findOneAndUpdate({}, {
      title: 'About Avotak Africa Limited',
      description: 'Avotak Africa Limited is a dynamic agricultural enterprise dedicated to revolutionizing the agricultural value chain across East Africa.'
    }, { upsert: true });
    console.log('✅ Updated about content');

    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
