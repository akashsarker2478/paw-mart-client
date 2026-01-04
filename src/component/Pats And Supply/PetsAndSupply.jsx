import React, { useEffect, useState } from "react";
import useAxios from "../Hooks/useAxios";
import AllPatsAndProduct from "./AllPatsAndProduct";
import Loading from "../Loading/Loading";
import { FaSearch, FaFilter, FaPaw } from "react-icons/fa";
import { useSearchParams } from "react-router";

const categories = ["Pets", "Pet Food", "Accessories", "Pet Care Products"];

const PetsAndSupply = () => {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 9;

  const axiosInstance = useAxios();

  
  useEffect(() => {
    const newCategory = categoryFromUrl || "";
    setSelectedCategory(newCategory);
    setCurrentPage(1); 

    setLoading(true);
   const url = `/product?page=1&limit=${limit}${newCategory ? `&category=${newCategory}` : ''}`;
    axiosInstance
      .get(url)
      .then((res) => {
        setProducts(res.data.products || []);
        setTotalPages(res.data.totalPages || 1);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setProducts([]);
        setTotalPages(1);
        setLoading(false);
      });
  }, [categoryFromUrl, axiosInstance,selectedCategory]);

  
  useEffect(() => {
    if (currentPage === 1) return; 

    setLoading(true);
    const url = `/product?page=${currentPage}&limit=${limit}${selectedCategory ? `&category=${selectedCategory}` : ''}`;
    axiosInstance
      .get(url)
      .then((res) => {
        setProducts(res.data.products || []);
        setTotalPages(res.data.totalPages || 1);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setProducts([]);
        setLoading(false);
      });
  }, [currentPage,axiosInstance,selectedCategory]);

  const handleSearch = (e) => {
    e.preventDefault();
    const search_text = e.target.search.value.trim();
    if (!search_text) return;

    setLoading(true);
    setCurrentPage(1);
    setSelectedCategory("");

    axiosInstance.get(`/search?search=${search_text}`).then((res) => {
      setProducts(res.data || []);
      setTotalPages(1);
      setLoading(false);
    });
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-2xl">
              <FaPaw className="text-white text-3xl" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            Discover Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Pets & Supplies</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Find your perfect furry companion and all the essential supplies they need for a happy, healthy life.
          </p>
        </div>

        {/* Filter + Search */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-10 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                {products.length} Products Available
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {selectedCategory ? `in ${selectedCategory}` : "across all categories"}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative">
                <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 w-full"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <form onSubmit={handleSearch} className="relative flex-1">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="search"
                  name="search"
                  placeholder="Search by name or breed..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </form>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 max-w-md mx-auto shadow-lg">
              <p className="text-6xl mb-6">🐾</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                No Products Found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Try changing the category or search term.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("");
                  setCurrentPage(1);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold"
              >
                Show All Products
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {products.map((product) => (
                <AllPatsAndProduct key={product._id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-12">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-6 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-all"
                >
                  ← Previous
                </button>

                <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-6 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-all"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PetsAndSupply;