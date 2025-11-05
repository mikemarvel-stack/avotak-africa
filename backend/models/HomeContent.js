
import mongoose from 'mongoose';
const HomeContentSchema = new mongoose.Schema({
  heroTitle: { type: String, default: 'Fresh from Our Farms to Your Table' },
  heroSubtitle: { type: String, default: 'Discover the taste of quality, sustainably grown produce from the heart of East Africa.' },
  sliderImages: { 
    type: [{
      url: String,
      caption: String,
    }], 
    default: [] 
  },
}, {
  // Use a singleton pattern by capping the collection at 1 document
  capped: { size: 4096, max: 1 } // Increased size to accommodate richer data
});

HomeContentSchema.statics.findOneOrCreate = async function() {
  let content = await this.findOne();
  if (!content) {
    content = await this.create({});
  }
  return content;
};

const Home = mongoose.model('Home', HomeContentSchema);

export default Home;
