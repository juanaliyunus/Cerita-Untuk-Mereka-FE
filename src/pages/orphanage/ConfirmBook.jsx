import React, { useState } from 'react'
import SideBar from '../../component/SideBar'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react'
import { Button, Modal, ModalHeader, ModalBody, TextInput, ModalFooter } from 'flowbite-react'

function ConfirmBook() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex h-screen">
    <SideBar />
    <div className="flex-grow flex-wrap p-4">
       
        <Card>
            <CardHeader>
                <h1 className='text-2xl font-bold'>ConfirmBook</h1>
            </CardHeader>
            <CardBody>
                <form>
                    <TextInput type="text" placeholder='Category' className='w-full p-2 rounded-md' />
                </form>
            </CardBody>
            <CardFooter>
                <Button onClick={() => setShowModal(true)}>Confirm</Button>
                <Modal
                    show={showModal}
                    size="md"
                    popup
                    onClose={() => setShowModal(false)}
                >
                    <ModalHeader>
                        <h1>ConfirmBook</h1>
                    </ModalHeader>
                    <ModalBody>
                        <h1>Apakah Anda Ingin Mengkonfirmasi Buku?</h1>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={() => setShowModal(false)}>Confirm</Button>
                        <Button color="warning" onClick={() => setShowModal(false)}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </CardFooter>
        </Card>
    </div>
</div>
  )
}

export default ConfirmBook