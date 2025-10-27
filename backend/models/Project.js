import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  category: { type: String, required: true },
  client: { type: String },
  completionDate: { type: Date },
  features: [String],
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Project', ProjectSchema);