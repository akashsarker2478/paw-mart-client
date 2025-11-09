import React from "react";
import { Link } from "react-router";
import TwitterIcon from '../../assets/twitter (2).png'
import {
  FaFacebookF,
  FaLinkedinIn,
  FaEnvelope,
  FaPaw,
  FaHeart,
  FaPhoneAlt,
  FaMapMarkerAlt
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0f0f11] text-gray-300 pt-14 pb-8">
      <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-600 p-2 rounded-lg">
              <FaPaw className="text-white text-xl" />
            </div>
            <h2 className="text-2xl font-extrabold text-white">PawMart</h2>
          </div>

          <p className="text-gray-400 leading-relaxed">
            Your trusted companion for pet adoption and premium pet care
            essentials. We help you find your perfect furry friend with love.
          </p>
        </div>

       
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <Link
                to="/"
                className="hover:pl-2 hover:text-white transition-all duration-300 block"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:pl-2 hover:text-white transition-all duration-300 block"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/pets-supply"
                className="hover:pl-2 hover:text-white transition-all duration-300 block"
              >
                Pets & Supplies
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:pl-2 hover:text-white transition-all duration-300 block"
              >
                About Us
              </Link>
            </li>
          </ul>
        </div>

        
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Support</h3>
          <ul className="space-y-3">
            <li>
              <Link
                to="/privacy"
                className="hover:pl-2 hover:text-white transition-all duration-300 block"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/terms"
                className="hover:pl-2 hover:text-white transition-all duration-300 block"
              >
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link
                to="/faq"
                className="hover:pl-2 hover:text-white transition-all duration-300 block"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                to="/help"
                className="hover:pl-2 hover:text-white transition-all duration-300 block"
              >
                Help Center
              </Link>
            </li>
          </ul>
        </div>

        
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Contact Us</h3>
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-blue-500" />
              info@pawmart.com
            </li>

            <li className="flex items-center gap-3">
              <FaPhoneAlt className="text-blue-500" />
              +880 1234 567 890
            </li>

            <li className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-blue-500" />
              Dhaka, Bangladesh
            </li>
          </ul>

        
          <div className="flex gap-4 mt-6">
            <a
              href="https://facebook.com"
              target="_blank"
              className="p-3 bg-white/10 rounded-xl hover:bg-blue-600 transition-all hover:scale-110"
            >
              <FaFacebookF className="text-white text-lg" />
            </a>
            
           
            <a
              href="https://twitter.com"
              target="_blank"
              className="p-3 bg-white/10 rounded-xl hover:bg-black transition-all hover:scale-110"
            >
              <img 
                src={TwitterIcon} 
                alt="Twitter" 
                className="w-5 h-5 filter brightness-0 invert"
              />
            </a>
            
            <a
              href="https://linkedin.com"
              target="_blank"
              className="p-3 bg-white/10 rounded-xl hover:bg-blue-700 transition-all hover:scale-110"
            >
              <FaLinkedinIn className="text-white text-lg" />
            </a>
            <a
              href="mailto:info@pawmart.com"
              className="p-3 bg-white/10 rounded-xl hover:bg-red-600 transition-all hover:scale-110"
            >
              <FaEnvelope className="text-white text-lg" />
            </a>
          </div>
        </div>
      </div>

     
      <div className="border-t border-white/10 mt-10 pt-5 text-center">
        <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
          Made with <FaHeart className="text-red-500" /> © {new Date().getFullYear()} PawMart — All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;