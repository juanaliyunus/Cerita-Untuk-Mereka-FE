import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  TextInput,
} from "flowbite-react";
import { jwtDecode } from "jwt-decode";
import React, { useContext, useEffect, useState } from "react";
import SideBar from "../component/SideBar";
import { AvatarContext } from "../context/AvatarContext";
import axiosInstance from "../lib/axiosInstance";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { avatar, setAvatar } = useContext(AvatarContext);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [isAvatarChanged, setIsAvatarChanged] = useState(false);
  const [avatarFileName, setAvatarFileName] = useState("");
  

  const fetchData = async () => {
    const token =
      sessionStorage.getItem("token") || localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    const decodedToken = jwtDecode(token);
    console.log("Decoded token data:", decodedToken);
    const url = `/donors/${decodedToken.sub}`;
    console.log("Fetching profile from URL:", url);

    try {
      const response = await axiosInstance.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Full response data:", response.data);
      const profileData = response.data.data;
      console.log("Profile data:", profileData);
      setAvatar(profileData.avatar);
      setFullname(profileData.fullname);
      setEmail(profileData.email);
      setPhoneNumber(profileData.phone_number);
      setAddress(profileData.address);
      console.log("Fullname set to:", profileData.fullname);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
      } else {
        console.error("Network error or server is down");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAvatarChange = async event => {
    const file = event.target.files[0];
    if (file) {
      setIsAvatarChanged(true);
      const formData = new FormData();
      const fileName = file.name.replace(/\s+/g, "_");
      const renamedFile = new File([file], fileName, { type: file.type });
      formData.append("avatar", renamedFile);
      setAvatarFileName(fileName);

      const url = "/avatars";
      console.log("Uploading avatar to URL:", url);
      console.log("avatar:", fileName);

      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const response = await axiosInstance.post(url, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Success upload avatar:", response.data);
        setAvatar(response.data.data.avatar);
      } catch (error) {
        console.error("Failed to upload avatar:", error);
        if (error.response) {
          console.error("Error response data:", error.response.data);
        }
      }
    }
  };

  const handleSave = async () => {
    const url = `/donors`;
    console.log("Saving profile to URL:", url);

    const token =
      sessionStorage.getItem("token") || localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }
    const formData = new FormData();
    formData.append("fullname", fullname);
    formData.append("email", email);
    formData.append("phone_number", phoneNumber);
    formData.append("address", address);

    try {
      if (isAvatarChanged) {
        await handleAvatarChange({ target: { files: [avatar] } });
      }
      const response = await axiosInstance.put(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Profile saved successfully", response.data);
      setIsEditing(false);
      fetchData();
    } catch (error) {
      console.error("Failed to save profile:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
      }
    }
  };

  const handleChange = event => {
    const { name, value } = event.target;
    if (name === "fullname") {
      setFullname(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "phoneNumber") {
      setPhoneNumber(value);
    } else if (name === "address") {
      setAddress(value);
    }
  };

  return (
    <div className="flex h-screen items-start">
      <div className="flex-grow flex-wrap p-4">
        <h1 className="text-2xl font-bold">Edit Profile</h1>
        <Card>
          <CardBody>
            <div className="flex flex-row gap-2 items-center justify-center">
              <Image
                src={
                  avatar
                    ? `http://10.10.102.142:8080/api/v1/avatars/public/${avatar}`
                    : "path/to/default/avatar.png"
                }
                alt="Avatar"
                className="w-32 h-32 rounded-full"
              />
            </div>
            <form className="flex flex-col gap-4" encType="multipart/form-data">
              <input
                type="file"
                name="avatar"
                onChange={handleAvatarChange}
                className="mt-2"
                disabled={!isEditing}
              />
              <div className="flex flex-row gap-2 items-center">
                <Label className="w-1/4">Full Name</Label>
                <TextInput
                  type="text"
                  name="fullname"
                  value={fullname}
                  onChange={handleChange}
                  className="flex-grow"
                  disabled={!isEditing}
                />
              </div>
              <div className="flex flex-row gap-2 items-center">
                <Label className="w-1/4">Email</Label>
                <TextInput
                  type="text"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  className="flex-grow"
                  disabled={!isEditing}
                />
              </div>
              <div className="flex flex-row gap-2 items-center">
                <Label className="w-1/4">Phone Number</Label>
                <TextInput
                  type="text"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={handleChange}
                  className="flex-grow"
                  disabled={!isEditing}
                />
              </div>
              <div className="flex flex-row gap-2 items-center">
                <Label className="w-1/4">Address</Label>
                <TextInput
                  type="text"
                  name="address"
                  value={address}
                  onChange={handleChange}
                  className="flex-grow"
                  disabled={!isEditing}
                />
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
                      setIsEditing(false);
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
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
