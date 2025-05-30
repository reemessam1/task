const express = require('express');
const router = express.Router();
const podcastController = require('../controllers/podcastController');

router.get('/search', podcastController.searchAndSave);
router.get('/', podcastController.getAll);

module.exports = router;
