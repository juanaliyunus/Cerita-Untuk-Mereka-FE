import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Button,
} from "@nextui-org/react";
import { ArrowRight } from "lucide-react";
import axiosInstance from "../lib/axiosInstance";
import {jwtDecode} from "jwt-decode";

function BookNeeded() {
  const [bookNeeded, setBookNeeded] = useState([]);
  const [orphanageId, setOrphanage_Id] = useState("");

  // Fetch orphanageId
  const fetchOrphanageId = async () => {
    const token =
      sessionStorage.getItem("token") || localStorage.getItem("token");

    if (!token) {
      console.error("No token found");
      return;
    }
    
    const decodedToken = jwtDecode(token);
    const url = `/orphanages/by-user/${decodedToken.sub}`;

    try {
      const response = await axiosInstance.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const orphanage_id = response.data.data.id;
      setOrphanage_Id(orphanage_id);
    } catch (error) {
      if (error.response) {
        console.error("Failed to fetch orphanage id", error.response.data);
      } else {
        console.error("Network error or server is down");
      }
    }
  };

  // Fetch book needed data based on orphanageId
  const fetchBookNeeded = async () => {
    const token =
      sessionStorage.getItem("token") || localStorage.getItem("token");

    if (!token) {
      console.error("No token found");
      return;
    }

    const url = `/orphanages/needs/by/${orphanageId}`;
    try {
      const response = await axiosInstance.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const bookNeedsArray = response.data.data; // Adjusted based on schema
      if (Array.isArray(bookNeedsArray)) {
        setBookNeeded(bookNeedsArray);
      } else {
        console.error("Expected an array but got", bookNeedsArray);
      }
    } catch (error) {
      if (error.response) {
        console.error("Failed to fetch orphanage needs", error.response.data);
      } else {
        console.error("Network error or server is down");
      }
    }
  };

  // Effect to fetch orphanageId first, then fetch book needs
  useEffect(() => {
    fetchOrphanageId();
  }, []);

  // Fetch book needs when orphanageId is available
  useEffect(() => {
    if (orphanageId) {
      fetchBookNeeded();
    }
  }, [orphanageId]);

  return (
    <div>
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Daftar Kebutuhan Buku</h2>
        </CardHeader>
        <Divider />
        <CardBody>
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Kebutuhan Buku</th>
                <th className="px-4 py-2 text-left">Jumlah</th>
              </tr>
            </thead>
            <tbody>
              {bookNeeded.length > 0 ? (
                bookNeeded.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="px-4 py-2">{item.book_name}</td>
                    <td className="px-4 py-2">{item.quantity}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center py-4">
                    Tidak ada data buku yang dibutuhkan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {/* <Button variant="flat" color="primary" className="w-full mt-4">
            Lihat Semua Kebutuhan
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button> */}
        </CardBody>
      </Card>
    </div>
  );
}

export default BookNeeded;
