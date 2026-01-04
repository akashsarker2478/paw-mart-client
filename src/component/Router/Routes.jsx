import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/homeLayout";
import Home from "../Home/Home";
import PetsAndSupply from "../Pats And Supply/PetsAndSupply.Jsx";
import AddListing from "../../pages/Add-Listing/AddListing";
import MyListing from "../../pages/My-Listing/MyListing";
import MyOrders from "../../pages/My-orders/MyOrders";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../../pages/Login/Login"
// import CategoryFilteredProduct from "../Category-Filtered-Product/CategoryFilteredProduct";
import Register from "../../pages/Register/Register";
import Error from "../../pages/ErrorPage/Error";
import Loading from "../Loading/Loading";
import ProductDetails from "../Product Details/ProductDetails";
import PrivateRoute from "./PrivateRoute"
import Update from "../update Product/Update";
import UserDashboardLayout from "../Layouts/User Dashbord Layouts/UserDashboardLayout";
import DashboardHome from "../UserDashboard/DashboardHome";
import UserProfile from "../UserDashboard/UserProfile";
import About from "../../pages/About/About";
import AdaptionGuide from "../../pages/Adaption guide/AdaptionGuide";
import Contact from "../../pages/Contact/Contact";
import BlogsAndTips from "../../pages/Blogs and Tips/BlogsAndTips";

const router = createBrowserRouter([
{
    path:'/',
    element:<HomeLayout></HomeLayout>,
    hydrateFallbackElement:<Loading></Loading>,
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
            path:"/about",
            element:<About></About>
        },
        {
            path:"/adoption-guide",
            element:<AdaptionGuide></AdaptionGuide>
        },
        {
            path:"/contact",
            element:<Contact></Contact>,
        },
        {
            path:'/blog',
            element:<BlogsAndTips></BlogsAndTips>
        },

        // {
        //     path:'/category-filtered-product/:categoryName',
        //     element:<CategoryFilteredProduct></CategoryFilteredProduct>
        // },
        {
            path:"/productDetails/:id",
            element:
                <ProductDetails></ProductDetails>
        }
    ]
},
{
    path:'/auth',
    element:<AuthLayout></AuthLayout>,
    hydrateFallbackElement:<Loading></Loading>,
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
},
{
    path:'Dashboard',
    element:<PrivateRoute>
        <UserDashboardLayout></UserDashboardLayout>
    </PrivateRoute>,
    children:[
        {
            index:true,
            element:<DashboardHome></DashboardHome>
        },
    { path: "add-listing", element: <AddListing /> },
      { path: "my-listings", element: <MyListing /> },
      { path: "my-orders", element: <MyOrders /> },
      { path: "profile", element: <UserProfile /> },
      { path: "update/:id", element: <Update /> },
    ]
},
 {
    path:'/*',
    element:<Error></Error>
  }
])
export default router;