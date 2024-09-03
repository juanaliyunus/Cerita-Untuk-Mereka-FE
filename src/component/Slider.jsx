import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    image:
      'https://paybill.id/cfd/upload/banner/paybill-banner-1683802177770-igwtaq?version=202408271221',
  },
  {
    image:
      'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEghHBl7hW15NRI17mE8954uXpGa9fiX3hNJ3W3v_vNNlv3tK8z34_POSQVAunLtj1hSRbPI94Z6rpg6LIp-p_MPKZ-U2C-DoLQT808_sLXSTrvQHA1pcHVJ1pGkD9SlV7xHzj_VVmUyrCdR/s1600-rw/Donasi-buku-Panti-Asuhan-Mitra-Muslim.webp',
  },
  {
    image:
      'https://paybill.id/cfd/upload/banner/paybill-banner-1683802176449-igwtaq?version=202408271221',
  },
];

function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    }, 5000); // Menambahkan waktu transisi lebih lama agar nyaman dilihat
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === slides.length - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  return (
    <div className="relative flex items-center justify-center flex-col max-w-5xl mx-auto">
      <div className="relative h-80 w-full overflow-hidden rounded-lg shadow-lg">
        <AnimatePresence>
          {slides.map((slide, index) => (
            index === currentSlide && (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 1 }}
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
            )
          ))}
        </AnimatePresence>
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow-lg hover:bg-opacity-100 transition"
        >
          <img
            src="https://img.icons8.com/ios-filled/50/000000/chevron-left.png"
            alt="Prev"
            className="w-8 h-8"
          />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow-lg hover:bg-opacity-100 transition"
        >
          <img
            src="https://img.icons8.com/ios-filled/50/000000/chevron-right.png"
            alt="Next"
            className="w-8 h-8"
          />
        </button>
      </div>
      <div className="flex justify-center mt-4">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 mx-1 rounded-full transition ${
              index === currentSlide
                ? 'bg-blue-500 scale-125'
                : 'bg-gray-300'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Slider;
