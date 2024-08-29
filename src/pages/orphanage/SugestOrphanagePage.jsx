import React from 'react'
import SideBar from '../../component/SideBar'
import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { Button, Label, TextInput } from 'flowbite-react'

function SugestOrphanagePage() {
  return (
    <div className="flex flex-col sm:flex-row h-full w-full items-center justify-center">
      <SideBar />
      <div className="flex-grow flex-wrap p-4 flex justify-center">
        <Card className="w-full sm:w-1/2 lg:w-1/3">
          <CardHeader>
            <h1 className="text-2xl font-bold">Sugest Panti</h1>
          </CardHeader>
          <CardBody>
            <div className="flex flex-col gap-2 items-start">
              <div className="flex flex-row gap-2 items-center w-full">
                <Label className="w-1/4">Nama Panti</Label>
                <TextInput type="text" label="Name" className="flex-grow" />
              </div>
              <div className="flex flex-row gap-2 items-center w-full">
                <Label className="w-1/4">Email</Label>
                <TextInput type="text" label="Email" className="flex-grow" />
              </div>
              <div className="flex flex-row gap-2 items-center w-full">
                <Label className="w-1/4">No. Telp</Label>
                <TextInput type="text" label="No. Telp" className="flex-grow" />
              </div>
              <div className="flex flex-row gap-2 items-center w-full">
                <Label className="w-1/4">Alamat</Label>
                <TextInput type="text" label="Alamat" className="flex-grow" />
              </div>
              <div className="flex flex-row gap-2 items-center w-full">
                <Button>
                  Submit
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default SugestOrphanagePage