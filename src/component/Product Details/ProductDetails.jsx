import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxios from "../Hooks/useAxios";
import Loading from "../Loading/Loading";
import { FaPaw, FaMapMarkerAlt, FaTag, FaEnvelope, FaDollarSign, FaCalendar, FaPhone, FaHome } from "react-icons/fa";
import useAuth from "../Hooks/useAuth";

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [orderData, setOrderData] = useState({
    buyerName: user?.displayName || "",
    email: user?.email || "",
    productId: id,
    productName: "",
    quantity: 1,
    price: 0,
    address: "",
    date: "",
    phone: "",
    notes: ""
  });

  useEffect(() => {
    if (user) {
      setOrderData(prev => ({
        ...prev,
        buyerName: user.displayName || "",
        email: user.email || ""
      }));
    }
  }, [user]);

  useEffect(() => {
    axiosInstance
      .get(`/product/${id}`)
      .then((res) => {
        setProduct(res.data);
        setOrderData(prev => ({
          ...prev,
          productName: res.data.name,
          price: res.data.price,
          quantity: res.data.category === "Pets" ? 1 : prev.quantity
        }));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id, axiosInstance]);

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    // Handle order submission here
    console.log("Order Data:", orderData);
    // Close modal after submission
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    setOrderData({
      ...orderData,
      [e.target.name]: e.target.value
    });
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            
            {/* Image Section */}
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-96 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              {/* Quick Info Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                    <FaTag className="text-sm" />
                    <span className="font-semibold">Category</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">{product.category}</p>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <FaMapMarkerAlt className="text-sm" />
                    <span className="font-semibold">Location</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">{product.location}</p>
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {product.name}
                </h1>
                <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4"></div>
              </div>

              {/* Price Section */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Price</p>
                    <h3 className="text-3xl font-bold">{product.price} tk</h3>
                    {product.category === "Pets" && (
                      <p className="text-green-200 text-sm mt-1">Adoption Fee</p>
                    )}
                  </div>
                  <FaDollarSign className="text-4xl opacity-80" />
                </div>
              </div>

              {/* Details List */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <FaTag className="text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Category</p>
                    <p className="font-semibold text-gray-800 dark:text-white">{product.category}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <FaEnvelope className="text-green-500" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Owner's Email</p>
                    <p className="font-semibold text-gray-800 dark:text-white">{product.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <FaMapMarkerAlt className="text-red-500" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                    <p className="font-semibold text-gray-800 dark:text-white">{product.location}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-2xl">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                  <FaPaw className="text-purple-500" />
                  Description
                </h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Order Button */}
              <button 
                onClick={() => setShowModal(true)}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <FaPaw />
                {product.category === "Pets" ? "Adopt Now" : "Order Now"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Daisy UI Modal */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-2xl mb-6 flex items-center gap-2">
              <FaPaw className="text-blue-500" />
              {product.category === "Pets" ? "Adoption Form" : "Order Form"}
            </h3>
            
            <form onSubmit={handleOrderSubmit} className="space-y-4">
              {/* Auto-filled Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Buyer Name</span>
                  </label>
                  <input 
                    type="text" 
                    value={orderData.buyerName}
                    readOnly 
                    className="input input-bordered bg-gray-100"
                    placeholder={user ? "Auto-filled from your profile" : "Please login first"}
                  />
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Email</span>
                  </label>
                  <input 
                    type="email" 
                    value={orderData.email}
                    readOnly 
                    className="input input-bordered bg-gray-100"
                    placeholder={user ? "Auto-filled from your profile" : "Please login first"}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Product ID</span>
                  </label>
                  <input 
                    type="text" 
                    value={orderData.productId}
                    readOnly 
                    className="input input-bordered bg-gray-100"
                  />
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Product Name</span>
                  </label>
                  <input 
                    type="text" 
                    value={orderData.productName}
                    readOnly 
                    className="input input-bordered bg-gray-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold flex items-center gap-2">
                      <FaTag />
                      Quantity
                    </span>
                  </label>
                  <input 
                    type="number" 
                    name="quantity"
                    value={orderData.quantity}
                    onChange={handleInputChange}
                    min="1"
                    disabled={product.category === "Pets"}
                    className="input input-bordered"
                  />
                  {product.category === "Pets" && (
                    <label className="label">
                      <span className="label-text-alt text-gray-500">Quantity is fixed to 1 for pet adoptions</span>
                    </label>
                  )}
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold flex items-center gap-2">
                      Price
                    </span>
                  </label>
                  <input 
                    type="text" 
                    value={`${orderData.price} tk`}
                    readOnly 
                    className="input input-bordered bg-gray-100"
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2">
                    <FaHome />
                    Address
                  </span>
                </label>
                <textarea 
                  name="address"
                  value={orderData.address}
                  onChange={handleInputChange}
                  className="textarea textarea-bordered h-20"
                  placeholder="Enter your full address"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold flex items-center gap-2">
                      <FaCalendar />
                      Pickup Date
                    </span>
                  </label>
                  <input 
                    type="date" 
                    name="date"
                    value={orderData.date}
                    onChange={handleInputChange}
                    className="input input-bordered"
                    required
                  />
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold flex items-center gap-2">
                      <FaPhone />
                      Phone Number
                    </span>
                  </label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={orderData.phone}
                    onChange={handleInputChange}
                    className="input input-bordered"
                    placeholder="Your phone number"
                    required
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Additional Notes</span>
                </label>
                <textarea 
                  name="notes"
                  value={orderData.notes}
                  onChange={handleInputChange}
                  className="textarea textarea-bordered h-20"
                  placeholder="Any special requirements or notes..."
                />
              </div>

              <div className="modal-action">
                <button 
                  type="button" 
                  className="btn btn-outline"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary bg-gradient-to-r from-blue-500 to-purple-600 border-none text-white"
                >
                  {product.category === "Pets" ? "Confirm Adoption" : "Place Order"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;