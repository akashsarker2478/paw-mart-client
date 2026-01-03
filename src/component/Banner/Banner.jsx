import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import { Link } from "react-router";

// Swiper CSS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const Banner = () => {
  return (
    <div className="relative -mt-20"> 
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={1200}
        className="w-full h-[500px] md:h-[650px] lg:h-[750px]"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="relative h-full w-full">
            <img
              src="/image/banner1.jpg"
              alt="Happy owner with adopted pet"
              className="w-full h-full object-cover" 
            />
            {/* Dark Overlay for better text visibility */}
            <div className="absolute inset-0 bg-black/40"></div>

            <div className="absolute inset-0 flex flex-col justify-center items-start px-8 md:px-16 lg:px-32">
              <motion.div
                className="max-w-3xl"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <motion.h1
                  className="text-white text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight drop-shadow-2xl"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  Find Your <span className="text-yellow-300">Furry Friend</span> Today!
                </motion.h1>
                <motion.p
                  className="text-white text-xl md:text-3xl lg:text-4xl font-bold mb-4 drop-shadow-2xl"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  Adopt, <span className="text-green-300">Don't Shop</span> —
                </motion.p>
                <motion.p
                  className="text-yellow-200 text-lg md:text-2xl lg:text-3xl font-semibold mb-8 drop-shadow-2xl"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  Give a Pet a Loving Home ❤️
                </motion.p>
                <Link to="/auth/login">
                  <motion.button
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-bold px-10 py-5 rounded-full text-xl shadow-2xl transition-all duration-300 transform hover:scale-110"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 1.3 }}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Join Us Now
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="relative h-full w-full">
            <img
              src="/image/banner2.jpg"
              alt="Multiple pets playing together"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50"></div>

            <div className="absolute inset-0 flex flex-col justify-center items-end px-8 md:px-16 lg:px-32">
              <motion.div
                className="max-w-3xl text-right"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <motion.h1
                  className="text-white text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight drop-shadow-2xl"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  Because Every Pet Deserves <span className="text-pink-300">Love</span> and <span className="text-blue-300">Care</span>
                </motion.h1>
                <motion.p
                  className="text-white text-xl md:text-3xl lg:text-4xl font-bold mb-8 drop-shadow-2xl"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  Adopt, <span className="text-green-300">Don't Shop</span> — Make a Difference!
                </motion.p>
                <Link to="/auth/login">
                  <motion.button
                    className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white font-bold px-10 py-5 rounded-full text-xl shadow-2xl transition-all duration-300 transform hover:scale-110"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 1.1 }}
                  >
                    Join Our Community
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="relative h-full w-full">
            <img
              src="/image/banner3.jpg"
              alt="Pet adoption process"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>

            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-8">
              <motion.div
                className="max-w-4xl"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <motion.h1
                  className="text-white text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight drop-shadow-2xl"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <span className="text-orange-300">Adopt</span>, Don't Shop —{" "}
                  <span className="text-purple-300">Give a Pet a Home</span>
                </motion.h1>
                <motion.p
                  className="text-white text-xl md:text-3xl lg:text-4xl font-bold mb-8 drop-shadow-2xl"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  Bring <span className="text-yellow-300">Happiness</span> to Your Life
                </motion.p>
                <Link to="/auth/login">
                  <motion.button
                    className="bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white font-bold px-10 py-5 rounded-full text-xl shadow-2xl transition-all duration-300 transform hover:scale-110"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 1.1 }}
                  >
                    Start Adoption Journey
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 4 */}
        <SwiperSlide>
          <div className="relative h-full w-full">
            <img
              src="/image/banner4.jpg"
              alt="Happy family with adopted pet"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50"></div>

            <div className="absolute inset-0 flex flex-col justify-center items-start px-8 md:px-16 lg:px-32">
              <motion.div
                className="max-w-3xl"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <motion.h1
                  className="text-white text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight drop-shadow-2xl"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  Give a Pet a <span className="text-red-300">Loving Home</span> Today
                </motion.h1>
                <motion.p
                  className="text-white text-xl md:text-3xl lg:text-4xl font-bold mb-8 drop-shadow-2xl"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  Adoption is the <span className="text-green-300">Best Choice</span>
                </motion.p>
                <Link to="/auth/login">
                  <motion.button
                    className="bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-blue-500 hover:to-indigo-600 text-white font-bold px-10 py-5 rounded-full text-xl shadow-2xl transition-all duration-300 transform hover:scale-110"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 1.1 }}
                  >
                    Join Us Today
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;