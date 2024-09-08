import React, { useState, useEffect } from "react";
import axiosInstance from "../../lib/axiosInstance";
import { Table, Button, TextInput, Select } from "flowbite-react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Pagination,
} from "@nextui-org/react";
import SideBarAdmin from "../../component/SideBarAdmin";

function ListUsers() {
  const [donors, setDonors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [reload, setReload] = useState(false);
  const itemsPerPage = 15;
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    axiosInstance
      .get(`/donors?page=${currentPage - 1}&size=${itemsPerPage}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        console.log(res.data.data.data);
        if (Array.isArray(res.data.data.data)) {
          setDonors(res.data.data.data);
          setTotalItems(res.data.data.total);
        } else {
          setDonors([]);
        }
      });
  }, [currentPage, reload]);

  const handleDelete = id => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    axiosInstance
      .delete(`/donors/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        console.log(res.data);
        setDonors(donors.filter(donor => donor.id !== id));
      });
  };

  const handleSort = () => {
    const sortedDonors = [...donors].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.fullname.localeCompare(b.fullname);
      } else {
        return b.fullname.localeCompare(a.fullname);
      }
    });
    setDonors(sortedDonors);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <SideBarAdmin />
        <div className="flex-grow flex-wrap p-4">
          <Card className="mb-6 bg-white shadow-lg rounded-lg">
            <CardHeader className="border-b p-4">
              <h1 className="text-2xl font-bold text-gray-800">List Donors</h1>
            </CardHeader>
            <CardBody className="p-6">
              <Table className="mb-6 w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr className="text-left">
                    <th 
                      onClick={handleSort} 
                      className="py-2 px-4 font-medium text-gray-700 cursor-pointer hover:text-gray-900 transition"
                    >
                      Name {sortOrder === "asc" ? "↑" : "↓"}
                    </th>
                    <th className="py-2 px-4 font-medium text-gray-700">Email</th>
                    <th className="py-2 px-4 font-medium text-gray-700">Phone</th>
                    <th className="py-2 px-4 font-medium text-gray-700">Address</th>
                    <th className="py-2 px-4 font-medium text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {Array.isArray(donors) &&
                    donors
                      .sort((a, b) => a.fullname.localeCompare(b.fullname)) // Sorting based on fullname
                      .map(donor => (
                        <tr key={donor.id} className="hover:bg-gray-50 transition">
                          <React.Fragment key={donor.id}>
                            <td key={`${donor.id}-fullname`} className="py-2 px-4">{donor.fullname}</td>
                            <td key={`${donor.id}-email`} className="py-2 px-4">{donor.email}</td>
                            <td key={`${donor.id}-phone_number`} className="py-2 px-4">{donor.phone_number}</td>
                            <td key={`${donor.id}-address`} className="py-2 px-4">{donor.address}</td>
                            <td key={`${donor.id}-actions`} className="py-2 px-4 flex gap-2">
                              <Button 
                                onClick={() => handleDelete(donor.id)}
                                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                              >
                                Delete
                              </Button>
                            </td>
                          </React.Fragment>
                        </tr>
                      ))}
                </tbody>
              </Table>
            </CardBody>
            <CardFooter className="p-4 border-t">
              <Pagination
                showControls
                total={Math.ceil(totalItems / itemsPerPage) || 0}
                initialPage={1}
                onChange={page => setCurrentPage(page)}
                className="mt-4"
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </>

  );
}

export default ListUsers;
