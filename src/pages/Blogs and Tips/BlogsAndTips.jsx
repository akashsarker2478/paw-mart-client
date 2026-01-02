import React from "react";
import { FaPaw, FaHeart, FaBone, FaStethoscope, FaHome, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const blogPosts = [
  {
    title: "10 Essential Tips for New Pet Parents",
    desc: "Bringing home a new furry friend? Here's everything you need to know to make the transition smooth and happy for both of you.",
    icon: FaHome,
    color: "from-blue-500 to-cyan-500",
    readTime: "5 min read",
  },
  {
    title: "How to Choose the Right Food for Your Pet",
    desc: "Not all pet foods are created equal. Learn how to read labels and pick the best nutrition for your dog or cat's age, breed, and health.",
    icon: FaBone,
    color: "from-green-500 to-teal-500",
    readTime: "7 min read",
  },
  {
    title: "Common Signs Your Pet Needs a Vet Visit",
    desc: "Early detection can save lives. Know the warning signs of illness in dogs and cats — from lethargy to changes in appetite.",
    icon: FaStethoscope,
    color: "from-red-500 to-pink-500",
    readTime: "6 min read",
  },
  {
    title: "Fun Indoor Games to Play with Your Dog",
    desc: "Rainy day? No problem! Keep your pup entertained and mentally stimulated with these easy and fun indoor activities.",
    icon: FaPaw,
    color: "from-purple-500 to-indigo-500",
    readTime: "4 min read",
  },
  {
    title: "Why Spaying/Neutering Your Pet is Important",
    desc: "Beyond population control, spaying and neutering offer major health benefits and improve behavior. Here's what you need to know.",
    icon: FaHeart,
    color: "from-pink-500 to-rose-500",
    readTime: "8 min read",
  },
  {
    title: "Grooming 101: At-Home Care Tips",
    desc: "Regular grooming keeps your pet healthy and happy. Learn brushing techniques, nail trimming, ear cleaning, and more.",
    icon: FaPaw,
    color: "from-amber-500 to-orange-500",
    readTime: "6 min read",
  },
];

const BlogsAndTips = () => {
  const handleReadMore = (title) => {
    Swal.fire({
      title: title,
      html: `
        <p class="text-left text-gray-700 dark:text-gray-300 mb-4">
          This article is coming soon! We're working hard to bring you the best pet care tips. 🐾
        </p>
        <p class="text-sm text-gray-500">
          Stay tuned and check back later!
        </p>
      `,
      icon: "info",
      confirmButtonText: "Got it!",
      confirmButtonColor: "#3B82F6",
      background: "#fff",
      customClass: {
        popup: "dark:bg-gray-800",
        title: "dark:text-white",
        htmlContainer: "dark:text-gray-300",
      },
    });
  };

  const handleSubmitStory = () => {
    Swal.fire({
      title: "Submit Your Pet Story 🐾",
      html: `
        <p class="text-left text-gray-700 dark:text-gray-300 mb-6 text-lg">
          Share your heartwarming experience with the PawMart community!
        </p>
        <input id="swal-name" class="swal2-input" placeholder="Your Name">
        <input id="swal-email" class="swal2-input" type="email" placeholder="Your Email">
        <textarea id="swal-story" class="swal2-textarea" placeholder="Tell us your story... (min 50 characters)"></textarea>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Submit Story",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#10B981",
      preConfirm: () => {
        const name = document.getElementById("swal-name").value.trim();
        const email = document.getElementById("swal-email").value.trim();
        const story = document.getElementById("swal-story").value.trim();

        if (!name || !email || !story) {
          Swal.showValidationMessage("Please fill all fields");
          return false;
        }
        if (story.length < 50) {
          Swal.showValidationMessage("Story must be at least 50 characters");
          return false;
        }

        return { name, email, story };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Thank You! ❤️",
          text: "Your story has been submitted successfully. We'll review it and may feature it soon!",
          icon: "success",
          confirmButtonColor: "#3B82F6",
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 dark:text-white mb-6">
          Blogs & Tips 🐾
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
          Expert advice, heartwarming stories, and practical tips to help you become the best pet parent you can be.
        </p>
      </motion.div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 cursor-pointer"
            >
              {/* Gradient Header with Icon */}
              <div className={`h-52 bg-gradient-to-br ${post.color} relative flex items-center justify-center overflow-hidden`}>
                <post.icon className="text-9xl text-white opacity-60 group-hover:opacity-80 transition-all duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all"></div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <FaClock className="text-xs" />
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 line-clamp-3">
                  {post.desc}
                </p>

                <button
                  onClick={() => handleReadMore(post.title)}
                  className="text-blue-600 dark:text-blue-400 font-semibold text-lg hover:underline flex items-center gap-2 group"
                >
                  Read More
                  <span className="group-hover:translate-x-2 transition-transform">→</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-center mt-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 rounded-3xl shadow-2xl max-w-5xl mx-auto"
      >
        <h2 className="text-4xl font-bold mb-6">
          Got a Tip or Story to Share?
        </h2>
        <p className="text-xl mb-10 max-w-3xl mx-auto opacity-90">
          We're building a community of pet lovers. Share your experience, tips, or heartwarming stories with thousands of fellow pet parents!
        </p>
        <button
          onClick={handleSubmitStory}
          className="bg-white text-blue-600 hover:bg-gray-100 px-12 py-5 rounded-full text-xl font-bold shadow-2xl transition-all transform hover:scale-105 hover:shadow-3xl"
        >
          Submit Your Story 
        </button>
      </motion.div>
    </div>
  );
};

export default BlogsAndTips;