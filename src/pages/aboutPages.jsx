import React from 'react';
import { Card } from 'flowbite-react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';

const AboutPages = () => {
    return (
        <>
        <Navbar />
        <div className="container mx-auto p-4 items-center justify-center h-screen w-screen">
            <Card>
                <h1 className="text-3xl font-bold mb-4">Tentang Kami</h1>
                <p className="mb-4">Selamat datang di halaman tentang kami. Kami adalah perusahaan yang berdedikasi untuk memberikan layanan terbaik kepada pelanggan kami.</p>
                <h2 className="text-2xl font-semibold mb-2">Misi Kami</h2>
                <p className="mb-4">Misi kami adalah untuk menyediakan produk dan layanan berkualitas tinggi yang memenuhi kebutuhan dan harapan pelanggan kami.</p>
                <h2 className="text-2xl font-semibold mb-2">Visi Kami</h2>
                <p className="mb-4">Visi kami adalah menjadi pemimpin di industri ini dengan inovasi dan komitmen terhadap keunggulan.</p>
                <h2 className="text-2xl font-semibold mb-2">Tim Kami</h2>
                <p>Tim kami terdiri dari profesional yang berpengalaman dan berdedikasi untuk memberikan yang terbaik.</p>
            </Card>
        </div>
        <Footer />
        </>
    );
}

export default AboutPages;
