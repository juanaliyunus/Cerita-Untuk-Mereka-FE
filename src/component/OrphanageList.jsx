import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../lib/axiosInstance";
import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Table,
  TextInput,
} from "flowbite-react";
import { Search, Heart, Book, Phone, Mail, MapPin } from "lucide-react";

function OrphanageList() {
  const [orphanages, setOrphanages] = useState([]);
  const [filteredOrphanages, setFilteredOrphanages] = useState([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrphanage, setSelectedOrphanage] = useState(null);
  const [selectedOrphanageBooks, setSelectedOrphanageBooks] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [isModalDonate, setIsModalDonate] = useState(false);
  const [donationDetails, setDonationDetails] = useState({
    orphanageId: "",
    bookName: "",
    quantityDonated: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchOrphanages();
  }, []);

  useEffect(() => {
    filterOrphanages();
  }, [search, orphanages]);

    const fetchOrphanageDetails = async () => {
    if (selectedOrphanage) {
      try {
        const orphanageBooks = await fetchOrphanageBooks(selectedOrphanage.id);
        setSelectedOrphanageBooks(orphanageBooks);
      } catch (error) {
        console.error("Failed to fetch orphanage books", error);
      }
    }
  };

  // useEffect untuk memuat data setiap kali modal terbuka
  useEffect(() => {
    if (isModalOpen) {
      fetchOrphanageDetails();
    }
  }, [isModalOpen, selectedOrphanage]);

  const fetchOrphanages = async () => {
    try {
      const response = await axiosInstance.get("/orphanages?page=0");
      const data = response.data.data.data;
      setOrphanages(data);
      setFilteredOrphanages(data);
    } catch (error) {
      console.error("Error fetching orphanages:", error);
    }
  };

  const filterOrphanages = () => {
    const filtered = orphanages.filter((orphanage) =>
      orphanage.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredOrphanages(filtered);
  };

  const handleViewDetailsClick = async (orphanage, imageUrl) => {
    setSelectedOrphanage(orphanage);
    setSelectedImage(imageUrl);
    setSelectedOrphanageBooks([]);

    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axiosInstance.get(
        `/stocks/orphanages/${orphanage.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSelectedOrphanageBooks(response.data.data.data);
    } catch (error) {
      console.error("Error fetching books for orphanage:", error);
    }

    setIsModalOpen(true);
  };

  const handleDonateClick = async () => {
    const { orphanageId, bookName, quantityDonated } = donationDetails;
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await axiosInstance.post(
        `/donations`,
        {
          orphanages_id: orphanageId,
          book_name: bookName,
          quantity_donated: quantityDonated,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Donation Successful");
      setIsModalDonate(false);
    } catch (error) {
      console.error("Error donating books:", error);
    }
  };

  const updateDonationDetails = (key, value) => {
    setDonationDetails((prev) => ({ ...prev, [key]: value }));
  };

  const bookNeeds = [
    { name: "Mathematics for Beginners", quantity: 5 },
    { name: "Introduction to Science", quantity: 3 },
    { name: "Basic English Grammar", quantity: 7 },
    // Tambahkan lebih banyak buku sesuai kebutuhan
  ];
  

  return (
    <div className="p-8 bg-[#E0F7FA] min-h-screen">
      {/* Title and Description */}
      <div className="mb-12 text-center">
        <p className="text-2xl text-gray-700 font-semibold max-w-2xl mx-auto leading-relaxed">
          Make a difference in a child's life. Find an orphanage and donate books to inspire young minds and foster a love for reading.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-12 flex justify-center">
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            className="w-full p-4 pl-12 rounded-full border-2 border-transparent bg-white shadow-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition duration-300 ease-in-out text-lg"
            placeholder="Search orphanage by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400" size={24} />
        </div>
      </div>

      {/* Orphanage Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredOrphanages.map((orphanage) => (
          <div
            key={orphanage.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 overflow-hidden"
          >
            <div className="relative">
              <img
                src={`http://10.10.102.142:8080/api/v1/avatars/public/${orphanage.avatar}`}
                alt={orphanage.name}
                className="w-full h-64 object-cover cursor-pointer"
                onClick={() =>
                  handleViewDetailsClick(
                    orphanage,
                    `http://10.10.102.142:8080/api/v1/avatars/public/${orphanage.avatar}`
                  )
                }
              />
              <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent text-white p-6 w-full">
                <h3 className="text-2xl font-bold mb-1">{orphanage.name}</h3>
                <p className="text-sm flex items-center">
                  <MapPin size={16} className="mr-2" />
                  {orphanage.address}
                </p>
              </div>
            </div>
            <div className="p-6 flex flex-col">
              <p className="text-gray-600 text-sm mb-4 flex items-center">
                <Phone size={16} className="mr-2 text-indigo-500" />
                {orphanage.phone_number}
              </p>
              <div className="flex justify-between items-center mt-auto">
                <button
                  className="bg-indigo-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-600 transition-colors duration-300 flex items-center"
                  onClick={() =>
                    handleViewDetailsClick(
                      orphanage,
                      `http://10.10.102.142:8080/api/v1/avatars/public/${orphanage.avatar}`
                    )
                  }
                >
                  <Book size={18} className="mr-2" />
                  View Details
                </button>
                <button
                  className="bg-pink-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-pink-600 transition-colors duration-300 flex items-center"
                  onClick={() => {
                    updateDonationDetails("orphanageId", orphanage.id);
                    setIsModalDonate(true);
                  }}
                >
                  <Heart size={18} className="mr-2" />
                  Donate
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Viewing Orphanage Details and Books */}
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} size="xl">
        <ModalHeader className="text-center">
          {selectedOrphanage && selectedOrphanage.name}
        </ModalHeader>
        <ModalBody>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Orphanage"
              className="w-full h-80 object-cover rounded-lg mb-6 shadow-lg"
            />
          )}
          {selectedOrphanage && (
            <div className="space-y-4 text-gray-700">
              <p className="flex items-center">
                <MapPin size={20} className="mr-3 text-indigo-500" />
                <span><strong>Address:</strong> {selectedOrphanage.address}</span>
              </p>
              <p className="flex items-center">
                <Phone size={20} className="mr-3 text-indigo-500" />
                <span><strong>Phone:</strong> {selectedOrphanage.phone_number}</span>
              </p>
              <p className="flex items-center">
                <Mail size={20} className="mr-3 text-indigo-500" />
                <span><strong>Email:</strong> {selectedOrphanage.email}</span>
              </p>
              <p className="mt-6">
                <strong>Description:</strong> {selectedOrphanage.description}
              </p>
            </div>
          )}
          {selectedOrphanageBooks.length > 0 && (
            <>
              <h3 className="text-2xl font-bold mt-8 mb-4 text-indigo-700">Books Available</h3>
              <Table className="w-full bg-white rounded-lg overflow-hidden shadow-lg">
                <Table.Head className="bg-indigo-100">
                  <Table.HeadCell className="py-3 px-6 text-left text-indigo-800">Title</Table.HeadCell>
                  <Table.HeadCell className="py-3 px-6 text-left text-indigo-800">Quantity</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                  {selectedOrphanageBooks.map((book, index) => (
                    <Table.Row key={book.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <Table.Cell className="py-3 px-6">
                        {index + 1}. {book.bookName}
                      </Table.Cell>
                      <Table.Cell className="py-3 px-6">
                        {book.quantity_available}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </>
          )}
        </ModalBody>
      </Modal>

      {/* Modal for Donating Books */}
      <Modal show={isModalDonate} onClose={() => setIsModalDonate(false)} size="lg">
  <ModalHeader className="border-b border-gray-200 pb-4">
  </ModalHeader>
  <ModalBody className="py-6 px-8 bg-gray-50 rounded-b-lg shadow-md">
    <div className="grid grid-cols-1 gap-8">
      {/* Daftar Kebutuhan Buku */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold text-indigo-600 mb-4">Books Needed</h3>
        <ul className="list-inside space-y-3">
          {bookNeeds.length > 0 ? (
            bookNeeds.map((book, index) => (
              <li key={index} className="text-lg text-gray-700">
                <span className="font-medium">{book.name}</span>
                <span className="text-gray-500"> - Needed: {book.quantity}</span>
              </li>
            ))
          ) : (
            <li className="text-gray-500">No books needed at the moment.</li>
          )}
        </ul>
      </div>

      {/* Form Donasi Buku */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold text-indigo-600 mb-4">Donate a Book</h3>
        <div className="mb-4">
          <Label htmlFor="bookName" value="Book Name" className="text-lg font-semibold text-gray-700 mb-2" />
          <TextInput
            id="bookName"
            value={donationDetails.bookName}
            onChange={(e) => updateDonationDetails("bookName", e.target.value)}
            placeholder="Enter the book name"
            required
            className="w-full p-4 rounded-lg border border-gray-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
          />
        </div>

        <div className="mb-6">
          <Label htmlFor="quantity" value="Quantity" className="text-lg font-semibold text-gray-700 mb-2" />
          <TextInput
            id="quantity"
            type="number"
            value={donationDetails.quantityDonated}
            onChange={(e) => updateDonationDetails("quantityDonated", e.target.value)}
            placeholder="Enter the quantity to donate"
            min={1}
            required
            className="w-full p-4 rounded-lg border border-gray-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
          />
        </div>

        <Button
          onClick={handleDonateClick}
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-4 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1"
        >
          Donate Now
        </Button>
      </div>
    </div>
  </ModalBody>
</Modal>

    </div>
  );
}

export default OrphanageList;
