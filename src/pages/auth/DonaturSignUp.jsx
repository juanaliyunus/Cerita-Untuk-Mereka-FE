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
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import axiosInstance from "../../lib/axiosInstance";
import { toast } from "react-toastify"; // Import toast

const signupFormSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(20)
    .refine(val => !/\s/.test(val), {
      message: "Username must not contain spaces",
    })
    .refine(val => !/^[0-9]/.test(val), {
      message: "Username must not start with a number",
    })
    .refine(val => !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val), {
      message: "Username must not contain special characters",
    })
    .refine(val => !/[^\w\s]/.test(val), {
      message: "Username must not contain special characters",
    }),
  fullname: z.string().min(3).max(20),
  password: z
    .string()
    .min(8)
    .max(20)
    .refine(val => /[A-Z]/.test(val), {
      message: "Password must contain at least 1 uppercase letter",
    })
    .refine(val => /[a-z]/.test(val), {
      message: "Password must contain at least 1 lowercase letter",
    })
    .refine(val => /\d/.test(val), {
      message: "Password must contain at least 1 number",
    })
    .refine(val => /[@$!%*?&]/.test(val), {
      message:
        "Password must contain at least 1 special character such as @$!%*?&",
    }),
  email: z.string().email({ message: "Email tidak valid" }), // Perbaikan di sini
  phone: z.string().min(10).max(13),
  address: z.string().max(100),
});

const DonaturSignUp = () => {
  const navigate = useNavigate();
  const signupForm = useForm({
    defaultValues: {
      username: "",
      fullname: "",
      password: "",
      email: "",
      phone: "",
      address: "",
    },
    resolver: zodResolver(signupFormSchema),
  });

  const { watch, setError, clearErrors } = signupForm;
  const password = watch("password");

  React.useEffect(() => {
    const passwordErrors = [];
    if (password && !/[A-Z]/.test(password)) {
      passwordErrors.push("Password must contain at least 1 uppercase letter");
    }
    if (password && !/[a-z]/.test(password)) {
      passwordErrors.push("Password must contain at least 1 lowercase letter");
    }
    if (password && !/\d/.test(password)) {
      passwordErrors.push("Password must contain at least 1 number");
    }
    if (password && !/[@$!%*?&]/.test(password)) {
      passwordErrors.push("Password must contain at least 1 special character such as @$!%*?&");
    }

    if (passwordErrors.length > 0) {
      setError("password", { type: "manual", message: passwordErrors.join(", ") });
    } else {
      clearErrors("password");
    }
  }, [password, setError, clearErrors]);

  const registerDonatur = async data => {
    // Memisahkan data untuk tabel users dan donors
    const userData = {
      username: data.username,
      password: data.password,
      role: "donor", // Menambahkan role donatur
    };
    const donorData = {
      fullname: data.fullname,
      email: data.email,
      phone: data.phone,
      address: data.address,
    };

    // Menyimpan data ke tabel users
    const userResponse = await axiosInstance.post("/users", userData);

    // Menyimpan data ke tabel donors
    const donorResponse = await axiosInstance.post("/donors", donorData);

    return { user: userResponse.data, donor: donorResponse.data };
  };

  const onSubmit = async data => {
    console.log("Form submitted", data); // Tambahkan log di sini
    try {
      // Memeriksa apakah username sudah ada
      const existingUserResponse = await axiosInstance.get(
        `/users?username=${data.username}`
      );
      if (existingUserResponse.data.length > 0) {
        throw new Error("Username already exists");
      }

      await registerDonatur(data);
      toast.success("Register Success");
      navigate("/login");
      // Handle success (e.g., redirect to login page)
    } catch (error) {
      // Handle error (e.g., show error message)
      toast.error(error.message); // Menampilkan notifikasi error
    }
  };

  return (
    <div>
      <Helmet>
        <title>Donatur Sign Up</title>
      </Helmet>
      <Link to="/" className="w-10 h-10">
        <img
          src={
            "https://img.icons8.com/?size=100&id=jqVLTIkbz7hy&format=png&color=228BE6"
          }
          alt="back"
          className="w-10 h-10"
        />
      </Link>
      <div>
        <Card className="w-full max-w-md mx-auto mt-10">
          <CardHeader>
            <h1 className="text-2xl font-semibold mb-2 text-center">
              Donatur Sign Up
            </h1>
          </CardHeader>
          <Divider />
          <CardBody>
            <form
              className="flex flex-col justify-center"
              onSubmit={signupForm.handleSubmit(onSubmit)} // Pastikan ini sudah benar
            >
              <Controller
                name="username"
                control={signupForm.control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input
                      {...field}
                      label="Username"
                      className="mb-4"
                      style={{ border: "none", outline: "none" }}
                    />
                    {error && (
                      <span className="text-red-500">{error.message}</span>
                    )}
                  </>
                )}
              />
              <Controller
                name="fullname"
                control={signupForm.control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input
                      {...field}
                      label="Fullname"
                      className="mb-4"
                      style={{ border: "none", outline: "none" }}
                    />
                    {error && (
                      <span className="text-red-500">{error.message}</span>
                    )}
                  </>
                )}
              />
              <Controller
                name="password"
                control={signupForm.control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input
                      {...field}
                      label="Password"
                      className="mb-4"
                      type="password"
                      style={{ border: "none", outline: "none" }}
                    />
                    {error && (
                      <span className="text-red-500 text-sm">
                        {error.message}
                      </span>
                    )}
                  </>
                )}
              />
              <Controller
                name="email"
                control={signupForm.control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input
                      {...field}
                      label="Email"
                      className="mb-4"
                      type="email"
                      style={{ border: "none", outline: "none" }}
                    />
                    {error && (
                      <span className="text-red-500">{error.message}</span> // Menampilkan pesan kesalahan
                    )}
                  </>
                )}
              />
              <Controller
                name="phone"
                control={signupForm.control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input
                      {...field}
                      label="Phone"
                      className="mb-4"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      style={{ border: "none", outline: "none" }}
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/[^0-9]/g, '');
                      }} // Menghapus karakter non-angka saat diinput
                    />
                    {error && (
                      <span className="text-red-500">{error.message}</span>
                    )}
                  </>
                )}
              />
              <Controller
                name="address"
                control={signupForm.control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Textarea
                      {...field}
                      label="Address"
                      className="mb-4"
                      style={{ border: "none", outline: "none" }}
                    />
                    {error && (
                      <span className="text-red-500">{error.message}</span>
                    )}
                  </>
                )}
              />
              <Button type="submit" color="primary">
                Sign Up
              </Button>
              <p className="text-center mt-2">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-500">
                  Login
                </Link>
              </p>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default DonaturSignUp;
