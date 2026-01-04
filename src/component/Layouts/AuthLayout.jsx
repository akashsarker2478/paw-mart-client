import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div>
            <header className='mb-18'><Navbar></Navbar></header>
            <main><Outlet></Outlet></main>
        </div>
    );
};

export default AuthLayout;