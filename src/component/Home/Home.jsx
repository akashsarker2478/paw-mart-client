import React from 'react';
import LatestProducts from '../Latest-product/LatestProducts';
import Banner from "../Banner/Banner"
import CategorySection from '../Category Section home/CategorySection';
import WhyAdoptSection from "../../pages/Why AdoptSection/WhyAdoptSection"
import PetHeroesSection from "../../pages/PetHeroesSection/PetHeroesSection"
const Home = () => {
    return (
        <div>
            <title>Paw mart-Home</title>
            <section>
                <Banner></Banner>
            </section>
            <section>
                <CategorySection></CategorySection>
            </section>
            <section><LatestProducts></LatestProducts></section>
             <section className="my-5">
                <WhyAdoptSection></WhyAdoptSection>
            </section>
            <section>
                <PetHeroesSection></PetHeroesSection>
            </section>
        </div>
    );
};

export default Home;