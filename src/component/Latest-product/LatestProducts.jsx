import React, { useEffect, useState } from "react";
import useAxios from "../Hooks/useAxios";
import LatestProduct from "./LatestProduct";
import Loading from "../Loading/Loading";
import { motion } from "framer-motion";

const LatestProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios();

  useEffect(() => {
    axiosInstance
      .get("/latest-product")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [axiosInstance]);

  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  // Individual card animation
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Title animation
  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  if (loading) {
    return <Loading />;
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No recent listings available.
      </div>
    );
  }

  return (
    <section className="py-10 px-4">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-10 font-bold text-3xl md:text-4xl text-gray-800 dark:text-white"
      >
        Recent Listings
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
        style={{ opacity: 1 }}
      >
        {products.map((product) => (
          <motion.div
            key={product._id}
            variants={itemVariants}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            whileTap={{ scale: 0.98 }}
          >
            <LatestProduct product={product} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default LatestProducts;
