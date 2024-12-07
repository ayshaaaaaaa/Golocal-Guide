import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/business/Sidebar';
import TopBar from '../../components/business/TopBar';
import ServiceList from '../../components/business/services/ServiceList';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const ServicesDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [services, setServices] = useState([
    {
      id: 1,
      name: 'Deluxe Room',
      description: 'Spacious room with a king-size bed and city view',
      price: 199.99,
      image: 'https://example.com/deluxe-room.jpg',
    },
    {
      id: 2,
      name: 'Spa Package',
      description: 'Relaxing spa treatment including massage and facial',
      price: 149.99,
      image: 'https://example.com/spa-package.jpg',
    },
    // Add more sample services as needed
  ]);

  const handleEdit = (service) => {
    // Implement edit functionality
    console.log('Editing service:', service);
  };

  const handleDelete = (serviceId) => {
    setServices(services.filter(service => service.id !== serviceId));
  };

  const handleAddService = () => {
    // Implement add service functionality
    console.log('Adding new service');
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* TopBar */}
        <div className="w-full bg-gray-900 text-white">
          <TopBar />
        </div>
        
        {/* Main Content Section */}
        <div className="flex-1 overflow-y-auto bg-gray-100 p-8">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Your Services</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-green-500 text-white rounded-md flex items-center space-x-2 hover:bg-green-600 transition-colors"
              onClick={handleAddService}
            >
              <Plus size={20} />
              <span>Add New Service</span>
            </motion.button>
          </div>
          
          <ServiceList
            services={services}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default ServicesDashboard;

