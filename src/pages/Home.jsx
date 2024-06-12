import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="flex flex-col items-center justify-center h-screen">
    <h1 className="text-4xl mb-4">Welcome to SpaceX Launches App</h1>
    <div>
      <Link to="/login" className="mr-4 bg-blue-500 text-white p-2 rounded">Login</Link>
      <Link to="/signup" className="bg-green-500 text-white p-2 rounded">Signup</Link>
    </div>
  </div>
);

export default Home;
