import React from "react";
import { Link } from "react-router";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaEnvelope,
  FaPaw,
  FaHeart,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#0f0f11] text-gray-300 pt-14 pb-8">
      <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo + About */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl shadow-lg">
              <FaPaw className="text-white text-2xl" />
            </div>
            <h2 className="text-3xl font-extrabold text-white">PawMart</h2>
          </div>
          <p className="text-gray-400 leading-relaxed mb-6">
            Your trusted companion for pet adoption and premium pet care essentials. 
            We help you find your perfect furry friend with love and care.
          </p>

          {/* Contact Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-blue-400" />
              <span>info@pawmart.com</span>
            </div>
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-blue-400" />
              <span>+880 1234 567 890</span>
            </div>
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-blue-400" />
              <span>Dhaka, Bangladesh</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-6">Quick Links</h3>
          <ul className="space-y-4">
            <li>
              <Link
                to="/"
                className="hover:text-white hover:translate-x-2 transition-all duration-300 block"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/pets-supply"
                className="hover:text-white hover:translate-x-2 transition-all duration-300 block"
              >
                Pets & Supplies
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-white hover:translate-x-2 transition-all duration-300 block"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-white hover:translate-x-2 transition-all duration-300 block"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className="hover:text-white hover:translate-x-2 transition-all duration-300 block"
              >
                Blogs & Tips
              </Link>
            </li>
          </ul>
        </div>

        {/* Social + Newsletter */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-6">Stay Connected</h3>
          <p className="text-gray-400 mb-6">
            Follow us on social media and stay updated with the latest pets and offers!
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mb-8">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              data-tooltip-id="fb-tip"
              data-tooltip-content="Follow us on Facebook"
              className="p-3 bg-white/10 rounded-xl hover:bg-blue-600 transition-all hover:scale-110 shadow-md"
            >
              <FaFacebookF className="text-white text-lg" />
            </a>

          <a
  href="https://x.com"
  target="_blank"
  rel="noopener noreferrer"
  data-tooltip-id="x-tip"
  data-tooltip-content="Follow us on X"
  className="p-3 bg-white/10 rounded-xl hover:bg-black transition-all hover:scale-110 shadow-md"
>
  <FaXTwitter className="text-white text-lg" />
</a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              data-tooltip-id="linkedin-tip"
              data-tooltip-content="Connect on LinkedIn"
              className="p-3 bg-white/10 rounded-xl hover:bg-blue-700 transition-all hover:scale-110 shadow-md"
            >
              <FaLinkedinIn className="text-white text-lg" />
            </a>

            <a
              href="mailto:info@pawmart.com"
              data-tooltip-id="mail-tip"
              data-tooltip-content="Email Us"
              className="p-3 bg-white/10 rounded-xl hover:bg-red-600 transition-all hover:scale-110 shadow-md"
            >
              <FaEnvelope className="text-white text-lg" />
            </a>
          </div>
        </div>
      </div>

      {/* Tooltips */}
      <Tooltip id="fb-tip" place="top" />
      <Tooltip id="twitter-tip" place="top" />
      <Tooltip id="linkedin-tip" place="top" />
      <Tooltip id="mail-tip" place="top" />

      {/* Copyright */}
      <div className="border-t border-white/10 mt-12 pt-6 text-center">
        <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
          Made with <FaHeart className="text-red-500 animate-pulse" /> by PawMart Team 
          © {new Date().getFullYear()} — All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;