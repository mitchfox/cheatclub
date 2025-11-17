import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import RestaurantCard from './RestaurantCard';
import Search from './Search';
import EmailCapture from './EmailCapture';
import { fetchRestaurants } from '../utils/api';

const RestaurantList = ({ onRestaurantsLoaded, filteredRestaurants, setFilteredRestaurants }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    let isMounted = true;
    
    fetchRestaurants()
      .then((data) => {
        if (!isMounted) return;
        
        const sortedData = sortByBestDeal(data);
        setRestaurants(sortedData);
        if (onRestaurantsLoaded) {
          onRestaurantsLoaded(sortedData);
        }
        if (setFilteredRestaurants) {
          setFilteredRestaurants(sortedData);
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
        setFilteredRestaurants(sortByBestDeal(restaurants));
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
      setFilteredRestaurants(sortByBestDeal(filtered));
    }
  };

  const displayRestaurants = filteredRestaurants || restaurants;

  // Skeleton Loader Component
  const SkeletonCard = ({ index }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white rounded-xl shadow-md overflow-hidden"
    >
      {/* Image skeleton */}
      <div className="relative h-48 bg-gray-200 animate-pulse" style={{ backgroundColor: '#FFE9CD' }}>
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <div className="h-8 w-16 bg-gray-300 rounded-full animate-pulse" />
          <div className="h-8 w-8 bg-gray-300 rounded-full animate-pulse" />
        </div>
      </div>
      {/* Content skeleton */}
      <div className="p-4">
        <div className="h-6 bg-gray-200 rounded mb-2 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded mb-2 w-3/4 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded mb-3 w-2/3 animate-pulse" />
        <div className="flex flex-wrap gap-2">
          <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
        </div>
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Search onSearch={handleSearch} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <SkeletonCard key={index} index={index} />
            ))}
          </div>
        </div>
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
                  const sortedData = sortByBestDeal(data);
                  setRestaurants(sortedData);
                  if (onRestaurantsLoaded) {
                    onRestaurantsLoaded(sortedData);
                  }
                  if (setFilteredRestaurants) {
                    setFilteredRestaurants(sortedData);
                  }
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
          <>
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
            {/* <EmailCapture /> */}
          </>
        )}
      </div>
    </div>
  );
};

export default RestaurantList;

