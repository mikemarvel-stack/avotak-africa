import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  icon: { type: String },
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Service', ServiceSchema);