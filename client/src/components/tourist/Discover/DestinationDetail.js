import { motion } from 'framer-motion';
import { X, MapPin, Hotel, Users, Star, ArrowRight } from 'lucide-react';

export default function DestinationDetail({ destination, onClose, onBookGuide, onBookHotel }) {
  if (!destination) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        <div className="relative h-64 md:h-96">
          <img
            src={destination.images[0]?.url || '/placeholder.jpg'}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-24rem)]">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{destination.name}</h2>
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <MapPin className="w-4 h-4" />
                <span>{destination.location.address}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="w-5 h-5 fill-current" />
              <span className="font-semibold">{destination.rating.toFixed(1)}</span>
            </div>
          </div>

          <p className="text-gray-600 mb-6">{destination.description}</p>

          {destination.guides?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Available Guides
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {destination.guides.map((guide) => (
                  <div
                    key={guide._id}
                    className="flex items-center gap-4 p-4 rounded-lg border hover:border-emerald-500 transition-colors"
                  >
                    <img
                      src={guide.avatar || '/placeholder-avatar.jpg'}
                      alt={guide.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{guide.name}</h4>
                      <p className="text-sm text-gray-600">{guide.languages.join(', ')}</p>
                    </div>
                    <button
                      onClick={() => onBookGuide(guide._id)}
                      className="px-3 py-1 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      Book Guide
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {destination.hotels?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Hotel className="w-5 h-5" />
                Available Hotels
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {destination.hotels.map((hotel) => (
                  <div
                    key={hotel._id}
                    className="flex items-center gap-4 p-4 rounded-lg border hover:border-emerald-500 transition-colors"
                  >
                    <img
                      src={hotel.image || '/placeholder-hotel.jpg'}
                      alt={hotel.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{hotel.name}</h4>
                      <div className="flex items-center gap-1 text-yellow-500 text-sm">
                        {Array.from({ length: Math.floor(hotel.rating) }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600">From ${hotel.pricePerNight}/night</p>
                    </div>
                    <button
                      onClick={() => onBookHotel(hotel._id)}
                      className="px-3 py-1 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      Book Hotel
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end pt-4 border-t">
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Close
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
