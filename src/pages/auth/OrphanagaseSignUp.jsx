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
import React from "react";
import { Helmet } from "react-helmet";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import axiosInstance from "../../lib/axiosInstance";
import { toast } from "react-toastify";

const orphanageFormSchema = z.object({
  username: z.string().min(3).max(20)
    .refine(val => !/\s/.test(val), "Username tidak boleh mengandung spasi")
    .refine(val => !/^[0-9]/.test(val), "Username tidak boleh dimulai dengan angka")
    .refine(val => !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val), "Username tidak boleh mengandung karakter khusus"),
  password: z.string().min(8).max(20)
    .refine(val => /[A-Z]/.test(val), "Password harus mengandung minimal 1 huruf besar")
    .refine(val => /[a-z]/.test(val), "Password harus mengandung minimal 1 huruf kecil")
    .refine(val => /\d/.test(val), "Password harus mengandung minimal 1 angka")
    .refine(val => /[@$!%*?&]/.test(val), "Password harus mengandung minimal 1 karakter khusus"),
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
  const { control, handleSubmit, setError, clearErrors, formState: { errors } } = useForm({
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

  const password = useWatch({ control, name: "password" });

  React.useEffect(() => {
    const passwordErrors = [
      { condition: !/[A-Z]/.test(password), message: "Password harus mengandung minimal 1 huruf besar" },
      { condition: !/[a-z]/.test(password), message: "Password harus mengandung minimal 1 huruf kecil" },
      { condition: !/\d/.test(password), message: "Password harus mengandung minimal 1 angka" },
      { condition: !/[@$!%*?&]/.test(password), message: "Password harus mengandung minimal 1 karakter khusus" },
    ].filter(({ condition }) => condition).map(({ message }) => message);

    if (passwordErrors.length > 0) {
      setError("password", { type: "manual", message: passwordErrors.join(", ") });
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

  return (
    <div>
      <Helmet>
        <title>Pendaftaran Panti Asuhan</title>
      </Helmet>
      <Link to="/" className="w-10 h-10">
        <img src="https://img.icons8.com/?size=100&id=jqVLTIkbz7hy&format=png&color=228BE6" alt="kembali" className="w-10 h-10" />
      </Link>
      <Card className="w-full max-w-md mx-auto mt-10">
        <CardHeader>
          <h1 className="text-2xl font-semibold mb-2 text-center">Pendaftaran Panti Asuhan</h1>
        </CardHeader>
        <Divider />
        <CardBody>
          <form
            className="flex flex-col justify-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            {renderInput("username", "Username", "text", {}, control, errors)}
            {renderInput("password", "Password", "password", {}, control, errors)}
            {renderInput("orphanages.name", "Nama Panti Asuhan", "text", {}, control, errors)}
            {renderInput("orphanages.email", "Email", "email", {}, control, errors)}
            {renderInput("orphanages.phone_number", "Nomor Telepon", "text", {
              inputMode: "numeric",
              pattern: "[0-9]*",
              onInput: (e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, "");
              },
            }, control, errors)}
            <Controller
              name="orphanages.address"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Textarea
                    {...field}
                    label="Alamat"
                    className="mb-4"
                    style={{ border: "none", outline: "none" }}
                  />
                  {error && (
                    <span className="text-red-500 text-sm">{error.message}</span>
                  )}
                </>
              )}
            />
            <Controller
              name="orphanages.description"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Textarea
                    {...field}
                    label="Deskripsi"
                    className="mb-4"
                    style={{ border: "none", outline: "none" }}
                  />
                  {error && (
                    <span className="text-red-500 text-sm">{error.message}</span>
                  )}
                </>
              )}
            />
            <Controller
              name="orphanages.web_url"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Input
                    {...field}
                    label="URL Website (opsional)"
                    className="mb-4"
                    style={{ border: "none", outline: "none" }}
                    type="text"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "") {
                        field.onChange(""); // Ubah "-" menjadi string kosong
                        clearErrors("orphanages.web_url");
                      } else if (!/\.\w{2,}$/.test(value)) {
                        setError("orphanages.web_url", { type: "manual", message: "URL harus mengandung .com, .id, atau . lainnya" });
                      } else {
                        clearErrors("orphanages.web_url");
                        field.onChange(value);
                      }
                    }}
                  />
                  {error && (
                    <span className="text-red-500 text-sm">{error.message}</span>
                  )}
                </>
              )}
            />
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

const renderInput = (name, label, type = "text", props = {}, control, errors) => {
  const fieldErrors = name.split('.').reduce((obj, key) => obj && obj[key], errors) || {};
  
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <>
          <Input
            {...field}
            {...props}
            label={label}
            className="mb-4"
            style={{ border: "none", outline: "none" }}
            type={type}
          />
          {field.value && fieldErrors.message && (
            <span className="text-red-500">{fieldErrors.message.split(", ")[0]}</span>
          )}
        </>
      )}
    />
  );
};

export default OrphanageSignUp;
