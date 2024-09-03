import React from 'react';
import { Card } from 'flowbite-react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import { motion } from 'framer-motion';

const AboutPages = () => {
    return (
        <>
            <Navbar />
            <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen flex items-center justify-center py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="container mx-auto p-4 md:p-8"
                >
                    <Card className="p-6 md:p-8 bg-[#E0F7FA] border border-gray-200 shadow-lg rounded-lg">
                        <h1 className="text-4xl font-bold text-center text-blue-800 mb-6">
                            Tentang Kami
                        </h1>
                        <p className="text-lg text-gray-700 mb-6">
                            Selamat datang di <strong>CeritaUntukMereka</strong>, aplikasi yang berkomitmen untuk 
                            membantu anak-anak di panti asuhan melalui donasi buku. Kami percaya bahwa buku adalah 
                            kunci untuk membuka dunia imajinasi dan pembelajaran.
                        </p>
                        <h2 className="text-2xl font-semibold mb-4 text-blue-600">
                            Misi Kami
                        </h2>
                        <p className="text-gray-700 mb-6">
                            Misi kami adalah menyediakan akses buku berkualitas tinggi untuk anak-anak di panti asuhan. 
                            Kami bertujuan untuk memberikan kesempatan yang sama kepada setiap anak untuk belajar dan tumbuh.
                        </p>
                        <h2 className="text-2xl font-semibold mb-4 text-blue-600">
                            Visi Kami
                        </h2>
                        <p className="text-gray-700 mb-6">
                            Visi kami adalah menciptakan dunia di mana setiap anak memiliki akses ke buku yang dapat 
                            membentuk masa depan mereka. Kami ingin menjadi penggerak perubahan dalam akses pendidikan di 
                            komunitas yang membutuhkan.
                        </p>
                        <h2 className="text-2xl font-semibold mb-4 text-blue-600">
                            Tim Kami
                        </h2>
                        <p className="text-gray-700">
                            Tim kami terdiri dari individu yang bersemangat dan berkomitmen untuk mengubah dunia melalui 
                            pendidikan. Kami bekerja sama dengan berbagai organisasi untuk memastikan bahwa donasi buku 
                            sampai ke tangan anak-anak yang membutuhkannya.
                        </p>
                    </Card>
                </motion.div>
            </div>
            <Footer />
        </>
    );
}

export default AboutPages;
