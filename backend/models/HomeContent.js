import mongoose from 'mongoose';

const HomeContentSchema = new mongoose.Schema({
  heroTitle: { type: String, required: true },
  heroSubtitle: { type: String, required: true },
  sliderImages: [{ 
    url: { type: String, required: true },
    caption: String 
  }],
  sections: [{
    title: String,
    content: String,
    imageUrl: String
  }]
}, { timestamps: true });

export default mongoose.model('HomeContent', HomeContentSchema);