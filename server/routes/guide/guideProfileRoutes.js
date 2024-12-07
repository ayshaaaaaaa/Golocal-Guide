// guideRoutes.js

import express from 'express';
import authMiddleware from '../../middleware/auth.js'; // Authentication middleware
import Guide from '../../models/guide/guideModel.js';

const router = express.Router();

// Route for fetching guide profile
router.get('/guide/profile', authMiddleware, async (req, res) => {
  try {
    // Log the user ID coming from the middleware
    console.log('User ID from middleware:', req.user.id); // Log user ID

    // Ensure token is sent properly
    console.log('Authorization token from client:', req.header('Authorization'));

    // Fetch guide data by userID and populate the related user fields
    const guide = await Guide.findOne({ userID: req.user.id })
      .populate('userID', 'name email profilePictureURL'); // Populate specific fields from the user

    // Log the fetched guide data
    console.log('Guide Data:', guide); 

    // If no guide data is found, return 404 error
    if (!guide) {
      return res.status(404).json({ message: 'Guide not found' });
    }

    // Send back the guide data as JSON
    res.status(200).json(guide); 
  } catch (error) {
    // Log any error that occurs
    console.error('Error fetching guide info:', error);
    res.status(500).json({ message: 'Error fetching guide info' });
  }
});

export default router;
