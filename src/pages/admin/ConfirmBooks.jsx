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
  const [currentPage, setCurrentPage] = useState(0); // Page starts from 0
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

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

      setBooks(updatedBooks);
      setHasMore(booksData.length > 0); // Check if there are more data
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
      const data = { status: newStatus };
      await axiosInstance.put(`/donations/${id}`, data, {
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
    if (hasMore) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="flex">
      <SideBarAdmin />
      <div className="ml-4 w-3/4">
        <h1 className="text-2xl font-bold">Confirm Books</h1>
        <Card>
          <CardHeader>Confirmation Book</CardHeader>
          <CardBody>
            <Table className="w-full">
              <thead>
                <tr className="text-center">
                  <th>Book Name</th>
                  <th>Orphanage Name</th>
                  <th>User Fullname</th>
                  <th>Quantity</th>
                  <th>Status</th>
                  <th>Date</th> {/* Tambahkan kolom Date */}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {books.map((book, index) => (
                  <tr key={index}>
                    <td className="text-start">{book.book_name}</td>
                    <td>{book.orphanage_name}</td>
                    <td>{book.fullname}</td>
                    <td>{book.quantity_donated}</td>
                    <td>{book.status}</td>
                    <td>{book.created_at}</td> {/* Tampilkan tanggal donasi */}
                    <td className="flex justify-center space-x-2">
                      <Button color="success" onClick={() => handleApprove(book.id)}>Approve</Button>
                      <Button color="failure" onClick={() => handleReject(book.id)}>Reject</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="flex justify-between items-center mt-4">
              <Button
                color="gray"
                onClick={handlePreviousPage}
                disabled={currentPage === 0} // Disable if on the first page
              >
                &larr; Previous
              </Button>
              <p>Page {currentPage + 1}</p>
              <Button
                color="gray"
                onClick={handleNextPage}
                disabled={!hasMore} // Disable if there is no more data
              >
                Next &rarr;
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
      {isModalOpen && (
        <Modal show={isModalOpen} onClose={closeModal}>
          <ModalHeader>{modalContent.title}</ModalHeader>
          <ModalBody>
            <p>{modalContent.body}</p>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={modalContent.onConfirm}>Confirm</Button>
            <Button color="failure" onClick={closeModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
}

export default ConfirmBooks;
