// src/components/LandingPage.js
// import React from 'react';

// eslint-disable-next-line react/prop-types
const LandingPage = ({ onSignIn }) => {
  return (
    <div className="bg-cover bg-center h-screen flex flex-col items-center justify-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0')" }}>
      <div className="bg-black bg-opacity-50 p-8 rounded-lg text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Plan Your Perfect Trip</h1>
        <p className="text-white mb-8">
          Discover the world and create unforgettable travel itineraries with ease. 
          Adventure, leisure, work, or family trips – we’ve got you covered!
        </p>
        <button 
          onClick={onSignIn} 
          className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600 transition duration-300"
        >
          Sign In to Get Started
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
