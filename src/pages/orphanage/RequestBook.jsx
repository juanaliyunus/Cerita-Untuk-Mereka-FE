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
    e.preventDefault(); // Prevent page reload
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
        alert("Book requested successfully");
      } else {
        alert("Failed to request book");
      }
    } catch (error) {
      alert("Failed to request book");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <SideBar />
      <div className="flex-grow p-8 flex items-center justify-center">
        <Card className="w-full max-w-md mx-auto shadow-lg rounded-lg bg-white p-6">
          <CardHeader className="text-center">
            <h1 className="text-2xl font-semibold text-gray-800">Request Book</h1>
          </CardHeader>
          <CardBody className="pt-4">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <Label className="text-sm font-medium text-gray-700">Title</Label>
                <Input
                  type="text"
                  placeholder="Enter book title"
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={book_name}
                  onChange={(e) => setBook_Name(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-sm font-medium text-gray-700">Quantity</Label>
                <Input
                  type="number"
                  placeholder="Enter quantity"
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Request
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default RequestBook
