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
      message: "Password must contain at least 1 special character",
    }),
  name: z.string().min(3).max(50),
  address: z.string().max(100),
  phone: z.string().min(10).max(13),
  email: z.string().email(),
  description: z.string().max(200),
});

const OrphanageSignUp = () => {
  const navigate = useNavigate();
  const orphanageForm = useForm({
    defaultValues: {
      username: "",
      password: "",
      name: "",
      address: "",
      phone: "",
      email: "",
      description: "",
    },
    resolver: zodResolver(orphanageFormSchema),
  });

  const { setError, clearErrors } = orphanageForm;
  const password = useWatch({ control: orphanageForm.control, name: "password" });

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

  const registerOrphanage = async data => {
    // Memeriksa apakah nama panti sudah ada
    const existingOrphanageResponse = await axiosInstance.get(
      `/orphanages?name=${data.name}`
    );
    if (existingOrphanageResponse.data.length > 0) {
      throw new Error("Orphanage name already exists");
    }

    const userData = {
      username: data.username,
      password: data.password,
      role: "orphanagase", // Menambahkan role orphanagase
    };
    const orphanageData = {
      name: data.name,
      address: data.address,
      phone: data.phone,
      email: data.email,
      description: data.description,
    };

    // Menyimpan data ke tabel users
    const userResponse = await axiosInstance.post("/users", userData);

    // Menyimpan data ke tabel orphanages
    const orphanageResponse = await axiosInstance.post(
      "/orphanages",
      orphanageData
    );

    return orphanageResponse.data;
  };

  const onSubmit = async data => {
    try {
      // Memeriksa apakah username sudah ada
      const existingUserResponse = await axiosInstance.get(
        `/users?username=${data.username}`
      );
      if (existingUserResponse.data.length > 0) {
        throw new Error("Username already exists");
      }

      await registerOrphanage(data);
      toast.success("Orphanage registered successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Orphanage Sign Up</title>
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
              Orphanage Sign Up
            </h1>
          </CardHeader>
          <Divider />
          <CardBody>
            <form
              className="flex flex-col justify-center"
              onSubmit={orphanageForm.handleSubmit(onSubmit)}
            >
              <Controller
                name="username"
                control={orphanageForm.control}
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
                name="password"
                control={orphanageForm.control}
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
                      <span className="text-red-500">{error.message}</span>
                    )}
                  </>
                )}
              />
              <Controller
                name="name"
                control={orphanageForm.control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input
                      {...field}
                      label="Orphanage Name"
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
                name="address"
                control={orphanageForm.control}
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
              <Controller
                name="phone"
                control={orphanageForm.control}
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
                name="email"
                control={orphanageForm.control}
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
                      <span className="text-red-500">{error.message}</span>
                    )}
                  </>
                )}
              />
              <Controller
                name="description"
                control={orphanageForm.control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Textarea
                      {...field}
                      label="Description"
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

export default OrphanageSignUp;
