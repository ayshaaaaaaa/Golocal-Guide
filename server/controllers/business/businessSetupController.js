import {BusinessUser} from '../../models/business/BusinessUser.js';
import User from '../../models/tourist/User.js';
import multer from 'multer';
import path from 'path';

export const saveBusinessDetails = async (req, res) => {
    try {
      console.log('Received request body:', req.body);
      console.log('User ID from auth middleware:', req.user.id);
  
      const { businessName, description, businessType } = req.body;
      
      if (!businessName || !description || !businessType) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      let businessUser = await BusinessUser.findOne({ user: req.user.id });
  
      if (!businessUser) {
        businessUser = new BusinessUser({ user: req.user.id });
      }
  
      businessUser.businessName = businessName;
      businessUser.description = description;
      businessUser.businessType = businessType;
  
      console.log('Business user before save:', businessUser);
  
      await businessUser.save();
  
      console.log('Business user after save:', businessUser);
  
      res.status(200).json({ message: 'Business details saved successfully', businessUser });
    } catch (error) {
      console.error('Error in saveBusinessDetails:', error);
      res.status(500).json({ message: 'Error saving business details', error: error.message });
    }
  };


export const saveContactInformation = async (req, res) => {
  try {
    const { phone, email, website, businessHours } = req.body;
    const businessUser = await BusinessUser.findOne({ user: req.user.id });

    if (!businessUser) {
      return res.status(404).json({ message: 'Business user not found' });
    }

    businessUser.contactInfo = { phone, email, website, businessHours };
    await businessUser.save();

    res.status(200).json({ message: 'Contact information saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving contact information', error: error.message });
  }
};

export const saveLocationDetails = async (req, res) => {
  try {
    const { street, city, state, zip, country, additionalInfo } = req.body;
    const businessUser = await BusinessUser.findOne({ user: req.user.id });

    if (!businessUser) {
      return res.status(404).json({ message: 'Business user not found' });
    }

    businessUser.location = { street, city, state, zip, country, additionalInfo };
    await businessUser.save();

    res.status(200).json({ message: 'Location details saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving location details', error: error.message });
  }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage: storage });

export const saveMediaUpload = async (req, res) => {
    try {
        upload.array('media', 10)(req, res, async (err) => {
          if (err) {
            return res.status(400).json({ message: 'Error uploading files', error: err.message });
          }
    
          const businessUser = await BusinessUser.findOne({ user: req.user.id });
    
          if (!businessUser) {
            return res.status(404).json({ message: 'Business user not found' });
          }
    
          const images = req.files.filter(file => file.mimetype.startsWith('image')).map(file => file.path);
          const videos = req.files.filter(file => file.mimetype.startsWith('video')).map(file => file.path);
    
          businessUser.media = { images, videos };
          await businessUser.save();
    
          res.status(200).json({ message: 'Media uploaded successfully', media: businessUser.media });
        });
      } catch (error) {
        res.status(500).json({ message: 'Error uploading media', error: error.message });
      }
};

export const savePaymentMethods = async (req, res) => {
  try {
    const { creditCard, digitalWallet, bankTransfer, additionalInfo } = req.body;
    const businessUser = await BusinessUser.findOne({ user: req.user.id });

    if (!businessUser) {
      return res.status(404).json({ message: 'Business user not found' });
    }

    businessUser.paymentMethods = { creditCard, digitalWallet, bankTransfer, additionalInfo };
    await businessUser.save();

    res.status(200).json({ message: 'Payment methods saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving payment methods', error: error.message });
  }
};

export const savePolicies = async (req, res) => {
  try {
    const { cancellation, refund, pets, smoking } = req.body;
    const businessUser = await BusinessUser.findOne({ user: req.user.id });

    if (!businessUser) {
      return res.status(404).json({ message: 'Business user not found' });
    }

    businessUser.policies = { cancellation, refund, pets, smoking };
    await businessUser.save();

    res.status(200).json({ message: 'Policies saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving policies', error: error.message });
  }
};

export const saveSocialMedia = async (req, res) => {
  try {
    const { facebook, instagram, twitter, linkedin } = req.body;
    const businessUser = await BusinessUser.findOne({ user: req.user.id });

    if (!businessUser) {
      return res.status(404).json({ message: 'Business user not found' });
    }

    businessUser.socialMedia = { facebook, instagram, twitter, linkedin };
    await businessUser.save();

    res.status(200).json({ message: 'Social media links saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving social media links', error: error.message });
  }
};

export const completeSetup = async (req, res) => {
  try {
    const businessUser = await BusinessUser.findOne({ user: req.user.id });

    if (!businessUser) {
      return res.status(404).json({ message: 'Business user not found' });
    }

    const user = await User.findById(req.user.id);
    user.isProfileComplete = true;
    await user.save();

    res.status(200).json({ message: 'Business setup completed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error completing business setup', error: error.message });
  }
};

