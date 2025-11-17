import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import MobileMenu from './MobileMenu';
import FilterMenu from './FilterMenu';

const Header = ({ onFilterChange, restaurants = [] }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isHomePage = location.pathname === '/';

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Filters on the left - Desktop and Mobile */}
            <div className="flex-1 relative">
              {isHomePage && restaurants.length > 0 && (
                <FilterMenu restaurants={restaurants} onFilterChange={onFilterChange} />
              )}
            </div>
            {/* Logo in the middle */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex-1 flex justify-center cursor-pointer"
              onClick={() => navigate('/')}
            >
              <h1 className="text-3xl font-bold text-orange-500" style={{ fontFamily: 'Caveat, cursive' }}>
                CheatClub
              </h1>
            </motion.div>
            {/* Profile on the right */}
            <div className="flex-1 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  // On mobile (md breakpoint), open menu
                  setIsMobileMenuOpen(true);
                }}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors md:hidden"
                aria-label="Profile"
              >
                <UserCircleIcon className="h-8 w-8 text-gray-600" />
              </motion.button>
              {/* Desktop profile button - no menu */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:block p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Profile"
              >
                <UserCircleIcon className="h-8 w-8 text-gray-600" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
};

export default Header;

