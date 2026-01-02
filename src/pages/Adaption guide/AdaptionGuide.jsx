import React from "react";
import { FaHeart, FaHome, FaPaw, FaUserFriends, FaStethoscope, FaInfoCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router";

const AdaptionGuide = () => {
  const steps = [
    {
      icon: FaHeart,
      title: "Decide with Your Heart & Mind",
      desc: "Adopting a pet is a long-term commitment (10-15 years!). Make sure everyone in your family is ready and agrees.",
      color: "text-red-600",
      bg: "bg-red-100 dark:bg-red-900/30",
    },
    {
      icon: FaHome,
      title: "Prepare Your Home",
      desc: "Pet-proof your house: secure wires, remove toxic plants, create a safe space with bed, food/water bowls, and toys.",
      color: "text-blue-600",
      bg: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      icon: FaPaw,
      title: "Choose the Right Pet",
      desc: "Consider your lifestyle: energy level, space, time, and budget. Puppies/kittens need more attention than adults.",
      color: "text-purple-600",
      bg: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      icon: FaUserFriends,
      title: "Meet & Interact",
      desc: "Spend time with the pet before adopting. See how they react to you and your family members.",
      color: "text-green-600",
      bg: "bg-green-100 dark:bg-green-900/30",
    },
    {
      icon: FaStethoscope,
      title: "Health Check & Vaccination",
      desc: "Ask for medical history, vaccination records, deworming, and spay/neuter status. Plan a vet visit soon after adoption.",
      color: "text-teal-600",
      bg: "bg-teal-100 dark:bg-teal-900/30",
    },
    {
      icon: FaInfoCircle,
      title: "Complete Adoption Process",
      desc: "Fill forms, pay adoption fee (if any), and bring ID proof. Take collar, leash, carrier, and initial supplies.",
      color: "text-indigo-600",
      bg: "bg-indigo-100 dark:bg-indigo-900/30",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 dark:text-white mb-6">
          Adoption Guide 🐾
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
          Everything you need to know before bringing home your new best friend. 
          Because adopting a pet is not just finding a companion — it's saving a life.
        </p>
      </motion.div>

      {/* Why Adopt Section */}
      <div className="max-w-6xl mx-auto mb-20 text-center">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">
          Why Adopt Instead of Shop?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Save a Life", desc: "Millions of healthy, loving pets are waiting in shelters for a second chance." },
            { title: "Fight Puppy Mills", desc: "Commercial breeding often keeps animals in cruel conditions. Adoption breaks that cycle." },
            { title: "More Affordable", desc: "Adoption fees are much lower than buying, and often include vaccination & spaying." },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl"
            >
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaHeart className="text-4xl text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Step-by-Step Guide */}
      <div className="max-w-7xl mx-auto mb-20">
        <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12">
          Step-by-Step Adoption Guide
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <div className={`p-6 ${step.bg}`}>
                <step.icon className={`text-6xl ${step.color} mx-auto mb-4`} />
                <h3 className="text-xl font-bold text-center text-gray-800 dark:text-white">
                  Step {index + 1}: {step.title}
                </h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Final Message */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 rounded-3xl shadow-2xl max-w-5xl mx-auto"
      >
        <h2 className="text-4xl font-bold mb-6">
          Ready to Give a Pet a Forever Home?
        </h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
          Browse our listings today and find your new best friend. 
          One adoption can change two lives — yours and theirs.
        </p>
        <Link to={'/pets-supply'} className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-4 rounded-full text-lg font-bold shadow-lg transition transform hover:scale-105">
          Browse Pets for Adoption
        </Link>
      </motion.div>
    </div>
  );
};

export default AdaptionGuide;