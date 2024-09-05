import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
  Textarea,
} from "@nextui-org/react";
import { Helmet } from "react-helmet";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { toast } from "react-toastify";
import axiosInstance from "../../lib/axiosInstance";
import LogoBlack from "../../assets/LogoBlack.png";

const signupFormSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(20)
    .regex(/^[^\s\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/, {
      message: "Username tidak valid",
    }),
  password: z
    .string()
    .min(8)
    .max(20)
    .regex(/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])/, {
      message:
        "Password harus mengandung minimal 1 huruf besar, huruf kecil, angka, dan karakter khusus",
    }),
  donor: z.object({
    email: z.string().email({ message: "Email tidak valid" }),
    address: z.string().max(100),
    phone_number: z
      .string()
      .min(10)
      .max(13)
      .regex(/^\d+$/, { message: "Nomor telepon tidak valid" }),
    full_name: z.string().min(3).max(20),
  }),
});

const DonaturSignUp = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, watch, setError, clearErrors } = useForm({
    defaultValues: {
      username: "",
      password: "",
      donor: { email: "", address: "", phone_number: "", full_name: "" },
    },
    resolver: zodResolver(signupFormSchema),
  });

  const password = watch("password");

  useEffect(() => {
    if (password) {
      const passwordErrors = [];
      if (!/[A-Z]/.test(password))
        passwordErrors.push("Password harus mengandung minimal 1 huruf besar");
      if (!/[a-z]/.test(password))
        passwordErrors.push("Password harus mengandung minimal 1 huruf kecil");
      if (!/\d/.test(password))
        passwordErrors.push("Password harus mengandung minimal 1 angka");
      if (!/[@$!%*?&]/.test(password))
        passwordErrors.push(
          "Password harus mengandung minimal 1 karakter khusus"
        );

      if (passwordErrors.length) {
        setError("password", {
          type: "manual",
          message: passwordErrors.join(", "),
        });
      } else {
        clearErrors("password");
      }
    }
  }, [password, setError, clearErrors]);

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/auth/register/donor", data);
      if (response.status === 200 || response.status === 201) {
        toast.success("Pendaftaran berhasil");
        navigate("/login");
      } else {
        throw new Error("Respons tidak diharapkan dari server");
      }
    } catch (error) {
      console.error("Kesalahan saat pendaftaran:", error);
      const errorData = error.response?.data;

      if (errorData) {
        if (errorData.message === "Username already exists") {
          setError("username", {
            type: "manual",
            message: "Username sudah terdaftar",
          });
        } else if (errorData.message === "Email already exists") {
          setError("donor.email", {
            type: "manual",
            message: "Email sudah terdaftar",
          });
        } else {
          toast.error(
            `Kesalahan pendaftaran: ${errorData.message || "Terjadi kesalahan pada server"}`
          );
        }

        if (errorData.errors) {
          Object.entries(errorData.errors).forEach(([field, message]) => {
            setError(field, { type: "manual", message });
          });
        }
      } else if (error.request) {
        toast.error(
          "Tidak dapat terhubung ke server. Periksa koneksi Anda dan coba lagi."
        );
      } else {
        toast.error("Terjadi kesalahan saat pendaftaran. Silakan coba lagi.");
      }
    }
  };

  const renderInput = (name, label, type = "text", options = {}) => (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <Input
            {...field}
            label={label}
            type={type}
            className="mb-4"
            style={{ border: "none", outline: "none" }}
            {...options}
          />
          {error && (
            <span className="text-red-500 text-sm">{error.message}</span>
          )}
        </>
      )}
    />
  );

  const renderTextarea = (name, label) => (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <Textarea
            {...field}
            label={label}
            className="mb-4"
            style={{ border: "none", outline: "none" }}
          />
          {error && (
            <span className="text-red-500 text-sm">{error.message}</span>
          )}
        </>
      )}
    />
  );

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <Helmet>
        <title>Pendaftaran Donatur</title>
      </Helmet>
      <Link to="/" className="absolute top-5 left-5">
        <img
          src="https://img.icons8.com/?size=100&id=jqVLTIkbz7hy&format=png&color=228BE6"
          alt="kembali"
          className="w-10 h-10"
        />
      </Link>
      <Card className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <CardHeader className="flex flex-col items-center mb-4">
          <img src={LogoBlack} alt="logo" className="w-16 h-16 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800">
            Pendaftaran Donatur
          </h1>
        </CardHeader>
        <Divider className="my-4" />
        <CardBody>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {renderInput("username", "Username")}
            {renderInput("donor.full_name", "Nama Lengkap")}
            {renderInput("password", "Password", "password")}
            {renderInput("donor.email", "Email", "email")}
            {renderInput("donor.phone_number", "Nomor Telepon", "text", {
              inputMode: "numeric",
              pattern: "[0-9]*",
              onInput: (e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, "");
              },
            })}
            {renderTextarea("donor.address", "Alamat")}
            <Button type="submit" color="blue" className="w-full py-2">
              Daftar
            </Button>
            <p className="text-center mt-4 text-gray-600">
              Sudah punya akun?{" "}
              <Link to="/login" className="text-blue-500 font-medium">
                Masuk
              </Link>
            </p>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default DonaturSignUp;