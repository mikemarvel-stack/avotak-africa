
import mongoose from 'mongoose';

const AboutContentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: 'About Avotak Africa',
  },
  description: {
    type: String,
    required: true,
    default: 'Avotak Africa is a premier agricultural consultancy firm...',
  },
  imageUrl: {
    type: String,
    default: '',
  },
});

// Ensure there is only one document for About Us content
AboutContentSchema.statics.findOneOrCreate = async function findOneOrCreate() {
  try {
    let doc = await this.findOne();
    if (!doc) {
      doc = new this();
      await doc.save();
    }
    return doc;
  } catch (error) {
    console.error("Error in findOneOrCreate for AboutContent:", error);
    throw error;
  }
};

export default mongoose.model('AboutContent', AboutContentSchema);
