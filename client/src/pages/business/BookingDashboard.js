import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BookingList from '../../components/business/bookings/BookingList';
import BookingCalendar from '../../components/business/bookings/BookingCalendar';
import Sidebar from '../../components/business/Sidebar';
import TopBar from '../../components/business/TopBar';

const BookingDashboard = () => {
  const [view, setView] = useState('list'); // 'list' or 'calendar'
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated API call to fetch bookings
    const fetchBookings = async () => {
      try {
        // This would be your actual API call
        const mockBookings = [
          {
            id: 1,
            touristName: 'John Doe',
            date: '2024-01-15',
            time: '10:00 AM',
            service: 'Deluxe Room',
            status: 'pending'
          },
          {
            id: 2,
            touristName: 'Jane Smith',
            date: '2024-01-15',
            time: '2:00 PM',
            service: 'Restaurant Reservation',
            status: 'confirmed'
          },
          // Add more mock bookings as needed
        ];

        setBookings(mockBookings);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleAcceptBooking = (bookingId) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: 'confirmed' }
        : booking
    ));
  };

  const handleDeclineBooking = (bookingId) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: 'cancelled' }
        : booking
    ));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden ml-64">
        <TopBar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            {/* View Toggle */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-900">Manage Bookings</h1>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setView('list')}
                    className={`px-4 py-2 rounded-lg ${
                      view === 'list'
                        ? 'bg-purple-500 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    List View
                  </button>
                  <button
                    onClick={() => setView('calendar')}
                    className={`px-4 py-2 rounded-lg ${
                      view === 'calendar'
                        ? 'bg-purple-500 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Calendar View
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {view === 'list' ? (
                <BookingList
                  bookings={bookings}
                  onAccept={handleAcceptBooking}
                  onDecline={handleDeclineBooking}
                />
              ) : (
                <BookingCalendar bookings={bookings} />
              )}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BookingDashboard;

