import React from 'react';
import { Link } from "react-router";
import { FaDog, FaBone, FaPaw } from "react-icons/fa";
import { FaKitMedical } from 'react-icons/fa6';

const CategorySection = () => {
  const categories = [
    {
      name: "Pets",
      icon: <FaDog size={40} />,
      img: "https://i.ibb.co.com/Ng1SB37x/13.jpg",
    },
    {
      name: "Pet Food",
      icon: <FaBone size={40} />,
      img: "https://i.ibb.co.com/nM6LN9xX/m-burke-l1-Usj-V2-Wr-NM-unsplash.jpg",
    },
    {
      name: "Accessories",
      icon: <FaPaw size={40} />,
      img: "https://i.ibb.co.com/BHcsN6dM/6.jpg",
    },
    {
      name: "Pet Care Products",
      icon: <FaKitMedical size={40} />,
      img: "https://i.ibb.co.com/gLhxzCJh/15.jpg",
    },
  ];

  return (
    <div>
      <h2 className="font-bold text-center my-5 text-2xl">
        Browse By Categories
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-11/12 mx-auto my-10">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            to={`/category-filtered-product/${cat.name}`}
            className="group h-40 w-full [perspective:1000px]"
          >
            <div
              className="relative h-full w-full text-center transition-transform duration-700 
              [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
            >
              {/* FRONT */}
              <div
                className="absolute inset-0 bg-white dark:bg-gray-800 
                rounded-xl shadow-lg flex flex-col items-center justify-center gap-2 
                text-gray-700 dark:text-gray-100 
                [backface-visibility:hidden]"
              >
                {cat.icon}
                <h3 className="font-bold">{cat.name}</h3>
              </div>

              {/* BACK */}
              <div
                className="absolute inset-0 rounded-xl shadow-lg overflow-hidden 
                [transform:rotateY(180deg)] 
                [backface-visibility:hidden]"
              >
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
