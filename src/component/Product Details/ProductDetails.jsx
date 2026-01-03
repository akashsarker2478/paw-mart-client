import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxios from "../Hooks/useAxios";
import Loading from "../Loading/Loading";
import AllPatsAndProduct from "../Pats And Supply/AllPatsAndProduct"; 
import { FaPaw, FaMapMarkerAlt, FaTag, FaEnvelope, FaDollarSign, FaCalendarAlt, FaHeart, FaPaperPlane } from "react-icons/fa";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosInstance.get(`/product/${id}`).then((res) => {
      const currentProduct = res.data;
      setProduct(currentProduct);

      // Similar products from same category (excluding current)
      axiosInstance
        .get(`/product?limit=6&category=${currentProduct.category}`)
        .then((simRes) => {
          const filtered = simRes.data.products.filter((p) => p._id !== id);
          setSimilarProducts(filtered);
          setLoading(false);
        });
    }).catch(() => setLoading(false));
  }, [id, axiosInstance]);

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const orderData = {
      buyerName: form.name.value,
      email: form.email.value,
      productId: id,
      productName: product.name,
      price: product.price,
      address: form.address.value,
      phone: form.phone.value,
      date: form.date.value,
      additionalNotes: form.notes.value,
      category: product.category,
    };

    axiosInstance.post("/orders", orderData).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: product.category === "Pets" ? "Adoption Request Sent!" : "Order Placed Successfully!",
          text: "We'll contact you soon 🐾",
          timer: 2000,
        });
        setShowModal(false);
        form.reset();
      }
    });
  };

  if (loading) return <Loading />;
  if (!product) return <div className="text-center py-20 text-2xl">Product not found</div>;

  const isPet = product.category === "Pets";
  const isFree = product.price === 0 || product.price === "0";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Main Product Details */}
          <div className="grid lg:grid-cols-2 gap-10 mb-16">
            {/* Image */}
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 md:h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
                  {product.name}
                </h1>
                <div className="flex items-center gap-3 mb-6">
                  <span className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 px-5 py-2 rounded-full text-blue-700 dark:text-blue-300 font-semibold flex items-center gap-2">
                    <FaTag />
                    {product.category}
                  </span>
                  <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <FaMapMarkerAlt className="text-red-500" />
                    {product.location}
                  </span>
                </div>
              </div>

              {/* Price Card */}
              <div className={`p-8 rounded-3xl shadow-2xl text-center ${isFree ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white" : "bg-gradient-to-r from-blue-600 to-purple-600 text-white"}`}>
                <p className="text-xl opacity-90 mb-2">Adoption Fee</p>
                <h2 className="text-5xl font-bold mb-3">
                  {isFree ? (
                    <>
                      Free <FaHeart className="inline text-red-300 ml-2 animate-pulse" />
                    </>
                  ) : (
                    `৳${product.price}`
                  )}
                </h2>
                <p className="text-lg opacity-90">
                  {isPet ? "Ready for a loving home" : "Best quality guaranteed"}
                </p>
              </div>

              {/* Owner Info */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h3 className="font-bold text-xl mb-4 flex items-center gap-3">
                  <FaEnvelope className="text-blue-500" />
                  Contact Owner
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  Email: <span className="font-semibold">{product.email}</span>
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Owner will contact you after you place request
                </p>
              </div>

              {/* Description */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h3 className="font-bold text-xl mb-4 flex items-center gap-3">
                  <FaPaw className="text-purple-500" />
                  Description
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {product.description || "No description available."}
                </p>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => setShowModal(true)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-5 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-4 text-xl"
              >
                <FaPaperPlane />
                {isPet ? "Request to Adopt" : "Place Order Now"}
              </button>
            </div>
          </div>

          {/* Similar Products */}
          {similarProducts.length > 0 && (
            <div className="mt-20">
              <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12">
                More from <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">{product.category}</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {similarProducts.map((simProduct) => (
                  <AllPatsAndProduct key={simProduct._id} product={simProduct} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
            <h3 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-3">
              <FaPaw className="text-blue-500" />
              {isPet ? "Adoption Request Form" : "Order Form"}
            </h3>

            <form onSubmit={handleOrderSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  defaultValue={user?.displayName || ""}
                  readOnly
                  className="w-full px-5 py-4 rounded-xl bg-gray-100 dark:bg-gray-700"
                  placeholder="Your Name"
                />
                <input
                  type="email"
                  name="email"
                  defaultValue={user?.email || ""}
                  readOnly
                  className="w-full px-5 py-4 rounded-xl bg-gray-100 dark:bg-gray-700"
                  placeholder="Your Email"
                />
              </div>

              <input
                type="text"
                value={product.name}
                readOnly
                className="w-full px-5 py-4 rounded-xl bg-gray-100 dark:bg-gray-700"
              />

              <textarea
                name="address"
                placeholder="Full Address (required)"
                required
                className="w-full px-5 py-4 rounded-xl border dark:border-gray-600 bg-white dark:bg-gray-700"
                rows="3"
              />

              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="date"
                  name="date"
                  required
                  className="w-full px-5 py-4 rounded-xl border dark:border-gray-600 bg-white dark:bg-gray-700"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number (required)"
                  required
                  className="w-full px-5 py-4 rounded-xl border dark:border-gray-600 bg-white dark:bg-gray-700"
                />
              </div>

              <textarea
                name="notes"
                placeholder="Additional notes (optional)"
                className="w-full px-5 py-4 rounded-xl border dark:border-gray-600 bg-white dark:bg-gray-700"
                rows="4"
              />

              <div className="flex gap-4 justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-8 py-4 rounded-xl bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold transition shadow-lg"
                >
                  Submit Request
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