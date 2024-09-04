import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, BookOpen, MapPin, Phone, Mail, Globe } from 'lucide-react';
import axiosInstance from '../lib/axiosInstance';

function OrphanageList() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedOrphanage, setSelectedOrphanage] = useState(null);
  const [orphanages, setOrphanages] = useState([]);

  useEffect(() => {
    const fetchOrphanages = async () => {
      try {
        const response = await axiosInstance.get('/orphanages?page=0');
        setOrphanages(Array.isArray(response.data.data.data) ? response.data.data.data : []);
      } catch (error) {
        console.error('Error fetching orphanages:', error);
      }
    };
    fetchOrphanages();
  }, []);

  const handleShowModal = (orphanage) => {
    setSelectedOrphanage(orphanage);
    setShowModal(true);
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen py-12">
      <motion.h1 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center text-4xl font-bold mb-12 text-blue-800"
      >
        Cerita Untuk Mereka
      </motion.h1>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.isArray(orphanages) && orphanages.map((orphanage) => (
            <motion.div
              key={orphanage.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img 
                src={orphanage.image} 
                alt={orphanage.name} 
                className="w-full h-48 object-cover cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
                onClick={() => handleShowModal(orphanage)}
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 cursor-pointer hover:text-blue-600" onClick={() => handleShowModal(orphanage)}>
                  {orphanage.name}
                </h2>
                <div className="mb-4">
                  <div className="flex items-center text-gray-600 mb-2">
                    <BookOpen size={18} className="mr-2" />
                    <span>{orphanage.collectedBooks} / {orphanage.totalBooks} buku terkumpul</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${(orphanage.collectedBooks / orphanage.totalBooks) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <button
                  onClick={() => handleShowModal(orphanage)}
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Lihat Detail
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedOrphanage && (
        <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center ${showModal ? '' : 'hidden'}`}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4"
          >
            <div className="relative">
              <img src={selectedOrphanage.image} alt={selectedOrphanage.name} className="w-full h-64 object-cover rounded-t-lg" />
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <h2 className="text-3xl font-bold mb-4 text-blue-800">{selectedOrphanage.name}</h2>
              <p className="text-gray-600 mb-6">{selectedOrphanage.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <MapPin className="text-blue-600 mr-2" />
                  <span>{selectedOrphanage.address}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="text-blue-600 mr-2" />
                  <span>{selectedOrphanage.phone_number}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="text-blue-600 mr-2" />
                  <span>{selectedOrphanage.email}</span>
                </div>
                <div className="flex items-center">
                  <Globe className="text-blue-600 mr-2" />
                  <a href={selectedOrphanage.web_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    Website
                  </a>
                </div>
              </div>
              <button
                onClick={() => {
                  const isLoggedIn = localStorage.getItem('token') || sessionStorage.getItem('token');
                  if (isLoggedIn) {
                    navigate('/donatur-donate');
                  } else {
                    navigate('/login');
                  }
                  setShowModal(false);
                }}
                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
              >
                <Heart className="mr-2" /> Donasi Sekarang
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default OrphanageList;