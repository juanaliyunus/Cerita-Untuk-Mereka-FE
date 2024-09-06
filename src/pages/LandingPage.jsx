import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Heart, Users, Star, Gift } from "lucide-react";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const handleDonateClick = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <Navbar className="relative z-20" />

      {/* Hero Section with Animated Background */}
      <div className="relative flex flex-col items-center justify-center text-gray-900 text-center p-8 md:p-16 overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          animate={{
            backgroundImage: [
              "radial-gradient(circle, #4299e1 0%, transparent 60%)",
              "radial-gradient(circle, #63b3ed 0%, transparent 60%)",
              "radial-gradient(circle, #4299e1 0%, transparent 60%)",
            ],
          }}
          transition={{ repeat: Infinity, duration: 10 }}
        />
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="mb-8 z-10"
        >
          <h1 className="text-5xl font-bold mb-5 text-blue-900">
            Welcome to CeritaUntukMereka
          </h1>
          <p className="text-xl text-blue-700">
            Discover the power of books to transform the lives of orphaned children
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-white w-full mb-10 md:w-4/5 mx-auto p-8 md:p-16 rounded-lg shadow-xl space-y-8 md:space-y-0 md:space-x-8 z-10">
          <div className="md:w-1/2 text-left">
            <h2 className="text-3xl font-bold mb-8 text-blue-800">
              Stories Grow Where Books Flow
            </h2>
            <p className="mb-4 text-gray-700">
              Give the gift of a book and you'll open up a world of imagination and learning for children in orphanages. 
              Access to books is a right that many of these children still lack. With your help, we can break the cycle of limited opportunities.
            </p>
            <p className="font-bold mb-6 text-blue-900">
              This season, help hundreds of children gain access to the books they deserve. 
              Every donation, big or small, goes directly to providing books and educational materials for orphanages.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <motion.img
              src="https://img.freepik.com/free-photo/group-children-lying-reading-grass-field_1150-3900.jpg?t=st=1725529458~exp=1725533058~hmac=6e2dd07f0266d789739a57674b448dd5fd25ebdfa13c6bb9e09412834916c2ab&w=1380"
              alt="Children reading books"
              className="rounded-lg w-full md:w-4/5 lg:w-3/4 h-72 md:h-96 object-cover shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 py-16">
        <section className="bg-white rounded-2xl shadow-xl p-12 mb-16 transition-all hover:shadow-2xl">
          <h2 className="text-4xl font-bold text-center mb-6 text-blue-800">
            CeritaUntukMereka
          </h2>
          <p className="text-lg text-gray-700 text-center max-w-4xl mx-auto">
            CeritaUntukMereka is a book donation platform that connects donors with children in orphanages. 
            We provide a seamless way to donate inspiring, educational, and joyful books that help children learn and grow.
          </p>
        </section>

        <section className="grid md:grid-cols-3 gap-10">
          <motion.div
            whileHover={{ scale: 1.05, rotateY: 5 }}
            className="bg-gradient-to-br from-blue-100 to-blue-200 p-8 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            <BookOpen className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-2xl font-semibold mb-4 text-blue-800">Inspiring Donations</h3>
            <p className="text-gray-800">
              Books that inspire and motivate children to dream big and shape a better future for themselves.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, rotateY: -5 }}
            className="bg-gradient-to-br from-green-100 to-green-200 p-8 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            <Users className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="text-2xl font-semibold mb-4 text-green-800">Educational Content</h3>
            <p className="text-gray-800">
              Educational materials that support the intellectual and emotional development of children in orphanages.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, rotateY: 5 }}
            className="bg-gradient-to-br from-yellow-100 to-yellow-200 p-8 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            <Heart className="w-12 h-12 text-yellow-600 mb-4" />
            <h3 className="text-2xl font-semibold mb-4 text-yellow-800">Spreading Joy</h3>
            <p className="text-gray-800">
              Books that bring happiness, cheerfulness, and new hope to children's lives.
            </p>
          </motion.div>
        </section>

        {/* New Section: Impact Statistics with Animations */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-16 bg-blue-50 rounded-xl p-8 shadow-inner"
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-blue-900">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.1 }}
            >
              <p className="text-4xl font-bold text-blue-600">5,000+</p>
              <p className="text-xl text-gray-700">Books Donated</p>
            </motion.div>
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.1 }}
            >
              <p className="text-4xl font-bold text-blue-600">50+</p>
              <p className="text-xl text-gray-700">Orphanages Supported</p>
            </motion.div>
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.1 }}
            >
              <p className="text-4xl font-bold text-blue-600">1,000+</p>
              <p className="text-xl text-gray-700">Happy Children</p>
            </motion.div>
          </div>
        </motion.section>

        {/* New Section: Testimonials */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-blue-900">What People Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md"
              whileHover={{ scale: 1.03 }}
            >
              <p className="text-gray-600 mb-4">"The books we received have made such a difference in our children's lives. They're more eager to learn and their imaginations have blossomed."</p>
              <div className="flex items-center">
                <img src="https://cdn1-production-images-kly.akamaized.net/Y6AhqTCgH4fj0GDEqaLf0hNbWrA=/640x640/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/4861988/original/074507500_1718246993-Screenshot_20240612_125153_Instagram.jpg" alt="Orphanage Director" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <p className="font-semibold">Raditya Ardy</p>
                  <p className="text-sm text-gray-500">Orphanage Director</p>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md"
              whileHover={{ scale: 1.03 }}
            >
              <p className="text-gray-600 mb-4">"Donating through CeritaUntukMereka was so easy, and knowing that my contribution is making a real impact is incredibly rewarding."</p>
              <div className="flex items-center">
                <img src="https://cdn1-production-images-kly.akamaized.net/Y6AhqTCgH4fj0GDEqaLf0hNbWrA=/640x640/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/4861988/original/074507500_1718246993-Screenshot_20240612_125153_Instagram.jpg" alt="Regular Donor" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <p className="font-semibold">Mahendra</p>
                  <p className="text-sm text-gray-500">Regular Donor</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* New Section: Call to Action */}
        <motion.section 
          className="mt-16 bg-blue-600 text-white rounded-xl p-12 text-center"
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8">Your donation can change a child's life. Every book is a new adventure waiting to happen.</p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-lg"
            onClick={handleDonateClick}
          >
            Donate Now
          </motion.button>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;