
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import Produce from './models/Produce.js';
import Project from './models/Project.js';
import Gallery from './models/Gallery.js';
import Service from './models/Service.js';
import HomeContent from './models/HomeContent.js'; // Import HomeContent
import AboutContent from './models/AboutContent.js'; // Import AboutContent

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...'.cyan.underline);
  } catch (err) {
    console.error(`Error: ${err.message}`.red.bold);
    process.exit(1);
  }
};

await connectDB();

// Sample data for HomeContent
const sampleHomeContent = {
  heroTitle: 'Cultivating Prosperity, Harvesting Quality',
  heroSubtitle: 'Your trusted partner in African agriculture, from farm to global market. We specialize in premium produce and expert consultancy.',
  heroImageUrl: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=1974&auto=format&fit=crop',
};

// Sample data for AboutContent
const sampleAboutContent = {
  title: 'About Avotak Africa',
  description: 'Avotak Africa is a premier agricultural consultancy firm dedicated to empowering farmers and transforming the agricultural landscape. We bridge the gap between traditional farming and modern, sustainable practices to enhance productivity, ensure quality, and create access to lucrative markets. Our team of experts provides end-to-end support, from crop management to export facilitation, ensuring our partners thrive in a competitive global environment.',
  imageUrl: 'https://images.unsplash.com/photo-1586701315923-9c41ab737658?q=80&w=1974&auto=format&fit=crop',
};

// ... existing code
const sampleServices = [
  {
    title: 'Agronomy & Crop Management',
    description: 'Expert guidance on soil health, crop selection, and pest management to maximize your yield and ensure sustainable farming practices.',
    imageUrl: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=1974&auto=format&fit=crop',
    category: 'Consultancy',
  },
  {
    title: 'Supply Chain & Logistics',
    description: 'Streamlining the journey from farm to market. We optimize storage, transportation, and distribution to reduce waste and improve profitability.',
    imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop',
    category: 'Consultancy',
  },
  {
    title: 'Agribusiness Training',
    description: 'Empowering farmers and cooperatives with the business skills needed to thrive, covering financial planning, market analysis, and technology adoption.',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2232&auto=format&fit=crop',
    category: 'Consultancy',
  },
  {
    title: 'Market Access & Linkages',
    description: 'Connecting you with local and international buyers. We help you meet quality standards and negotiate fair prices for your produce.',
    imageUrl: 'https://images.unsplash.com/photo-1620371350502-999e9a7d80a4?q=80&w=2070&auto=format&fit=crop',
    category: 'Consultancy',
  },
  {
    title: 'Processing & Value Addition',
    description: 'Transforming raw produce into high-value products. Our services include guidance on processing techniques, packaging, and branding.',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1683288295228-c6d5a1491c6a?q=80&w=2070&auto=format&fit=crop',
    category: 'Consultancy',
  },
  {
    title: 'Export Facilitation',
    description: 'Navigating the complexities of international trade. We assist with certification, documentation, and compliance for global markets.',
    imageUrl: 'https://images.unsplash.com/photo-1579961376369-55a3c31b3e26?q=80&w=2070&auto=format&fit=crop',
    category: 'Consultancy',
  },
];

const sampleProduce = [
  {
    name: 'Hass Avocado',
    description: 'Creamy and nutritious Hass avocados, grown with sustainable practices. Perfect for export and local markets.',
    imageUrl: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=1975&auto=format&fit=crop',
    featured: true,
    category: 'Fruit',
  },
  {
    name: 'Kent Mangoes',
    description: 'Sweet, juicy, and fiberless Kent mangoes. A premium fruit highly sought after for its rich flavor and vibrant color.',
    imageUrl: 'https://images.unsplash.com/photo-1591078455533-2a8b6a4010e8?q=80&w=1974&auto=format&fit=crop',
    featured: true,
    category: 'Fruit',
  },
  {
    name: 'Sweet Pineapples',
    description: 'Tropical pineapples, cultivated for exceptional sweetness and low acidity. Ideal for fresh consumption and processing.',
    imageUrl: 'https://images.unsplash.com/photo-1587883138039-a426b34035f3?q=80&w=1974&auto=format&fit=crop',
    featured: true,
    category: 'Fruit',
  },
  {
    name: 'Passion Fruit',
    description: 'Aromatic and tangy passion fruits, packed with vitamins. Excellent for juices, desserts, and value-added products.',
    imageUrl: 'https://images.unsplash.com/photo-1617125642921-5658ed1f3048?q=80&w=1974&auto=format&fit=crop',
    featured: true,
    category: 'Fruit',
  },
];

const sampleProjects = [
  {
    name: 'Sustainable Avocado Farming Initiative',
    title: 'Sustainable Avocado Farming Initiative',
    description: 'A project focused on eco-friendly avocado cultivation techniques, water conservation, and improving soil health for long-term productivity.',
    imageUrl: 'https://images.unsplash.com/photo-1601599561213-832382fd075e?q=80&w=2070&auto=format&fit=crop',
    category: 'Consultancy',
    order: 1,
  },
  {
    name: 'Community Mango Orchard Program',
    title: 'Community Mango Orchard Program',
    description: 'Empowering local communities through shared mango farming, providing training on modern agricultural practices and creating new income streams.',
    imageUrl: 'https://images.unsplash.com/photo-1625862249590-4f3333429b40?q=80&w=2070&auto=format&fit=crop',
    category: 'Farming Project',
    order: 2,
  },
];

const sampleGallery = [
  {
    title: 'Avocado Harvest',
    imageUrl: 'https://images.unsplash.com/photo-1567354234834-35c4a7c78964?q=80&w=1974&auto=format&fit=crop',
    publicId: 'gallery_avocado_harvest',
    category: 'Farming',
    order: 1,
  },
  {
    title: 'Lush Farmlands',
    imageUrl: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=1974&auto=format&fit=crop',
    publicId: 'gallery_lush_farmlands',
    category: 'Scenery',
    order: 2,
  },
  {
    title: 'Ready for Market',
    imageUrl: 'https://images.unsplash.com/photo-1543083477-4f785aeafaa9?q=80&w=2070&auto=format&fit=crop',
    publicId: 'gallery_ready_for_market',
    category: 'Produce',
    order: 3,
  },
  {
    title: 'Quality Inspection',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1661767174128-b01c036aefd8?q=80&w=2070&auto=format&fit=crop',
    publicId: 'gallery_quality_inspection',
    category: 'Process',
    order: 4,
  },
];

const importData = async () => {
  try {
    // Clear existing data
    await Service.deleteMany();
    await Produce.deleteMany();
    await Project.deleteMany();
    await Gallery.deleteMany();
    await HomeContent.deleteMany();
    await AboutContent.deleteMany();

    // Insert new data
    await Service.insertMany(sampleServices);
    await Produce.insertMany(sampleProduce);
    await Project.insertMany(sampleProjects);
    await Gallery.insertMany(sampleGallery);
    await HomeContent.create(sampleHomeContent);
    await AboutContent.create(sampleAboutContent);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Service.deleteMany();
    await Produce.deleteMany();
    await Project.deleteMany();
    await Gallery.deleteMany();
    await HomeContent.deleteMany();
    await AboutContent.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
