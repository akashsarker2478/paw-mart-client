import React from 'react';
import LatestProducts from '../Latest-product/LatestProducts';
import Banner from "../Banner/Banner"
import CategorySection from '../Category Section home/CategorySection';
const Home = () => {
    return (
        <div>
            <section>
                <Banner></Banner>
            </section>
            <section>
                <CategorySection></CategorySection>
            </section>
            <section><LatestProducts></LatestProducts></section>
        </div>
    );
};

export default Home;