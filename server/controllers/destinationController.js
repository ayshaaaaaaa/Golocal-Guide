const Destination = require('../models/Destination');
const axios = require('axios');

const WEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

const destinationController = {
  // Get all destinations with filters
  async getDestinations(req, res) {
    try {
      const { 
        search, 
        minPrice, 
        maxPrice, 
        activities, 
        tags,
        page = 1,
        limit = 10
      } = req.query;
  
      let query = {};
  
      // Text search
      if (search) {
        query.$text = { $search: search };
      }
  
      // Price filter
      if (minPrice || maxPrice) {
        query['price.amount'] = {};
        if (minPrice) query['price.amount'].$gte = Number(minPrice);
        if (maxPrice) query['price.amount'].$lte = Number(maxPrice);
      }
  
      // Activities filter
      if (activities) {
        const activitiesArray = activities.split(',');
        query.activities = { $in: activitiesArray };
      }
  
      // Tags filter
      if (tags) {
        const tagsArray = tags.split(',');
        query.tags = { $in: tagsArray };
      }
  
      const skip = (page - 1) * limit;
  
      // Fetch destinations
      const destinations = await Destination.find(query)
        .skip(skip)
        .limit(Number(limit))
        .sort({ createdAt: -1 });
  
      // Update weather for each destination
      // Update weather for each destination
      for (const destination of destinations) {
        if (destination.location && destination.location.city) {
          await destinationController.updateWeather(destination);  // Correct call to the updateWeather method
        } else {
          console.log('Missing city for destination:', destination._id);
        }
      }

      const total = await Destination.countDocuments(query);
  
      res.json({
        destinations,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        total
      });
    } catch (error) {
      console.error('Error in getDestinations:', error);  // Log full error for debugging
      res.status(500).json({ message: error.message });
    }
  },  

  // Get single destination
  async getDestination(req, res) {
    try {
      const destination = await Destination.findById(req.params.id);
      if (!destination) {
        return res.status(404).json({ message: 'Destination not found' });
      }
  
      // Always update the weather
      await destinationController.updateWeather(destination);
  
      res.json(destination);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },  

  // Update weather data
  async updateWeather(destination) {
    try {
      const city = destination.location && destination.location.city;
      
      // Fetch weather data from OpenWeather API
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
      );
    
      destination.weather = {
        temperature: response.data.main.temp,
        condition: response.data.weather[0].main,
        icon: response.data.weather[0].icon,
        lastUpdated: new Date()
      };
    
      await destination.save();
    } catch (error) {
      console.error('Error updating weather:', error.message);
    }
  },  

  // Toggle favorite
  async toggleFavorite(req, res) {
    try {
      const destination = await Destination.findById(req.params.id);
      if (!destination) {
        return res.status(404).json({ message: 'Destination not found' });
      }

      const userId = req.user.id;
      const favoriteIndex = destination.favorites.indexOf(userId);

      if (favoriteIndex === -1) {
        destination.favorites.push(userId);
      } else {
        destination.favorites.splice(favoriteIndex, 1);
      }

      await destination.save();
      res.json(destination);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = destinationController;