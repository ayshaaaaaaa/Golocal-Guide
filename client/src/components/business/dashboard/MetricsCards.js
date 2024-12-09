import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function MetricsCards() {
  const metrics = [
    {
      title: 'Active bookings',
      value: '85%',
      change: '+5%',
      isPositive: true,
      comparison: 'Compared to (114 last month)'
    },
    {
      title: 'Room occupancy',
      value: '65%',
      change: '-10%',
      isPositive: false,
      comparison: 'Compared to (75% last month)'
    },
    {
      title: 'Guest satisfaction',
      value: '4.7/5',
      change: '+7%',
      isPositive: true,
      comparison: 'Compared to (4.37/5 last month)'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gray-800 rounded-xl p-6"
        >
          <div className="text-gray-400 text-sm mb-2">{metric.title}</div>
          <div className="flex items-end gap-2">
            <div className="text-4xl font-bold">{metric.value}</div>
            <div className={`flex items-center ${
              metric.isPositive ? 'text-green-500' : 'text-red-500'
            }`}>
              {metric.isPositive ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="text-sm">{metric.change}</span>
            </div>
          </div>
          <div className="text-gray-500 text-xs mt-1">{metric.comparison}</div>
        </motion.div>
      ))}
    </div>
  );
}

