const express = require('express');
const router = express.Router();
const titleController = require('../controller/titleController');

// Title Routes
router.post('/', titleController.createTitle);
router.get('/', titleController.getAllTitles);
router.get('/:languageName', titleController.getTitlesByLanguage);
router.get('/:id', titleController.getTitleById);
router.put('/:id', titleController.updateTitle);
router.delete('/:id', titleController.deleteTitle);

module.exports = router;
