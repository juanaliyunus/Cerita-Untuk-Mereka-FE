import React, { useState, useEffect } from "react";
import SideBarAdmin from "../../component/SideBarAdmin";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { Button, Label, Modal, ModalBody, ModalHeader, TextInput } from "flowbite-react";
import axiosInstance from "../../lib/axiosInstance";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";

const orphanageFormSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(20)
    .refine((val) => !/\s/.test(val), {
      message: "Username tidak boleh mengandung spasi",
    })
    .refine((val) => !/^[0-9]/.test(val), {
      message: "Username tidak boleh dimulai dengan angka",
    })
    .refine((val) => !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val), {
      message: "Username tidak boleh mengandung karakter khusus",
    }),
  password: z
    .string()
    .min(8)
    .max(20)
    .refine((val) => /[A-Z]/.test(val), {
      message: "Password harus mengandung minimal 1 huruf besar",
    })
    .refine((val) => /[a-z]/.test(val), {
      message: "Password harus mengandung minimal 1 huruf kecil",
    })
    .refine((val) => /\d/.test(val), {
      message: "Password harus mengandung minimal 1 angka",
    })
    .refine((val) => /[@$!%*?&]/.test(val), {
      message:
        "Password harus mengandung minimal 1 karakter khusus seperti @$!%*?&",
    }),
  orphanages: z.object({
    name: z.string().min(3).max(50),
    address: z.string().max(100),
    phone_number: z.string().min(10).max(13),
    email: z.string().email(),
    description: z.string().max(200),
    web_url: z.string().url().or(z.literal("")).optional(),
  }),
});

function AddOrphanages() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { control, handleSubmit, setError, clearErrors } = useForm({
    resolver: zodResolver(orphanageFormSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/auth/register/orphanages", data);
      console.log(response);
      setIsModalOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const renderInput = (name, label, type = "text", options = {}) => (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <TextInput
            {...field}
            label={label}
            type={type}
            className="mb-4"
            {...options}
          />
          {error && (
            <span className="text-red-500 text-sm">{error.message}</span>
          )}
        </>
      )}
    />
  );

  return (
    <div className="flex">
      <SideBarAdmin />
      <div className="ml-4 w-3/4">
        <h1 className="text-2xl font-bold">Add Orphanages</h1>
        <Card>
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <Label>Username</Label>
              {renderInput("username", "Username")}
              <Label>Password</Label>
              {renderInput("password", "Password", "password")}
              <Label>Name</Label>
              {renderInput("orphanages.name", "Name")}
              <Label>Address</Label>
              {renderInput("orphanages.address", "Address")}
              <Label>Phone Number</Label>
              {renderInput("orphanages.phone_number", "Phone Number", "text", {
                inputMode: "numeric",
                pattern: "[0-9]*",
                onInput: (e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                },
              })}
              <Label>Email</Label>
              {renderInput("orphanages.email", "Email", "email")}
              <Label>Description</Label>
              {renderInput("orphanages.description", "Description")}
              <Label>Website/URL(Optional)</Label>
              {renderInput("orphanages.web_url", "Website/URL(Optional)", "text")}
              <Button type="submit">Add</Button>
            </form>
          </CardBody>
        </Card>
      </div>
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalHeader>
          <h1>Success</h1>
        </ModalHeader>
        <ModalBody>
          <h1>Success</h1>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default AddOrphanages;
