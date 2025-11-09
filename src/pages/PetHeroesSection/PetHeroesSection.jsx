import Marquee from "react-fast-marquee";
import { FaStar, FaHeart } from "react-icons/fa";

const petHeroes = [
  {
    name: "Sarah Ahmed",
    role: "Pet Hero",
    rating: 5,
    feedback:
      "Sarah rescued a sick puppy and nursed it back to health. Her dedication and love for animals inspire our whole community.",
    img: "https://i.ibb.co.com/KxpNwNPG/img1.png",
  },
  {
    name: "Rahim Uddin",
    role: "Cat Rescuer",
    rating: 4,
    feedback:
      "Rahim has adopted multiple stray cats and provides shelter and food for many street animals. A true hero for animals.",
    img: "https://i.ibb.co.com/rRkcBPL2/img2.png",
  },
  {
    name: "Anika Chowdhury",
    role: "Adopter",
    rating: 5,
    feedback:
      "Anika adopted a senior dog who was abandoned. Now the dog has a loving home and the care it deserves. Beautiful!",
    img: "https://i.ibb.co.com/FkMFx18G/girl2.jpg",
  },
  {
    name: "Imran Hasan",
    role: "Caregiver",
    rating: 5,
    feedback:
      "Imran feeds more than 20 stray dogs daily and helps injured animals get medical care. A true example of kindness.",
    img: "https://i.ibb.co.com/Kjhs4yrd/img4.png",
  },
];

const PetHeroesSection = () => {
  return (
    <div className="w-11/12 mx-auto my-16">
      <h2 className="text-3xl font-bold text-center mb-10">
        Meet Our <span className="text-purple-600">Pet Heroes</span>
      </h2>

      <Marquee pauseOnHover={true} speed={40}>
        {petHeroes.map((hero, index) => (
          <div
            key={index}
            className="mx-4 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl rounded-2xl w-80 hover:shadow-2xl transition-all duration-300 group"
          >
            {/* Rating */}
            <div className="flex justify-center text-yellow-400 text-lg mb-4">
              {Array(hero.rating)
                .fill()
                .map((_, i) => (
                  <FaStar key={i} />
                ))}
            </div>

            {/* Feedback */}
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 leading-relaxed text-center italic">
              "{hero.feedback}"
            </p>

            {/* User Info */}
            <div className="flex flex-col items-center">
              {/* Image */}
              <div className="relative mb-3">
                <img
                  src={hero.img}
                  alt={hero.name}
                  className="w-16 h-16 rounded-full border-4 border-purple-500 object-cover shadow-lg group-hover:border-purple-600 transition-colors duration-300"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
              </div>

              {/* Name */}
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {hero.name}
              </h3>

              {/* Role */}
              <p className="text-center text-purple-500 font-medium text-sm">
                {hero.role}
              </p>
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default PetHeroesSection;