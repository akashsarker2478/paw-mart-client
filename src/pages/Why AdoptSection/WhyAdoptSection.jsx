import React from 'react';
import { FaHeart, FaHome, FaShieldAlt, FaUsers, FaHandHoldingHeart } from 'react-icons/fa';

const WhyAdoptSection = () => {
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
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        <FaHandHoldingHeart />
                        Why Choose Adoption?
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
                        Why Adopt from <span className="text-blue-500">PawMart</span>?
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Choosing adoption means giving a homeless pet a second chance at life. 
                        Here's why adoption is the most compassionate choice.
                    </p>
                </div>

                {/* Reasons Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {reasons.map((reason, index) => (
                        <div 
                            key={index}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 group hover:transform hover:scale-105"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-2xl mb-4 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors duration-300">
                                    {reason.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                                    {reason.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {reason.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Adoption Stats */}
                <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div>
                            <div className="text-3xl font-bold text-blue-500">500+</div>
                            <div className="text-gray-600 dark:text-gray-400">Pets Adopted</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-green-500">98%</div>
                            <div className="text-gray-600 dark:text-gray-400">Success Rate</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-purple-500">50+</div>
                            <div className="text-gray-600 dark:text-gray-400">Volunteers</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-red-500">24/7</div>
                            <div className="text-gray-600 dark:text-gray-400">Support</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyAdoptSection;