import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';

const GuideDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-blue-800">Guide Dashboard</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <div className="flex items-center gap-4">
              <User className="h-12 w-12 text-blue-600" />
              <div>
                <h2 className="text-xl font-semibold text-blue-800">{user.name}</h2>
                <p className="text-blue-600">{user.email}</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-700">Guide Information</h3>
            <p className="text-blue-600">Experience: {user.experience || 'Not provided'} years</p>
            <p className="text-blue-600">Languages: {user.languages || 'Not provided'}</p>
            <p className="text-blue-600">Specialization: {user.specialization || 'Not provided'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideDashboard;

