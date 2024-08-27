import React, { useEffect, useState } from 'react'

const slides = [
    {
      image:
        "https://paybill.id/cfd/upload/banner/paybill-banner-1683802177770-igwtaq?version=202408271221",
    },
    {
      image:
        "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEghHBl7hW15NRI17mE8954uXpGa9fiX3hNJ3W3v_vNNlv3tK8z34_POSQVAunLtj1hSRbPI94Z6rpg6LIp-p_MPKZ-U2C-DoLQT808_sLXSTrvQHA1pcHVJ1pGkD9SlV7xHzj_VVmUyrCdR/s1600-rw/Donasi-buku-Panti-Asuhan-Mitra-Muslim.webp",
    },
    {
      image:
        "https://paybill.id/cfd/upload/banner/paybill-banner-1683802176449-igwtaq?version=202408271221",
    },
  ];

function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prevSlide =>
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide(prevSlide =>
      prevSlide === slides.length - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide(prevSlide =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  return (
    <>
    <div className="flex items-center justify-center flex-col">
      <div className="relative h-64 w-full max-w-3xl">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1500 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "contain", 
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat", 
            }}
          />
        ))}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2"
        >
          <img
            src="https://img.icons8.com/?size=100&id=39800&format=png&color=000000"
            alt="Prev"
            className="w-10 h-10 "
          />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2"
        >
          <img
            src="https://img.icons8.com/?size=100&id=60&format=png&color=000000"
            alt="Next"
            className="w-10 h-10 "
          />
        </button>
      </div>
      <div className="flex justify-center mt-4">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 mx-1 rounded-full ${
              index === currentSlide ? "bg-blue-500" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
    </>
  );
}

export default Slider;