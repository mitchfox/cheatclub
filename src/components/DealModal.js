import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiXMark, HiClock, HiBolt, HiHome, HiMapPin } from 'react-icons/hi2';

const DealModal = ({ isOpen, onClose, deal, restaurant }) => {
  const handleCheckout = () => {
    // Handle checkout logic here
    console.log('Checkout for deal:', deal);
    // You can navigate to checkout page or handle payment here
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && deal && restaurant && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
          />
          {/* Slide-up menu */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              {/* Handle bar */}
              <div className="flex justify-center mb-4">
                <div className="w-12 h-1 bg-gray-300 rounded-full" />
              </div>
              
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{restaurant.name}</h2>
                  <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                    <HiMapPin className="h-4 w-4" />
                    {restaurant.suburb}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <HiXMark className="h-6 w-6 text-gray-600" />
                </button>
              </div>

                {/* Deal Discount */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 mb-6 text-center">
                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    <span className="text-6xl font-bold text-orange-500">
                      {deal.discount}%
                    </span>
                    <span className="text-2xl font-semibold text-gray-700">
                      OFF
                    </span>
                  </div>
                  <div className="flex gap-2 justify-center flex-wrap">
                    {deal.lightning === 'true' && (
                      <motion.div
                        animate={{ rotate: [0, 3, -3, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 4 }}
                        className="flex items-center bg-yellow-100 text-yellow-700 px-3 py-1.5 rounded-full"
                      >
                        <HiBolt className="h-4 w-4 mr-1" />
                        <span className="text-xs font-bold">Lightning Deal</span>
                      </motion.div>
                    )}
                    {deal.dineIn === 'true' && (
                      <div className="flex items-center bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full">
                        <HiHome className="h-4 w-4 mr-1" />
                        <span className="text-xs font-bold">Dine In</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Deal Details */}
                <div className="space-y-4 mb-6">
                  {/* Availability */}
                  {((deal.open && deal.close) || (deal.start && deal.end)) && (
                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <HiClock className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-gray-800 mb-1">Available Times</p>
                        <p className="text-sm text-gray-600">
                          {deal.open && deal.close 
                            ? `${deal.open} - ${deal.close}` 
                            : `${deal.start} - ${deal.end}`}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Stock */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">Deals Remaining</p>
                      <p className="text-lg font-bold text-gray-900 mt-1">{deal.qtyLeft} left</p>
                    </div>
                    {parseInt(deal.qtyLeft) < 10 && (
                      <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-3 py-1.5 rounded-full">
                        Limited Stock
                      </span>
                    )}
                  </div>
                </div>

                {/* Checkout Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckout}
                  disabled={parseInt(deal.qtyLeft) === 0}
                  className={`w-full px-4 py-4 rounded-xl font-semibold text-lg transition-colors shadow-sm ${
                    parseInt(deal.qtyLeft) === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-orange-500 text-white hover:bg-orange-600'
                  }`}
                >
                  {parseInt(deal.qtyLeft) === 0 ? 'Sold Out' : 'Checkout'}
                </motion.button>

                {/* Terms */}
                <p className="text-xs text-gray-500 text-center mt-4">
                  By proceeding, you agree to the terms and conditions of this deal.
                </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DealModal;

