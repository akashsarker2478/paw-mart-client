import React, { useEffect, useState } from 'react';
import useAxios from '../../component/Hooks/useAxios';
import useAuth from '../../component/Hooks/useAuth';
import Loading from '../../component/Loading/Loading';
import { FaDownload, FaShoppingBag, FaUser, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaDollarSign } from 'react-icons/fa';
import jsPDF from 'jspdf';

const MyOrders = () => {
    const { user } = useAuth();
    const axiosInstance = useAxios();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return; 

        axiosInstance
            .get(`/orders?email=${user.email}`)
            .then(res => {
                setOrders(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [axiosInstance, user]);

    const handleDownloadClick = () => {
           const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("My Orders Report", 10, 10);

    doc.setFontSize(12);
    let y = 20;

    orders.forEach((order, index) => {
        doc.text(`Order: ${index + 1}`, 10, y);
        doc.text(`Product: ${order.productName}`, 10, y + 6);
        doc.text(`Buyer: ${order.buyerName}`, 10, y + 12);
        doc.text(`Price: ${order.price}`, 10, y + 18);
        doc.text(`Address: ${order.address}`, 10, y + 24);
        doc.text(`Phone: ${order.phone}`, 10, y + 30);
        doc.text(`Date: ${order.date}`, 10, y + 36);

        y += 50;

        
        if (y > 270) {
            doc.addPage();
            y = 20;
        }
    });

    doc.save("my-orders.pdf"); 
    };

    if (loading) return <Loading />;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="container mx-auto px-4">
                 
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                        
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
                                    My Orders
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400 mt-1">
                                    Welcome back, {user?.displayName || "User"}! 
                                    You have <span className="font-semibold text-blue-500">{orders.length}</span> orders
                                </p>
                            </div>
                        </div>

                        {/* Download Button */}
                        <button 
                            onClick={handleDownloadClick}
                            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
                        >
                            <FaDownload />
                            Download Report
                        </button>
                    </div>
                </div>

                {/* Orders Section */}
                {orders.length === 0 ? (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center border border-gray-200 dark:border-gray-700">
                        <div className="text-6xl mb-4">📦</div>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
                            No Orders Yet
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                            You haven't placed any orders yet. Start exploring our pets and supplies to make your first order!
                        </p>
                        <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                            Browse Products
                        </button>
                    </div>
                ) : (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                        {/* Table Header */}
                        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                                <FaShoppingBag className="text-blue-500" />
                                Order History
                            </h2>
                        </div>

                        {/* Orders Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50 dark:bg-gray-700 text-left">
                                        <th className="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                            <div className="flex items-center gap-2">
                                                <FaShoppingBag className="text-blue-500" />
                                                Product
                                            </div>
                                        </th>
                                        <th className="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                            <div className="flex items-center gap-2">
                                                <FaUser className="text-green-500" />
                                                Buyer
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
                                                Address
                                            </div>
                                        </th>
                                        <th className="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                            <div className="flex items-center gap-2">
                                                <FaCalendarAlt className="text-purple-500" />
                                                Date
                                            </div>
                                        </th>
                                        <th className="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                            <div className="flex items-center gap-2">
                                                <FaPhone className="text-green-500" />
                                                Phone
                                            </div>
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {orders.map((order, index) => (
                                        <tr 
                                            key={order._id} 
                                            className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {order.productName}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-700 dark:text-gray-300">
                                                    {order.buyerName}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                                                    {order.price}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-600 dark:text-gray-400 max-w-xs truncate">
                                                    {order.address}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                                    {order.date}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                                    {order.phone}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Table Footer */}
                        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Showing {orders.length} order{orders.length !== 1 ? 's' : ''}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrders;