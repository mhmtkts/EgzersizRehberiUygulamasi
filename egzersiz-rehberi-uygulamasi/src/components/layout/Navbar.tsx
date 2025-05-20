import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useFavorites } from '../../hooks/useFavorites';
import logo from '../../assets/logo/logo.png';

const Navbar: React.FC = () => {
  const { favorites } = useFavorites();
  const [, forceUpdate] = useState({});
  
  useEffect(() => {
    const handleStorageChange = () => {
      forceUpdate({});
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    const interval = setInterval(() => {
      forceUpdate({});
    }, 1000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);
  
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center group">
              <div className="relative overflow-hidden rounded-lg p-1 bg-gradient-to-r from-blue-500 to-indigo-600 transform transition-transform duration-300 group-hover:scale-105">
                <img 
                  src={logo} 
                  alt="Egzersiz Rehberi Logo" 
                  className="h-12 w-auto object-contain" 
                />
              </div>
              <div className="ml-3">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Egzersiz Rehberi
                </span>
              </div>
            </NavLink>
          </div>
          
          <div className="flex space-x-6 items-center">
            <NavLink 
              to="/" 
              className={({isActive}) => 
                isActive 
                  ? "font-medium relative text-blue-600 pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-1 after:w-full after:bg-gradient-to-r after:from-blue-500 after:to-indigo-600 after:rounded-t-md" 
                  : "text-gray-600 hover:text-blue-600 pb-2 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-1 after:w-full after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left after:bg-gradient-to-r after:from-blue-300 after:to-indigo-300 after:rounded-t-md"
              }
            >
              Ana Sayfa
            </NavLink>
            
            <NavLink 
              to="/exercises" 
              className={({isActive}) => 
                isActive 
                  ? "font-medium relative text-blue-600 pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-1 after:w-full after:bg-gradient-to-r after:from-blue-500 after:to-indigo-600 after:rounded-t-md" 
                  : "text-gray-600 hover:text-blue-600 pb-2 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-1 after:w-full after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left after:bg-gradient-to-r after:from-blue-300 after:to-indigo-300 after:rounded-t-md"
              }
            >
              Egzersizler
            </NavLink>
            
            <NavLink 
              to="/favorites" 
              className={({isActive}) => 
                isActive 
                  ? "font-medium relative text-blue-600 pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-1 after:w-full after:bg-gradient-to-r after:from-blue-500 after:to-indigo-600 after:rounded-t-md" 
                  : "text-gray-600 hover:text-blue-600 pb-2 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-1 after:w-full after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left after:bg-gradient-to-r after:from-blue-300 after:to-indigo-300 after:rounded-t-md"
              }
              onClick={() => forceUpdate({})} 
            >
              <div className="flex items-center">
                Favoriler
                {favorites.length > 0 && (
                  <span className="ml-1.5 px-2 py-0.5 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 text-xs font-medium rounded-full flex items-center justify-center min-w-[20px]">
                    {favorites.length}
                  </span>
                )}
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;