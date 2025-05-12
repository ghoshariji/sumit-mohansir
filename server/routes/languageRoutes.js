const express = require('express');
const router = express.Router();
const languageController = require('../controller/languageController');  // Change to languageController

// Language Routes
router.post('/', languageController.createLanguage);  // Create a new language
router.get('/', languageController.getAllLanguages);  // Get all languages
router.get('/:id', languageController.getLanguageById);  // Get a single language by ID
router.put('/:id', languageController.updateLanguage);  // Update a language
router.delete('/:id', languageController.deleteLanguage);  // Delete a language

module.exports = router;
