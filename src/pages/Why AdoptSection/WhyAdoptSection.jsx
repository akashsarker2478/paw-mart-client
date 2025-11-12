import React, { useState, useEffect } from 'react';
import { FaHeart, FaHome, FaShieldAlt, FaUsers, FaHandHoldingHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';

const WhyAdoptSection = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Simple scroll detection without external library
    useEffect(() => {
        const handleScroll = () => {
            const element = document.getElementById('stats-section');
            if (element) {
                const rect = element.getBoundingClientRect();
                if (rect.top < window.innerHeight - 100) {
                    setIsVisible(true);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check initially

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Counter components without useInView
    const AnimatedCounter = ({ value, duration = 2 }) => {
        const [count, setCount] = useState(0);

        useEffect(() => {
            if (isVisible) {
                let start = 0;
                const end = parseInt(value);
                const increment = end / (duration * 60); // 60fps

                const timer = setInterval(() => {
                    start += increment;
                    if (start >= end) {
                        setCount(end);
                        clearInterval(timer);
                    } else {
                        setCount(Math.floor(start));
                    }
                }, 1000 / 60); // 60fps

                return () => clearInterval(timer);
            }
        }, [isVisible, value, duration]);

        return <span>{isVisible ? (value === 98 ? `${Math.floor(count)}%` : `${Math.floor(count)}+`) : '0+'}</span>;
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { 
            opacity: 0, 
            y: 50 
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const cardVariants = {
        hidden: { 
            opacity: 0, 
            scale: 0.8 
        },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        },
        hover: {
            scale: 1.05,
            y: -10,
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    };

    const statsVariants = {
        hidden: { 
            opacity: 0, 
            y: 30 
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    const numberVariants = {
        hidden: { 
            scale: 0, 
            opacity: 0 
        },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "backOut"
            }
        }
    };

    const reasons = [
        {
            icon: <FaHeart className="text-3xl text-red-500" />,
            title: "Save a Life",
            description: "Every adoption gives a homeless pet a second chance at life and love."
        },
        {
            icon: <FaHome className="text-3xl text-blue-500" />,
            title: "Loving Homes",
            description: "We ensure every pet finds a safe, caring, and permanent home."
        },
        {
            icon: <FaShieldAlt className="text-3xl text-green-500" />,
            title: "Health Guaranteed",
            description: "All pets are vaccinated, health-checked, and ready for their new families."
        },
        {
            icon: <FaUsers className="text-3xl text-purple-500" />,
            title: "Community Support",
            description: "Join our community of pet lovers and get ongoing support and advice."
        }
    ];

    return (
        <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4">
                {/* Header */}
                <motion.div 
                    className="text-center mb-12"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={containerVariants}
                >
                    <motion.div 
                        className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-semibold mb-4"
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                    >
                        <FaHandHoldingHeart />
                        Why Choose Adoption?
                    </motion.div>
                    <motion.h2 
                        className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4"
                        variants={itemVariants}
                    >
                        Why Adopt from <span className="text-blue-500">PawMart</span>?
                    </motion.h2>
                    <motion.p 
                        className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
                        variants={itemVariants}
                    >
                        Choosing adoption means giving a homeless pet a second chance at life. 
                        Here's why adoption is the most compassionate choice.
                    </motion.p>
                </motion.div>

                {/* Reasons Grid */}
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={containerVariants}
                >
                    {reasons.map((reason, index) => (
                        <motion.div 
                            key={index}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
                            variants={cardVariants}
                            whileHover="hover"
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="flex flex-col items-center text-center">
                                <motion.div 
                                    className="bg-gray-100 dark:bg-gray-700 p-4 rounded-2xl mb-4 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors duration-300"
                                    whileHover={{ 
                                        scale: 1.1,
                                        rotate: 5 
                                    }}
                                >
                                    {reason.icon}
                                </motion.div>
                                <motion.h3 
                                    className="text-xl font-bold text-gray-800 dark:text-white mb-3"
                                    whileHover={{ color: "#3B82F6" }}
                                >
                                    {reason.title}
                                </motion.h3>
                                <motion.p 
                                    className="text-gray-600 dark:text-gray-400 leading-relaxed"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 + index * 0.1 }}
                                >
                                    {reason.description}
                                </motion.p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Adoption Stats */}
                <motion.div 
                    id="stats-section"
                    className="mt-12 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={statsVariants}
                    whileHover={{ 
                        scale: 1.02,
                        transition: { duration: 0.3 }
                    }}
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <motion.div
                            variants={numberVariants}
                            whileHover={{ scale: 1.1 }}
                        >
                            <motion.div 
                                className="text-3xl font-bold text-blue-500"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ 
                                    delay: 0.8,
                                    type: "spring",
                                    stiffness: 100
                                }}
                            >
                                <AnimatedCounter value={500} duration={3} />
                            </motion.div>
                            <div className="text-gray-600 dark:text-gray-400">Pets Adopted</div>
                        </motion.div>
                        <motion.div
                            variants={numberVariants}
                            whileHover={{ scale: 1.1 }}
                        >
                            <motion.div 
                                className="text-3xl font-bold text-green-500"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ 
                                    delay: 0.9,
                                    type: "spring",
                                    stiffness: 100
                                }}
                            >
                                <AnimatedCounter value={98} duration={3} />
                            </motion.div>
                            <div className="text-gray-600 dark:text-gray-400">Success Rate</div>
                        </motion.div>
                        <motion.div
                            variants={numberVariants}
                            whileHover={{ scale: 1.1 }}
                        >
                            <motion.div 
                                className="text-3xl font-bold text-purple-500"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ 
                                    delay: 1.0,
                                    type: "spring",
                                    stiffness: 100
                                }}
                            >
                                <AnimatedCounter value={50} duration={2} />
                            </motion.div>
                            <div className="text-gray-600 dark:text-gray-400">Volunteers</div>
                        </motion.div>
                        <motion.div
                            variants={numberVariants}
                            whileHover={{ scale: 1.1 }}
                        >
                            <motion.div 
                                className="text-3xl font-bold text-red-500"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ 
                                    delay: 1.1,
                                    type: "spring",
                                    stiffness: 100
                                }}
                            >
                                24/7
                            </motion.div>
                            <div className="text-gray-600 dark:text-gray-400">Support</div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default WhyAdoptSection;