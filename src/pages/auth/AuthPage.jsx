import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Input,
} from "@nextui-org/react";
import { Button } from "flowbite-react";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import axiosInstance from "../../lib/axiosInstance";
import LogoBlack from "../../assets/LogoBlack.png";


const loginSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(8),
});

const AuthPage = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showError, setShowError] = useState(false); // Tambahkan state untuk error
  const [errorMessage, setErrorMessage] = useState(""); // Tambahkan state untuk pesan kesalahan
  const [usernameError, setUsernameError] = useState(""); // Tambahkan state untuk error username
  const [passwordError, setPasswordError] = useState(""); // Tambahkan state untuk error password
  const navigate = useNavigate();

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    setIsDarkMode(darkModeMediaQuery.matches);

    const handleChange = (e) => setIsDarkMode(e.matches);
    darkModeMediaQuery.addEventListener("change", handleChange);

    return () => darkModeMediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
    // const token = localStorage.getItem("token");
    if (!token === null) {
      console.log(token)
      const user = jwtDecode(token);
      console.log(user.role);
      if (user.role === "ROLE_DONOR") {
        navigate("/donatur-dashboard");
      } else if (user.role === "ROLE_ORPHANAGE") {
        navigate("/orphanage-dashboard");
      }
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    let hasError = false;

    if (!username) {
      setUsernameError("Username tidak boleh kosong");
      hasError = true;
    } else{
      setUsernameError("");
    }

    if (!password) {
      setPasswordError("Password tidak boleh kosong");
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (hasError) return;

    const formData = { username, password };
    const result = loginSchema.safeParse(formData);
    if (!result.success) {
      console.error("Validation error:", result.error.errors);
      setErrorMessage("Username atau Password Salah");
      return;
    }

    try {
      const response = await axiosInstance.post("/auth/login", formData);
      const token = response.data.data.token;
      console.log("test: ", response);
      if (typeof token !== "string") {
        throw new Error("Invalid token format");
      }

      const user = jwtDecode(token);

      if (rememberMe) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }

      if (user.role === "ROLE_DONOR") {
        navigate("/donatur-dashboard");
      } else if (user.role === "ROLE_ORPHANAGES") {
        navigate("/orphanage-dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.code === "ERR_NETWORK") {
        setErrorMessage("Kesalahan jaringan. Pastikan Anda terhubung ke internet dan server berjalan.");
      } else if (error.response) {
        if (error.response.status === 401) {
          console.error("Error 401:", error.response.data);
          setShowError(true);
          setErrorMessage("Username atau Password Salah");
        } else if(error.response.status === 400){
          setShowError(true);
          setErrorMessage(`username/password tidak boleh kosong`);
        }
      } else if (error.request) {
        setErrorMessage("Tidak dapat terhubung ke server. Periksa koneksi Anda.");
      } else {
        setErrorMessage("Terjadi kesalahan saat mengirim permintaan.");
      }
    }
  };

  return (
    <>
  <Helmet>
    <title>Auth Page</title>
  </Helmet>
  <Link to="/" className="absolute top-5 left-5">
    <img
      src="https://img.icons8.com/?size=100&id=Knx9yksqRI1K&format=png&color=000000"
      alt="back"
      className="w-10 h-10"
    />
  </Link>
  <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full">
      {!showRegister ? (
        <div>
          <div className="flex flex-col items-center">
            <img src={LogoBlack} alt="logo" className="w-16 h-16 mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Login</h1>
          </div>
          {errorMessage && (
            <p className="text-red-500 text-xs mb-4">{errorMessage}</p>
          )}
          <form onSubmit={handleLogin}>
            <Input
              label="Username"
              name="username"
              className="mb-4 w-full"
              style={{ border: "none", outline: "none" }}
              onChange={() => {
                setUsernameError("");
                setErrorMessage("");
              }}
            />
            {usernameError && (
              <p className="text-red-500 text-xs mb-4">{usernameError}</p>
            )}
            <Input
              label="Password"
              name="password"
              className="mb-4 w-full"
              type="password"
              style={{ border: "none", outline: "none" }}
              onChange={() => {
                setPasswordError("");
                setErrorMessage("");
              }}
            />
            {passwordError && (
              <p className="text-red-500 text-xs mb-4">{passwordError}</p>
            )}
            <div className="flex justify-between items-center mb-6">
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              >
                Remember me
              </Checkbox>
            </div>
            <Button type="submit" color="blue" className="w-full">
              Login
            </Button>
          </form>
          <p className="text-center mt-6">
            Don't have an account?{" "}
            <Link
              onClick={() => setShowRegister(true)}
              className="text-blue-500"
            >
              Register
            </Link>
          </p>
        </div>
      ) : (
        <div>
          <div className="flex flex-col items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Register</h1>
          </div>
          <div className="flex justify-between gap-4 mb-6">
            <Button
              onClick={() => navigate("/donatur-signup")}
              color="blue"
              className="w-full"
            >
              Donatur
            </Button>
            <Button
              onClick={() => navigate("/orphanage-signup")}
              color="blue"
              className="w-full"
            >
              Orphanage
            </Button>
          </div>
          <p className="text-center">
            Already have an account?{" "}
            <Link
              onClick={() => setShowRegister(false)}
              className="text-blue-500"
            >
              Login
            </Link>
          </p>
        </div>
      )}
    </div>
  </div>
</>
  );
}

export default AuthPage;
