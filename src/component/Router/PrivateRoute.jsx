import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";
import Loading from "../Loading/Loading";

const PrivateRoute = ({children}) => {
    const location = useLocation()
   const {user,loading} = useAuth()
   
   if(user&&user?.email){
    return children;
   }
    if(loading){
        return <Loading></Loading>
    }
    return <Navigate state={location.pathname} to={"/auth/login"}></Navigate>
};

export default PrivateRoute;