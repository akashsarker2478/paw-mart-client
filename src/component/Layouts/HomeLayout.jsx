import React from 'react';
import Home from '../Home/Home';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router';
import Banner from '../Banner/Banner';

const homeLayout = () => {
    return (
        <div>
            <header>
                <section>
                    <Navbar></Navbar>
                </section>
                <section>
                    <Banner></Banner>
                </section>
            </header>
            <main>
                <Outlet></Outlet>
            </main>
        </div>
    );
};

export default homeLayout;