import React from "react";
import SideBar from "../../component/SideBar";
import { Card, CardBody, CardHeader, Image, Input } from "@nextui-org/react";
import { Button, FileInput, Label, TextInput } from "flowbite-react";

function Setting() {
  return (
    <div className="flex h-screen items-start">
      <SideBar />
      <div className="flex-grow flex-wrap p-4">
        <h1 className="text-2xl font-bold">Edit Profile</h1>
        <Card>
          <CardHeader>
            <h1 className="font-bold">Edit Profile</h1>
          </CardHeader>
          <CardBody>
            <div className="flex flex-row gap-2 items-center justify-center">
              <Image
                src="https://flowbite.com/docs/images/blog/image-1.jpg"
                alt="Avatar"
                className="w-32 h-32 rounded-full"
              />
            </div>
            <div className="flex flex-row gap-2 items-center">
              <Label className="w-1/4">Foto Profil Panti</Label>
              <FileInput label="Image" className="flex-grow" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-2 items-center">
                <Label className="w-1/4">Nama Panti</Label>
                <TextInput type="text" label="Name" className="flex-grow" />
              </div>
              <div className="flex flex-row gap-2 items-center">
                <Label className="w-1/4">Email</Label>
                <TextInput type="text" label="Email" className="flex-grow" />
              </div>
              <div className="flex flex-row gap-2 items-center">
                <Label className="w-1/4">Nomor Telepon</Label>
                <TextInput type="text" label="Phone" className="flex-grow" />
              </div>
              <div className="flex flex-row gap-2 items-center">
                <Label className="w-1/4">Alamat</Label>
                <TextInput type="text" label="Address" className="flex-grow" />
              </div>
              <div className="flex flex-row gap-2 items-center">
                <Label className="w-1/4">Deskripsi</Label>
                <TextInput
                  type="text"
                  label="Description"
                  className="flex-grow"
                />
              </div>
              <div className="flex flex-row gap-2 items-center">
                <Label className="w-1/4">Website</Label>
                <TextInput type="text" label="Website" className="flex-grow" />
              </div>
              <Button className="mt-4">Save</Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Setting;
