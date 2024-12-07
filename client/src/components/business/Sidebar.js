import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, CalendarDays, BedDouble, UtensilsCrossed, Settings, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/business-dashboard' },
    { icon: Users, label: 'Manage Services', path: '/manage-services' },
    { icon: CalendarDays, label: 'Manage Bookings', path: '/manage-bookings' },
    { icon: BedDouble, label: 'Manage Reviews', path: '/manage-reviews' },
    { icon: UtensilsCrossed, label: 'Restaurant', path: '/restaurant' },
  ];

  return (
    <motion.div 
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-0 h-screen w-64 bg-gray-800 p-4"
    >
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-purple-500 rounded-full" />
        <span className="text-xl font-bold">Inntegrate</span>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors
              ${isActive 
                ? 'bg-purple-500 text-white' 
                : 'text-gray-300 hover:bg-gray-700'}`
            }
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="absolute bottom-4 left-4 right-4 space-y-2">
        <NavLink
          to="/settings"
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700"
        >
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
        <button
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700 w-full"
          onClick={handleLogout}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </motion.div>
  );
}

