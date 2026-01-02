import React, { useEffect, useState } from "react";
import { FaPaw, FaList, FaShoppingBag, FaClock } from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import useAuth from "../../component/Hooks/useAuth";
import useAxios from "../../component/Hooks/useAxios"; 
import Loading from "../Loading/Loading";

const DashboardHome = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();

  const [stats, setStats] = useState({
    totalListings: 0,
    totalOrders: 0,
    pendingOrders: 0,
    adoptedPets: 0,
  });
  const [categoryData, setCategoryData] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user?.email) return;

      try {
        setLoading(true);
        const response = await axiosInstance.get(
          `/api/dashboard-stats?email=${user.email}`
        );

        const data = response.data;

        setStats({
          totalListings: data.totalListings || 0,
          totalOrders: data.totalOrders || 0,
          pendingOrders: data.pendingOrders || 0,
          adoptedPets: data.adoptedPets || 0,
        });

        setCategoryData(data.categoryBreakdown || []);

        setRecentOrders(data.recentOrders || []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user, axiosInstance]);

  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"];

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="space-y-10">
      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-4xl font-bold">
          Welcome back, {user?.displayName || "Pet Lover"}! 🐾
        </h1>
        <p className="text-lg mt-2 opacity-90">
          Here's what's happening with your listings and adoptions today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Total Listings</p>
              <h3 className="text-3xl font-bold text-blue-600 mt-2">
                {stats.totalListings}
              </h3>
            </div>
            <FaList className="text-4xl text-blue-500 opacity-30" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Total Orders/Adoptions</p>
              <h3 className="text-3xl font-bold text-green-600 mt-2">
                {stats.totalOrders}
              </h3>
            </div>
            <FaShoppingBag className="text-4xl text-green-500 opacity-30" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Pending Requests</p>
              <h3 className="text-3xl font-bold text-amber-600 mt-2">
                {stats.pendingOrders}
              </h3>
            </div>
            <FaClock className="text-4xl text-amber-500 opacity-30" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Pets Adopted</p>
              <h3 className="text-3xl font-bold text-purple-600 mt-2">
                {stats.adoptedPets}
              </h3>
            </div>
            <FaPaw className="text-4xl text-purple-500 opacity-30" />
          </div>
        </div>
      </div>

      {/* Charts + Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Your Listings by Category
          </h3>
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-gray-500 py-10">No listings yet</p>
          )}
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Recent Adoption/Order Requests
          </h3>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Pet/Product</th>
                  <th>Buyer</th>
                  <th>Price</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.length > 0 ? (
                  recentOrders.map((order) => (
                    <tr key={order._id}>
                      <td className="font-medium">{order.productName}</td>
                      <td>{order.buyerName}</td>
                      <td>
                        {order.price === 0 ? (
                          <span className="badge badge-success">Free Adoption</span>
                        ) : (
                          `৳${order.price}`
                        )}
                      </td>
                      <td>{new Date(order.date).toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-8 text-gray-500">
                      No requests yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;