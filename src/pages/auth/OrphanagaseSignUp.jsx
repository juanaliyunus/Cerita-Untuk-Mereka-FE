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

const OrphanageSignUp = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, watch, setError, clearErrors } = useForm({
    defaultValues: {
      username: "",
      password: "",
      orphanages: {
        name: "",
        address: "",
        phone_number: "",
        email: "",
        description: "",
        web_url: "",
      },
    },
    resolver: zodResolver(orphanageFormSchema),
  });

  const password = watch("password");
  const username = watch("username");
  const email = watch("orphanages.email");
  const phone_number = watch("orphanages.phone_number");
  const url = watch("orphanages.web_url");

  useEffect(() => {
    const usernameErrors = [];
    if (username) {
      if (/\s/.test(username))
        usernameErrors.push("Username tidak boleh mengandung spasi");
      if (username.length < 3)
        usernameErrors.push("Username harus memiliki minimal 3 karakter");
      if (username.length > 20)
        usernameErrors.push("Username tidak boleh lebih dari 20 karakter");
      if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(username))
        usernameErrors.push("Username tidak boleh mengandung karakter khusus");
      if (/^[0-9]/.test(username))
        usernameErrors.push("Username tidak boleh dimulai dengan angka");
    }

    if (usernameErrors.length > 0) {
      setError("username", {
        type: "manual",
        message: usernameErrors.join(", "),
      });
    } else {
      clearErrors("username");
    }
  }, [username, setError, clearErrors]);

  useEffect(() => {
    const emailErrors = [];
    if (email) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        emailErrors.push("Email tidak valid");
    }

    if (emailErrors.length > 0) {
      setError("orphanages.email", {
        type: "manual",
        message: emailErrors.join(", "),
      });
    } else {
      clearErrors("orphanages.email");
    }
  }, [email, setError, clearErrors]);

  useEffect(() => {
    const urlErrors = [];
    if (url) {
      if (!/\./.test(url) && !/-/.test(url))
        urlErrors.push("URL harus mengandung .com, .id, atau . lainnya, atau -");
      if (/\s/.test(url))
        urlErrors.push("URL tidak boleh mengandung spasi");
    }

    if (urlErrors.length > 0) {
      setError("orphanages.web_url", {
        type: "manual",
        message: urlErrors.join(", "),
      });
    } else {
      clearErrors("orphanages.web_url");
    }
  }, [url, setError, clearErrors]);

  useEffect(() => {
    const phone_numberErrors = [];
    if (phone_number) {
      if (!/^0[0-9]{9,12}$/.test(phone_number))
        phone_numberErrors.push("Nomor telepon harus diawali dengan 0 dan memiliki 10-13 digit");
    }

    if (phone_numberErrors.length > 0) {
      setError("orphanages.phone_number", {
        type: "manual",
        message: phone_numberErrors.join(", "),
      });
    } else {
      clearErrors("orphanages.phone_number");
    }
  }, [phone_number, setError, clearErrors]);

  useEffect(() => {
    const passwordErrors = [];
    if (password) {
      if (!/[A-Z]/.test(password))
        passwordErrors.push("Password harus mengandung minimal 1 huruf besar");
      if (!/[a-z]/.test(password))
        passwordErrors.push("Password harus mengandung minimal 1 huruf kecil");
      if (!/\d/.test(password))
        passwordErrors.push("Password harus mengandung minimal 1 angka");
      if (!/[@$!%*?&]/.test(password))
        passwordErrors.push(
          "Password harus mengandung minimal 1 karakter khusus seperti @$!%*?&"
        );
    }

    if (passwordErrors.length > 0) {
      setError("password", {
        type: "manual",
        message: passwordErrors.join(", "),
      });
    } else {
      clearErrors("password");
    }
  }, [password, setError, clearErrors]);

  const onSubmit = async (data) => {
    console.log("Form submitted", data); // Tambahkan logging di sini
    try {
      const response = await axiosInstance.post('/auth/register/orphanages', data);
      if (response.status === 201 || response.status === 200) {
        toast.success("Pendaftaran berhasil");
        navigate("/login");
      }
    } catch (error) {
      handleRegistrationError(error);
    }
  };

  const handleRegistrationError = (error) => {
    if (!error.response) {
      toast.error("Tidak dapat terhubung ke server. Periksa koneksi Anda.");
      return;
    }

    const { data } = error.response;
    if (data.errors) {
      Object.entries(data.errors).forEach(([field, messages]) => {
        setError(field, { type: "manual", message: messages.join(", ") });
      });
    } else if (data.message) {
      handleSpecificError(data.message);
    } else {
      toast.error(`Kesalahan: ${error.response.statusText}`);
    }
  };

  const handleSpecificError = (message) => {
    if (message.includes("email sudah digunakan")) {
      setError("email", { type: "manual", message: "Email ini sudah terdaftar" });
    } else if (message.includes("username sudah digunakan")) {
      setError("username", { type: "manual", message: "Username ini sudah digunakan" });
    } else {
      toast.error(`Kesalahan: ${message}`);
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
    <div>
      <Helmet>
        <title>Pendaftaran Panti Asuhan</title>
      </Helmet>
      <Link to="/" className="w-10 h-10">
        <img src="https://img.icons8.com/?size=100&id=jqVLTIkbz7hy&format=png&color=228BE6" alt="kembali" className="w-10 h-10" />
      </Link>
      <Card className="w-full max-w-md mx-auto mt-10">
        <CardHeader className="flex justify-center items-center flex-col">
          <img src={LogoBlack} alt="logo" className="w-10 h-10" />
          <h1 className="text-2xl font-semibold mb-2 text-center">Pendaftaran Panti Asuhan</h1>
        </CardHeader>
        <Divider />
        <CardBody>
          <form
            className="flex flex-col justify-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            {renderInput("username", "Username")}
            {renderInput("password", "Password", "password")}
            {renderInput("orphanages.name", "Nama Panti Asuhan")}
            {renderInput("orphanages.email", "Email", "email")}
            {renderInput("orphanages.phone_number", "Nomor Telepon", "text", {
              inputMode: "numeric",
              pattern: "[0-9]*",
              onInput: (e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, "");
              },
            })}
            {renderTextarea("orphanages.address", "Alamat")}
            {renderTextarea("orphanages.description", "Deskripsi")}
            {renderInput("orphanages.web_url", "URL Website jika tidak memiliki bisa isi dengan: -", "text")}
            <Button type="submit" color="primary">
              Daftar
            </Button>
            <p className="text-center mt-2">
              Sudah punya akun?{" "}
              <Link to="/login" className="text-blue-500">
                Masuk
              </Link>
            </p>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default OrphanageSignUp;