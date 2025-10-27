import mongoose from 'mongoose';

const GallerySchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  caption: { type: String },
  category: { type: String },
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Gallery', GallerySchema);