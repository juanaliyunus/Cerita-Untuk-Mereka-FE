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
      [orphanage.name, orphanage.address, orphanage.phone_number, orphanage.email]
        .some(field => field.toLowerCase().includes(search.toLowerCase()))
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
      const response = await axiosInstance.get(`/stocks/orphanages/${orphanage.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
        { orphanages_id: orphanageId, book_name: bookName, quantity_donated: quantityDonated },
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

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredOrphanages.map((orphanage) => (
          <div
            key={orphanage.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
          >
            <div className="relative">
              <img
                src={`http://10.10.102.142:8080/api/v1/avatars/public/${orphanage.avatar}`}
                alt={orphanage.name}
                className="w-full h-56 object-cover cursor-pointer"
                onClick={() => handleViewDetailsClick(orphanage, `http://10.10.102.142:8080/api/v1/avatars/public/${orphanage.avatar}`)}
              />
              <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent text-white p-4 w-full">
                <h3 className="text-xl font-bold">{orphanage.name}</h3>
                <p className="text-sm">{orphanage.address}</p>
              </div>
            </div>
            <div className="p-4 flex flex-col">
              <p className="text-gray-600 text-sm mb-4">{orphanage.phone_number}</p>
              <div className="flex justify-between items-center mt-auto">
                <button
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-600 transition-colors duration-300"
                  onClick={() => handleViewDetailsClick(orphanage, `http://10.10.102.142:8080/api/v1/avatars/public/${orphanage.avatar}`)}
                >
                  View Details
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
                  onClick={() => {
                    updateDonationDetails("orphanageId", orphanage.id);
                    setIsModalDonate(true);
                  }}
                >
                  Donate
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Viewing Orphanage Details and Books */}
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} size="xl">
        <ModalHeader>
          <h2 className="text-2xl font-bold">Orphanage Details</h2>
        </ModalHeader>
        <ModalBody>
          {selectedImage && (
            <img src={selectedImage} alt="Orphanage" className="w-full h-64 object-cover rounded-lg mb-4" />
          )}
          {selectedOrphanage && (
            <div className="space-y-4">
              <p><strong>Name:</strong> {selectedOrphanage.name}</p>
              <p><strong>Address:</strong> {selectedOrphanage.address}</p>
              <p><strong>Phone Number:</strong> {selectedOrphanage.phone_number}</p>
              <p><strong>Email:</strong> {selectedOrphanage.email}</p>
              <p><strong>Description:</strong> {selectedOrphanage.description}</p>
            </div>
          )}
          {selectedOrphanageBooks.length > 0 && (
            <>
              <h3 className="text-xl font-bold mt-6">Books Available</h3>
              <Table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-gray-800 py-2">Title</th>
                    <th className="text-gray-800 py-2">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrphanageBooks.map((book, index) => (
                    <tr key={book.id} className="border-t">
                      <td className="py-2 px-4 text-gray-800">{index + 1}. {book.bookName}</td>
                      <td className="py-2 px-4 text-gray-800">{book.quantity_available}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </ModalBody>
      </Modal>

      {/* Modal for Donating Books */}
      <Modal show={isModalDonate} onClose={() => setIsModalDonate(false)} size="lg">
        <ModalHeader>
          <h2 className="text-2xl font-bold">Donate a Book</h2>
        </ModalHeader>
        <ModalBody>
          <Label htmlFor="bookName" className="block mb-2 text-sm font-medium text-gray-700">Title</Label>
          <TextInput
            id="bookName"
            type="text"
            placeholder="Book Title"
            value={donationDetails.bookName}
            onChange={(e) => updateDonationDetails("bookName", e.target.value)}
            required
          />
          <Label htmlFor="quantityDonated" className="block mb-2 mt-4 text-sm font-medium text-gray-700">Quantity</Label>
          <TextInput
            id="quantityDonated"
            type="number"
            placeholder="Quantity"
            value={donationDetails.quantityDonated}
            onChange={(e) => updateDonationDetails("quantityDonated", Number(e.target.value))}
            min={1}
            required
          />
          <Button className="mt-6" onClick={handleDonateClick}>
            Donate
          </Button>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default OrphanageList;
