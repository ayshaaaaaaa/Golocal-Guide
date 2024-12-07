import express from 'express';
import authMiddleware from '../../middleware/auth.js'; // Ensure this middleware checks authentication

import Guide from '../../models/guide/guideModel.js';

const router = express.Router();
router.get('/guide/profile', authMiddleware, async (req, res) => {
  try {
    console.log('User ID from middleware:', req.user.id); // Log the user ID
    const guide = await Guide.findOne({ userID: req.user.id }).populate(
      'userID',
      'name email profilePictureURL'
    );
    console.log('Guide Data:', guide); // Log the guide data
    if (!guide) {
      return res.status(404).json({ message: 'Guide not found' });
    }
    res.status(200).json(guide);
  } catch (error) {
    console.error('Error fetching guide info:', error);
    res.status(500).json({ message: 'Error fetching guide info' });
  }
});

// Route for fetching guide data by guide ID
router.get('/:id', async (req, res) => {
  try {
    const guideId = req.params.id;

    // Fetch guide data by ID
    const guide = await Guide.findById(guideId);

    if (!guide) {
      return res.status(404).json({ message: 'Guide not found' });
    }

    res.status(200).json(guide);
  } catch (error) {
    console.error('Error fetching guide by ID:', error);
    res.status(500).json({ message: 'Error fetching guide by ID' });
  }
});

export default router;
