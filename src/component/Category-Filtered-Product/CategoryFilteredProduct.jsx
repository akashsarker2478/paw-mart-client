import { useParams } from "react-router";
import { useEffect, useState } from "react";
import AllPatsAndProduct from "../Pats And Supply/AllPatsAndProduct";
import Loading from "../Loading/Loading";
import useAxios from "../Hooks/useAxios";

const CategoryFilteredProduct = () => {
  const { categoryName } = useParams(); 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios();

  useEffect(() => {
    axiosInstance.get("/product")
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      });
  }, [axiosInstance]);

  if (loading) return <Loading />;

 
  const filteredProducts = products.filter(
    product => product.category.toLowerCase() === categoryName.toLowerCase()
  );

  return (
    <div className="w-11/12 mx-auto my-10">
      <h2 className="text-3xl font-bold text-center mb-5">
        Showing results for: <span className="text-blue-500">{categoryName}</span>
      </h2>
      <p className="text-center text-gray-500 dark:text-gray-300 mb-8">
        Total products found: {filteredProducts.length}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <AllPatsAndProduct key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryFilteredProduct;
