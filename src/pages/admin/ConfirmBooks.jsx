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

  useEffect(() => {
    const fetchData = async () => {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      try {
        const response = await axiosInstance.get(`/donations?page=0`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (Array.isArray(response.data.data.data)) {
          setBooks(response.data.data.data);
          console.log("setBooks", response.data.data.data);
        } else {
          setBooks([]);
          console.log("setBooks Else", response.data.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setBooks([]);
      }
    };

    fetchData();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    try {
      const data = { status: newStatus };
      console.log("Sending data to backend:", data.status.replace(/['"]/g, '')); 
      await axiosInstance.put(`/donations/${id}`, data.status.replace(/['"\/\\]/g, ''), { 
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === id ? { ...book, status: newStatus } : book
        )
      );
      console.log("Updated status to:", newStatus);
      closeModal(); // Pastikan closeModal dipanggil setelah status diupdate
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
                  <th>Orphanages ID</th>
                  <th>User ID</th>
                  <th>Quantity</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {books.map((book, index) => (
                  <tr key={index}>
                    <td className="text-start">{book.book_name}</td>
                    <td>{book.orphanages_id}</td>
                    <td>{book.user_id}</td>
                    <td>{book.quantity_donated}</td>
                    <td>{book.status.replace(/['"]/g, '')}</td>
                    <td className="flex justify-center space-x-2">
                        <Button color="success" onClick={() => handleApprove(book.id)}>Approve</Button>
                        <Button color="failure" onClick={() => handleReject(book.id)}>Reject</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
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
