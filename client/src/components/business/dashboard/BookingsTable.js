import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function BookingsTable() {
  const bookings = [
    {
      id: '#1223',
      guest: 'Alex Trie',
      email: 'Alex08@gmail.com',
      roomNumber: '5-01',
      roomType: 'Single',
      checkIn: 'Jan 21, 2025',
      checkOut: 'Jan 26, 2025',
      status: 'New'
    },
    {
      id: '#1224',
      guest: 'Annette Black',
      email: 'Ann23@gmail.com',
      roomNumber: '5-22',
      roomType: 'Single',
      checkIn: 'Jan 8, 2025',
      checkOut: 'Jan 20, 2025',
      status: 'Checked In'
    },
    // Add more bookings as needed
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'new': return 'text-purple-500';
      case 'checked in': return 'text-yellow-500';
      case 'confirmed': return 'text-green-500';
      case 'checked out': return 'text-blue-500';
      case 'cancelled': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">New bookings</h2>
        <select className="bg-gray-700 border-none rounded-lg px-3 py-2">
          <option>Today</option>
          <option>This Week</option>
          <option>This Month</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-gray-400 text-sm">
              <th className="text-left py-3">Booking ID</th>
              <th className="text-left py-3">Guest name</th>
              <th className="text-left py-3">Email</th>
              <th className="text-left py-3">Room number</th>
              <th className="text-left py-3">Room type</th>
              <th className="text-left py-3">Checked In</th>
              <th className="text-left py-3">Checked Out</th>
              <th className="text-left py-3">Status</th>
              <th className="text-left py-3"></th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <motion.tr
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-sm"
              >
                <td className="py-3">{booking.id}</td>
                <td className="py-3">{booking.guest}</td>
                <td className="py-3">{booking.email}</td>
                <td className="py-3">{booking.roomNumber}</td>
                <td className="py-3">{booking.roomType}</td>
                <td className="py-3">{booking.checkIn}</td>
                <td className="py-3">{booking.checkOut}</td>
                <td className={`py-3 ${getStatusColor(booking.status)}`}>
                  {booking.status}
                </td>
                <td className="py-3">
                  <button className="p-1 hover:bg-gray-700 rounded">
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

