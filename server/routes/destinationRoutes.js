const express = require('express');
const router = express.Router();
const destinationController = require('../controllers/destinationController');
// const auth = require('../middleware/auth');

// Public routes
router.get('/destinations', destinationController.getDestinations);
router.get('/destinations/:id', destinationController.getDestination);

// Protected routes
// router.post('/destinations/:id/favorite', auth, destinationController.toggleFavorite);
router.post('/destinations/:id/favorite', destinationController.toggleFavorite);

module.exports = router;

