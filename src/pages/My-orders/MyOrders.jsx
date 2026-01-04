import React, { useEffect, useState } from 'react';
import useAxios from '../../component/Hooks/useAxios';
import useAuth from '../../component/Hooks/useAuth';
import Loading from '../../component/Loading/Loading';
import { FaDownload, FaShoppingBag, FaUser, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaDollarSign, FaEye } from 'react-icons/fa';
import jsPDF from 'jspdf';
import { Link } from 'react-router'; 
import Swal from 'sweetalert2';

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
        if (orders.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'No Orders Found',
                text: 'You need to have at least one order to download the report.',
            });
            return;
        }

        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("My Orders Report - PawMart", 10, 15);

        doc.setFontSize(12);
        let y = 30;

        orders.forEach((order, index) => {
            doc.text(`Order #${index + 1}`, 10, y);
            doc.text(`Product: ${order.productName}`, 10, y + 8);
            doc.text(`Buyer: ${order.buyerName}`, 10, y + 16);
            doc.text(`Price: ${order.price === 0 ? "Free Adoption" : order.price + " tk"}`, 10, y + 24);
            doc.text(`Address: ${order.address}`, 10, y + 32);
            doc.text(`Phone: ${order.phone}`, 10, y + 40);
            doc.text(`Date: ${order.date}`, 10, y + 48);

            y += 60;

            if (y > 270) {
                doc.addPage();
                y = 20;
            }
        });

        doc.save("pawmart-my-orders.pdf");
    };

    if (loading) return <Loading />;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <title>My Orders</title>
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

                        <button 
                            onClick={handleDownloadClick}
                            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
                        >
                            <FaDownload />
                            Download Report
                        </button>
                    </div>
                </div>

                {orders.length === 0 ? (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center border border-gray-200 dark:border-gray-700">
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
                            No Orders Yet
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                            You haven't placed any orders yet. Start exploring our pets and supplies!
                        </p>
                        <Link to={"/pets-supply"} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                            Browse Products
                        </Link>
                    </div>
                ) : (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                                <FaShoppingBag className="text-blue-500" />
                                Order History
                            </h2>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50 dark:bg-gray-700 text-left">
                                        <th className="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Product</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Buyer</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Price</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Address</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Date</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Phone</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Actions</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {orders.map((order) => (
                                        <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                                                {order.productName}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                                                {order.buyerName}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-semibold text-blue-600 dark:text-blue-400">
                                                {order.price === 0 ? "Free Adoption" : `${order.price} tk`}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 max-w-xs truncate">
                                                {order.address}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                                {order.date}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                                {order.phone}
                                            </td>
                                            <td className="px-6 py-4">
                                                <Link
                                                    to={`/productDetails/${order.productId || order._id}`} // <-- যদি productId না থাকে _id দিয়ে
                                                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all duration-300 transform hover:scale-105 shadow-md"
                                                >
                                                    <FaEye />
                                                    View Details
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

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