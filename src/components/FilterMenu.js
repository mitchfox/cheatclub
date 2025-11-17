import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';

const FilterMenu = ({ restaurants, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedDineIn, setSelectedDineIn] = useState(null);
  const [selectedLightning, setSelectedLightning] = useState(null);

  // Get all unique cuisines
  const allCuisines = [...new Set(restaurants.flatMap(r => r.cuisines))].sort();

  const handleCuisineToggle = (cuisine) => {
    setSelectedCuisines(prev =>
      prev.includes(cuisine)
        ? prev.filter(c => c !== cuisine)
        : [...prev, cuisine]
    );
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

      return true;
    });

    onFilterChange(filtered);
  }, [restaurants, selectedCuisines, selectedDineIn, selectedLightning, onFilterChange]);

  const clearFilters = () => {
    setSelectedCuisines([]);
    setSelectedDineIn(null);
    setSelectedLightning(null);
    // The useEffect will handle calling onFilterChange when state updates
  };

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const FilterPanelContent = () => (
    <>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">Filters</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <XMarkIcon className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Cuisine Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Cuisines</label>
        <div className="max-h-40 overflow-y-auto space-y-2">
          {allCuisines.map(cuisine => (
            <label key={cuisine} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCuisines.includes(cuisine)}
                onChange={() => handleCuisineToggle(cuisine)}
                className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
              />
              <span className="text-sm text-gray-700">{cuisine}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Dine-in Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Dine-in</label>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="dineIn"
              checked={selectedDineIn === true}
              onChange={() => setSelectedDineIn(selectedDineIn === true ? null : true)}
              className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
            />
            <span className="text-sm text-gray-700">Dine-in Available</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="dineIn"
              checked={selectedDineIn === false}
              onChange={() => setSelectedDineIn(selectedDineIn === false ? null : false)}
              className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
            />
            <span className="text-sm text-gray-700">Takeout Only</span>
          </label>
        </div>
      </div>

      {/* Lightning Deal Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Lightning Deals</label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={selectedLightning === true}
            onChange={() => setSelectedLightning(selectedLightning === true ? null : true)}
            className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
          />
          <span className="text-sm text-gray-700">Show Lightning Deals Only</span>
        </label>
      </div>

      {/* Clear Filters */}
      {(selectedCuisines.length > 0 || selectedDineIn !== null || selectedLightning !== null) && (
        <button
          onClick={clearFilters}
          className="w-full mt-4 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
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
        className="hidden md:flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <FunnelIcon className="h-5 w-5 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">Filters</span>
        {(selectedCuisines.length > 0 || selectedDineIn !== null || selectedLightning !== null) && (
          <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
            {selectedCuisines.length + (selectedDineIn !== null ? 1 : 0) + (selectedLightning !== null ? 1 : 0)}
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
        <FunnelIcon className="h-6 w-6 text-gray-600" />
        {(selectedCuisines.length > 0 || selectedDineIn !== null || selectedLightning !== null) && (
          <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {selectedCuisines.length + (selectedDineIn !== null ? 1 : 0) + (selectedLightning !== null ? 1 : 0)}
          </span>
        )}
      </motion.button>

      {/* Filter Panel - Desktop */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden md:block absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50"
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
              className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="md:hidden fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 overflow-y-auto"
            >
              <div className="p-4">
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

