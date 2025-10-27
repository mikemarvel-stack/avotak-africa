import mongoose from 'mongoose';

const StatSchema = new mongoose.Schema({
  title: { type: String, required: true },
  value: { type: String, required: true }
});

export default mongoose.model('Stat', StatSchema);
