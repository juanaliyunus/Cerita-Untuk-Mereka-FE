import React, { useEffect, useState } from "react";
import SideBarAdmin from "../../component/SideBarAdmin";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Table } from "flowbite-react";
import axiosInstance from "../../lib/axiosInstance";

function ConfirmBooks() {
  const [books, setBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    body: "",
    onConfirm: () => {},
  });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Page starts from 1
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const formatDate = (millis) => {
    const date = new Date(millis); // Gunakan millis langsung
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // months are 0-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const fetchData = async () => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(`/donations?page=${currentPage}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const booksData = response.data.data.data || [];

      // Fetch fullname dan orphanage name
      const updatedBooks = await Promise.all(
        booksData.map(async (book) => {
          const userResponse = await axiosInstance.get(`/donors/user/${book.user_id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const orphanageResponse = await axiosInstance.get(`/orphanages/${book.orphanages_id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          return {
            ...book,
            fullname: userResponse.data.data.fullname,
            orphanage_name: orphanageResponse.data.data.name,
            created_at: formatDate(book.created_at), // Format tanggal
          };
        })
      );

      // Filter out books with status other than 'pending'
      const filteredBooks = updatedBooks.filter(book => book.status === 'pending');

      // Urutkan berdasarkan tanggal terbaru hingga terlama
      const sortedBooks = filteredBooks.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      // Set total pages
      setTotalPages(Math.ceil(sortedBooks.length / 15));

      // Ambil data sesuai halaman
      const paginatedBooks = sortedBooks.slice((currentPage - 1) * 15, currentPage * 15);

      setBooks((prevBooks) => [...prevBooks, ...paginatedBooks]);
      setHasMore(paginatedBooks.length > 0); // Check if there are more data
    } catch (error) {
      console.error("Error fetching data:", error);
      setBooks([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]); // Trigger fetchData when currentPage changes

  const handleStatusChange = async (id, newStatus) => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    try {
      await axiosInstance.put(`/donations/${id}`, newStatus, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === id ? { ...book, status: newStatus } : book
        )
      );
      closeModal();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleApprove = (id) => {
    setIsModalOpen(true);
    setModalContent({
      title: "Confirmation",
      body: "Are you sure you want to approve this book?",
      onConfirm: () => handleStatusChange(id, "delivered"),
    });
  };

  const handleReject = (id) => {
    setIsModalOpen(true);
    setModalContent({
      title: "Confirmation",
      body: "Are you sure you want to reject this book?",
      onConfirm: () => handleStatusChange(id, "rejected"),
    });
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <SideBarAdmin className="md:w-1/4" />
      <div className="md:ml-6 w-full md:w-3/4 p-4">
        <Card className="shadow-lg rounded-lg">
          <CardHeader className="bg-gray-100 border-b text-lg font-semibold p-4">
            Confirmation Book
          </CardHeader>
          <CardBody className="p-6">
            <Table className="w-full border-separate border-spacing-y-2">
              <thead>
                <tr className="text-center bg-gray-50 text-gray-600 uppercase text-sm leading-normal">
                  <th className="p-2">Book Name</th>
                  <th className="p-2">Orphanage Name</th>
                  <th className="p-2">User Fullname</th>
                  <th className="p-2">Quantity</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody className="text-center text-gray-700">
                {books.map((book, index) => (
                  <tr key={index} className="bg-white hover:bg-gray-100 shadow-sm">
                    <td className="p-3 text-left">{book.book_name}</td>
                    <td className="p-3">{book.orphanage_name}</td>
                    <td className="p-3">{book.fullname}</td>
                    <td className="p-3">{book.quantity_donated}</td>
                    <td className="p-3">{book.status}</td>
                    <td className="p-3">{book.created_at}</td>
                    <td className="flex justify-center space-x-2 p-3">
                      <Button
                        color="success"
                        className="transition-transform transform hover:scale-105"
                        onClick={() => handleApprove(book.id)}
                      >
                        Approve
                      </Button>
                      <Button
                        color="failure"
                        className="transition-transform transform hover:scale-105"
                        onClick={() => handleReject(book.id)}
                      >
                        Reject
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="flex justify-between items-center mt-6">
              <Button
                color="gray"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="transition-colors hover:bg-gray-200"
              >
                &larr; Previous
              </Button>
              <p className="text-gray-600">Page {currentPage} of {totalPages}</p>
              <Button
                color="gray"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="transition-colors hover:bg-gray-200"
              >
                Next &rarr;
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
      {isModalOpen && (
        <Modal show={isModalOpen} onClose={closeModal} className="rounded-lg">
          <ModalHeader className="text-xl font-bold text-gray-800">
            {modalContent.title}
          </ModalHeader>
          <ModalBody className="p-4 text-gray-600">{modalContent.body}</ModalBody>
          <ModalFooter className="flex justify-end space-x-2">
            <Button
              color="success"
              onClick={modalContent.onConfirm}
              className="transition-transform transform hover:scale-105"
            >
              Confirm
            </Button>
            <Button
              color="failure"
              onClick={closeModal}
              className="transition-transform transform hover:scale-105"
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
}

export default ConfirmBooks;