const Title = require('../modal/titleModal');  // Assuming your Title model is defined in this file

// Create a new title
exports.createTitle = async (req, res) => {
  try {
    const newTitle = new Title(req.body);
    await newTitle.save();
    res.status(201).json(newTitle);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create title', error: err });
  }
};

// Get all titles for a given language
exports.getTitlesByLanguage = async (req, res) => {
  try {
    const titles = await Title.find({ languageName: req.params.languageName });
    res.status(200).json(titles);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch titles', error: err });
  }
};

// Get a title by ID
exports.getTitleById = async (req, res) => {
  try {
    const title = await Title.findById(req.params.id);
    if (!title) return res.status(404).json({ message: 'Title not found' });
    res.status(200).json(title);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch title', error: err });
  }
};

// Update a title
exports.updateTitle = async (req, res) => {
  try {
    const updatedTitle = await Title.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTitle) return res.status(404).json({ message: 'Title not found' });
    res.status(200).json(updatedTitle);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update title', error: err });
  }
};

// Delete a title
exports.deleteTitle = async (req, res) => {
  try {
    const deletedTitle = await Title.findByIdAndDelete(req.params.id);
    if (!deletedTitle) return res.status(404).json({ message: 'Title not found' });
    res.status(200).json({ message: 'Title deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete title', error: err });
  }
};

exports.getAllTitles = async (req, res) => {
  try {
    const titles = await Title.find();
    res.status(200).json(titles);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch all titles', error: err });
  }
};
