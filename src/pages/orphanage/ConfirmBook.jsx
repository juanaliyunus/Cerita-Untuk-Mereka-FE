import React, { useState } from 'react';
import SideBar from '../../component/SideBar';
import { Card, CardBody, CardFooter, CardHeader, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';
import { TextInput } from 'flowbite-react';

function ConfirmBook() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      <SideBar />
      <div className="flex-grow p-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <Card className="shadow-lg border rounded-lg bg-white">
            <CardHeader className="bg-blue-500 py-4 rounded-t-lg text-white">
              <h1 className="text-2xl font-semibold text-center">Confirm Book</h1>
            </CardHeader>
            <CardBody className="p-6 space-y-4">
              <p className="text-gray-600 text-center mb-4">
                Please enter the book category you want to confirm.
              </p>
              <form>
                <TextInput 
                  type="text" 
                  placeholder="Category" 
                  className="w-full p-2 rounded-md border border-gray-300" 
                />
              </form>
            </CardBody>
            <CardFooter className="flex justify-end gap-4 p-4">
              <Button 
                onClick={() => setShowModal(true)}
                className="bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
              >
                Confirm
              </Button>
            </CardFooter>
          </Card>
          <Modal
            open={showModal}
            onClose={() => setShowModal(false)}
            className="p-4 bg-white shadow-lg rounded-lg"
          >
            <ModalHeader>
              <h1 className="text-xl font-semibold">Confirm Book</h1>
            </ModalHeader>
            <ModalBody>
              <p className="text-lg">Are you sure you want to confirm the book?</p>
            </ModalBody>
            <ModalFooter className="flex justify-center gap-4">
              <Button
                color="success"
                onClick={() => {
                  // Handle confirm action here
                  setShowModal(false);
                }}
                className="bg-green-500 text-white hover:bg-green-600 transition duration-300"
              >
                Confirm
              </Button>
              <Button
                color="warning"
                onClick={() => setShowModal(false)}
                className="bg-red-500 text-white hover:bg-red-600 transition duration-300"
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
