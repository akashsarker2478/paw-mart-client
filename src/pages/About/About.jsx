import React from "react";
import { FaPaw, FaHeart, FaHome, FaUsers, FaShieldAlt, FaTruck } from "react-icons/fa";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 dark:text-white mb-6">
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">PawMart</span> 🐾
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Connecting pet lovers with local breeders, owners, and shops — because every pet deserves a loving home and the best care.
        </p>
      </motion.div>

      {/* Mission Section */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center mb-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">
            Our Mission
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            At PawMart, we believe in <span className="font-semibold text-blue-600 dark:text-blue-400">"Adopt, Don't Shop"</span>. 
            Our platform brings together responsible pet owners, breeders, and shops in one place so you can find your perfect furry companion or all the supplies they need.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            We’re more than just a marketplace — we’re a community dedicated to the love, care, and well-being of pets across Bangladesh.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 p-10 rounded-3xl shadow-2xl">
            <FaHeart className="text-9xl text-blue-600 dark:text-blue-400 opacity-80" />
          </div>
        </motion.div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto mb-20">
        <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12">
          Why Choose PawMart?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: FaHome, title: "Local & Trusted", desc: "Connect with verified sellers and adopters in your area" },
            { icon: FaPaw, title: "Adoption First", desc: "Promoting rescue and adoption over buying" },
            { icon: FaUsers, title: "Community Driven", desc: "Built by pet lovers, for pet lovers" },
            { icon: FaShieldAlt, title: "Safe & Secure", desc: "Direct communication with no middleman risks" },
            { icon: FaTruck, title: "Everything You Need", desc: "Food, toys, accessories — all in one place" },
            { icon: FaHeart, title: "Love Guaranteed", desc: "Every pet deserves a happy, forever home" },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 text-center"
            >
              <feature.icon className="text-5xl text-blue-600 dark:text-blue-400 mx-auto mb-5" />
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 rounded-3xl shadow-2xl"
      >
        <h2 className="text-4xl font-bold mb-6">
          Join the PawMart Family Today
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Whether you're looking for a new pet, supplies, or want to give a loving animal a home — we’re here for you.
        </p>
        <button className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-4 rounded-full text-lg font-bold shadow-lg transition">
          Start Exploring Now
        </button>
      </motion.div>
    </div>
  );
};

export default About;