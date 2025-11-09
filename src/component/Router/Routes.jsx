import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/homeLayout";
import Home from "../Home/Home";
import PetsAndSupply from "../Pats And Supply/PetsAndSupply.Jsx";
import AddListing from "../../pages/Add-Listing/AddListing";
import MyListing from "../../pages/My-Listing/MyListing";
import MyOrders from "../../pages/My-orders/MyOrders";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../../pages/Login/Login"
import CategoryFilteredProduct from "../Category-Filtered-Product/CategoryFilteredProduct";
import Register from "../../pages/Register/Register";

const router = createBrowserRouter([
{
    path:'/',
    element:<HomeLayout></HomeLayout>,
    children:[
        {
            index:true,
            element:<Home></Home>
        },
        {
            path:"/pets-supply",
            element:<PetsAndSupply></PetsAndSupply>
        },
        {
            path:'/add-listing',
            element:<AddListing></AddListing>
        },
        {
            path:'/my-listing',
            element:<MyListing></MyListing>
        },
        {
            path:'/my-orders',
            element:<MyOrders></MyOrders>
        },
        {
            path:'/category-filtered-product/:categoryName',
            element:<CategoryFilteredProduct></CategoryFilteredProduct>
        }
    ]
},
{
    path:'/auth',
    element:<AuthLayout></AuthLayout>,
    children:[
        {
            path:'/auth/login',
            element:<Login></Login>
        },
        {
            path:'/auth/register',
            element:<Register></Register>
        }
    ]
}
])
export default router;