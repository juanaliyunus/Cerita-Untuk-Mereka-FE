import React from "react";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import OrphanageCard from "../component/OrphanageCard";
import Slider from "../component/Slider";

const LandingPage = () => {
 

  return (
    <>
      <Navbar className="relative z-10" />
      <Slider className="relative z-0" />
      <OrphanageCard />
      <div className="flex items-center justify-center">
        <div className="w-full">
          <h1 className="text-2xl font-bold text-center mt-11">Cerita Untuk Mereka</h1>
          <p className="text-sm text-gray-500 text-wrap mt-2">
            Cerita Untuk Mereka adalah sebuah platform yang menyediakan berbagai macam cerita untuk anak-anak.
          </p>
        </div>
      </div>
      <Footer />

    </>
  );
};

export default LandingPage;
