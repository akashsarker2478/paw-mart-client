import React, { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import useAxios from "../Hooks/useAxios";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";

const Update = () => {
  const [item, setItem] = useState("");
  const [price, setPrice] = useState(item?.price || 0);
  const [category, setCategory] = useState("Pets");
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const { id } = useParams();

  useEffect(() => {
    axiosInstance.get(`/product/${id}`).then((data) => {
      setItem(data.data);
      if (item) {
        setPrice(item.price);
        setCategory(item.category);
      }
    });
  }, [axiosInstance, id, item]);
  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    setCategory(selected);

    if (selected === "Pets") {
      setPrice(0);
    } else {
      setPrice(item?.price || "");
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.name.value,
      category: e.target.category.value,
      price: e.target.price.value,
      location: e.target.location.value,
      description: e.target.description.value,
      image: e.target.image.value,
      date: e.target.date.value,
    };
    console.log(formData);
    axiosInstance
      .patch(`/product/${id}`,formData)
      .then((data) => {
        if (data.data.modifiedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Product updated successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/my-listing");
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Update failed!",
          text: "Something went wrong!",
        });
        console.error(err);
      });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Update Listing</h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        {/* Name */}
        <input
          type="text"
          name="name"
          defaultValue={item?.name}
          placeholder="Product / Pet Name"
          className="input input-bordered w-full"
          required
        />

        {/* Category */}
        <select
          name="category"
          defaultValue={item.category}
          onChange={handleCategoryChange}
          className="select select-bordered w-full"
          required
        >
          <option value="Pets">Pets</option>
          <option value="Food">Pet Food</option>
          <option value="Accessories">Accessories</option>
          <option value="Care Products">Pet Care Products</option>
        </select>

        {/* Price */}
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

        {/* Location */}
        <input
          type="text"
          name="location"
          defaultValue={item?.location}
          placeholder="Location"
          className="input input-bordered w-full"
          required
        />

        {/* Description */}
        <textarea
          name="description"
          defaultValue={item?.description}
          placeholder="Description"
          className="textarea textarea-bordered w-full"
          required
        />

        {/* Image */}
        <input
          type="text"
          name="image"
          defaultValue={item?.image}
          placeholder="Image URL"
          className="input input-bordered w-full"
          required
        />

        {/* Date */}
        <input
          type="date"
          name="date"
          defaultValue={item?.date}
          className="input input-bordered w-full"
          required
        />

        {/* Email - Readonly */}
        <input
          type="email"
          name="email"
          defaultValue={user?.email}
          readOnly
          className="input input-bordered w-full bg-gray-200"
        />

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-primary w-full bg-gradient-to-r from-blue-500 to-purple-600"
        >
          Update Listing
        </button>
      </form>
    </div>
  );
};

export default Update;
