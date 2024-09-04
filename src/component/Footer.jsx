import React from 'react';
import { Link } from '@nextui-org/react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'; // Ikon media sosial

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#6fccd8] to-[#47a9b3] text-white py-6 w-full mt-24">
      <div className="container mx-auto text-center px-4">
        <p className="text-lg font-semibold">&copy; 2024 Ryfa. Semua hak dilindungi.</p>
        <ul className="flex justify-center space-x-6 mt-4">
          <li>
            <Link href="/about" color="primary" className="hover:text-gray-200 transition duration-200">
              Tentang Kami
            </Link>
          </li>
          <li>
            <Link href="/contact" color="primary" className="hover:text-gray-200 transition duration-200">
              Kontak
            </Link>
          </li>
          <li>
            <Link href="/privacy" color="primary" className="hover:text-gray-200 transition duration-200">
              Kebijakan Privasi
            </Link>
          </li>
        </ul>
        <div className="flex justify-center space-x-6 mt-4">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 transition duration-200"
            aria-label="Facebook"
          >
            <FaFacebookF size={20} />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 transition duration-200"
            aria-label="Twitter"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 transition duration-200"
            aria-label="Instagram"
          >
            <FaInstagram size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
