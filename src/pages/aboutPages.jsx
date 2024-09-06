import React from 'react';
import { Card } from 'flowbite-react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import { motion } from 'framer-motion';

const AboutPages = () => {
    return (
        <>
            <Navbar />
            <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen flex items-center justify-center py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2 }}
                    className="container mx-auto px-4 md:px-8"
                >
                    <Card className="p-8 bg-white border border-gray-200 shadow-lg rounded-lg max-w-4xl mx-auto">
                        <h1 className="text-5xl font-extrabold text-center text-blue-900 mb-8">
                            About Us
                        </h1>
                        <p className="text-xl text-gray-800 mb-8">
                            Welcome to <strong className="text-blue-600">CeritaUntukMereka</strong>, an app dedicated to 
                            supporting children in orphanages through book donations. We believe that books are the 
                            key to unlocking a world of imagination and learning.
                        </p>
                        <h2 className="text-3xl font-semibold mb-5 text-blue-700">
                            Our Mission
                        </h2>
                        <p className="text-gray-800 mb-8">
                            Our mission is to provide access to high-quality books for children in orphanages. 
                            We aim to give every child an equal opportunity to learn and grow.
                        </p>
                        <h2 className="text-3xl font-semibold mb-5 text-blue-700">
                            Our Vision
                        </h2>
                        <p className="text-gray-800 mb-8">
                            Our vision is to create a world where every child has access to books that can shape 
                            their future. We aspire to be a catalyst for change in educational access within 
                            underserved communities.
                        </p>
                        <h2 className="text-3xl font-semibold mb-5 text-blue-700">
                            Our Team
                        </h2>
                        <p className="text-gray-800">
                            Our team consists of passionate and dedicated individuals committed to changing the world 
                            through education. We collaborate with various organizations to ensure that book donations 
                            reach the children who need them most.
                        </p>
                    </Card>
                </motion.div>
            </div>
            <Footer />
        </>
    );
}

export default AboutPages;
