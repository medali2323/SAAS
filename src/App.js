import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Backups from './components/backups/Backups'
import './App.css';

function App() {
  // Simulation of instance data
  const instances = [
    { name: 'Test pre-prod', url: 'https://test.visionerp.digital', email: 'test@visionerp.online', status: 'Prospect', version: 'v3.1.2' },
    { name: 'Afrec', url: 'https://afrec.visionerp.digital', email: 'afrec@yopmail.com', status: 'Prospect', version: 'v3.4.3' },
    { name: 'i4Tech', url: 'https://i4tech.visionerp.digital', email: 'nihel@visionerp.online', status: 'No subscription yet', version: 'v2.8.8' },
    { name: '3 click solutions', url: 'https://3clicksolutions.visionerp.digital', email: 'morsi.masmoudi@gmail.com', status: 'No subscription yet', version: 'v3.1.4' },
  ];

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard instances={instances} />} />
          {/* Additional routes for "Users", "Logs", and "Backup" pages can be added here */}
          <Route path="/backup" element={<Backups />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
