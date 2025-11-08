import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import useAuth from '../Hooks/useAuth';

const Navbar = () => {
    const {user, logOut} = useAuth()
    const navigate = useNavigate()

    const handleLogOut = ()=>{
         logOut()
         .then(() => {
        alert("Logout successful");
        navigate("/auth/login");
      })
      .catch((error) => {
        console.log(error.message);
      });
    }
    const links = <>
        <NavLink to={'/'}><li className='mr-3'>Home</li></NavLink>
        <NavLink to={"/pets-supply"}><li className='mr-3'>Pets & Supplies</li></NavLink>

        {
            user&& <>
             <NavLink to={'/add-listing'}><li className='mr-3'>Add-Listing</li></NavLink>
              <NavLink to={'my-listing'}><li className='mr-3'>My-Listings</li></NavLink>
               <NavLink to={'/my-orders'}><li className='mr-3'>My-Orders</li></NavLink>
            </>
        }
    </>
    return (
       <div className="navbar bg-base-100 shadow-sm ">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {links}
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">Paw Mart</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {links}
    </ul>
  </div>
  <div className="navbar-end">
    {
                  user ? <button onClick={handleLogOut}>Logout</button> :
                  <Link to={"/auth/login"}>Login</Link>
                }
  </div>
</div>
    );
};

export default Navbar;