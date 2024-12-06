import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Sidebar from '../../components/tourist/Sidebar';
import TopBar from '../../components/tourist/TopBar';
import SearchSection from '../../components/tourist/SearchSection';
import DestinationCard from '../../components/tourist/DestinationCard';
import Calendar from '../../components/tourist/Calendar';
import DoneTrips from '../../components/tourist/DoneTrips';
import UserProfile from '../../components/tourist/UserProfile';
import { useAuth } from '../../context/AuthContext';

const destinations = [
  {
    id: 1,
    name: 'Mount Bromo',
    location: 'Jl. Minato No.2 Ponorogo',
    image: '/images/abcd.jpg',
    airlineIcon: '/images/abcd.jpg',
    date: '08 DEC',
    time: '5:10 PM',
    price: 248,
    airline: 'Citilink'
  },
  {
    id: 2,
    name: 'Lake Toba',
    location: 'Jl. Kakasi No.2 Jakarta',
    image: '/images/abcd.jpg',
    airlineIcon: '/images/abcd.jpg',
    date: '21 NOV',
    time: '8:20 PM',
    price: 290,
    airline: 'Lion Air'
  },
  {
    id: 3,
    name: 'Desert Uetune',
    location: 'Jl. Naura No.2 Surabaya',
    image: '/images/abcd.jpg',
    airlineIcon: '/images/abcd.jpg',
    date: '09 FEB',
    time: '7:30 PM',
    price: 308,
    airline: 'Citilink'
  }
];

const doneTrips = [
  {
    id: 1,
    name: 'Desert Uetune',
    date: '09 - 14 September 2022',
    image: '/images/abcd.jpg'
  },
  {
    id: 2,
    name: 'Mount Bromo',
    date: '14 - 18 June 2022',
    image: '/images/abcd.jpg'
  },
  {
    id: 3,
    name: 'Palm Madigascar',
    date: '11 - 15 December 2021',
    image: '/images/abcd.jpg'
  }
];

export default function TouristDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [showRightSidebar, setShowRightSidebar] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        <div className="p-4 sm:p-6 lg:p-8">
          <TopBar 
            userName={user?.name || 'Jerrmy'} 
            onMenuClick={() => setShowRightSidebar(true)}
          />
          
          <div className="mt-6">
            <SearchSection />
          </div>

          <div className="mt-8">
            <h2 className="text-xl text-gray-600 font-bold mb-6">Recommended Destinations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinations.map(destination => (
                <DestinationCard key={destination.id} destination={destination} />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Right Sidebar */}
      <AnimatePresence>
        {(showRightSidebar || !isMobile) && (
          <motion.aside
            initial={isMobile ? { x: '100%' } : false}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className={`
              ${isMobile 
                ? 'fixed right-0 top-0 bottom-0 w-full sm:w-80 shadow-xl z-50' 
                : 'hidden lg:block w-80'
              }
              bg-white border-l overflow-y-auto
            `}
          >
            <div className="p-6">
              {isMobile && (
                <button
                  onClick={() => setShowRightSidebar(false)}
                  className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
                >
                  <ChevronRight />
                </button>
              )}
              <UserProfile user={user} />
              <div className="mt-6">
                <Calendar />
              </div>
              <div className="mt-6">
                <DoneTrips trips={doneTrips} />
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
