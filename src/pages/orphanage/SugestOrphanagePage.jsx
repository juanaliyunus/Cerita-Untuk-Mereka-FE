import React from 'react'
import SideBar from '../../component/SideBar'
import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { Button, Label, TextInput } from 'flowbite-react'

function SuggestOrphanagePage() {
  return (
<div className="flex h-screen bg-gray-100">
  <SideBar />
  <div className="flex-grow p-8 flex items-center justify-center">
    <Card className="w-full max-w-md mx-auto shadow-lg rounded-lg bg-white p-6">
      <CardHeader className="text-center">
        <h1 className="text-2xl font-semibold text-gray-800">Suggest an Orphanage</h1>
      </CardHeader>
      <CardBody className="pt-4">
        <form className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium text-gray-700">Orphanage Name</Label>
            <Input
              placeholder="Enter the name of the orphanage"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium text-gray-700">Contact Email</Label>
            <Input
              placeholder="Enter contact email"
              type="email"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium text-gray-700">Phone Number</Label>
            <Input
              placeholder="Enter phone number"
              type="tel"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium text-gray-700">Full Address</Label>
            <Textarea
              placeholder="Enter full address"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              minRows={4}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit Suggestion
          </Button>
        </form>
      </CardBody>
    </Card>
  </div>
</div>

  );
}

export default SuggestOrphanagePage;
