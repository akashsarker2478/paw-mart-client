import React, { useEffect, useState } from "react";
import useAxios from "../Hooks/useAxios";
import AllPatsAndProduct from "./AllPatsAndProduct";
import Loading from "../Loading/Loading";

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
    <div className="px-4 md:px-10 lg:px-20 py-10">
      
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          Pets & Supplies
        </h1>
        <p className="text-gray-500 dark:text-gray-300 mt-2">
          Explore all our latest pets, foods, and accessories
        </p>

       
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-4">
          Total found: {filteredProducts.length}
        </h2>
      </div>

      {/* Filter & Search Section */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border rounded px-4 py-2 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* search */}
        <form onSubmit={handleSearch} className="flex items-center gap-2 w-full md:w-auto">
          <label className="relative flex items-center border rounded-full px-3 py-1 dark:border-gray-700">
            <svg
              className="h-5 w-5 opacity-50 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="search"
              name="search"
              placeholder="Search products..."
              className="outline-none bg-transparent text-gray-800 dark:text-gray-100"
            />
          </label>
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full hover:scale-105 transition-transform duration-300">
            Search
          </button>
        </form>
      </div>

     
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <AllPatsAndProduct key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default PetsAndSupply;
