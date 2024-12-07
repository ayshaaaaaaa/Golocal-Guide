import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from '../../components/tourist/Dashboard/Sidebar';
import SearchSection from '../../components/tourist/Dashboard/SearchSection';
import GuideCard from '../../components/tourist/Booking/GuideCard';
import HotelCard from '../../components/tourist/Booking/HotelCard';
import RestaurantCard from '../../components/tourist/Booking/RestaurantCard';
import BookingPopup from '../../components/tourist/Booking/BookingPopup';
import {destinationService} from '../../services/destinationService'; // Import the service

const App = () => {
  const [activeTab, setActiveTab] = useState('guides');
  const [selectedItem, setSelectedItem] = useState(null);
  const [bookingType, setBookingType] = useState(null);
  const [destination, setDestination] = useState(null);
  const [guides, setGuides] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [loadingGuides, setLoadingGuides] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const destinationId = params.get('destination');
    if (destinationId) {
      fetchDestinationData(destinationId);
    }
  }, [location]);

  const fetchDestinationData = async (destinationId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/destinations/${destinationId}`);
      const data = await response.json();
      setDestination(data);

      if (data.guides?.length) {
        fetchGuideData(data.guides);
      }
      if (data.hotels?.length) {
        const hotelsResponse = await fetch(`http://localhost:5000/api/hotels?ids=${data.hotels.join(',')}`);
        setHotels(await hotelsResponse.json());
      }
      if (data.restaurants?.length) {
        const restaurantsResponse = await fetch(`http://localhost:5000/api/restaurants?ids=${data.restaurants.join(',')}`);
        setRestaurants(await restaurantsResponse.json());
      }
    } catch (error) {
      console.error('Error fetching destination data:', error);
    }
  };

  const fetchGuideData = async (guideIds) => {
    setLoadingGuides(true);
    try {
      const guidePromises = guideIds.map(async (guideId) => {
        const response = await fetch(`http://localhost:5000/api/guides/${guideId}`);
        const text = await response.text();
        console.log(`Response for guide ${guideId}:`, text);
        if (!response.ok) throw new Error(`Failed to fetch guide ${guideId}: ${response.statusText}`);
        try {
          return JSON.parse(text);
        } catch (parseError) {
          console.error(`Error parsing JSON for guide ${guideId}:`, parseError);
          throw new Error(`Invalid JSON response for guide ${guideId}`);
        }
      });
      const guideData = await Promise.all(guidePromises);
      setGuides(guideData);
    } catch (error) {
      console.error('Error fetching guide data:', error);
    } finally {
      setLoadingGuides(false);
    }
  };

  const handleSearch = async (searchTerm) => {
    try {
      const data = await destinationService.getDestinations({ search: searchTerm });
      if (data.length > 0) {
        setDestination(data[0]);
        fetchDestinationData(data[0]._id);
      } else {
        setDestination(null);
        setGuides([]);
        setHotels([]);
        setRestaurants([]);
      }
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const handleBook = (item, type) => {
    setSelectedItem(item);
    setBookingType(type);
  };

  const handleBookingSubmit = async (bookingData) => {
    try {
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        setSelectedItem(null);
        setBookingType(null);
        // TODO: Show a success message to the user
      } else {
        throw new Error('Booking failed');
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      // TODO: Show an error message to the user
    }
  };

  const tabContent = {
    guides: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loadingGuides ? (
          <p>Loading guides...</p>
        ) : guides.length > 0 ? (
          guides.map(guide => (
            <GuideCard
              key={guide._id}
              guide={guide}
              onBook={() => handleBook(guide, 'guide')}
            />
          ))
        ) : (
          <p>No guides available for this destination.</p>
        )}
      </div>
    ),
    hotels: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {hotels.length > 0 ? (
          hotels.map(hotel => (
            <HotelCard
              key={hotel._id}
              hotel={hotel}
              onBook={() => handleBook(hotel, 'hotel')}
            />
          ))
        ) : (
          <p>No hotels available for this destination.</p>
        )}
      </div>
    ),
    restaurants: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {restaurants.length > 0 ? (
          restaurants.map(restaurant => (
            <RestaurantCard
              key={restaurant._id}
              restaurant={restaurant}
              onBook={() => handleBook(restaurant, 'restaurant')}
            />
          ))
        ) : (
          <p>No restaurants available for this destination.</p>
        )}
      </div>
    ),
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        <SearchSection onSearch={handleSearch} />

        <main className="p-6">
          {destination ? (
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Booking for {destination.name}
              </h1>
              <p className="text-gray-600 mt-1">{destination.location.address}</p>
            </div>
          ) : (
            <p>Loading destination information...</p>
          )}

          <div className="mb-6">
            <div className="flex space-x-4 border-b">
              {['guides', 'hotels', 'restaurants'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 font-medium capitalize transition-colors ${
                    activeTab === tab
                      ? 'text-emerald-600 border-b-2 border-emerald-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            {tabContent[activeTab]}
          </div>
        </main>

        {selectedItem && bookingType && (
          <BookingPopup
            item={selectedItem}
            type={bookingType}
            onClose={() => {
              setSelectedItem(null);
              setBookingType(null);
            }}
            onBook={handleBookingSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default App;

