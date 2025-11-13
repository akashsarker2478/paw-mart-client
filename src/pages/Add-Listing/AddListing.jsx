import React, { useState } from "react";
import useAuth from "../../component/Hooks/useAuth";
import useAxios from "../../component/Hooks/useAxios";
import Swal from "sweetalert2";
import { FaPaw, FaTag, FaDollarSign, FaMapMarkerAlt, FaCalendarAlt, FaImage, FaEnvelope, FaPlus } from "react-icons/fa";

const AddListing = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const [category, setCategory] = useState("Pets");
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    setCategory(selected);

    if (selected === "Pets") {
      setPrice(0); 
    } else {
      setPrice(""); 
    }
  };

  const handleForm = (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = {
      name: e.target.name.value,
      category,
      price: category === "Pets" ? 0 : price,
      location: e.target.location.value,
      description: e.target.description.value,
      image: e.target.image.value,
      date: e.target.date.value,
      email: user?.email,
    };
    
    axiosInstance.post('/product', formData)
    .then(data => {
      if(data.data.insertedId){
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Listing Added Successfully!",
          text: "Your listing has been posted successfully.",
          showConfirmButton: false,
          timer: 2000,
        });
        e.target.reset();
        setCategory("Pets");
        setPrice(0);
      }
    })
    .catch(error => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please try again.",
      });
    })
    .finally(() => {
      setLoading(false);
    });
  };

  return (
    
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <title>Add Listing</title>
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-2xl">
              <FaPlus className="text-white text-2xl" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-3">
            Add New Listing
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            List your pets, pet food, accessories, or care products for adoption or sale
          </p>
        </div>

        {/* Form Section */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FaPaw />
                Listing Information
              </h2>
            </div>

            <form onSubmit={handleForm} className="p-6 space-y-6">
              {/* Product Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <FaPaw className="text-blue-500" />
                    Product / Pet Name
                  </span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter product or pet name"
                  className="input input-bordered w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:border-blue-500"
                  required
                />
              </div>

              {/* Category and Price Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Category */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <FaTag className="text-green-500" />
                      Category
                    </span>
                  </label>
                  <select
                    name="category"
                    value={category}
                    onChange={handleCategoryChange}
                    className="select select-bordered w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:border-blue-500"
                    required
                  >
                    <option value="Pets">Pets</option>
                    <option value="Pet Food">Pet Food</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Pet Care Products">Pet Care Products</option>
                  </select>
                </div>

                {/* Price */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <FaDollarSign className="text-yellow-500" />
                      Price (tk)
                    </span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={price}
                    readOnly={category === "Pets"}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder={category === "Pets" ? "Free Adoption" : "Enter price"}
                    className={`input input-bordered w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:border-blue-500 ${
                      category === "Pets" ? "bg-gray-100 dark:bg-gray-600 cursor-not-allowed" : ""
                    }`}
                    required
                  />
                  {category === "Pets" && (
                    <label className="label">
                      <span className="label-text-alt text-green-600 dark:text-green-400">
                        🐾 Pets are free for adoption
                      </span>
                    </label>
                  )}
                </div>
              </div>

              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <FaMapMarkerAlt className="text-red-500" />
                      Location
                    </span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    placeholder="Enter your location"
                    className="input input-bordered w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:border-blue-500"
                    required
                  />
                </div>

               
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <FaCalendarAlt className="text-purple-500" />
                      Date
                    </span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    className="input input-bordered w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

             
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <FaImage className="text-blue-500" />
                    Image URL
                  </span>
                </label>
                <input
                  type="text"
                  name="image"
                  placeholder="Paste your image URL here"
                  className="input input-bordered w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:border-blue-500"
                  required
                />
              </div>

             
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700 dark:text-gray-300">
                    Description
                  </span>
                </label>
                <textarea
                  name="description"
                  placeholder="Describe your product or pet in detail..."
                  rows="4"
                  className="textarea textarea-bordered w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:border-blue-500"
                  required
                />
              </div>

              
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <FaEnvelope className="text-green-500" />
                    Your Email
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={user?.email || ""}
                  readOnly
                  className="input input-bordered w-full bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-gray-300 cursor-not-allowed"
                />
              </div>

              
              <div className="form-control pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Adding Listing...
                    </>
                  ) : (
                    <>
                      <FaPlus />
                      Add Listing
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          
          <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="text-blue-500 mt-1">
                <FaPaw />
              </div>
              <div>
                <h4 className="font-semibold text-blue-800 dark:text-blue-300">Listing Tips</h4>
                <p className="text-blue-600 dark:text-blue-400 text-sm mt-1">
                  • Use clear, high-quality images<br/>
                  • Provide detailed descriptions<br/>
                  • Set realistic prices for non-pet items<br/>
                  • Pets are automatically set as free adoption
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddListing;