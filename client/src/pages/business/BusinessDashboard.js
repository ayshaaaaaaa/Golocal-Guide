import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/business/dashboard/DashboardLayout';
import MetricsCards from '../../components/business/dashboard/MetricsCards';
import BookingsTable from '../../components/business/dashboard/BookingsTable';
import { motion } from 'framer-motion';

const BusinessDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">Loading...</div>;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <motion.div 
          className="grid grid-cols-2 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button className="bg-emerald-500 hover:bg-emerald-600 p-6 rounded-xl text-center transition-colors duration-300">
            <span className="text-xl">Check in</span>
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 p-6 rounded-xl text-center transition-colors duration-300">
            <span className="text-xl">Check out</span>
          </button>
        </motion.div>

        <MetricsCards />
        <BookingsTable />
      </div>
    </DashboardLayout>
  );
};

export default BusinessDashboard;

