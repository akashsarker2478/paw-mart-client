import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import {
  FaMoon,
  FaSun,
  FaPaw,
  FaHome,
  FaPaw as FaPawIcon,
  FaSignOutAlt,
  FaUser,
  FaInfoCircle,
  FaHeart,
  FaPhone,
  FaBlog,
  FaTachometerAlt,
  FaPlus,
  FaList,
  FaShoppingBag,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../Hooks/useAuth";
import ProfileIcon from "../../assets/profile icon.png";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          title: "Logged Out!",
          text: "You have been logged out successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/auth/login");
          setIsProfileOpen(false);
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  const handleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // পাবলিক লিংকগুলো (লগইন থাকুক বা না থাকুক)
  const publicLinks = (
    <>
      <NavLink to="/" className={({ isActive }) => `flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${isActive ? "bg-blue-500 text-white shadow-md" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
        <FaHome className="text-xs" /> Home
      </NavLink>

      <NavLink to="/pets-supply" className={({ isActive }) => `flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${isActive ? "bg-blue-500 text-white shadow-md" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
        <FaPawIcon className="text-xs" /> Pets & Supplies
      </NavLink>

      <NavLink to="/about" className={({ isActive }) => `flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${isActive ? "bg-blue-500 text-white shadow-md" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
        <FaInfoCircle className="text-xs" /> About
      </NavLink>

      <NavLink to="/adoption-guide" className={({ isActive }) => `flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${isActive ? "bg-blue-500 text-white shadow-md" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
        <FaHeart className="text-xs" /> Adoption Guide
      </NavLink>

      <NavLink to="/contact" className={({ isActive }) => `flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${isActive ? "bg-blue-500 text-white shadow-md" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
        <FaPhone className="text-xs" /> Contact
      </NavLink>

      <NavLink to="/blog" className={({ isActive }) => `flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${isActive ? "bg-blue-500 text-white shadow-md" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
        <FaBlog className="text-xs" /> Blog/Tips
      </NavLink>
    </>
  );

  return (
    <motion.div
      className="navbar fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700 px-4 lg:px-8"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Logo */}
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
          <ul className="menu menu-sm dropdown-content bg-white dark:bg-gray-800 rounded-box z-50 mt-3 w-72 p-4 shadow-2xl border space-y-1">
            {publicLinks}
          </ul>
        </div>

        <Link to="/" className="flex items-center gap-3">
          <motion.div whileHover={{ scale: 1.2, rotate: 10 }} transition={{ type: "spring", stiffness: 300 }} className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl">
            <FaPaw className="text-white text-2xl" />
          </motion.div>
          <div className="flex flex-col">
            <span className="md:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Paw Mart</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 -mt-1">Pet Paradise</span>
          </div>
        </Link>
      </div>

      {/* Center Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-1 px-1">
          {publicLinks}
        </ul>
      </div>

      {/* Right: Profile or Login */}
      <div className="navbar-end">
        {user ? (
          <div className="relative">
            <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="relative group">
              <motion.img whileHover={{ scale: 1.1 }} src={user?.photoURL || ProfileIcon} alt={user.displayName || "User"} className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover shadow-lg" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </button>

            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -10 }}
                  className="absolute right-0 mt-3 w-72 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border z-50 overflow-hidden"
                >
                  {/* User Info */}
                  <div className="p-5 border-b">
                    <div className="flex items-center gap-4">
                      <img src={user.photoURL || ProfileIcon} alt="" className="w-16 h-16 rounded-full border-4 border-blue-500" />
                      <div>
                        <p className="font-bold text-lg">{user.displayName || "User"}</p>
                        <p className="text-sm text-gray-500 truncate max-w-[200px]">{user.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Dashboard Links */}
                  <div className="py-3">
                    <NavLink to="/dashboard" className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                      <FaTachometerAlt /> Dashboard Home
                    </NavLink>
                    <NavLink to="/dashboard/add-listing" className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                      <FaPlus /> Add Listing
                    </NavLink>
                    <NavLink to="/dashboard/my-listings" className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                      <FaList /> My Listings
                    </NavLink>
                    <NavLink to="/dashboard/my-orders" className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                      <FaShoppingBag /> My Orders
                    </NavLink>
                    <NavLink to="/dashboard/profile" className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                      <FaUser /> My Profile
                    </NavLink>
                  </div>

                  {/* Theme Toggle */}
                  <div className="px-5 py-3 border-t border-b">
                    <div className="flex items-center justify-between">
                      <span className="font-medium flex items-center gap-2">
                        {theme === "light" ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-blue-500" />}
                        Theme
                      </span>
                      <button onClick={handleTheme} className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${theme === "dark" ? "bg-blue-500" : "bg-gray-300"}`}>
                        <span className={`inline-block w-4 h-4 bg-white rounded-full transition-transform ${theme === "dark" ? "translate-x-6" : "translate-x-1"}`} />
                      </button>
                    </div>
                  </div>

                  {/* Logout */}
                  <div className="p-3">
                    <button onClick={handleLogOut} className="w-full flex items-center gap-3 px-5 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg font-semibold transition">
                      <FaSignOutAlt /> Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link to="/auth/login" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2.5 rounded-full font-semibold shadow-lg">
              Login
            </Link>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Navbar;