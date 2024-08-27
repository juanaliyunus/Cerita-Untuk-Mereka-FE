import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import axiosInstance from '../../lib/axiosInstance';
import { Card, CardBody, CardFooter, CardHeader, Checkbox, Input } from "@nextui-org/react";
import { Button, ButtonGroup } from "flowbite-react";
import * as jwt_decode from "jwt-decode";

const AuthPage = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(darkModeMediaQuery.matches);

    const handleChange = (e) => setIsDarkMode(e.matches);
    darkModeMediaQuery.addEventListener("change", handleChange);

    return () => darkModeMediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
    if (token) {
      const user = jwt_decode(token);
      if (user.role === 'donatur') {
        navigate("/donatur-dashboard");
      } else if (user.role === 'orphanage') {
        navigate("/orphanage-dashboard");
      }
    }
  }, [navigate]);

  const loginSchema = z.object({
    username: z.string().min(3).max(20),
    password: z.string().min(8),
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = {
      username: e.target.username.value,
      password: e.target.password.value,
    };

    const result = loginSchema.safeParse(formData);
    if (!result.success) {
      console.error('Validation error:', result.error.errors);
      return;
    }

    try {
      const response = await axiosInstance.post('/login', formData);
      const token = response.data.token;
      const user = jwt_decode(token);

      if (rememberMe) {
        Cookies.set('token', token, { expires: 7 });
      } else {
        localStorage.setItem('token', token);
      }

      // Simpan role dan id ke localStorage
      localStorage.setItem('role', user.role);
      localStorage.setItem('id', user.id);

      if (user.role === 'donatur') {
        navigate("/donatur-dashboard");
      } else if (user.role === 'orphanage') {
        navigate("/orphanage-dashboard");
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Auth Page</title>
      </Helmet>
      <Link to="/" className="w-10 h-10">
        <img src={"https://img.icons8.com/?size=100&id=Knx9yksqRI1K&format=png&color=000000"} alt="back" className="w-10 h-10" />
      </Link>
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col justify-start items-center">
          <div className="space-y-8">
            {!showRegister ? (
              <div>
                  <Card>
                    <CardHeader>
                      <h1 className="text-2xl font-semibold mb-2 text-center">Login</h1>
                    </CardHeader>
                    <CardBody>
                      <form onSubmit={handleLogin}>
                        <Input 
                          label="Username"
                          name="username" 
                          className="mb-4"
                          style={{ border: 'none', outline: 'none' }}
                        />
                        <Input 
                          label="Password"
                          name="password"
                          className="mb-4"
                          type="password"
                          style={{ border: 'none', outline: 'none' }}
                        />
                        <Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}>Remember me</Checkbox>
                        <Button type="submit" color="blue" className="mt-2 w-full">Login</Button>
                      </form>
                    </CardBody>
                    <CardFooter>
                      <p className="text-center">Don't have an account? <Link onClick={() => setShowRegister(true)} className="text-blue-500">Register</Link></p>
                    </CardFooter>
                  </Card>
              </div>
            ) : (
              <div>
                <Card className="w-full max-w-md mx-auto mt-10">
                  <CardHeader className="flex justify-center">
                    <h1 className="text-2xl font-semibold">Register</h1>
                  </CardHeader>
                  <CardBody className="flex flex-row gap-2 items-center justify-center">
                    <Button onClick={() => navigate("/donatur-signup")} color="blue" className="mt-2">Donatur</Button>
                    <Button onClick={() => navigate("/orphanage-signup")} color="blue" className="mt-2">Orphanage</Button>
                  </CardBody>
                  <CardFooter className="flex justify-center">
                    <p className="text-center">Already have an account? <Link onClick={() => setShowRegister(false)} className="text-blue-500">Login</Link></p>
                  </CardFooter>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;