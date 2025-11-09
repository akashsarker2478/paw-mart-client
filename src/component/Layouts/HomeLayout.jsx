import React from 'react';
import Home from '../Home/Home';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../pages/Footer/Footer';



const homeLayout = () => {
    return (
        <div>
            <header>
                <section>
                    <Navbar></Navbar>
                </section>
            </header>
            <main>
                <Outlet></Outlet>
            </main>
            <section className='mt-5'>
                <Footer></Footer>
            </section>
        </div>
    );
};

export default homeLayout;