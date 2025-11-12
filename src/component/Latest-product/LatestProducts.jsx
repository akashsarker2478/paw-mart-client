import React, { useEffect, useState } from 'react';
import useAxios from '../Hooks/useAxios';
import LatestProduct from './LatestProduct';
import Loading from "../Loading/Loading"
import { motion } from 'framer-motion';

const LatestProducts = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const axiosInstance = useAxios()

    useEffect(() => {
        axiosInstance.get('/latest-product')
            .then(data => {
                setProducts(data.data)
                setLoading(false)
            })
    }, [axiosInstance])

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { 
            opacity: 0, 
            y: 50,
            scale: 0.8 
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    }

    const titleVariants = {
        hidden: { 
            opacity: 0, 
            y: -30 
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    }

    if (loading) {
        return <Loading></Loading>
    }

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
        >
            <motion.h2 
                className='text-center my-5 font-bold text-2xl'
                variants={titleVariants}
            >
                Recent Listings
            </motion.h2>
            <motion.div 
                className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-11/12 mx-auto gap-3'
                variants={containerVariants}
            >
                {
                    products.map((product) => (
                        <motion.div
                            key={product._id}
                            variants={itemVariants}
                            whileHover={{ 
                                scale: 1.05,
                                y: -5,
                                transition: { duration: 0.3 }
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <LatestProduct product={product} />
                        </motion.div>
                    ))
                }
            </motion.div>
        </motion.div>
    );
};

export default LatestProducts;