import React, { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter, FaPaperPlane } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      Swal.fire("Oops!", "Please fill in all required fields", "warning");
      return;
    }

    setSending(true);

   
    setTimeout(() => {
      setSending(false);
      Swal.fire({
        title: "Message Sent! 🎉",
        text: "Thank you for reaching out. We'll get back to you within 24 hours.",
        icon: "success",
        confirmButtonColor: "#3B82F6",
      });

      
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
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
          Get in Touch 🐾
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
          Have a question? Want to report an issue? Or just want to say hi? We're here to help!
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 lg:p-12"
        >
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
            Send Us a Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-5 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-500 dark:bg-gray-700 transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-5 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-500 dark:bg-gray-700 transition-all"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-5 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-500 dark:bg-gray-700 transition-all"
                placeholder="How can we help you?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Message *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                className="w-full px-5 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-500 dark:bg-gray-700 transition-all resize-none"
                placeholder="Write your message here..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-5 rounded-xl font-bold text-xl shadow-lg transition-all transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              <FaPaperPlane />
              {sending ? "Sending..." : "Send Message"}
            </button>
          </form>
        </motion.div>

        {/* Contact Info & Map */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* Contact Cards */}
          <div className="grid gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 flex items-center gap-6">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-5 rounded-full">
                <FaEnvelope className="text-3xl text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Email Us</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-1">support@pawmart.com</p>
                <p className="text-gray-600 dark:text-gray-300">We reply within 24 hours</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 flex items-center gap-6">
              <div className="bg-green-100 dark:bg-green-900/30 p-5 rounded-full">
                <FaPhone className="text-3xl text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Call Us</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-1">+880 1234-567890</p>
                <p className="text-gray-600 dark:text-gray-300">Mon - Sat: 9AM - 6PM</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 flex items-center gap-6">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-5 rounded-full">
                <FaMapMarkerAlt className="text-3xl text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Visit Us</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-1">Dhaka, Bangladesh</p>
                <p className="text-gray-600 dark:text-gray-300">We're online-only for now!</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Follow Us on Social Media
            </h3>
            <div className="flex justify-center gap-6">
              <a href="#" className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition transform hover:scale-110">
                <FaFacebook className="text-2xl" />
              </a>
              <a href="#" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-4 rounded-full shadow-lg transition transform hover:scale-110">
                <FaInstagram className="text-2xl" />
              </a>
              <a href="https://x.com/yourprofile" target="_blank" rel="noopener noreferrer"
   className="bg-black hover:bg-gray-800 text-white p-4 rounded-full shadow-lg transition transform hover:scale-110">
  <BsTwitterX className="text-2xl" />
</a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Final Note */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-center mt-20"
      >
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Your feedback helps us make PawMart better for every pet and pet parent. 
          Don't hesitate to reach out — we're always happy to hear from you! ❤️
        </p>
      </motion.div>
    </div>
  );
};

export default Contact;