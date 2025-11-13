import React from 'react';
import { FaPaw, FaMapMarkerAlt, FaEye, FaTag, FaInfoCircle } from 'react-icons/fa';
import { Link } from 'react-router'; 
import { Tooltip } from 'react-tooltip';
import { motion } from 'framer-motion';

const AllPatsAndProduct = ({ product, index }) => {
  const { image, name, category, price, location, _id } = product;

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut', delay: index * 0.1 },
    },
    hover: { y: -5, transition: { duration: 0.3 } },
  };

  const imageVariants = {
    hover: { scale: 1.08, transition: { duration: 0.5 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.97 },
  };

  const iconVariants = {
    hover: { rotate: 360, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 group"
      variants={cardVariants}
      initial="hidden"
      animate="visible" 
      whileHover="hover"
    >
      {/* Image section */}
      <motion.div className="relative h-64 overflow-hidden" whileHover="hover">
        <motion.img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          variants={imageVariants}
          data-tooltip-id="image-tooltip"
          data-tooltip-content={`View ${name} details`}
        />

        {/* Category Tag */}
        <motion.div
          className="absolute top-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1 shadow-sm cursor-help"
          data-tooltip-id="category-tooltip"
          data-tooltip-content={`Category: ${category}`}
          whileHover={{ scale: 1.05 }}
        >
          <FaTag className="text-blue-500 dark:text-blue-400 text-xs" />
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            {category}
          </span>
        </motion.div>

        {/* Location Info */}
        <motion.div
          className="absolute top-4 right-4 bg-black/60 text-white rounded-full p-2 cursor-help"
          data-tooltip-id="location-tooltip"
          data-tooltip-content={`Located in: ${location}`}
          whileHover={{ scale: 1.1 }}
        >
          <FaInfoCircle className="text-sm" />
        </motion.div>

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 dark:group-hover:bg-black/40 transition-all duration-300"></div>
      </motion.div>

      {/* Content */}
      <div className="p-6">
        {/* Name */}
        <motion.h3
          className="text-xl font-bold text-gray-800 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-help"
          data-tooltip-id="name-tooltip"
          data-tooltip-content={name}
          whileHover={{ x: 5 }}
        >
          {name}
        </motion.h3>

        {/* Location */}
        <motion.div
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-4"
          whileHover={{ x: 3 }}
        >
          <FaMapMarkerAlt className="text-red-500 dark:text-red-400" />
          <span className="text-sm font-medium">{location}</span>
        </motion.div>

        {/* Price or Free Section */}
        <div className="mb-5">
          {price === 0 || price === 'Free' || price === 'Free for Adoption' ? (
            <motion.div
              className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl p-4 text-center cursor-help"
              data-tooltip-id="price-tooltip"
              data-tooltip-content="This pet is available for free adoption"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-center gap-2 mb-1">
                <motion.div whileHover={{ rotate: 15 }}>
                  <FaPaw className="text-green-600 dark:text-green-400" />
                </motion.div>
                <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                  Free
                </span>
              </div>
              <p className="text-green-700 dark:text-green-300 text-sm font-semibold">
                For Adoption
              </p>
            </motion.div>
          ) : (
            <motion.div
              className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-xl p-4 text-center cursor-help"
              data-tooltip-id="price-tooltip"
              data-tooltip-content={`Adoption fee: ${price} tk`}
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {price} tk
              </div>
              <p className="text-blue-700 dark:text-blue-300 text-sm font-semibold">
                Adoption Fee
              </p>
            </motion.div>
          )}
        </div>

        {/* Button */}
        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
          <Link
            to={`/productDetails/${_id}`}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 shadow-md group-hover:shadow-lg flex items-center justify-center gap-2"
            data-tooltip-id="button-tooltip"
            data-tooltip-content="Click to view full details and adoption process"
          >
            <motion.div variants={iconVariants} whileHover="hover">
              <FaEye className="text-white" />
            </motion.div>
            <span>See Details</span>
          </Link>
        </motion.div>
      </div>

      {/* Tooltips */}
      <Tooltip id="image-tooltip" place="top" variant="dark" delayShow={300} />
      <Tooltip id="category-tooltip" place="top" variant="dark" delayShow={300} />
      <Tooltip id="location-tooltip" place="left" variant="dark" delayShow={300} />
      <Tooltip id="name-tooltip" place="top" variant="dark" delayShow={300} />
      <Tooltip id="price-tooltip" place="top" variant="dark" delayShow={300} />
      <Tooltip id="button-tooltip" place="top" variant="dark" delayShow={300} />
    </motion.div>
  );
};

export default AllPatsAndProduct;
