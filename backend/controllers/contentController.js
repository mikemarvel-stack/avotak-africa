
import HomeContent from '../models/HomeContent.js';
import Gallery from '../models/Gallery.js';
import Service from '../models/Service.js';
import Produce from '../models/Produce.js';
import Project from '../models/Project.js';
import AboutContent from '../models/AboutContent.js';

// --- Home Content ---
export const getHomeContent = async (req, res) => {
  try {
    const content = await HomeContent.findOneOrCreate();
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching home content', error: error.message });
  }
};

export const updateHomeContent = async (req, res) => {
  try {
    const content = await HomeContent.findOneOrCreate();
    const { heroTitle, heroSubtitle, featuredProjectsTitle, featuredProjectsSubtitle } = req.body;

    content.heroTitle = heroTitle ?? content.heroTitle;
    content.heroSubtitle = heroSubtitle ?? content.heroSubtitle;
    content.featuredProjectsTitle = featuredProjectsTitle ?? content.featuredProjectsTitle;
    content.featuredProjectsSubtitle = featuredProjectsSubtitle ?? content.featuredProjectsSubtitle;

    const updatedContent = await content.save();
    res.json(updatedContent);
  } catch (error) {
    res.status(500).json({ message: 'Error updating home content', error: error.message });
  }
};


// --- Services Content ---
export const getServicesContent = async (req, res) => {
  try {
    // Using Service model directly as there is no ServicesContent model
    const services = await Service.find({});
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services content', error: error.message });
  }
};

export const updateServicesContent = async (req, res) => {
  // This function might need further implementation based on how you want to update services.
  // For now, it will return an error as it's not fully implemented.
  res.status(501).json({ message: 'Updating services content is not implemented yet.' });
};

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
  const { id } = req.params;
  const { name, description, price, category, imageUrl } = req.body;

  const produce = await Produce.findById(id);

  if (produce) {
    produce.name = name || produce.name;
    produce.description = description || produce.description;
    produce.price = price || produce.price;
    produce.category = category || produce.category;
    produce.imageUrl = imageUrl || produce.imageUrl;

    const updatedProduce = await produce.save();
    res.json(updatedProduce);
  } else {
    res.status(404).json({ message: 'Produce not found' });
  }
};

// @desc    Delete a produce item
// @route   DELETE /api/content/produce/:id
// @access  Private
export const deleteProduce = async (req, res) => {
  const { id } = req.params;
  const produce = await Produce.findById(id);

  if (!produce) {
    return res.status(404).json({ message: 'Produce item not found' });
  }

  await Produce.deleteOne({ _id: id });
  res.json({ message: 'Produce item removed' });
};

// @desc    Get all featured produce
// @route   GET /api/content/produce/featured
// @access  Public
export const getFeaturedProduce = async (req, res) => {
  try {
    const featuredProduce = await Produce.find({ isFeatured: true }).limit(4);
    res.json(featuredProduce);
  } catch (error) {
    console.error('Error fetching featured produce:', error);
    res.status(500).json({ message: 'Server error while fetching featured produce' });
  }
};

// -------------------- PROJECTS --------------------
export const getProjects = async (req, res) => {
  const projects = await Project.find().sort('order');
  res.json(projects);
};

export const addProject = async (req, res) => {
  const project = new Project(req.body);
  await project.save();
  res.status(201).json(project);
};

export const updateProject = async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }
  res.json(project);
};

export const deleteProject = async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }
  // Note: Add Cloudinary image deletion logic here if applicable
  res.json({ message: 'Project removed' });
};


// -------------------- GALLERY --------------------
export const getGallery = async (req, res) => {
  const gallery = await Gallery.find().sort('order');
  res.json(gallery);
};

export const addGalleryItem = async (req, res) => {
  const item = new Gallery(req.body);
  await item.save();
  res.status(201).json(item);
};

export const updateGalleryItem = async (req, res) => {
  const item = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) {
    res.status(404);
    throw new Error('Gallery item not found');
  }
  res.json(item);
};

export const deleteGalleryItem = async (req, res) => {
  const item = await Gallery.findByIdAndDelete(req.params.id);
  if (!item) {
    res.status(404);
    throw new Error('Gallery item not found');
  }
  // Note: Add Cloudinary image deletion logic here if applicable
  res.json({ message: 'Gallery item removed' });
};
