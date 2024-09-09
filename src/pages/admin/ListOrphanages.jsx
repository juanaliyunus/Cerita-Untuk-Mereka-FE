import React, { useState, useEffect } from "react";
import axiosInstance from "../../lib/axiosInstance";
import { Table, Button, TextInput, Select } from "flowbite-react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import SideBarAdmin from "../../component/SideBarAdmin";

function ListOrphanages() {
  const [orphanages, setOrphanages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
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
      .get(`/orphanages?page=${currentPage}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        console.log(res.data.data.data);
        if (Array.isArray(res.data.data.data)) {
          setOrphanages(res.data.data.data);
          setTotalItems(res.data.data.total_page * itemsPerPage); // Menggunakan total_page untuk menghitung total items
          console.log("totalPages: ", res.data.data.total_page);
        } else {
          setOrphanages([]);
        }
      });
  }, [currentPage, reload]); 

  const handleDelete = id => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    axiosInstance
      .delete(`/orphanages/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        console.log(res.data);
        setOrphanages(orphanages.filter(orphanage => orphanage.id !== id));
      });
  };

  const handleEdit = id => {
    setEditId(id);
    const orphanage = orphanages.find(orphanage => orphanage.id === id);
    setEditData(orphanage);
  };

  const handleSaveStatus = id => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const status = editData.status;
    axiosInstance
      .put(
        `/orphanages/${id}/status`,
        status.replace(/['"]+/g, ''),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(res => {
        console.log(res.data);
      });
  };

  const handleSave = id => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    axiosInstance
      .put(
        `/orphanages/${id}`,
        { ...editData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(res => {
        if (res.status === 200) {
          const updatedOrphanage = res.data;
          setOrphanages(
            orphanages.map(orphanage =>
              orphanage.id === id ? updatedOrphanage : orphanage
            )
          );
          setEditId(null);
          setReload(!reload);
        } else {
          console.error(
            "Failed to update orphanage:",
            res.status,
            res.statusText
          );
        }
      })
      .catch(error => {
        console.error("Error updating orphanage:", error);
      });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleSort = () => {
    const sortedOrphanages = [...orphanages].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setOrphanages(sortedOrphanages);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
<>
  <div className="flex h-screen bg-gray-100">
    <SideBarAdmin />
    <div className="flex-grow flex-wrap p-6 bg-[#E0F7FA] ">
      <Card className="mb-8 bg-white shadow-lg rounded-lg">
        <CardHeader className="border-b p-4">
          <h1 className="text-xl font-semibold text-gray-800">List Orphanages</h1>
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
                <th className="py-2 px-4 font-medium text-gray-700">Description</th>
                <th className="py-2 px-4 font-medium text-gray-700">Status</th>
                <th className="py-2 px-4 font-medium text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {Array.isArray(orphanages) &&
                orphanages.map(orphanage => (
                  <tr key={orphanage.id} className="hover:bg-gray-50 transition">
                    {editId === orphanage.id ? (
                      <React.Fragment key={orphanage.id}>
                        <td className="py-2 px-4">
                          <TextInput
                            type="text"
                            name="name"
                            value={editData.name}
                            onChange={handleChange}
                            className="border-gray-300 rounded-lg"
                          />
                        </td>
                        <td className="py-2 px-4">
                          <TextInput
                            type="text"
                            name="email"
                            value={editData.email || ""}
                            onChange={handleChange}
                            className="border-gray-300 rounded-lg"
                          />
                        </td>
                        <td className="py-2 px-4">
                          <TextInput
                            type="text"
                            name="phone_number"
                            value={editData.phone_number || ""}
                            onChange={handleChange}
                            className="border-gray-300 rounded-lg"
                          />
                        </td>
                        <td className="py-2 px-4">
                          <TextInput
                            type="text"
                            name="address"
                            value={editData.address || ""}
                            onChange={handleChange}
                            className="border-gray-300 rounded-lg"
                          />
                        </td>
                        <td className="py-2 px-4">
                          <TextInput
                            type="text"
                            name="description"
                            value={editData.description || ""}
                            onChange={handleChange}
                            className="border-gray-300 rounded-lg"
                          />
                        </td>
                        <td className="py-2 px-4">
                          <Select
                            id="text"
                            name="status"
                            value={editData.status}
                            onChange={handleChange}
                            onBlur={() => handleSaveStatus(editId)}
                            className="border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Select Status</option>
                            <option value="Approve">Approved</option>
                            <option value="Pending">Pending</option>
                            <option value="Reject">Rejected</option>
                          </Select>
                        </td>
                        <td className="py-2 px-4 flex gap-2">
                          <Button 
                            onClick={() => handleSave(orphanage.id)}
                            className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition"
                          >
                            Save
                          </Button>
                          <Button 
                            onClick={() => setEditId(null)}
                            className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-400 transition"
                          >
                            Cancel
                          </Button>
                        </td>
                      </React.Fragment>
                    ) : (
                      <React.Fragment key={orphanage.id}>
                        <td className="py-2 px-4">{orphanage.name}</td>
                        <td className="py-2 px-4">{orphanage.email}</td>
                        <td className="py-2 px-4">{orphanage.phone_number}</td>
                        <td className="py-2 px-4">{orphanage.address}</td>
                        <td className="py-2 px-4">{orphanage.description}</td>
                        <td className="py-2 px-4">{orphanage.status.replace(/['"]+/g, '')}</td>
                        <td className="py-2 px-4 flex gap-2">
                          <Button 
                            onClick={() => handleEdit(orphanage.id)}
                            className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition"
                          >
                            Edit
                          </Button>
                          <Button 
                            onClick={() => handleDelete(orphanage.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                          >
                            Delete
                          </Button>
                        </td>
                      </React.Fragment>
                    )}
                  </tr>
                ))}
            </tbody>
          </Table>
        </CardBody>
        <CardFooter className="p-4 border-t">
          <div className="flex justify-between items-center mt-6">
            <Button
              color="gray"
              onClick={() => setCurrentPage(currentPage > 0 ? currentPage - 1 : 0)}
              disabled={currentPage === 0}
              className="transition-colors hover:bg-gray-200"
            >
              &larr; Previous
            </Button>
            <p className="text-gray-600">Page {currentPage + 1} of {totalItems / itemsPerPage}</p>
            <Button
              color="gray"
              onClick={() => setCurrentPage(currentPage < totalItems / itemsPerPage - 1 ? currentPage + 1 : currentPage)}
              disabled={currentPage === totalItems / itemsPerPage - 1}
              className="transition-colors hover:bg-gray-200"
            >
              Next &rarr;
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  </div>
</>
  );
}

export default ListOrphanages;