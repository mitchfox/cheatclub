import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { HiUserCircle } from 'react-icons/hi2';
import { FaChevronLeft } from "react-icons/fa";
import MobileMenu from './MobileMenu';
import AuthModal from './AuthModal';
import FilterMenu from './FilterMenu';

const Header = ({ onFilterChange, restaurants = [] }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const isHomePage = location.pathname === '/';
  const isRestaurantDetail = location.pathname.startsWith('/restaurant/');

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
            {/* Filters on the left - Desktop and Mobile, or Back button on detail page */}
            <div className="flex-1 relative">
              {isRestaurantDetail ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/')}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors flex items-center gap-2"
                  aria-label="Back to restaurants"
                >
                  <FaChevronLeft className="h-6 w-6 text-gray-600" />
                </motion.button>
              ) : (
                isHomePage && restaurants.length > 0 && (
                  <FilterMenu restaurants={restaurants} onFilterChange={onFilterChange} />
                )
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
                  // On mobile, open slide-up menu
                  setIsMobileMenuOpen(true);
                }}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors md:hidden"
                aria-label="Profile"
              >
                <HiUserCircle className="h-8 w-8 text-gray-600" />
              </motion.button>
              {/* Desktop profile button - opens modal */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsAuthModalOpen(true)}
                className="hidden md:block p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Profile"
              >
                <HiUserCircle className="h-8 w-8 text-gray-600" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};

export default Header;

