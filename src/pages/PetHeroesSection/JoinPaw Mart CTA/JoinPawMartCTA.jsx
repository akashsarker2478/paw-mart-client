import React from "react";
import { motion } from "framer-motion";
import { FaPaw, FaHeart, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";

const JoinPawMartCTA = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-blue-500 to-purple-600 text-white relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(255,255,255,0.3)_0%,_transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(255,255,255,0.2)_0%,_transparent_50%)]"></div>
      </div>

      {/* Decorative Paw Icons */}
      <div className="absolute top-10 left-10 text-6xl opacity-20">
        <FaPaw className="rotate-12" />
      </div>
      <div className="absolute bottom-10 right-10 text-7xl opacity-20">
        <FaPaw className="-rotate-12" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-8 leading-tight drop-shadow-2xl"
          >
            Join the PawMart Family 🐾
          </motion.h2>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl lg:text-3xl mb-12 opacity-90 leading-relaxed max-w-4xl mx-auto"
          >
            Be part of a caring community of pet lovers. 
            Adopt a pet, list yours, or find the best supplies — all in one place.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-10"
          >
            {/* Primary Button - Sign Up */}
            <Link
              to="/auth/register"
              className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-extrabold px-12 py-6 rounded-full text-2xl md:text-3xl shadow-2xl transition-all duration-500 transform hover:scale-110 flex items-center gap-4"
            >
              <FaPaw className="text-3xl group-hover:rotate-12 transition-transform" />
              Sign Up Free
              <FaArrowRight className="text-2xl group-hover:translate-x-2 transition-transform" />
            </Link>

            {/* Secondary Button */}
            <Link
              to="/pets-supply"
              className="group border-4 border-white text-white hover:bg-white/10 px-12 py-6 rounded-full text-xl md:text-2xl font-bold backdrop-blur-sm transition-all duration-500 transform hover:scale-110 flex items-center gap-3"
            >
              Browse Pets Now
              <FaArrowRight className="text-xl group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>

          {/* Trust Text */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl opacity-80 flex items-center justify-center gap-6 flex-wrap"
          >
            <span className="flex items-center gap-2">
              <FaHeart className="text-red-300 animate-pulse" />
              No adoption fees for listings
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-2">
              <FaPaw className="text-yellow-300" />
              Trusted & caring community
            </span>
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default JoinPawMartCTA;