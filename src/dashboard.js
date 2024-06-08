import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard'; // Your Dashboard component
import App from './App';

function Dashboard() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default Dashboard;
