import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/homeLayout";
import Home from "../Home/Home";
const router = createBrowserRouter([
{
    path:'/',
    element:<HomeLayout></HomeLayout>,
    children:[
        {
            index:true,
            element:<Home></Home>
        }
    ]
}
])
export default router;