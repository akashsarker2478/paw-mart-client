import React, { useEffect, useState } from "react";
import useAxios from "../Hooks/useAxios";
import AllPatsAndProduct from "./AllPatsAndProduct";
import Loading from "../Loading/Loading";
import { FaSearch, FaFilter, FaPaw } from "react-icons/fa";

const categories = ["Pets", "Pet Food", "Accessories", "Pet Care Products"];

const PetsAndSupply = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const axiosInstance = useAxios();

  useEffect(() => {
    axiosInstance.get("/product").then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  }, [axiosInstance]);

  const handleSearch = (e) => {
    e.preventDefault();
    const search_text = e.target.search.value;
    setLoading(true);
    axiosInstance.get(`/search?search=${search_text}`).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  const filteredProducts = products.filter((product) =>
    selectedCategory ? product.category === selectedCategory : true
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <title>Pets and supply</title>
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-2xl">
              <FaPaw className="text-white text-3xl" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            Discover Our <span className="text-blue-500">Pets & Supplies</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Find your perfect furry companion and all the essential supplies they need for a happy, healthy life.
          </p>
        </div>

        {/* Stats Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                {filteredProducts.length} Products Available
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {selectedCategory ? `in ${selectedCategory}` : "across all categories"}
              </p>
            </div>
            
           
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
             
              <div className="relative flex-1">
                <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search Form */}
              <form onSubmit={handleSearch} className="flex-1">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="search"
                    name="search"
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>

        
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 max-w-md mx-auto shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="text-6xl mb-4">🐾</div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
                No Products Found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {selectedCategory 
                  ? `We couldn't find any products in ${selectedCategory}. Try another category or search term.`
                  : "No products available at the moment. Please check back later."}
              </p>
              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory("")}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Show All Products
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6">
            {filteredProducts.map((product) => (
              <AllPatsAndProduct key={product._id} product={product} />
            ))}
          </div>
        )}

      
        
      </div>
    </div>
  );
};

export default PetsAndSupply;