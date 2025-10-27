import mongoose from 'mongoose';

const ProduceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: String },
  unit: { type: String },
  availability: { type: String },
  features: [String],
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Produce', ProduceSchema);