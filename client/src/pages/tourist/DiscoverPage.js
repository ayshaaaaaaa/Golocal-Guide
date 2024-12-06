'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Calendar, DollarSign, Users, ArrowRight, Heart, CloudSun } from 'lucide-react' // Add CloudSun icon for weather
import Sidebar from '../../components/tourist/Sidebar'
import SearchSection from '../../components/tourist/SearchSection'
import { destinationService } from '../../services/destinationService'
import { useSearchParams } from 'react-router-dom'

export default function DiscoverPage() {
  const [searchParams] = useSearchParams();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchDestinations();
  }, [searchParams]);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const params = Object.fromEntries(searchParams.entries());
      const response = await destinationService.getDestinations(params);
      setDestinations(response.destinations);
      setFavorites(response.destinations.filter(d => d.favorites.includes(localStorage.getItem('userId'))).map(d => d._id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (id) => {
    try {
      await destinationService.toggleFavorite(id);
      setFavorites(prev => 
        prev.includes(id) 
          ? prev.filter(fid => fid !== id)
          : [...prev, id]
      );
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <SearchSection onSearchResults={setDestinations} />
          
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Discover Amazing Destinations
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinations.map((destination) => (
                <motion.div
                  key={destination._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  <div className="relative h-48">
                    <img
                      src={destination.images[0]?.url || '/images/placeholder.jpg'}
                      alt={destination.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => toggleFavorite(destination._id)}
                      className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          favorites.includes(destination._id)
                            ? 'fill-red-500 text-red-500'
                            : 'text-gray-600'
                        }`}
                      />
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {destination.name}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-yellow-500">
                        ★ {destination.rating.toFixed(1)}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <MapPin className="w-4 h-4" />
                      <span>{destination.location.address}</span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {destination.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {destination.activities.map((activity) => (
                        <span
                          key={activity}
                          className="px-2 py-1 text-xs rounded-full bg-emerald-50 text-emerald-600"
                        >
                          {activity}
                        </span>
                      ))}
                    </div>
                    
                    {/* Weather Information Section */}
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                      <CloudSun className="w-4 h-4" />
                      <span>{destination.weather?.temperature}°C</span>
                      <span>{destination.weather?.condition}</span>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="text-gray-900">
                        <span className="text-lg font-bold">${destination.price.amount}</span>
                        <span className="text-sm text-gray-600">/{destination.price.per}</span>
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                        onClick={() => {/* Handle booking */}}
                      >
                        Book Now
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
