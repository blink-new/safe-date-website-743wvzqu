import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthProvider';
import LandingPage from './pages/LandingPage';
import Features from './pages/Features';
import SafetyCenter from './pages/SafetyCenter';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/features" element={<Features />} />
            <Route path="/safety" element={<SafetyCenter />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;