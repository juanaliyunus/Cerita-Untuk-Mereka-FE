import React from 'react';
import { Link } from '@nextui-org/react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 fixed bottom-0 w-full">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 Kelompok 1. Semua hak dilindungi.</p>
        <ul className="flex justify-center space-x-4 mt-2">
          <li><Link href="/about" color="primary">Tentang Kami</Link></li>
          <li><Link href="/contact" color="primary">Kontak</Link></li>
          <li><Link href="/privacy" color="primary">Kebijakan Privasi</Link></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;