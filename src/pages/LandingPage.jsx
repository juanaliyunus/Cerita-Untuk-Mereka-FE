import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Heart, Users } from "lucide-react";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <Navbar className="relative z-20" />

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-gray-900 text-center p-8 md:p-16">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="mb-8"
        >
          <h1 className="text-5xl font-bold mb-5 text-blue-900">
            Welcome to CeritaUntukMereka
          </h1>
          <p className="text-xl text-blue-700">
            Discover the power of books to transform the lives of orphaned children
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-white w-full mb-10 md:w-4/5 mx-auto p-8 md:p-16 rounded-lg shadow-xl space-y-8 md:space-y-0 md:space-x-8">
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
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold flex items-center"
            >
              Donate Now <ArrowRight className="ml-2" />
            </motion.button>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="https://cdn-assetd.kompas.id/SxUxvK7mBph6Nod1CEU8maiGADc=/1280x853/filters:watermark(https://cdn-content.kompas.id/umum/kompas_main_logo.png,-16p,-13p,0)/https%3A%2F%2Fasset.kgnewsroom.com%2Fphoto%2Fpre%2F2022%2F10%2F30%2F5e555eff-b219-401f-9961-d1d916dac0ef_jpg.jpg"
              alt="Children reading books"
              className="rounded-lg w-full md:w-4/5 lg:w-3/4 h-72 md:h-96 object-cover shadow-lg"
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
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-blue-100 to-blue-200 p-8 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            <BookOpen className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-2xl font-semibold mb-4 text-blue-800">Inspiring Donations</h3>
            <p className="text-gray-800">
              Books that inspire and motivate children to dream big and shape a better future for themselves.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-green-100 to-green-200 p-8 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            <Users className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="text-2xl font-semibold mb-4 text-green-800">Educational Content</h3>
            <p className="text-gray-800">
              Educational materials that support the intellectual and emotional development of children in orphanages.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-yellow-100 to-yellow-200 p-8 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            <Heart className="w-12 h-12 text-yellow-600 mb-4" />
            <h3 className="text-2xl font-semibold mb-4 text-yellow-800">Spreading Joy</h3>
            <p className="text-gray-800">
              Books that bring happiness, cheerfulness, and new hope to children's lives.
            </p>
          </motion.div>
        </section>

        {/* New Section: Impact Statistics */}
        <section className="mt-16 bg-blue-50 rounded-xl p-8 shadow-inner">
          <h2 className="text-3xl font-bold text-center mb-8 text-blue-900">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-600">5,000+</p>
              <p className="text-xl text-gray-700">Books Donated</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-600">50+</p>
              <p className="text-xl text-gray-700">Orphanages Supported</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-600">1,000+</p>
              <p className="text-xl text-gray-700">Happy Children</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;