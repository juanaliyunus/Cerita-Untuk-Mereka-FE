import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, CardBody, CardHeader, Divider, Input, Textarea } from '@nextui-org/react';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';

const signupFormSchema = z.object({
    username: z.string().min(3).max(20),
    fullname: z.string().min(3).max(20),
    password: z.string().min(6).max(20).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/),
    email: z.string().email(),
    phone: z.string().min(10).max(13),
    address: z.string().max(100),
});

const DonaturSignUp = () => {
    
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

const registerDonatur = async data => {
    const response = await axiosInstance.post("/users", data);
    return response.data;
}

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
                        <form className="flex flex-col justify-center" onSubmit={signupForm.handleSubmit(registerDonatur)}>
                        <Controller
                            name="username"
                            control={signupForm.control}
                            render={({field}) => (
                                <Input
                                    {...field}
                                    label="Username"
                                    className="mb-4"
                                    style={{ border: 'none', outline: 'none' }}
                                />
                            )}
                        />
                        <Controller
                            name="fullname"
                            control={signupForm.control}
                            render={({field}) => (
                                <Input
                                    {...field}
                                    label="Fullname"
                                    className="mb-4"
                                    style={{ border: 'none', outline: 'none' }}
                                />
                            )}
                        />
                        <Controller
                            name="password"
                            control={signupForm.control}
                            render={({field}) => (
                                <Input
                                    {...field}
                                    label="Password"
                                    className="mb-4"
                                    type="password"
                                    style={{ border: 'none', outline: 'none' }}
                                />
                            )}
                        />  
                        <Controller
                            name="email"
                            control={signupForm.control}
                            render={({field}) => (
                                <Input
                                    {...field}
                                    label="Email"
                                    className="mb-4"
                                    type="email"
                                    style={{ border: 'none', outline: 'none' }}
                                />
                            )}
                        />  
                        <Controller
                            name="phone"
                            control={signupForm.control}
                            render={({field}) => (
                                <Input
                                    {...field}
                                    label="Phone"
                                    className="mb-4"
                                    type="phone"
                                    style={{ border: 'none', outline: 'none' }}
                                />
                            )}
                        />
                        <Controller
                            name="address"
                            control={signupForm.control}
                            render={({field}) => (
                                <Textarea
                                    {...field}
                                    label="Address"
                                    className="mb-4"
                                    style={{ border: 'none', outline: 'none' }}
                                />
                            )}
                        />
                        <Button type="submit" color='primary'>Sign Up</Button>
                        <p className='text-center mt-2'>Already have an account? <Link to="/login" className='text-blue-500'>Login</Link></p>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default DonaturSignUp;
