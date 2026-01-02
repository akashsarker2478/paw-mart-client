import React from 'react';
import { Outlet, NavLink } from 'react-router';
import Navbar from '../../Navbar/Navbar';
import { FaHome, FaPlus, FaList, FaShoppingBag, FaUser } from "react-icons/fa";

const UserDashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="flex">
        <aside className="hidden lg:block w-64 bg-white dark:bg-gray-800 shadow-lg fixed h-full overflow-y-auto">
          <div className="p-6 border-b dark:border-gray-700">
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Dashboard</h2>
          </div>
          <nav className="mt-4">
            <NavLink
              to="/dashboard"
            className={({ isActive }) =>
  `flex items-center gap-3 px-6 py-4 transition-all duration-300 font-medium ${
    isActive
      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 shadow-md border-r-4 border-blue-500"
      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
  }`
}
            >
              <FaHome className="text-lg" />
              <span className="font-medium">Dashboard Home</span>
            </NavLink>

            <NavLink
              to="/dashboard/add-listing"
              className={({ isActive }) =>
  `flex items-center gap-3 px-6 py-4 mt-3 transition-all duration-300 font-medium ${
    isActive
      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 shadow-md border-r-4 border-blue-500"
      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
  }`
}
            >
              <FaPlus className="text-lg" />
              <span className="font-medium">Add Listing</span>
            </NavLink>

            <NavLink
              to="/dashboard/my-listings"
              className={({ isActive }) =>
  `flex items-center gap-3 px-6 py-4 transition-all duration-300 font-medium ${
    isActive
      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 shadow-md border-r-4 border-blue-500"
      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
  }`
}
            >
              <FaList className="text-lg" />
              <span className="font-medium">My Listings</span>
            </NavLink>

            <NavLink
              to="/dashboard/my-orders"
             className={({ isActive }) =>
  `flex items-center gap-3 px-6 py-4 transition-all duration-300 font-medium ${
    isActive
      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 shadow-md border-r-4 border-blue-500"
      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
  }`
}
            >
              <FaShoppingBag className="text-lg" />
              <span className="font-medium">My Orders</span>
            </NavLink>

            <NavLink
              to="/dashboard/profile"
           className={({ isActive }) =>
  `flex items-center gap-3 px-6 py-4 transition-all duration-300 font-medium ${
    isActive
      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 shadow-md border-r-4 border-blue-500"
      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
  }`
}
            >
              <FaUser className="text-lg" />
              <span className="font-medium">My Profile</span>
            </NavLink>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 p-6 lg:p-10 min-h-screen">
          <Outlet />
        </main>
      </div>

    
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg border-t dark:border-gray-700">
        <div className="grid grid-cols-5 py-2">
          <NavLink to="/dashboard" className={({ isActive }) => `flex flex-col items-center py-2 ${isActive ? "text-blue-600" : "text-gray-600"}`}>
            <FaHome className="text-xl" />
            <span className="text-xs mt-1">Home</span>
          </NavLink>
          <NavLink to="/dashboard/add-listing" className={({ isActive }) => `flex flex-col items-center py-2 ${isActive ? "text-blue-600" : "text-gray-600"}`}>
            <FaPlus className="text-xl" />
            <span className="text-xs mt-1">Add</span>
          </NavLink>
          <NavLink to="/dashboard/my-listings" className={({ isActive }) => `flex flex-col items-center py-2 ${isActive ? "text-blue-600" : "text-gray-600"}`}>
            <FaList className="text-xl" />
            <span className="text-xs mt-1">Listings</span>
          </NavLink>
          <NavLink to="/dashboard/my-orders" className={({ isActive }) => `flex flex-col items-center py-2 ${isActive ? "text-blue-600" : "text-gray-600"}`}>
            <FaShoppingBag className="text-xl" />
            <span className="text-xs mt-1">Orders</span>
          </NavLink>
          <NavLink to="/dashboard/profile" className={({ isActive }) => `flex flex-col items-center py-2 ${isActive ? "text-blue-600" : "text-gray-600"}`}>
            <FaUser className="text-xl" />
            <span className="text-xs mt-1">Profile</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardLayout;