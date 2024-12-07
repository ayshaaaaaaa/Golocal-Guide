import mongoose from 'mongoose';

const businessUserSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  businessName: {
    type: String,
    trim: true
  },
  description: {
    type: String
  },
  businessType: {
    type: String,
    enum: ['hotel', 'restaurant']
  },
  contactInfo: {
    phone: {
      type: String
    },
    email: {
      type: String,
      lowercase: true,
      trim: true
    },
    website: String,
    businessHours: String
  },
  location: {
    street: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    zip: {
      type: String
    },
    country: {
      type: String
    },
    additionalInfo: String
  },
  media: {
    images: [String],
    videos: [String]
  },
  paymentMethods: {
    creditCard: Boolean,
    digitalWallet: Boolean,
    bankTransfer: Boolean,
    additionalInfo: String
  },
  policies: {
    cancellation: {
      type: String
    },
    refund: {
      type: String
    },
    pets: Boolean,
    smoking: Boolean
  },
  socialMedia: {
    facebook: String,
    instagram: String,
    twitter: String,
    linkedin: String
  }
}, {
  timestamps: true
});

const BusinessUser = mongoose.model('BusinessUser', businessUserSchema);

export default BusinessUser;

