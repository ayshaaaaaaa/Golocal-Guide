import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ServiceCard from './ServiceCard';
import ExpandedServiceCard from './ExpandedService';

const ServiceList = ({ services, onEdit, onDelete }) => {
  const [expandedService, setExpandedService] = useState(null);

  if (services.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-8 sm:py-12"
      >
        <p className="text-gray-500 text-sm sm:text-base">
          No services found. Add your first service to get started.
        </p>
      </motion.div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <AnimatePresence>
          {services.map((service) => (
            <motion.div
              key={service._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay:  0.1 }}
            >
              <ServiceCard
                service={service}
                onEdit={onEdit}
                onDelete={onDelete}
                onClick={setExpandedService}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {expandedService && (
          <ExpandedServiceCard
            service={expandedService}
            onClose={() => setExpandedService(null)}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ServiceList;

