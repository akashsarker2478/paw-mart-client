import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";

// Swiper CSS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const Banner = () => {
  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ 
          clickable: true,
          dynamicBullets: true 
        }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={true}
        autoplay={{ 
          delay: 3000, 
          disableOnInteraction: false,
          pauseOnMouseEnter: true 
        }}
        speed={1000}
        className="w-full h-[500px] md:h-[600px] lg:h-[700px]"
      >
        {/* Slide 1 - Pet with happy owner */}
        <SwiperSlide className="relative">
          <img
            src="/image/banner1.jpg"
            alt="Happy owner with adopted pet"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-start px-8 md:px-16 lg:px-24">
            <div className="max-w-2xl">
              <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                Find Your <span className="text-yellow-400">Furry Friend</span> Today!
              </h1>
              <p className="text-gray-200 text-xl md:text-2xl lg:text-3xl font-semibold mb-2">
                Adopt, <span className="text-green-400">Don't Shop</span> — 
              </p>
              <p className="text-yellow-300 text-lg md:text-xl lg:text-2xl font-medium">
                Give a Pet a Home.
              </p>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 - Multiple pets playing */}
        <SwiperSlide className="relative">
          <img
            src="/image/banner2.jpg"
            alt="Multiple pets playing together"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-end px-8 md:px-16 lg:px-24">
            <div className="max-w-2xl text-right">
              <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                Because Every Pet Deserves <span className="text-pink-400">Love</span> and <span className="text-blue-400">Care</span>
              </h1>
              <p className="text-gray-200 text-xl md:text-2xl lg:text-3xl font-semibold mb-2">
                Adopt, <span className="text-green-400">Don't Shop</span> — 
              </p>
              <p className="text-green-300 text-lg md:text-xl lg:text-2xl font-medium">
                Make a Difference Today!
              </p>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 - Adoption process */}
        <SwiperSlide className="relative">
          <img
            src="/image/banner3.jpg"
            alt="Pet adoption process"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center px-8 md:px-16 text-center">
            <div className="max-w-3xl">
              <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                <span className="text-orange-400">Adopt</span>, Don't Shop — 
                <span className="text-purple-400"> Give a Pet a Home</span>
              </h1>
              <p className="text-gray-200 text-xl md:text-2xl lg:text-3xl font-semibold mb-2">
                Bring <span className="text-yellow-400">Happiness</span> to Your Life
              </p>
              <p className="text-orange-300 text-lg md:text-xl lg:text-2xl font-medium">
                And Theirs!
              </p>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 4 - Happy family with pet */}
        <SwiperSlide className="relative">
          <img
            src="/image/banner4.jpg"
            alt="Happy family with adopted pet"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-start px-8 md:px-16 lg:px-24">
            <div className="max-w-2xl">
              <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                Give a Pet a <span className="text-red-400">Loving Home</span> Today
              </h1>
              <p className="text-gray-200 text-xl md:text-2xl lg:text-3xl font-semibold mb-2">
                Adoption is the <span className="text-green-400">Best Choice</span>
              </p>
              <p className="text-blue-300 text-lg md:text-xl lg:text-2xl font-medium">
                For Every Pet
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;