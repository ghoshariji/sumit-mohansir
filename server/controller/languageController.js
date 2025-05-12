const Language = require('../modal/promLanguageModal');  // Assuming your Language model is defined in this file

// Create a new language
exports.createLanguage = async (req, res) => {
  try {
    const newLanguage = new Language(req.body);
    await newLanguage.save();
    res.status(201).json(newLanguage);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create language', error: err });
  }
};

// Get all languages
exports.getAllLanguages = async (req, res) => {
  try {
    const languages = await Language.find();
    res.status(200).json(languages);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch languages', error: err });
  }
};

// Get a language by ID
exports.getLanguageById = async (req, res) => {
  try {
    const language = await Language.findById(req.params.id);
    if (!language) return res.status(404).json({ message: 'Language not found' });
    res.status(200).json(language);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch language', error: err });
  }
};

// Update a language
exports.updateLanguage = async (req, res) => {
  try {
    const updatedLanguage = await Language.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedLanguage) return res.status(404).json({ message: 'Language not found' });
    res.status(200).json(updatedLanguage);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update language', error: err });
  }
};

// Delete a language
exports.deleteLanguage = async (req, res) => {
  try {
    const deletedLanguage = await Language.findByIdAndDelete(req.params.id);
    if (!deletedLanguage) return res.status(404).json({ message: 'Language not found' });
    res.status(200).json({ message: 'Language deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete language', error: err });
  }
};
