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

function ListOrphanages() {
  const [orphanages, setOrphanages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [reload, setReload] = useState(false); // Tambahkan state untuk reload
  const itemsPerPage = 15;
  const [sortOrder, setSortOrder] = useState("asc"); // Tambahkan state untuk urutan sortir

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    axiosInstance
      .get(`/orphanages?page=${currentPage - 1}&size=${itemsPerPage}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        console.log(res.data.data.data);
        if (Array.isArray(res.data.data.data)) {
          setOrphanages(res.data.data.data);
          setTotalItems(res.data.data.total);
        } else {
          setOrphanages([]);
        }
      });
  }, [currentPage, reload]); // Tambahkan reload sebagai dependency

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
      <div className="flex h-screen">
        <SideBarAdmin />
        <div className="flex-grow flex-wrap p-4">
          <Card className="mb-6">
            <CardHeader>
              <h1 className="text-2xl font-bold">List Orphanages</h1>
            </CardHeader>
            <CardBody>
              <Table className="mb-6">
                <thead className="bg-gray-200">
                  <tr>
                    <th onClick={handleSort} style={{ cursor: "pointer" }}>
                      Name {sortOrder === "asc" ? "↑" : "↓"}
                    </th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(orphanages) &&
                    orphanages.map(orphanage => (
                      <tr key={orphanage.id}>
                        {editId === orphanage.id ? (
                          <React.Fragment key={orphanage.id}>
                            <td key={`${orphanage.id}-name`}>
                              <TextInput
                                type="text"
                                name="name"
                                value={editData.name}
                                onChange={handleChange}
                              />
                            </td>
                            <td key={`${orphanage.id}-email`}>
                              <TextInput
                                type="text"
                                name="email"
                                value={editData.email || ""}
                                onChange={handleChange}
                              />
                            </td>
                            <td key={`${orphanage.id}-phone_number`}>
                              <TextInput
                                type="text"
                                name="phone_number"
                                value={editData.phone_number || ""}
                                onChange={handleChange}
                              />
                            </td>
                            <td key={`${orphanage.id}-address`}>
                              <TextInput
                                type="text"
                                name="address"
                                value={editData.address || ""}
                                onChange={handleChange}
                              />
                            </td>
                            <td key={`${orphanage.id}-description`}>
                              <TextInput
                                type="text"
                                name="description"
                                value={editData.description || ""}
                                onChange={handleChange}
                              />
                            </td>
                            <td key={`${orphanage.id}-status`}>
                              <Select
                                id="text"
                                name="status"
                                value={editData.status}
                                onChange={handleChange}
                                onBlur={() => handleSaveStatus(editId)} // Tambahkan onBlur untuk memanggil handleSaveStatus
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              >
                                <option value="">Select Status</option>
                                <option value='Approve'>Approved</option>
                                <option value='Pending'>Pending</option>
                                <option value='Reject'>Rejected</option>
                              </Select>
                            </td>
                            <td
                              key={`${orphanage.id}-actions`}
                              className="flex flex-row gap-2"
                            >
                              <Button onClick={() => handleSave(orphanage.id)}>
                                Save
                              </Button>
                              <Button onClick={() => setEditId(null)}>
                                Cancel
                              </Button>
                            </td>
                          </React.Fragment>
                        ) : (
                          <React.Fragment key={orphanage.id}>
                            <td key={`${orphanage.id}-name`}>
                              {orphanage.name}
                            </td>
                            <td key={`${orphanage.id}-email`}>
                              {orphanage.email}
                            </td>
                            <td key={`${orphanage.id}-phone_number`}>
                              {orphanage.phone_number}
                            </td>
                            <td key={`${orphanage.id}-address`}>
                              {orphanage.address}
                            </td>
                            <td key={`${orphanage.id}-description`}>
                              {orphanage.description}
                            </td>
                            <td key={`${orphanage.id}-status`}>
                              {orphanage.status.replace(/['"]+/g, '')}
                            </td>
                            <td
                              key={`${orphanage.id}-actions`}
                              className="flex flex-row gap-2"
                            >
                              <Button onClick={() => handleEdit(orphanage.id)}>
                                Edit
                              </Button>
                              <Button
                                onClick={() => handleDelete(orphanage.id)}
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
            <CardFooter>
              <Pagination
                showControls
                total={Math.ceil(totalItems / itemsPerPage) || 0} // Pastikan nilai total adalah angka
                initialPage={1}
                onChange={page => setCurrentPage(page)}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}

export default ListOrphanages;