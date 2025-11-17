import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import RestaurantCard from './RestaurantCard';
import Search from './Search';
import { fetchRestaurants } from '../utils/api';

const RestaurantList = ({ onRestaurantsLoaded, filteredRestaurants, setFilteredRestaurants }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    
    fetchRestaurants()
      .then((data) => {
        if (!isMounted) return;
        
        setRestaurants(data);
        if (onRestaurantsLoaded) {
          onRestaurantsLoaded(data);
        }
        if (setFilteredRestaurants) {
          setFilteredRestaurants(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        
        console.error('Error fetching restaurants:', err);
        setError(err.message || 'Failed to load restaurants. Please check your connection or try again later.');
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array - only fetch once on mount


  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      if (setFilteredRestaurants) {
        setFilteredRestaurants(restaurants);
      }
      return;
    }

    const filtered = restaurants.filter((restaurant) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        restaurant.name.toLowerCase().includes(searchLower) ||
        restaurant.suburb.toLowerCase().includes(searchLower) ||
        restaurant.cuisines.some((cuisine) =>
          cuisine.toLowerCase().includes(searchLower)
        )
      );
    });

    if (setFilteredRestaurants) {
      setFilteredRestaurants(filtered);
    }
  };

  const displayRestaurants = filteredRestaurants || restaurants;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <p className="text-red-500 text-xl mb-4 font-semibold">Error loading restaurants</p>
          <p className="text-gray-600 mb-6">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setError(null);
              setLoading(true);
              fetchRestaurants()
                .then((data) => {
                  setRestaurants(data);
                  setFilteredRestaurants(data);
                  setLoading(false);
                })
                .catch((err) => {
                  console.error('Error fetching restaurants:', err);
                  setError(err.message || 'Failed to load restaurants. Please check your connection or try again later.');
                  setLoading(false);
                });
            }}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
          >
            Retry
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Search onSearch={handleSearch} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {displayRestaurants.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-600 text-xl">No restaurants found</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {displayRestaurants.map((restaurant, index) => (
              <RestaurantCard
                key={restaurant.objectId}
                restaurant={restaurant}
                index={index}
              />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RestaurantList;

