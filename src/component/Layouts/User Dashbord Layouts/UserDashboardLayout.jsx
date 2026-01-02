import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../../Navbar/Navbar';
import { FaHome, FaPlus, FaList, FaShoppingBag, FaUser } from "react-icons/fa";

const UserDashboardLayout = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 mt-20">
     
      <Navbar />

      <div className="flex">
    
        <aside className="hidden lg:block w-64 bg-white dark:bg-gray-800 shadow-lg min-h-screen">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Dashboard</h2>
          </div>
          <nav className="mt-5">
            <a href="/dashboard" className="flex items-center gap-3 px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-700">
              <FaHome /> Dashboard Home
            </a>
            <a href="/dashboard/add-listing" className="flex items-center gap-3 px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-700">
              <FaPlus /> Add Listing
            </a>
            <a href="/dashboard/my-listings" className="flex items-center gap-3 px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-700">
              <FaList /> My Listings
            </a>
            <a href="/dashboard/my-orders" className="flex items-center gap-3 px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-700">
              <FaShoppingBag /> My Orders
            </a>
            <a href="/dashboard/profile" className="flex items-center gap-3 px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-700">
              <FaUser /> My Profile
            </a>
          </nav>
        </aside>

        
        <main className="flex-1 p-6 lg:p-10">
          <Outlet /> 
        </main>
      </div>

      {/* মোবাইলে বটম নাভবার (অপশনাল) */}
    </div>
    );
};

export default UserDashboardLayout;