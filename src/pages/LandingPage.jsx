import React from "react";
import { motion } from "framer-motion";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#E0F7FA]">
      <Navbar className="relative z-20" />

      {/* Fullscreen section */}
      <div className="flex flex-col items-center justify-center bg-[#E0F7FA] text-gray-900 text-center p-8 md:p-16">
        {/* Animasi Selamat Datang */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="mb-8"
        >
          <h1 className="text-5xl font-bold mb-4">
            Selamat Datang di CeritaUntukKamu
          </h1>
          <p className="text-lg">
            Temukan kekuatan buku untuk mengubah hidup anak-anak di panti asuhan
          </p>
        </motion.div>

        {/* Konten Utama */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-white text-gray-900 w-full md:w-4/5 mx-auto p-8 md:p-16 rounded-lg shadow-lg space-y-8 md:space-y-0 md:space-x-8">
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl font-bold mb-4">
              Stories Grow Where Books Flow
            </h2>
            <p className="mb-4">
              Give the gift of a book and you’ll open up a world of imagination and learning for children in orphanages. 
              Access to books is a right that many of these children still lack. Without books, cycles of poverty and 
              limited opportunities persist. But with them? These children — and all the dreams within them — begin to flourish.
            </p>
            <p className="font-bold mb-6">
              This holiday season, you can help hundreds of children gain access to the books they deserve. 
              Give a small donation to provide books to one child, or contribute more to furnish an entire library. 
              No matter how much you give, 100% will fund the purchase of books and educational materials for orphanages.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="https://happyheartsindonesia.org/wp-content/uploads/2023/08/foto-library-bawah.png"
              alt="Stories Grow Where Books Flow"
              className="rounded-md w-full md:w-4/5 lg:w-3/4 h-72 md:h-96 object-cover shadow-md"
            />
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 py-16 bg-[#F7F9FA]">
        <section className="bg-white rounded-2xl shadow-xl p-12 mb-16 transition-all hover:shadow-2xl">
          <h2 className="text-4xl font-bold text-center mb-6 text-blue-800">
            Cerita Untuk Mereka
          </h2>
          <p className="text-lg text-gray-700 text-center max-w-4xl mx-auto">
            Cerita Untuk Mereka adalah aplikasi donasi buku yang membantu
            menghubungkan donatur dengan anak-anak di panti asuhan. Kami
            menyediakan platform untuk mendonasikan buku-buku inspiratif,
            edukatif, dan penuh kebahagiaan yang dapat membantu anak-anak
            belajar dan berkembang.
          </p>
        </section>

        <section className="grid md:grid-cols-3 gap-10">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-blue-200 p-8 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            <h3 className="text-2xl font-semibold mb-4">Donasi Inspiratif</h3>
            <p className="text-gray-800">
              Buku-buku yang menginspirasi dan memotivasi anak-anak untuk
              bermimpi besar dan membentuk masa depan yang lebih baik.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-green-200 p-8 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            <h3 className="text-2xl font-semibold mb-4">Buku Edukatif</h3>
            <p className="text-gray-800">
              Konten edukatif yang mendukung perkembangan intelektual dan
              emosional anak-anak di panti asuhan.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-yellow-200 p-8 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            <h3 className="text-2xl font-semibold mb-4">Kebahagiaan</h3>
            <p className="text-gray-800">
              Buku-buku yang membawa kebahagiaan, keceriaan, dan harapan baru
              bagi kehidupan anak-anak.
            </p>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
