import React, { useContext, useEffect, useState } from "react";
import { AvatarContext } from "../context/AvatarContext";
import {
  Button,
  Card,
  Dropdown,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  TextInput,
} from "flowbite-react";
import axiosInstance from "../lib/axiosInstance";
import { jwtDecode } from "jwt-decode";

const Profile = () => {
  const [openModal, setOpenModal] = useState(false);
  const { avatar, setAvatar } = useContext(AvatarContext);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = sessionStorage.getItem("token") || localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const decodedToken = jwtDecode(token);
      console.log("Decoded token data:", decodedToken);

      const url = `/donors/${decodedToken.sub}`;
      console.log("Fetching user data from URL:", url); // Log URL

      try {
        const response = await axiosInstance.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        console.log("Fetched user data:", data); // Log data to check its structure
        setAvatar(data.avatar);
        setFullname(data.fullname);
        setEmail(data.email);
        setPhoneNumber(data.phone_number); // Perbaiki nama properti
        setAddress(data.address);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        if (error.response) {
          console.error("Error response data:", error.response.data);
        } else {
          console.error("Network error or server is down");
        }
      }
    };

    fetchUserData();
  }, []);

  const handleAvatarChange = async event => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("avatar", file);

      const url = "/donors";
      console.log("Uploading avatar to URL:", url); // Log URL

      const token = sessionStorage.getItem("token") || localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const response = await axiosInstance.post(url, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        console.log("Avatar upload response:", data); // Log data to check its structure
        setAvatar(data.avatar);
      } catch (error) {
        console.error("Failed to upload avatar:", error);
        if (error.response) {
          console.error("Error response data:", error.response.data);
        }
      }
    }
  };

  const handleSave = async () => {
    const url = "/donors";
    console.log("Saving profile to URL:", url); // Log URL

    const token = sessionStorage.getItem("token") || localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await axiosInstance.put(url, {
        avatar,
        fullname,
        email,
        password,
        phoneNumber,
        address,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      console.log("Profile save response:", data); // Log data to check its structure
      console.log("Profile saved successfully", data);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save profile:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
      }
    }
  };

  return (
    <>
    <div className="flex justify-center w-screen">
      <Card className="mt-2 mx-9">
        <img src={avatar || ""} className="w-24 h-24 bg-white rounded-full" alt="Avatar" />
        <form className="flex flex-col gap-4">
          <input type="file" onChange={handleAvatarChange} className="mt-2" disabled={!isEditing} />
          <div className="flex items-center">
            <Label className="text-sm font-semibold mr-8 w-24">Full Name</Label>
            <TextInput type="text" placeholder="Full Name" value={fullname || ""} onChange={(e) => setFullname(e.target.value)} disabled={!isEditing} />
          </div>
          <div className="flex items-center">
            <Label className="text-sm font-semibold mr-8 w-24">Email</Label>
            <TextInput type="text" placeholder="Email" value={email || ""} onChange={(e) => setEmail(e.target.value)} disabled={!isEditing} />
          </div>
          <div className="flex items-center">
            <Label className="text-sm font-semibold mr-8 w-24">Password</Label>
            <TextInput type="password" placeholder="Password" value={password || ""} onChange={(e) => setPassword(e.target.value)} disabled={!isEditing} />
          </div>
          <div className="flex items-center">
            <Label className="text-sm font-semibold mr-8 w-24">Phone Number</Label>
            <TextInput type="text" placeholder="Phone Number" value={phoneNumber || ""} onChange={(e) => setPhoneNumber(e.target.value)} disabled={!isEditing} />
          </div>
          <div className="flex items-center">
            <Label className="text-sm font-semibold mr-8 w-24">Address</Label>
            <TextInput type="text" placeholder="Address" value={address || ""} onChange={(e) => setAddress(e.target.value)} disabled={!isEditing} />
          </div>
          <Button
            color="blue"
            className="mt-2"
            onClick={() => {
              if (isEditing) {
                setOpenModal(true);
              } else {
                setIsEditing(true);
              }
            }}
          >
            {isEditing ? "Save" : "Edit"}
          </Button>
          <Modal show={openModal} onClose={() => setOpenModal(false)}>
            <ModalHeader>
              <span className="text-xl font-semibold">Save Profile</span>
            </ModalHeader>
            <ModalBody>
              <p className="text-xl">
                Are you sure you want to save the profile?
              </p>
            </ModalBody>
            <ModalFooter className="flex justify-center">
              <Button
                color="blue"
                onClick={() => {
                  handleSave();
                  setOpenModal(false);
                  setIsEditing(false); // Disable editing mode
                }}
              >
                Save
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </form>
        </Card>
      </div>
    </>
  );
};

export default Profile;