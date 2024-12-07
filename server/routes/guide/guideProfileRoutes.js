import express from 'express';
import authMiddleware from '../../middleware/auth.js'; // Authentication middleware
import Guide from '../../models/guide/guideModel.js';

const router = express.Router();

// Route for fetching guide profile
router.get('/guide/profile', authMiddleware, async (req, res) => {
  try {
    const guide = await Guide.findOne({ userID: req.user.id })
      .populate('userID', 'name email profilePictureURL'); // Populate specific fields from the user

    if (!guide) {
      return res.status(404).json({ message: 'Guide not found' });
    }
    
    res.status(200).json(guide); // Send back the guide data as JSON
  } catch (error) {
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
