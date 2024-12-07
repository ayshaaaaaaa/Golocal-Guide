import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext'; // To get the user's token
import axios from 'axios';

const GuideContext = createContext();

export const useGuide = () => {
  return useContext(GuideContext);
};

export const GuideProvider = ({ children }) => {
  const { user, token } = useAuth(); // Access the logged-in user and token from AuthContext
  const [guideData, setGuideData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    console.log("user:", user);
    console.log("token:", token);
    const fetchGuideData = async () => {
      if (user && token) {
        try {
          console.log("Hello from try block ");
          const response = await axios.get('http://localhost:5000/api/guides/guide/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setGuideData(response.data); // Assuming the API returns the guide's data
        } catch (err) {
          setError('Failed to fetch guide data');
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false); // Stop loading if no user or token
      }
    };

    fetchGuideData(); // Always try to fetch, even if the user or token isn't available

  }, [user, token]); // Re-fetch if user or token changes

  return (
    <GuideContext.Provider value={{ guideData, isLoading, error }}>
      {children}
    </GuideContext.Provider>
  );
};
