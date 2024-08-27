import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Navbar from "../component/Navbar";
import { Helmet } from "react-helmet";
import { Slide } from "react-slideshow-image";
import { Card, CardBody, CardFooter, CardHeader, Image } from "@nextui-org/react";
import { Link } from "react-router-dom";
import OrphanageList from "../component/OrphanageList";
import Slider from "../component/Slider";
import Footer from "../component/Footer";

const LandingPage = () => {
 

  return (
    <>
      <Navbar />
      <Slider />
      <OrphanageList />
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
