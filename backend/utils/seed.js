
import HomeContent from '../models/HomeContent.js';
import Produce from '../models/Produce.js';

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
    const count = await HomeContent.countDocuments();
    if (count === 0) {
      console.log('No home content found. Seeding default home content...');
      await HomeContent.create(defaultHomeData);
      console.log('✅ Default home content seeded.');
    }
  } catch (error) {
    console.error('❌ Error seeding home content:', error);
  }
};

const seedProduce = async () => {
  try {
    const count = await Produce.countDocuments();
    if (count === 0) {
      console.log('No produce found. Seeding default produce items...');
      await Produce.insertMany(defaultProduceData);
      console.log('✅ Default produce items seeded.');
    }
  } catch (error) {
    console.error('❌ Error seeding produce:', error);
  }
};

export const seedDatabase = async () => {
  await seedHomeContent();
  await seedProduce();
};
