import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: { type: String },
  icon: { type: String },
  order: { type: Number, default: 0 }
}, { timestamps: true });

const Service = mongoose.model('Service', serviceSchema);

export default Service;