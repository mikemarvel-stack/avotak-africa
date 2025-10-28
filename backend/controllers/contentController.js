
import HomeContent from '../models/HomeContent.js';
import Gallery from '../models/Gallery.js';
import Service from '../models/Service.js';
import Produce from '../models/Produce.js';
import Project from '../models/Project.js';
import AboutContent from '../models/AboutContent.js';

// ... existing code

// --- About Content ---

export const getAboutContent = async (req, res) => {
  try {
    const content = await AboutContent.findOneOrCreate();
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching about content', error: error.message });
  }
};

export const updateAboutContent = async (req, res) => {
  try {
    const content = await AboutContent.findOneOrCreate();
    const { title, description, imageUrl } = req.body;

    content.title = title ?? content.title;
    content.description = description ?? content.description;
    content.imageUrl = imageUrl ?? content.imageUrl;

    const updatedContent = await content.save();
    res.json(updatedContent);
  } catch (error) {
    res.status(500).json({ message: 'Error updating about content', error: error.message });
  }
};
