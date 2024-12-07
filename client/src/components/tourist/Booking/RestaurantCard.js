import { motion } from 'framer-motion';
import { Star, MapPin, Clock, Utensils } from 'lucide-react';

function RestaurantCard({ restaurant, onBook }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
    >
      <img
        src={restaurant.image || '/placeholder-restaurant.jpg'}
        alt={restaurant.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{restaurant.name}</h3>
            <div className="flex items-center gap-1 text-amber-400 mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(restaurant.rating)
                      ? 'fill-current'
                      : 'fill-gray-200'
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
              <MapPin className="w-4 h-4" />
              <span>{restaurant.location}</span>
            </div>
          </div>
          <span className="font-semibold text-emerald-600">
            ${restaurant.averagePrice} avg
          </span>
        </div>

        <div className="flex gap-2 mt-3">
          <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
            <Utensils className="w-3 h-3 inline-block mr-1" />
            {restaurant.cuisine}
          </span>
          <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
            <Clock className="w-3 h-3 inline-block mr-1" />
            {restaurant.openingHours}
          </span>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onBook(restaurant)}
          className="w-full mt-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
        >
          Book Table
        </motion.button>
      </div>
    </motion.div>
  );
}

export default RestaurantCard;
