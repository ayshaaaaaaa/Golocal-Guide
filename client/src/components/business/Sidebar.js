import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Users, CalendarDays, BedDouble, Settings, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/business-dashboard' },
  { name: 'Manage Services', icon: Users, path: '/manage-services' },
  { name: 'Manage Bookings', icon: CalendarDays, path: '/manage-bookings' },
  { name: 'Manage Reviews', icon: BedDouble, path: '/manage-reviews' },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: '-100%' }
  };

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-full shadow-md md:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? <X className="w-6 h-6 text-emerald-600" /> : <Menu className="w-6 h-6 text-emerald-600" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            transition={{ duration: 0.3, type: 'tween' }}
            className="fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg md:relative md:shadow-none"
          >
            <div className="h-full overflow-y-auto p-6 flex flex-col">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">G</span>
                </div>
                <span className="text-xl font-bold text-emerald-600">GoLocal Guide</span>
              </div>

              <nav className="flex-1 space-y-2">
                {menuItems.map((item) => (
                  <motion.div key={item.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'text-gray-600 hover:bg-emerald-50'
                        }`
                      }
                    >
                      <item.icon size={20} />
                      <span>{item.name}</span>
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto space-y-2">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <NavLink
                    to="/settings"
                    className={({ isActive }) =>
                      `flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'text-gray-600 hover:bg-emerald-50'
                      }`
                    }
                  >
                    <Settings size={20} />
                    <span>Settings</span>
                  </NavLink>
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full p-3 text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors rounded-lg"
                >
                  <LogOut size={20} />
                  <span>Log Out</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}