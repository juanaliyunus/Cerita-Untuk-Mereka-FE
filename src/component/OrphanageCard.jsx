import { Card, CardBody, CardFooter, CardHeader, Divider } from '@nextui-org/react'
import { Button, Label, Modal, ModalBody, ModalHeader, Progress } from 'flowbite-react';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
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
        console.log(response.data.data.data);
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
    <>
    <h1 className="text-center text-2xl font-bold mt-5">
          Cerita Untuk Mereka
        </h1>
    <div className="flex flex-wrap items-center justify-center mt-6">
    <div className="flex flex-row gap-5 max-w-screen-xl">
      {Array.isArray(orphanages) && orphanages.map((orphanage) => (
        <Card key={orphanage.id} className="max-w-sm max-h-full font-semibold" >
          <CardHeader>
            <img onClick={() => handleShowModal(orphanage)} src={orphanage.image} alt="Orphanage" className="w-full h-full object-cover rounded-t-lg cursor-pointer" />
          </CardHeader>
          <CardBody>
            <h1 onClick={() => handleShowModal(orphanage)} className="cursor-pointer">{orphanage.name}</h1>
          </CardBody>
          <CardFooter className="flex flex-col gap-2 font-light justify-start items-stretch">
            <Label className="font-light">
              {orphanage.collectedBooks} Buku Yang sudah terkumpul dari {orphanage.totalBooks} Buku yang dibutuhkan
            </Label>
            <Progress progress={(orphanage.collectedBooks / orphanage.totalBooks) * 100} size="lg" />
            <Button onClick={() => handleShowModal(orphanage)}>Detail</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  </div>
  {selectedOrphanage && (
    <Modal show={showModal} onClose={() => setShowModal(false)}>
      <ModalHeader>
        <h1>{selectedOrphanage.name}</h1>
      </ModalHeader>
      <ModalBody>
        <img src={selectedOrphanage.image} alt="Orphanage" className="w-full h-full object-cover rounded-t-lg cursor-pointer" />
        <Divider className='my-5' />
        <div className='flex flex-col text-justify gap-2'>
          <p>{selectedOrphanage.description}</p>
          <p>{selectedOrphanage.address}</p>
          <p>{selectedOrphanage.phone_number}</p>
          <p>{selectedOrphanage.email}</p>
          <p>{selectedOrphanage.web_url}</p>
        </div>
        <div className='flex justify-center'>
          <Button onClick={() => {
            const isLoggedIn = localStorage.getItem('token') || sessionStorage.getItem('token');
            if (isLoggedIn) {
              navigate('/donatur-donate');
            } else {
              navigate('/login');
            }
          }} className='mt-5'>Donasi</Button>
        </div>
      </ModalBody>
    </Modal>
  )}
  </>
  )
}

export default OrphanageList