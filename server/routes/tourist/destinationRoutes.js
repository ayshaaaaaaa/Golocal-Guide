import express from 'express';
import destinationController from '../../controllers/tourist/destinationController.js';

const router = express.Router();

// const auth = require('../middleware/auth');

// Public routes
router.get('/', destinationController.getDestinations);
router.get('/:id', destinationController.getDestination);

// Protected routes
// router.post('/destinations/:id/favorite', auth, destinationController.toggleFavorite);
router.post('/:id/favorite', destinationController.toggleFavorite);

export default router;