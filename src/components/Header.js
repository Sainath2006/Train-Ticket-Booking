import React from 'react';
import { Train, User, Menu, X } from 'lucide-react';

export default function Header({ 
  currentView, 
  onViewChange, 
  user, 
  onLogin, 
  onLogout, 
  isMobileMenuOpen, 
  setIsMobileMenuOpen 
}) {
  return (
    <header className="bg-blue-600 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => onViewChange('search')}
          >
            <Train className="h-8 w-8 text-white" />
            <span className="text-2xl font-bold text-white">RailBook</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => onViewChange('search')}
              className={`px-4 py-2 rounded-md transition-colors ${
                currentView === 'search' 
                  ? 'bg-blue-700 text-white' 
                  : 'text-blue-100 hover:bg-blue-700 hover:text-white'
              }`}
            >
              Search Trains
            </button>
            {user && (
              <button
                onClick={() => onViewChange('bookings')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  currentView === 'bookings' 
                    ? 'bg-blue-700 text-white' 
                    : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                }`}
              >
                My Bookings
              </button>
            )}
          </nav>

          {/* User Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-white">
                  <User className="h-5 w-5" />
                  <span>Welcome, {user.name}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={onLogin}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md transition-colors"
              >
                Login / Register
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-blue-500">
            <nav className="flex flex-col space-y-2 mt-4">
              <button
                onClick={() => {
                  onViewChange('search');
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left px-4 py-2 rounded-md transition-colors ${
                  currentView === 'search' 
                    ? 'bg-blue-700 text-white' 
                    : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                }`}
              >
                Search Trains
              </button>
              {user && (
                <button
                  onClick={() => {
                    onViewChange('bookings');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left px-4 py-2 rounded-md transition-colors ${
                    currentView === 'bookings' 
                      ? 'bg-blue-700 text-white' 
                      : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                  }`}
                >
                  My Bookings
                </button>
              )}
              <div className="pt-2 border-t border-blue-500">
                {user ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-white px-4 py-2">
                      <User className="h-5 w-5" />
                      <span>Welcome, {user.name}</span>
                    </div>
                    <button
                      onClick={() => {
                        onLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-left bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      onLogin();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition-colors"
                  >
                    Login / Register
                  </button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
