import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ClockIcon, MapPinIcon } from '@heroicons/react/24/outline';

const RestaurantCard = ({ restaurant, index }) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleClick = () => {
    navigate(`/restaurant/${restaurant.objectId}`);
  };

  const getBestDeal = () => {
    if (!restaurant.deals || restaurant.deals.length === 0) return null;
    return restaurant.deals.reduce((best, deal) => 
      parseInt(deal.discount) > parseInt(best.discount) ? deal : best
    );
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = (e) => {
    if (!imageError) {
      setImageError(true);
      setImageLoading(false);
      // Only set placeholder once, prevent infinite loop
      const placeholder = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'400\' height=\'300\'%3E%3Crect fill=\'%23f3f4f6\' width=\'400\' height=\'300\'/%3E%3Ctext fill=\'%239ca3af\' font-family=\'sans-serif\' font-size=\'18\' x=\'50%25\' y=\'50%25\' text-anchor=\'middle\' dominant-baseline=\'middle\'%3ERestaurant%3C/text%3E%3C/svg%3E';
      // Try to set placeholder, but prevent infinite loop
      if (e.target.src !== placeholder) {
        e.target.src = placeholder;
        e.target.onerror = null;
      }
    }
  };

  const bestDeal = getBestDeal();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -2 }}
      onClick={handleClick}
      className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow transition-shadow"
    >
      <div className="relative h-48 overflow-hidden bg-gray-100">
        {imageLoading && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        <img
          src={restaurant.imageLink}
          alt={restaurant.name}
          className={`w-full h-full object-cover ${imageLoading && !imageError ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
        />
        {bestDeal && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full font-bold text-sm"
          >
            {bestDeal.discount}% OFF
          </motion.div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{restaurant.name}</h3>
        <div className="flex items-center text-gray-600 text-sm mb-2">
          <MapPinIcon className="h-4 w-4 mr-1" />
          <span>{restaurant.address1}, {restaurant.suburb}</span>
        </div>
        <div className="flex items-center text-gray-600 text-sm mb-3">
          <ClockIcon className="h-4 w-4 mr-1" />
          <span>{restaurant.open} - {restaurant.close}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {restaurant.cuisines.slice(0, 3).map((cuisine, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
            >
              {cuisine}
            </span>
          ))}
          {restaurant.cuisines.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
              +{restaurant.cuisines.length - 3} more
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default RestaurantCard;

