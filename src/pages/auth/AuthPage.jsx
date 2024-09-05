import {
  Checkbox,
  Input,
} from "@nextui-org/react";
import { Button, Modal } from "flowbite-react"; // Import Modal
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
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
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showSignUpModal, setShowSignUpModal] = useState(false); // Modal state for SignUp
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token") || localStorage.getItem("token");
    if (token) {
      const user = jwtDecode(token);
      if (user.role === "ROLE_DONOR") {
        navigate("/donatur-dashboard");
      } else if (user.role === "ROLE_ORPHANAGE") {
        navigate("/orphanage-dashboard");
      }
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { username, password } = e.target.elements;

    let hasError = false;

    if (!username.value) {
      setUsernameError("Username tidak boleh kosong");
      hasError = true;
    } else {
      setUsernameError("");
    }

    if (!password.value) {
      setPasswordError("Password tidak boleh kosong");
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (hasError) return;

    const formData = { username: username.value, password: password.value };
    const result = loginSchema.safeParse(formData);
    if (!result.success) {
      setErrorMessage("Username atau Password Salah");
      return;
    }

    try {
      const response = await axiosInstance.post("/auth/login", formData);
      const token = response.data.data.token;

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
      } else if (user.role === "ROLE_ORPHANAGE") {
        navigate("/orphanage-dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.code === "ERR_NETWORK") {
        setErrorMessage("Kesalahan jaringan. Pastikan Anda terhubung ke internet dan server berjalan.");
      } else if (error.response?.status === 401) {
        setErrorMessage("Username atau Password Salah");
      } else if (error.response?.status === 400) {
        setErrorMessage("Username/password tidak boleh kosong");
      } else {
        setErrorMessage("Terjadi kesalahan saat mengirim permintaan.");
      }
    }
  };

  // Handle sign-up modal
  const handleSignUp = (role) => {
    if (role === "donatur") {
      navigate("/donatur-signup");
    } else if (role === "orphanage") {
      navigate("/orphanage-signup");
    }
    setShowSignUpModal(false);
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
      <div className="flex justify-center items-center min-h-screen bg-[#E0F7FA]">
        <div className="bg-white rounded-lg shadow-lg flex max-w-4xl w-full">
          {/* Left Column - Sign In */}
          <div className="w-1/2 p-10">
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
                onChange={() => {
                  setPasswordError("");
                  setErrorMessage("");
                }}
              />
              {passwordError && (
                <p className="text-red-500 text-xs mb-4">{passwordError}</p>
              )}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm">Remember Me</span>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r  from-blue-300 to-blue-500 text-white py-2 rounded-full"
              >
                Sign In
              </Button>
            </form>
            <div className="flex justify-center mt-6">
              <a href="#" className="text-blue-500 mx-2">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-blue-500 mx-2">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>

          {/* Right Column - Welcome Message */}
          <div className="w-1/2 bg-gradient-to-r from-blue-300 to-blue-500 text-black p-10 rounded-r-lg flex flex-col justify-center items-center">
            <h2 className="text-4xl font-bold mb-6">Welcome Back!</h2>
            <p className="mb-6">Don't have an account?</p>
            <Button
              className="bg-white text-blue-400 py-2 px-6 rounded-full"
              onClick={() => setShowSignUpModal(true)}
            >
              Register
            </Button>
          </div>
        </div>
      </div>

      {/* Modal for Sign-Up */}
      <Modal show={showSignUpModal} onClose={() => setShowSignUpModal(false)}>
        <Modal.Header>Register as</Modal.Header>
        <Modal.Body>
          <div className="flex justify-between gap-4 mb-6 ">
            <Button
              onClick={() => handleSignUp("donatur")}
              className="w-full bg-gradient-to-r from-blue-300 to-blue-500 text-white py-2 rounded-full"
            >
              Donor
            </Button>
            <Button
              onClick={() => handleSignUp("orphanage")}
              className="w-full bg-gradient-to-r from-blue-300 to-blue-500 text-white py-2 rounded-full"
            >
              Orphanage
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>

  );
};

export default AuthPage;
