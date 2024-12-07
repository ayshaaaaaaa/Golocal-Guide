import React from 'react';
import Sidebar from '../../components/guide/Sidebar';
import DashboardHeader from '../../components/guide/Dashboard/DashboardHeader';
import ProfileCard from '../../components/guide/Dashboard/ProfileCard';
import GuideInfoCard from '../../components/guide/Dashboard/GuideInfoCard';
import RatingsGraph from '../../components/guide/Dashboard/RatingsGraph';
import { useGuide } from '../../context/GuideContext'; // Import useGuide

const GuideDashboard = () => {
  const { guideData, isLoading, error } = useGuide(); // Access guide data, loading state, and error

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>{error}</p>
      </div>
    );
  }

  if (!guideData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>No guide data available</p>
      </div>
    );
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 bg-gradient-to-b from-blue-50 to-indigo-100 p-8">
        {/* Header */}
        <DashboardHeader guideName={guideData.name} /> {/* Use guideData */}

        {/* Cards Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Card */}
          <ProfileCard profileData={guideData} /> {/* Use guideData */}

          {/* Guide Info Card */}
          <GuideInfoCard guideInfo={guideData} /> {/* Use guideData */}
        </div>

        {/* Graphs Section */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-blue-800 mb-4">Performance Insights</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Ratings Graph */}
            <RatingsGraph
              rating={guideData.rating}
              totalReviews={guideData.totalReviews}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideDashboard;
