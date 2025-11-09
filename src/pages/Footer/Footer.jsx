import React from 'react';
import { Link } from 'react-router';
import { FaFacebook, FaLinkedin, FaEnvelope, FaPaw, FaHeart } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                  
                    <div className="text-center md:text-left">
                        <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
                            <div className="bg-blue-500 p-2 rounded-lg">
                                <FaPaw className="text-white text-xl" />
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                PawMart
                            </span>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Connecting pet lovers with their perfect companions and essential care products.
                        </p>
                    </div>

                   
                    <div className="flex justify-center gap-8">
                        <Link to="/" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-110">
                            Home
                        </Link>
                        <Link to="/contact" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-110">
                            Contact
                        </Link>
                        <Link to="/terms" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-110">
                            Terms
                        </Link>
                    </div>

                    
                    <div className="flex justify-center md:justify-end gap-4">
                        <a 
                            href="https://facebook.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-white/10 hover:bg-blue-600 p-3 rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                        >
                            <FaFacebook className="text-white text-lg" />
                        </a>
                        <a 
                            href="https://x.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-white/10 hover:bg-black p-3 rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                        >
                           
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                        </a>
                        <a 
                            href="https://linkedin.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-white/10 hover:bg-blue-800 p-3 rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                        >
                            <FaLinkedin className="text-white text-lg" />
                        </a>
                        <a 
                            href="mailto:info@pawmart.com" 
                            className="bg-white/10 hover:bg-red-600 p-3 rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                        >
                            <FaEnvelope className="text-white text-lg" />
                        </a>
                    </div>
                </div>

                
                <div className="border-t border-white/20 mt-8 pt-6 text-center">
                    <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
                        Made with <FaHeart className="text-red-500" /> © {new Date().getFullYear()} PawMart. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;