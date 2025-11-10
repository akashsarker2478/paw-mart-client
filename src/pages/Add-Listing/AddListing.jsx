import React, { useState } from "react";
import useAuth from "../../component/Hooks/useAuth";
import useAxios from "../../component/Hooks/useAxios";
import Swal from "sweetalert2";

const AddListing = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios()
  const [category, setCategory] = useState("Pets");
  const [price, setPrice] = useState(0);

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
    const formData = {
      name: e.target.name.value,
      category,
      price,
      location: e.target.location.value,
      description: e.target.description.value,
      image: e.target.image.value,
      date: e.target.date.value,
      email: e.target.email.value,
    };
    console.log(formData);
    axiosInstance.post('/product',formData)
    .then(data=>{
        if(data.data.insertedId){
            Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You successfully post your product",
          showConfirmButton: false,
          timer: 1500,
        });
        e.target.reset()
        }
    })
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Add New Listing
      </h2>

      <form onSubmit={handleForm} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product / Pet Name"
          className="input input-bordered w-full"
          required
        />

        <select
          name="category"
          value={category}
          onChange={handleCategoryChange}
          className="select select-bordered w-full"
          required
        >
          <option value="Pets">Pets</option>
          <option value="Food">Pet Food</option>
          <option value="Accessories">Accessories</option>
          <option value="Care Products">Pet Care Products</option>
        </select>

        <input
          type="number"
          name="price"
          value={price}
          readOnly={category === "Pets"}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          className="input input-bordered w-full"
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          className="input input-bordered w-full"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          className="textarea textarea-bordered w-full"
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          className="input input-bordered w-full"
          required
        />

        <input
          type="date"
          name="date"
          className="input input-bordered w-full"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          defaultValue={user?.email}
          readOnly
          className="input input-bordered w-full bg-gray-200"
        />

        <button
          type="submit"
          className="btn btn-primary w-full bg-gradient-to-r from-blue-500 to-purple-600"
        >
          Add Listing
        </button>
      </form>
    </div>
  );
};

export default AddListing;
