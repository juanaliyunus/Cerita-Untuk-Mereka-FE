import React, { useState, useEffect } from "react";
import axiosInstance from "../lib/axiosInstance";
import { Table, Button, TextInput, Select } from "flowbite-react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Pagination,
} from "@nextui-org/react";
import SideBarAdmin from "../component/SideBarAdmin";

function ListDonors() {
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
      <div className="flex h-screen">
        <div className="flex-grow flex-wrap p-4">
          <Card className="mb-6">
            <CardHeader>
              <h1 className="text-2xl font-bold">List Donors</h1>
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
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(donors) &&
                    donors
                      .sort((a, b) => a.fullname.localeCompare(b.fullname)) // Menambahkan penyortiran berdasarkan fullname
                      .map(donor => (
                        <tr key={donor.id}>
                          <React.Fragment key={donor.id}>
                            <td key={`${donor.id}-fullname`}>{donor.fullname}</td>
                            <td key={`${donor.id}-email`}>{donor.email}</td>
                            <td key={`${donor.id}-phone_number`}>
                              {donor.phone_number}
                            </td>
                            <td key={`${donor.id}-address`}>{donor.address}</td>
                            <td
                              key={`${donor.id}-actions`}
                              className="flex flex-row gap-2"
                            >
                              <Button onClick={() => handleDelete(donor.id)}>
                                Delete
                              </Button>
                            </td>
                          </React.Fragment>
                        </tr>
                      ))}
                </tbody>
              </Table>
            </CardBody>
            <CardFooter>
              <Pagination
                showControls
                total={Math.ceil(totalItems / itemsPerPage) || 0}
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

export default ListDonors;
