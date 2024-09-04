import React from "react";
import { Link } from "@nextui-org/react";
import icons8facebook from "../assets/socialmedia/icons8facebook.png";
import icons8instagram from "../assets/socialmedia/icons8instagram.png";
import icons8linkedin from "../assets/socialmedia/icons8linkedin.png";
import icons8x from "../assets/socialmedia/icons8x.png";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 w-full mt-24">
      <div className="flex justify-center my-4 space-x-10">
        <img
          src={icons8facebook}
          alt="logo facebook"
          className="w-10 h-10"
        ></img>
        <img
          src={icons8instagram}
          alt="logo instagram"
          className="w-10 h-10"
        ></img>
        <img
          src={icons8linkedin}
          alt="logo linkedin"
          className="w-10 h-10"
        ></img>
        <img src={icons8x} alt="logo x" className="w-10 h-10"></img>
      </div>
      <div className="container mx-auto text-center">
        <p>&copy; 2024 Ryfa. Semua hak dilindungi.</p>
        <ul className="flex justify-center space-x-4 mt-2">
          <li>
            <Link href="/about" color="primary">
              Tentang Kami
            </Link>
          </li>
          <li>
            <Link href="/contact" color="primary">
              Kontak
            </Link>
          </li>
          <li>
            <Link href="/privacy" color="primary">
              Kebijakan Privasi
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
