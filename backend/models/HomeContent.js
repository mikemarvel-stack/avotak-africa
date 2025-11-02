import mongoose from 'mongoose';

const HomeContentSchema = new mongoose.Schema({
  heroTitle: { type: String, default: 'Fresh from Our Farms to Your Table' },
  heroSubtitle: { type: String, default: 'Discover the taste of quality, sustainably grown produce from the heart of East Africa.' },
  sliderImages: { type: [String], default: [] },
}, {
  // Use a singleton pattern by capping the collection at 1 document
  capped: { size: 1024, max: 1 } 
});

export default mongoose.model('HomeContent', HomeContentSchema);
