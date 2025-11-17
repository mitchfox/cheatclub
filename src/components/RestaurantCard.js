import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HiClock, HiMapPin, HiHeart, HiBolt } from 'react-icons/hi2';
import { PiBowlFood } from 'react-icons/pi';
import { getCuisineEmoji } from '../utils/cuisineEmojis';

const RestaurantCard = ({ restaurant, index }) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);

  const handleClick = () => {
    // Scroll to top instantly before navigation
    window.scrollTo(0, 0);
    navigate(`/restaurant/${restaurant.objectId}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevent card click
    setIsFavorited(!isFavorited);
    // Here you would typically save to backend/localStorage
  };

  const getBestDeal = () => {
    if (!restaurant.deals || restaurant.deals.length === 0) return null;
    return restaurant.deals.reduce((best, deal) => 
      parseInt(deal.discount) > parseInt(best.discount) ? deal : best
    );
  };

  const hasLightningDeal = () => {
    return restaurant.deals?.some(deal => deal.lightning === 'true');
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    if (!imageError) {
      setImageError(true);
      setImageLoading(false);
    }
  };

  const hasImage = restaurant.imageLink && restaurant.imageLink.trim() !== '';
  const showPlaceholder = !hasImage || imageError;

  const bestDeal = getBestDeal();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      // whileHover={{ y: -2 }}
      onClick={handleClick}
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
    >
      <div className="relative h-48 overflow-hidden" style={{ backgroundColor: '#FFE9CD' }}>
        {showPlaceholder ? (
          <div className="w-full h-full flex items-center justify-center p-8">
            <PiBowlFood className="w-20 h-20 text-orange-500" />
          </div>
        ) : (
          <>
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: '#FFE9CD' }}>
                <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            <img
              src={restaurant.imageLink}
              alt={restaurant.name}
              className={`w-full h-full object-cover ${imageLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="lazy"
            />
          </>
        )}
        {/* Lightning indicator - top left */}
        {hasLightningDeal() && (
          <div className="absolute top-3 left-3">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ 
                scale: 1,
                rotate: [0, 3, -3, 0]
              }}
              transition={{ 
                scale: { duration: 0.3 },
                rotate: { duration: 0.5, repeat: Infinity, repeatDelay: 4 }
              }}
              className="bg-yellow-100 text-yellow-700 px-2 py-1.5 rounded-full flex items-center gap-1 font-bold text-xs h-8"
            >
              <HiBolt className="h-3.5 w-3.5" />
              <span>Lightning</span>
            </motion.div>
          </div>
        )}
        {/* Badges and heart - top right */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          {bestDeal && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-orange-500 text-white px-2.5 py-1.5 rounded-full font-bold text-xs h-8 flex items-center"
            >
              {bestDeal.discount}% OFF
            </motion.div>
          )}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleFavoriteClick}
            className={`h-8 w-8 rounded-full backdrop-blur-sm transition-colors flex items-center justify-center ${
              isFavorited 
                ? 'bg-red-500 text-white' 
                : 'bg-white bg-opacity-80 text-gray-600 hover:bg-opacity-100'
            }`}
            aria-label="Favorite"
          >
            <HiHeart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
          </motion.button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{restaurant.name}</h3>
        <div className="flex items-center text-gray-600 text-sm mb-2">
          <HiMapPin className="h-4 w-4 mr-1" />
          <span>{restaurant.address1}, {restaurant.suburb}</span>
        </div>
        <div className="flex items-center text-gray-600 text-sm mb-3">
          <HiClock className="h-4 w-4 mr-1" />
          <span>{restaurant.open} - {restaurant.close}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {restaurant.cuisines.slice(0, 3).map((cuisine, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full flex items-center gap-1"
            >
              <span>{getCuisineEmoji(cuisine)}</span>
              <span>{cuisine}</span>
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

