
import Home from '../models/Home.js';
import Produce from '../models/Produce.js';
import Project from '../models/Project.js'; // 1. Import the Project model

// --- DEFAULT HOME CONTENT ---
// IMPORTANT: Replace these placeholder URLs with actual URLs of images
// you have uploaded to a service like Cloudinary or another image host.
const defaultHomeData = {
  heroTitle: 'Fresh from Our Farms to Your Table',
  heroSubtitle: 'Discover the taste of quality, sustainably grown produce from the heart of East Africa.',
  sliderImages: [
    { url: 'https://res.cloudinary.com/demo/image/upload/v1629986835/samples/landscapes/nature-mountains.jpg', caption: 'Our lush green farms' },
    { url: 'https://res.cloudinary.com/demo/image/upload/v1629986833/samples/food/spices.jpg', caption: 'Ready for harvest' },
    { url: 'https://res.cloudinary.com/demo/image/upload/v1629986828/samples/landscapes/beach-boat.jpg', caption: 'Sustainable farming practices' },
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

const seedHomeContent = async () => {
  try {
    await Home.deleteMany(); // Use deleteMany for consistency
    console.log('Seeding default home content...');
    await Home.create(defaultHomeData);
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


export const seedDatabase = async () => {
  await seedHomeContent();
  await seedProduce();
  await seedProjects(); // 3. Call the new seed function
};
