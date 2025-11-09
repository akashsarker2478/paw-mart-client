import React from 'react';
import { FaPaw, FaMapMarkerAlt, FaEye, FaTag } from 'react-icons/fa';
import { Link } from 'react-router';

const AllPatsAndProduct = ({product}) => {
    const { image, name, category, price, location ,_id} = product;
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 group">
                  
                   <div className="relative h-64 overflow-hidden">
                       <img
                           src={image}
                           alt={name}
                           className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                       />
                       
                       
                       <div className="absolute top-4 left-4">
                           <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1 shadow-sm">
                               <FaTag className="text-blue-500 dark:text-blue-400 text-xs" />
                               <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{category}</span>
                           </div>
                       </div>
       
                       
                       <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 dark:group-hover:bg-black/40 transition-all duration-300"></div>
                   </div>
       
                  
                   <div className="p-6">
                     
                       <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                           {name}
                       </h3>
       
                       <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-4">
                           <FaMapMarkerAlt className="text-red-500 dark:text-red-400" />
                           <span className="text-sm font-medium">{location}</span>
                       </div>
       
                      
                       <div className="mb-5">
                           {price === 0 || price === "Free" || price === "Free for Adoption" ? (
                               <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl p-4 text-center">
                                   <div className="flex items-center justify-center gap-2 mb-1">
                                       <FaPaw className="text-green-600 dark:text-green-400" />
                                       <span className="text-2xl font-bold text-green-600 dark:text-green-400">Free</span>
                                   </div>
                                   <p className="text-green-700 dark:text-green-300 text-sm font-semibold">For Adoption</p>
                               </div>
                           ) : (
                               <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-xl p-4 text-center">
                                   <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{price} tk</div>
                                   <p className="text-blue-700 dark:text-blue-300 text-sm font-semibold">Adoption Fee</p>
                               </div>
                           )}
                       </div>
       
                      
                       <Link to={`/productDetails/${_id}`} className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 transform group-hover:scale-105 active:scale-95 shadow-md group-hover:shadow-lg flex items-center justify-center gap-2">
                           <FaEye className="text-white" />
                           <span>See Details</span>
                       </Link>
                   </div>
               </div>
    );
};

export default AllPatsAndProduct;