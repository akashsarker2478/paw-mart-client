import React, { useEffect, useState } from 'react';
import useAxios from '../Hooks/useAxios';
import LatestProduct from './LatestProduct';
import Loading from "../Loading/Loading"

const LatestProducts = () => {
    const [products,setProducts] = useState([])
    const [loading,setLoading] = useState(true)
    const axiosInstance = useAxios()
    useEffect(()=>{
        axiosInstance.get('/latest-product')
        .then(data=>{
            // console.log(data.data)
            setProducts(data.data)
            setLoading(false)
        })
    },[axiosInstance])
    if(loading){
        return <Loading></Loading>
    }
    return (
        <div>
            <h2 className='text-center my-5 font-bold text-2xl'>Recent Listings</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-11/12 mx-auto gap-3'>
                {
                    products.map(product=><LatestProduct key={product._id} product={product}></LatestProduct>)
                }
            </div>
        </div>
    );
};

export default LatestProducts;