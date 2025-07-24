import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { Shield, Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, login, logout } = useAuth();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'Safety Center', path: '/safety' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About', path: '/about' },
  ];

  // Add dashboard to nav items if authenticated
  const allNavItems = isAuthenticated 
    ? [{ name: 'Dashboard', path: '/dashboard' }, ...navItems]
    : navItems;

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-rose-500 to-orange-500 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">SafeDate</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {allNavItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'text-rose-600'
                    : 'text-gray-700 hover:text-rose-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <User className="w-4 h-4" />
                  <span>{user?.displayName || user?.email}</span>
                </div>
                <Button 
                  variant="ghost" 
                  className="text-gray-700"
                  onClick={logout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Button variant="ghost" className="text-gray-700" onClick={login}>
                  Sign In
                </Button>
                <Button className="bg-rose-600 hover:bg-rose-700 text-white" onClick={login}>
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              {allNavItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-3 py-2 text-base font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-rose-600 bg-rose-50'
                      : 'text-gray-700 hover:text-rose-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2 space-y-2">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center space-x-2 text-sm text-gray-700 px-3 py-2">
                      <User className="w-4 h-4" />
                      <span>{user?.displayName || user?.email}</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-gray-700"
                      onClick={logout}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" className="w-full justify-start text-gray-700" onClick={login}>
                      Sign In
                    </Button>
                    <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white" onClick={login}>
                      Get Started
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;