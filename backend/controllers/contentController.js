
import HomeContent from '../models/HomeContent.js';
import Gallery from '../models/Gallery.js';
import Service from '../models/Service.js';
import Produce from '../models/Produce.js';
import Project from '../models/Project.js';
import AboutContent from '../models/AboutContent.js';
import ServicesContent from '../models/ServicesContent.js';

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

// @desc    Get all produce
// @route   GET /api/content/produce
// @access  Public
export const getProduce = async (req, res) => {
  const produce = await Produce.find({});
  res.json(produce);
};

// @desc    Add a new produce item
// @route   POST /api/content/produce
// @access  Private
export const addProduce = async (req, res) => {
  const { name, description, price, category, imageUrl } = req.body;

  const produce = new Produce({
    name,
    description,
    price,
    category,
    imageUrl,
  });

  const createdProduce = await produce.save();
  res.status(201).json(createdProduce);
};

// @desc    Update a produce item
// @route   PUT /api/content/produce/:id
// @access  Private
export const updateProduce = async (req, res) => {
// ... existing code
  }
  res.json({ message: 'Produce item removed' });
};

export const deleteProduce = async (req, res) => {
  const { id } = req.params;
  const produce = await Produce.findById(id);

  if (!produce) {
    return res.status(404).json({ message: 'Produce item not found' });
  }

  await produce.remove();
  res.json({ message: 'Produce item removed' });
};

export {
  getHomeContent,
  updateHomeContent,
  getServicesContent,
  updateServicesContent,
  getProduce,
  addProduce,
  updateProduce,
  deleteProduce,
};
