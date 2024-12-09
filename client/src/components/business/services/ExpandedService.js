import React from 'react';
import { motion } from 'framer-motion';
import { X, Edit2, Trash2 } from 'lucide-react';

const ExpandedServiceCard = ({ service, onClose, onEdit, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img 
            src={service.image} 
            alt={service.name}
            className="w-full h-48 sm:h-64 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <div className="p-4 sm:p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{service.name}</h2>
              <p className="text-lg font-semibold text-emerald-600 mt-1">${service.price}</p>
            </div>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onEdit(service)}
                className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors"
              >
                <Edit2 className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onDelete(service.id)}
                className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
          <p className="text-gray-600 mb-4">{service.description}</p>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Duration:</span> {service.duration || 'N/A'}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Availability:</span> {service.availability || 'N/A'}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Capacity:</span> {service.capacity || 'N/A'}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ExpandedServiceCard;
