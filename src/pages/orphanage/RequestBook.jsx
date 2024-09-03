import React, { useState, useEffect } from 'react'
import SideBar from '../../component/SideBar'
import { Button, Label } from 'flowbite-react'
import { Card, CardBody, CardHeader, Input } from '@nextui-org/react'
import axiosInstance from '../../lib/axiosInstance'
import { jwtDecode } from 'jwt-decode'

function RequestBook() {
  const [book_name, setBook_Name] = useState("");
  const [quantity, setQuantity] = useState("");
  const [orphanage_id, setOrphanage_Id] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    const decoded = jwtDecode(token);
    setOrphanage_Id(decoded.sub);
    console.log(decoded);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Tambahkan ini untuk mencegah reload halaman
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    try {
      const res = await axiosInstance.post(
        "/orphanages/needs", 
        { user_id: orphanage_id, book_name, quantity }, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (res.status === 200) {
        alert("Book requested");
      } else {
        alert("Failed to request book");
      }
    } catch (error) {
      alert("Failed to request book");
    }
  };

  return (
    <>
    <div className="flex h-screen items-start">
        <SideBar />
        <div className="flex-grow flex-wrap p-4">
        <Card className='w-full sm:w-2/3 md:w-1/3 ml-auto mr-auto mt-10'>
            <CardHeader className='flex justify-center items-center'>
                <h1 className='text-2xl font-bold'>Request Buku</h1>
            </CardHeader>
            <CardBody className='flex justify-center items-center'>
            <div className='flex '>
                <form className='flex flex-col gap-2'>
                    <div className='flex flex-row gap-2 items-center'>
                        <Label className='w-32'>Title</Label>
                        <Input type="text" placeholder='Title' className='w-full p-2 rounded-md' value={book_name} onChange={(e) => setBook_Name(e.target.value)} />
                    </div>
                    <div className='flex flex-row gap-2 items-center'>
                        <Label className='w-32'>Quantity</Label>
                        <Input type="number" placeholder='Jumlah Buku' className='w-full p-2 rounded-md' value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                    </div>
                    <Button type="submit" className='w-full p-2 rounded-md' onClick={handleSubmit}>Request</Button>
                </form>
            </div>
            </CardBody>
        </Card>
        </div>
    </div>
    </>
  )
}

export default RequestBook