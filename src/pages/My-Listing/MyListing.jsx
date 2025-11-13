import React, { useEffect, useState } from 'react';
import useAuth from '../../component/Hooks/useAuth';
import useAxios from '../../component/Hooks/useAxios';
import Loading from '../../component/Loading/Loading';
import Swal from 'sweetalert2';
import { FaTrash, FaEdit, FaPaw, FaTag, FaDollarSign, FaMapMarkerAlt, FaCalendarAlt, FaBox } from 'react-icons/fa';
import { Link } from 'react-router';

const MyListing = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    axiosInstance
      .get(`/product?email=${user.email}`)
      .then((data) => {
        setListings(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [axiosInstance, user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance.delete(`/product/${id}`)
          .then(data => {
            if (data.data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your listing has been deleted.",
                icon: "success",
              });
              const remaining = listings.filter(item => item._id !== id);
              setListings(remaining);
            }
          });
      }
    });
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <title>My listing</title>
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* User Info and Title */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <img 
                  src={user?.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"} 
                  alt={user?.displayName || "User"} 
                  className="w-16 h-16 rounded-full border-4 border-blue-500 object-cover shadow-lg"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
                  My Listings
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Welcome back, {user?.displayName || "User"}! 
                  You have <span className="font-semibold text-blue-500">{listings.length}</span> active listings
                </p>
              </div>
            </div>

            {/* Add New Listing Button */}
            <Link to={'/add-listing'} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2">
              <FaPaw />
              Add New Listing
            </Link>
          </div>
        </div>

        {/* Listings Section */}
        {listings.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
              No Listings Yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              You haven't created any listings yet. Start by adding your first pet or product to sell!
            </p>
            <Link to={'/add-listing'} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
              Create First Listing
            </Link>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            {/* Table Header */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <FaBox className="text-blue-500" />
                Active Listings
              </h2>
            </div>

            {/* Listings Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700 text-left">
                    <th className="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <FaPaw className="text-purple-500" />
                        Pet/Product Name
                      </div>
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <FaTag className="text-green-500" />
                        Category
                      </div>
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <FaDollarSign className="text-yellow-500" />
                        Price
                      </div>
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-red-500" />
                        Location
                      </div>
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-blue-500" />
                        Date
                      </div>
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {listings.map((item) => (
                    <tr 
                      key={item._id} 
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {item.name}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              ID: {item._id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-700 dark:text-gray-300">
                          {item.category}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                          {item.price} tk
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {item.location}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {item.date}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Link to={`/update/${item._id}`} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 text-sm">
                            <FaEdit className="text-xs" />
                            Update
                          </Link>
                          <button 
                            onClick={() => handleDelete(item._id)} 
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 text-sm"
                          >
                            <FaTrash className="text-xs" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Showing {listings.length} listing{listings.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListing;