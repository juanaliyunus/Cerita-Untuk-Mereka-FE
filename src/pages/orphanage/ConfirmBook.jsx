import React, { useState } from 'react';
import SideBar from '../../component/SideBar';
import { Card, CardBody, CardFooter, CardHeader, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';

function ConfirmBook() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      <SideBar />
      <div className="flex-grow p-8 flex items-center justify-center">
        <div className="w-full max-w-md mx-auto">
          <Card className="shadow-lg rounded-lg bg-white p-6">
            <CardHeader className="text-center">
              <h1 className="text-2xl font-semibold text-gray-800">Confirm Book</h1>
            </CardHeader>
            <CardBody className="pt-4">
              <p className="text-gray-600 text-center mb-4">
                Please enter the book category you want to confirm.
              </p>
              <form>
                <Input 
                  type="text" 
                  placeholder="Category" 
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </form>
            </CardBody>
            <CardFooter className="flex justify-end gap-4 p-4">
              <Button 
                onClick={() => setShowModal(true)}
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Confirm
              </Button>
            </CardFooter>
          </Card>
          <Modal
            open={showModal}
            onClose={() => setShowModal(false)}
            className="bg-white shadow-lg rounded-lg p-4"
          >
            <ModalHeader>
              <h1 className="text-xl font-semibold text-gray-800">Confirm Book</h1>
            </ModalHeader>
            <ModalBody>
              <p className="text-lg text-gray-600">Are you sure you want to confirm the book?</p>
            </ModalBody>
            <ModalFooter className="flex justify-center gap-4">
              <Button
                color="success"
                onClick={() => {
                  // Handle confirm action here
                  setShowModal(false);
                }}
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
              >
                Confirm
              </Button>
              <Button
                color="warning"
                onClick={() => setShowModal(false)}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
              >
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default ConfirmBook;
