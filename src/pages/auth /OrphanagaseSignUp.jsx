import React, { useState } from "react";
import axiosInstance from "../../lib/axiosInstance";
import { Button, Card, CardBody, CardHeader, Divider, Input, Textarea } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";  


const signupFormSchema = z.object({
  username: z.string().min(3).max(20),
  password: z
    .string()
    .min(6)
    .max(20)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/
    ),  
  email: z.string().email(),
  phone: z.string().min(10).max(13),
  address: z.string().max(100),
  website: z.string().max(100),
  description: z.string().max(100),
  status: z.string().max(100),
});

const OrphanagaseSignUp = () => {

  const signupForm = useForm({
    defaultValues: {
      username: "",
      password: "",
      email: "",
      phone: "",
      address: "",
      website: "",
      description: "",
      status: "",
    },
    resolver: zodResolver(signupFormSchema),
  });

  const registerOrphanage = async data => {
    const response = await axiosInstance.post("/users", data);
    return response.data;
  };

  return (
    <>
      <Helmet>
        <title>Orphanagase Sign Up</title>
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
            Orphanagase Sign Up
          </h1>
        </CardHeader>
        <Divider />
        <CardBody>
            <form className="flex flex-col justify-center" onSubmit={signupForm.handleSubmit(registerOrphanage)}>
            <Controller 
                name="username"
                control={signupForm.control}
                render={({field}) => (
                    <Input
                        label="Username"
                        className="mb-4"
                        bordered color="primary"    
                        isInvalid={Boolean(signupForm.formState.errors.username)}
                        errorMessage={signupForm.formState.errors.username?.message}
                        {...field}
                        style={{ border: 'none', outline: 'none' }}
                    />
                )}
                defaultValue=""
            />
            <Controller
                name="password"
                control={signupForm.control}
                render={({field}) => (
                    <Input
                        label="Password"
                        className="mb-4"
                        type="password"
                        bordered color="primary"
                        isInvalid={Boolean(signupForm.formState.errors.password)}
                        errorMessage={signupForm.formState.errors.password?.message}
                        style={{ border: 'none', outline: 'none' }} 
                        {...field}
                    />
                )}
                defaultValue=""
            />
            <Controller
                name="email"
                control={signupForm.control}
                render={({field}) => (
                    <Input
                        label="Email"
                        className="mb-4"
                        bordered color="primary"
                        isInvalid={Boolean(signupForm.formState.errors.email)}
                        errorMessage={signupForm.formState.errors.email?.message}
                        {...field}
                        type="email"
                        style={{ border: 'none', outline: 'none' }}
                    />
                )}
                defaultValue=""
            />
            <Controller
                name="phone"
                control={signupForm.control}
                render={({field}) => (
                    <Input
                        label="Phone"
                        className="mb-4"
                        {...field}
                        bordered color="primary"
                        isInvalid={Boolean(signupForm.formState.errors.phone)}
                        errorMessage={signupForm.formState.errors.phone?.message}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        style={{ border: 'none', outline: 'none' }}
                        onInput={(e) => {
                            e.target.value = e.target.value.replace(/[^0-9]/g, '');
                        }}
                    />
                )}
                defaultValue=""
            />  
            <Controller
                name="address"
                control={signupForm.control}
                render={({field}) => (
                    <Textarea
                        label="Address"                       
                        className="mb-4"
                        {...field}
                        bordered color="primary"
                        isInvalid={Boolean(signupForm.formState.errors.address)}
                        errorMessage={signupForm.formState.errors.address?.message}
                        type="textarea"
                        style={{ border: 'none', outline: 'none' }}
                    />
                )}
                defaultValue=""
            />  
            <Controller
                name="website"
                control={signupForm.control}
                render={({field}) => (
                    <Input
                        label="Website"
                        className="mb-4"
                        {...field}
                        bordered color="primary"
                        isInvalid={Boolean(signupForm.formState.errors.website)}
                        errorMessage={signupForm.formState.errors.website?.message}
                        type="url"
                        style={{ border: 'none', outline: 'none' }}
                    />
                )}
                defaultValue=""
            />
            <Controller
                name="description"
                control={signupForm.control}
                render={({field}) => (
                    <Textarea
                        label="Description"
                        className="mb-4"
                        {...field}
                        bordered color="primary"
                        isInvalid={Boolean(signupForm.formState.errors.description)}
                        errorMessage={signupForm.formState.errors.description?.message}
                        type="textarea"
                        style={{ border: 'none', outline: 'none'}}
                    />
                )}
                defaultValue=""
            />
            <Button type="submit" className="bg-blue-500 text-white">Sign Up</Button>
            <p className="text-center mt-4">Already have an account? <Link to="/login" className="text-blue-500">Login</Link></p>
            </form>
        </CardBody>
      </Card>
      </div>
    </>
  );
};

export default OrphanagaseSignUp;