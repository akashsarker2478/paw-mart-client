import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import {
  FaMoon,
  FaSun,
  FaPaw,
  FaChevronDown,
  FaHome,
  FaPaw as FaPawIcon,
  FaPlus,
  FaList,
  FaShoppingBag,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import useAuth from "../Hooks/useAuth";
import ProfileIcon from "../../assets/profile icon.png";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        alert("Logout successful");
        navigate('/auth/login');
        setIsProfileOpen(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const links = (
    <>
      <NavLink
        to={"/"}
        className={({ isActive }) =>
          `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
            isActive
              ? "bg-blue-500 text-white shadow-lg"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`
        }
      >
        <FaHome className="text-sm" />
        <span>Home</span>
      </NavLink>

      <NavLink
        to={"/pets-supply"}
        className={({ isActive }) =>
          `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
            isActive
              ? "bg-blue-500 text-white shadow-lg"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`
        }
      >
        <FaPawIcon className="text-sm" />
        <span>Pets & Supplies</span>
      </NavLink>

      {user && (
        <>
          <NavLink
            to={"/add-listing"}
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                isActive
                  ? "bg-blue-500 text-white shadow-lg"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`
            }
          >
            <FaPlus className="text-sm" />
            <span>Add Listing</span>
          </NavLink>

          <NavLink
            to={"/my-listing"}
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                isActive
                  ? "bg-blue-500 text-white shadow-lg"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`
            }
          >
            <FaList className="text-sm" />
            <span>My Listings</span>
          </NavLink>

          <NavLink
            to={"/my-orders"}
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                isActive
                  ? "bg-blue-500 text-white shadow-lg"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`
            }
          >
            <FaShoppingBag className="text-sm" />
            <span>My Orders</span>
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700 px-4 lg:px-8">
      
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white dark:bg-gray-800 rounded-box z-50 mt-3 w-64 p-4 shadow-2xl border border-gray-200 dark:border-gray-700 space-y-2"
          >
            {links}
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 ml-2 lg:ml-0">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl">
            <FaPaw className="text-white text-2xl" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Paw Mart
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
              Pet Paradise
            </span>
          </div>
        </Link>
      </div>

      
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2 px-1">{links}</ul>
      </div>

      
      <div className="navbar-end">
        {user ? (
          <div className="relative">
           
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="relative group"
            >
              <img
                src={user?.photoURL || ProfileIcon}
                alt={user.displayName || "User"}
                className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover hover:border-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              />
              
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>

             
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {user.displayName || "User"}
              </div>
            </button>

            
            {isProfileOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
                
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <img
                      src={user.photoURL || ProfileIcon}
                      alt={user.displayName || "User"}
                      className="w-12 h-12 rounded-full border-2 border-blue-500 object-cover"
                    />
                    <div>
                      <p className="font-bold text-gray-800 dark:text-white">
                        {user.displayName || "User"}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>

               
                <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2">
                      {theme === "light" ? (
                        <FaSun className="text-yellow-500" />
                      ) : (
                        <FaMoon className="text-blue-500" />
                      )}
                      Theme
                    </span>
                    <button
                      onClick={handleTheme}
                      className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 ${
                        theme === "dark" ? "bg-blue-500" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ${
                          theme === "dark" ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Navigation Links in Dropdown */}
                <div className="p-2 border-b border-gray-200 dark:border-gray-700">
                  <div className="space-y-1">
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-300"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <FaUser className="text-blue-500" />
                      <span>My Profile</span>
                    </Link>
                  </div>
                </div>

                {/* Logout Button */}
                <div className="p-2">
                  <button
                    onClick={handleLogOut}
                    className="w-full flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-300 font-semibold"
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link
            to={"/auth/login"}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
