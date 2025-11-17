import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiFunnel, HiXMark } from 'react-icons/hi2';
import { getCuisineEmoji } from '../utils/cuisineEmojis';

const FilterMenu = ({ restaurants, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedDineIn, setSelectedDineIn] = useState(null);
  const [selectedLightning, setSelectedLightning] = useState(null);
  const [minDiscount, setMinDiscount] = useState(0);

  // Get all unique cuisines
  const allCuisines = [...new Set(restaurants.flatMap(r => r.cuisines))].sort();

  const handleCuisineToggle = (cuisine) => {
    setSelectedCuisines(prev =>
      prev.includes(cuisine)
        ? prev.filter(c => c !== cuisine)
        : [...prev, cuisine]
    );
  };

  // Helper function to get the best deal discount for a restaurant
  const getBestDealDiscount = (restaurant) => {
    if (!restaurant.deals || restaurant.deals.length === 0) return 0;
    return Math.max(...restaurant.deals.map(deal => parseInt(deal.discount) || 0));
  };

  // Sort restaurants by best deal (highest discount first)
  const sortByBestDeal = (restaurantsList) => {
    return [...restaurantsList].sort((a, b) => {
      const discountA = getBestDealDiscount(a);
      const discountB = getBestDealDiscount(b);
      return discountB - discountA; // Sort descending (highest first)
    });
  };

  const applyFilters = useCallback(() => {
    const filtered = restaurants.filter(restaurant => {
      // Cuisine filter
      if (selectedCuisines.length > 0) {
        const hasSelectedCuisine = restaurant.cuisines.some(c => selectedCuisines.includes(c));
        if (!hasSelectedCuisine) return false;
      }

      // Dine-in filter
      if (selectedDineIn !== null) {
        const hasDineInDeal = restaurant.deals?.some(d => d.dineIn === String(selectedDineIn));
        if (!hasDineInDeal) return false;
      }

      // Lightning deal filter
      if (selectedLightning !== null) {
        const hasLightningDeal = restaurant.deals?.some(d => d.lightning === String(selectedLightning));
        if (!hasLightningDeal) return false;
      }

      // Discount filter
      if (minDiscount > 0) {
        const hasMinDiscount = restaurant.deals?.some(d => parseInt(d.discount) >= minDiscount);
        if (!hasMinDiscount) return false;
      }

      return true;
    });

    const sortedFiltered = sortByBestDeal(filtered);
    onFilterChange(sortedFiltered);
  }, [restaurants, selectedCuisines, selectedDineIn, selectedLightning, minDiscount, onFilterChange]);

  const clearFilters = () => {
    setSelectedCuisines([]);
    setSelectedDineIn(null);
    setSelectedLightning(null);
    setMinDiscount(0);
    // The useEffect will handle calling onFilterChange when state updates
  };

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const hasActiveFilters = selectedCuisines.length > 0 || selectedDineIn !== null || selectedLightning !== null || minDiscount > 0;
  const filterIconColor = hasActiveFilters ? 'text-orange-600' : 'text-gray-600';

  const FilterPanelContent = () => (
    <>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-800">Filters</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
        >
          <HiXMark className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Cuisine Filter */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-800 mb-3">Cuisines</label>
        <div className="max-h-48 overflow-y-auto space-y-2.5 bg-gray-50 rounded-lg p-2 border border-gray-200">
          {allCuisines.map(cuisine => (
            <label key={cuisine} className="flex items-center gap-3 cursor-pointer group hover:bg-white p-2 rounded-lg transition-colors">
              <input
                type="checkbox"
                checked={selectedCuisines.includes(cuisine)}
                onChange={() => handleCuisineToggle(cuisine)}
                className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:ring-offset-0 cursor-pointer"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors flex items-center gap-1.5">
                <span>{getCuisineEmoji(cuisine)}</span>
                <span>{cuisine}</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Dine-in Filter */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-800 mb-3">Dine-in</label>
        <div className="space-y-2.5">
          <div className="flex items-center gap-3 cursor-pointer group hover:bg-gray-50 p-2 rounded-lg transition-colors">
            <input
              type="radio"
              name="dineIn"
              id="dineIn-true"
              checked={selectedDineIn === true}
              onChange={() => setSelectedDineIn(true)}
              className="w-5 h-5 text-orange-500 border-gray-300 cursor-pointer focus:outline-none"
            />
            <label htmlFor="dineIn-true" className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors cursor-pointer flex-1">
              Dine-in Available
            </label>
          </div>
          <div className="flex items-center gap-3 cursor-pointer group hover:bg-gray-50 p-2 rounded-lg transition-colors">
            <input
              type="radio"
              name="dineIn"
              id="dineIn-false"
              checked={selectedDineIn === false}
              onChange={() => setSelectedDineIn(false)}
              className="w-5 h-5 text-orange-500 border-gray-300 cursor-pointer focus:outline-none"
            />
            <label htmlFor="dineIn-false" className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors cursor-pointer flex-1">
              Takeout Only
            </label>
          </div>
        </div>
      </div>

      {/* Lightning Deal Filter */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-800 mb-3">Lightning Deals</label>
        <label className="flex items-center gap-3 cursor-pointer group hover:bg-gray-50 p-2 rounded-lg transition-colors">
          <input
            type="checkbox"
            checked={selectedLightning === true}
            onChange={() => setSelectedLightning(selectedLightning === true ? null : true)}
            className="w-4 h-4 text-orange-500 border-gray-300  cursor-pointer"
          />
          <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">Show Lightning Deals Only</span>
        </label>
      </div>

      {/* Discount Filter */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-800 mb-3">
          Minimum Discount: {minDiscount}%
        </label>
        <div className="px-2">
          <input
            type="range"
            min="0"
            max="50"
            step="5"
            value={minDiscount}
            onChange={(e) => setMinDiscount(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
            style={{
              background: `linear-gradient(to right, #f97316 0%, #f97316 ${(minDiscount / 50) * 100}%, #e5e7eb ${(minDiscount / 50) * 100}%, #e5e7eb 100%)`
            }}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0%</span>
            <span>50%</span>
          </div>
        </div>
      </div>

      {/* Clear Filters */}
      {(selectedCuisines.length > 0 || selectedDineIn !== null || selectedLightning !== null || minDiscount > 0) && (
        <button
          onClick={clearFilters}
          className="w-full mt-4 px-4 py-2.5 text-sm font-semibold text-orange-600 hover:text-orange-700 border-2 border-orange-200 rounded-lg hover:bg-orange-50 hover:border-orange-300 transition-colors"
        >
          Clear All Filters
        </button>
      )}
    </>
  );

  return (
    <>
      {/* Filter Button - Desktop */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <HiFunnel className={`h-5 w-5 ${filterIconColor}`} />
        <span className="text-sm font-semibold text-gray-800">Filters</span>
        {hasActiveFilters && (
          <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
            {selectedCuisines.length + (selectedDineIn !== null ? 1 : 0) + (selectedLightning !== null ? 1 : 0) + (minDiscount > 0 ? 1 : 0)}
          </span>
        )}
      </motion.button>

      {/* Filter Button - Mobile */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors relative"
        aria-label="Filters"
      >
        <HiFunnel className={`h-6 w-6 ${filterIconColor}`} />
        {hasActiveFilters && (
          <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
            {selectedCuisines.length + (selectedDineIn !== null ? 1 : 0) + (selectedLightning !== null ? 1 : 0) + (minDiscount > 0 ? 1 : 0)}
          </span>
        )}
      </motion.button>

      {/* Filter Panel - Desktop */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden md:block absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-200 p-5 z-[60]"
        >
          <FilterPanelContent />
        </motion.div>
      )}

      {/* Filter Panel - Mobile (Slide-out) */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-[55]"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="md:hidden fixed top-0 left-0 h-full w-80 bg-white shadow-xl border-r border-gray-200 z-[60] overflow-y-auto"
            >
              <div className="p-5">
                <FilterPanelContent />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FilterMenu;

