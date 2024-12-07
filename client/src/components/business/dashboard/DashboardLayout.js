import React from 'react';
import { motion } from 'framer-motion';
import Sidebar from '../Sidebar';
import TopBar from '../dashboard/TopBar';

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Sidebar />
      <div className="ml-64">
        <TopBar />
        <main className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

