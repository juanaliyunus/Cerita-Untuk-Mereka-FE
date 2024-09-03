import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Pagination,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import axiosInstance from "../lib/axiosInstance";
import {
  Button,
  Dropdown,
  DropdownItem,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Table,
  TextInput,
} from "flowbite-react";
import SearchIcon from "../assets/SearchIcon";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Perbaikan import

function OrphanageList() {
  const [orphanages, setOrphanages] = useState([]);
  const [orphanageBooks, setOrphanageBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredOrphanages, setFilteredOrphanages] = useState([]);
  const [selectedOrphanageBooks, setSelectedOrphanageBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orphanageId, setOrphanageId] = useState("");
  const [isModalDonate, setIsModalDonate] = useState(false);
  const [bookName, setBookName] = useState("");
  const [quantityDonated, setQuantityDonated] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrphanageBooks = async () => {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      if (token && orphanageId) {
        try {
          const response = await axiosInstance.get(
            `/stocks/orphanages/${orphanageId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("Test Buku: ", response.data.data);
          setOrphanageBooks(response.data.data);
        } catch (error) {
          console.error("Error fetching orphanage books:", error);
        }
      } else {
        console.error("No token found or orphanageId is missing");
      }
    };

    fetchOrphanageBooks();
  }, [orphanageId]);

  useEffect(() => {
    axiosInstance
      .get("/orphanages?page=0")
      .then(response => {
        console.log("Data Orphanage: ", response.data.data.data);
        setOrphanages(response.data.data.data);
        setFilteredOrphanages(response.data.data.data);
      })
      .catch(error => {
        console.error("Error fetching orphanages:", error);
      });
  }, []);

  useEffect(() => {
    setFilteredOrphanages(
      orphanages
        .filter(
          orphanage =>
            orphanage.name.toLowerCase().includes(search.toLowerCase()) ||
            orphanage.address.toLowerCase().includes(search.toLowerCase()) ||
            orphanage.phone_number
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            orphanage.email.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => a.name.localeCompare(b.name))
    );
  }, [search, orphanages]);

  const handleBookListClick = async (orphanageId) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      try {
        const response = await axiosInstance.get(
          `/stocks/orphanages/${orphanageId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Data Buku: ", response.data.data);
        console.log("Panti ID: ", orphanageId);
        const books = response.data.data.data;
        console.log("Buku: ", books);
        setSelectedOrphanageBooks(books);
        setIsModalOpen(true);
      } catch (error) {
        console.error("Error fetching books for orphanage:", error);
      }
    }
  };

  const handleDonateClick = async (orphanageId) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      try {
        const response = await axiosInstance.post(
          `/donations`,
          {
            orphanages_id: orphanageId,
            book_name: bookName,
            quantity_donated: quantityDonated,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Response: ", response.data);

        alert("Donation Pages");
        setIsModalDonate(true);
      } catch (error) {
        console.error("Error donating books:", error);
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <Card className="w-full h-screen">
      <CardHeader className="h-16">
        <h1 className="text-2xl font-bold">Orphanage List</h1>
        <Input
          className="w-72 max-w-xs border-none"
          placeholder="Search"
          startContent={<SearchIcon />}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </CardHeader>
      <CardBody className="h-full overflow-auto">
        <Table color="secondary" className="mt-4">
          <thead className="text-center table-grid bg-blue-500 text-black">
            <tr>
              <th>Nama</th>
              <th>Alamat</th>
              <th>Telepon</th>
              <th>Email</th>
              <th>Description</th>
              <th>Book List</th>
              <th>Books Needed</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center table-grid">
            {filteredOrphanages.map(orphanage => (
              <tr key={orphanage.id} className="text-center">
                <td>{orphanage.name}</td>
                <td>{orphanage.address}</td>
                <td>{orphanage.phone_number}</td>
                <td>{orphanage.email}</td>
                <td>{orphanage.description}</td>
                <td>
                  <Button
                    color="primary"
                    className="bg-blue-500 text-white"
                    onClick={() => handleBookListClick(orphanage.id)}
                  >
                    Books List
                  </Button>
                </td>
                <td>
                  <Dropdown>
                    {Array.isArray(orphanageBooks) &&
                    orphanageBooks.length > 0 ? (
                      orphanageBooks.map(book => (
                        <DropdownItem key={book.id}>
                          <img
                            src={book.image}
                            alt={book.bookName}
                            className="w-8 h-8"
                          />
                          <p>{book.bookName}</p>
                        </DropdownItem>
                      ))
                    ) : (
                      <DropdownItem>
                        <p>No books available</p>
                      </DropdownItem>
                    )}
                  </Dropdown>
                </td>
                <td>
                  <Button
                    onClick={() => {
                      setOrphanageId(orphanage.id);
                      setIsModalDonate(true);
                      console.log(orphanageId);
                    }}
                  >
                    Donate
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </CardBody>
      <CardFooter className="h-16 flex justify-center items-center">
        <Pagination
          total={10}
          initialPage={1}
          onChange={page => console.log(page)}
        />
      </CardFooter>

      <Modal show={isModalDonate} onClose={() => setIsModalDonate(false)}>
        <ModalHeader>
          <p>Donate</p>
        </ModalHeader>
        <ModalBody>
          <Card>
            <CardBody>
              <Label>Title</Label>
              <TextInput
                id="Title"
                type="text"
                placeholder="Title"
                value={bookName}
                onChange={e => setBookName(e.target.value)}
                required
              />
              <Label>Quantity</Label>
              <TextInput
                id="Quantity"
                type="number"
                placeholder="Quantity"
                value={quantityDonated}
                onChange={e => setQuantityDonated(e.target.value)}
                required
              />
              <Button
                type="submit"
                onClick={() => {
                  handleDonateClick(orphanageId);
                  console.log(orphanageId);
                }}
              >
                Submit
              </Button>
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>

      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalHeader>
          <p>Books</p>
        </ModalHeader>
        <ModalBody>
          <Table>
            <thead>
              <tr>
                <th className="text-black">Title</th>
                <th className="text-black">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(selectedOrphanageBooks) &&
                selectedOrphanageBooks.map((book, index) => (
                  <tr key={book.id}>
                    <td className="font-bold text-black">
                      {index + 1}. {book.bookName}
                    </td>
                    <td className="font-bold text-black">
                      {book.quantity_available}
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </ModalBody>
      </Modal>
    </Card>
  );
}

export default OrphanageList;
