
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import Home from '../models/HomeContent.js'; // Corrected import
import Service from '../models/Service.js';
import Produce from '../models/Produce.js';
import Project from '../models/Project.js';
import User from '../models/User.js';

dotenv.config();

const sampleHomeContent = {
  heroTitle: 'Cultivating Prosperity, Harvesting Quality',
  heroSubtitle: 'Your trusted partner in African agriculture, from farm to global market. We specialize in premium produce and expert consultancy.',
  heroImageUrl: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=1974&auto=format&fit=crop',
  sliderImages: [
    { url: 'https://res.cloudinary.com/dcvx45xcn/image/upload/v1719503998/avotak-africa/slider/slide1_y2j6jz.jpg', caption: 'Lush green farmlands' },
    { url: 'https://res.cloudinary.com/dcvx45xcn/image/upload/v1719503998/avotak-africa/slider/slide2_f9j1x5.jpg', caption: 'Freshly harvested produce' },
    { url: 'https://res.cloudinary.com/dcvx45xcn/image/upload/v1719503998/avotak-africa/slider/slide3_d0qj3p.jpg', caption: 'Ready for the market' },
    { url: 'https://res.cloudinary.com/dcvx45xcn/image/upload/v1719503998/avotak-africa/slider/slide4_yqj1fg.jpg', caption: 'Sustainable farming practices' },
    { url: 'https://res.cloudinary.com/dcvx45xcn/image/upload/v1719503998/avotak-africa/slider/slide5_w9z9x8.jpg', caption: 'Quality you can trust' },
  ],
};

// --- DEFAULT PRODUCE ITEMS ---
const defaultProduceData = [
  {
    name: 'Avocado',
    description: 'Creamy Hass avocados, perfect for salads and toast.',
    category: 'Fruits',
    imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1629986831/samples/food/avocado.jpg',
    isFeatured: true,
  },
  {
    name: 'Mango',
    description: 'Sweet and juicy Kent mangoes, bursting with tropical flavor.',
    category: 'Fruits',
    imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1629986832/samples/food/dessert.jpg',
    isFeatured: true,
  },
  {
    name: 'Coffee Beans',
    description: 'Rich Arabica coffee beans, single-origin from the slopes of Mt. Kenya.',
    category: 'Grains',
    imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1629986834/samples/food/coffee.jpg',
    isFeatured: false,
  },
  {
    name: 'Green Beans',
    description: 'Crisp and tender green beans, grown for maximum freshness.',
    category: 'Vegetables',
    imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1629986833/samples/food/spices.jpg', // Replace with a real green bean image
    isFeatured: true,
  },
];

const sampleServices = [
    { name: 'Agricultural Consultancy', description: 'Expert advice to optimize your farming practices.', icon: 'Briefcase' },
    { name: 'Produce Sourcing', description: 'Connecting you with the best farm-fresh products.', icon: 'Leaf' },
    { name: 'Market Linkage', description: 'Facilitating access to local and international markets.', icon: 'Globe' },
    { name: 'Quality Assurance', description: 'Ensuring your produce meets the highest standards.', icon: 'Award' },
];

const sampleProduce = [
    { name: 'Avocado', description: 'Creamy and nutritious Hass avocados.', price: 1.50, imageUrl: 'https://res.cloudinary.com/dcvx45xcn/image/upload/v1719503998/avotak-africa/produce/avocado_e5b2c1.jpg' },
    { name: 'Mango', description: 'Sweet and juicy Kent mangoes.', price: 2.00, imageUrl: 'https://res.cloudinary.com/dcvx45xcn/image/upload/v1719503998/avotak-africa/produce/mango_c8x2j1.jpg' },
    { name: 'Pineapple', description: 'Tropical and tangy pineapples.', price: 3.00, imageUrl: 'https://res.cloudinary.com/dcvx45xcn/image/upload/v1719503998/avotak-africa/produce/pineapple_f8x2j1.jpg' },
];

// 2. Add a function to seed projects
const seedProjects = async () => {
  try {
    await Project.deleteMany(); // Clear existing projects

    const projects = [
      {
        title: 'Sustainable Avocado Farming Initiative',
        description: 'A project focused on implementing eco-friendly farming practices for avocado cultivation, improving yield and quality while preserving the environment.',
        image: '/path/to/your/image.jpg', // Use appropriate image paths
        tags: ['Sustainability', 'Avocado', 'Farming'],
        order: 1,
      },
      {
        title: 'Community Mango Export Program',
        description: 'Empowering local communities by creating direct market linkages for high-quality mango exports to international markets.',
        image: '/path/to/your/image2.jpg',
        tags: ['Community', 'Export', 'Mango'],
        order: 2,
      },
    ];

    await Project.insertMany(projects);
    console.log('Projects have been seeded');
  } catch (error) {
    console.error('Error seeding projects:', error);
  }
};

const seedHomeContent = async () => {
  try {
    await Home.deleteMany(); // Use deleteMany for consistency
    console.log('Seeding default home content...');
    await Home.create(sampleHomeContent);
    console.log('✅ Default home content seeded.');
  } catch (error) {
    console.error('❌ Error seeding home content:', error);
  }
};

const seedProduce = async () => {
  try {
    await Produce.deleteMany(); // Use deleteMany for consistency
    console.log('Seeding default produce items...');
    await Produce.insertMany(defaultProduceData);
    console.log('✅ Default produce items seeded.');
  } catch (error) {
    console.error('❌ Error seeding produce:', error);
  }
};

const seedServices = async () => {
  try {
    await Service.deleteMany();
    console.log('Seeding default services...');
    
    await Service.insertMany(sampleServices);
    console.log('✅ Default services seeded.');
  } catch (error) {
    console.error('❌ Error seeding services:', error);
  }
};

const seedAdminUser = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    const adminExists = await User.findOne({ email: adminEmail });

    if (!adminExists) {
      const adminPassword = process.env.ADMIN_PASSWORD || 'password123';
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminPassword, salt);

      const adminUser = new User({
        username: 'admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
      });

      await adminUser.save();
      console.log('✅ Admin user created.');
    } else {
      console.log('Admin user already exists.');
    }
  } catch (error) {
    console.error('❌ Error seeding admin user:', error);
  }
};

export const seedDatabase = async () => {
  try {
    // 1. Connect to MongoDB
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB connected for seeding...');
    }

    console.log('Starting database seed...');

    // Seed Home Content
    await seedHomeContent();

    // Seed Services
    await seedServices();

    // Seed Produce
    await seedProduce();

    // Seed Projects
    await seedProjects();

    // Seed Admin User
    await seedAdminUser();
    
    console.log('Database seeding completed successfully.');
  } catch (error) {
    console.error('Error during database seeding:', error);
  } finally {
    // 2. Close the connection
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
      console.log('MongoDB connection closed.');
    }
  }
};

// Invoke the seed function to run the script
if (import.meta.url.startsWith('file:') && process.argv[1] === new URL(import.meta.url).pathname) {
  seedDatabase();
}
