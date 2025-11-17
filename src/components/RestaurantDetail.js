import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { HiClock, HiMapPin, HiBolt, HiHome } from 'react-icons/hi2';
import { PiBowlFood } from 'react-icons/pi';
import { fetchRestaurants } from '../utils/api';

const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const hasImage = restaurant?.imageLink && restaurant.imageLink.trim() !== '';
  const showPlaceholder = !hasImage || imageError;

  useEffect(() => {
    // Scroll to top instantly when component mounts or id changes
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    let isMounted = true;
    
    // Reset image states when restaurant changes
    setImageLoading(true);
    setImageError(false);
    
    fetchRestaurants()
      .then((restaurants) => {
        if (!isMounted) return;
        
        const found = restaurants.find((r) => r.objectId === id);
        if (found) {
          setRestaurant(found);
        } else {
          setError('Restaurant not found');
        }
        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        
        console.error('Error fetching restaurant:', err);
        setError(err.message || 'Failed to load restaurant. Please check your connection or try again later.');
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error || !restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-500 text-xl mb-4">
            {error || 'Restaurant not found'}
          </p>
          <button
            onClick={() => navigate('/')}
            className="text-orange-500 hover:text-orange-600 underline"
          >
            Go back to restaurants
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow overflow-hidden"
        >
          <div className="relative h-64 md:h-96 overflow-hidden" style={{ backgroundColor: '#FFE9CD' }}>
            {showPlaceholder ? (
              <div className="w-full h-full flex items-center justify-center p-8">
                <PiBowlFood className="w-32 h-32 md:w-40 md:h-40 text-orange-500" />
              </div>
            ) : (
              <>
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center z-10" style={{ backgroundColor: '#FFE9CD' }}>
                    <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
                <img
                  src={restaurant.imageLink}
                  alt={restaurant.name}
                  className={`w-full h-full object-cover ${imageLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
                  onLoad={() => setImageLoading(false)}
                  onError={() => {
                    if (!imageError) {
                      setImageError(true);
                      setImageLoading(false);
                    }
                  }}
                  loading="lazy"
                />
              </>
            )}
          </div>

          <div className="p-6 md:p-8">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
            >
              {restaurant.name}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-3 mb-6"
            >
              <div className="flex items-center text-gray-600">
                <HiMapPin className="h-5 w-5 mr-2" />
                <span>{restaurant.address1}, {restaurant.suburb}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <HiClock className="h-5 w-5 mr-2" />
                <span>Open: {restaurant.open} - {restaurant.close}</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-6"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Cuisines
              </h2>
              <div className="flex flex-wrap gap-2">
                {restaurant.cuisines.map((cuisine, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + idx * 0.05 }}
                    className="px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full font-medium"
                  >
                    {cuisine}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Available Deals
              </h2>
              <div className="space-y-4">
                {restaurant.deals && restaurant.deals.length > 0 ? (
                  restaurant.deals.map((deal, idx) => (
                    <motion.div
                      key={deal.objectId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + idx * 0.1 }}
                      className="border-2 border-orange-200 rounded-lg p-4 hover:border-orange-400 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl font-bold text-orange-500">
                            {deal.discount}%
                          </span>
                          <span className="text-lg font-semibold text-gray-700">
                            OFF
                          </span>
                        </div>
                        <div className="flex gap-2">
                          {deal.lightning === 'true' && (
                            <motion.div
                              animate={{ rotate: [0, 10, -10, 0] }}
                              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                              className="flex items-center bg-yellow-100 text-yellow-700 px-2 py-1 rounded"
                            >
                              <HiBolt className="h-4 w-4 mr-1" />
                              <span className="text-xs font-bold">Lightning</span>
                            </motion.div>
                          )}
                          {deal.dineIn === 'true' && (
                            <div className="flex items-center bg-blue-100 text-blue-700 px-2 py-1 rounded">
                              <HiHome className="h-4 w-4 mr-1" />
                              <span className="text-xs font-bold">Dine In</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        {deal.open && deal.close && (
                          <p>
                            Available: {deal.open} - {deal.close}
                          </p>
                        )}
                        {deal.start && deal.end && (
                          <p>
                            Available: {deal.start} - {deal.end}
                          </p>
                        )}
                        <p className="font-semibold text-gray-800">
                          {deal.qtyLeft} deals left
                        </p>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-gray-600">No deals available at this time</p>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RestaurantDetail;

