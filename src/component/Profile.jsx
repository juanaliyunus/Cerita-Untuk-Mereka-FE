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
  const [imagePreview, setImagePreview] = useState(null);

  console.log("fulname =>"+fullname);
  
  const fetchData = async () => {
    const token =
      sessionStorage.getItem("token") || localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    const decodedToken = jwtDecode(token);
    console.log("Decoded token data:", decodedToken);
    const url = `/donors/user/${decodedToken.sub}`;
    console.log("Fetching profile from URL:", url);
    console.log(decodedToken.sub);
    console.log(token);
    
    try {
      const response = await axiosInstance.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Full response data =>", response.data);
      const profileData = response.data.data;
      console.log("Profile data:", profileData);
      console.log(profileData.avatar)
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

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsAvatarChanged(true);
      const formData = new FormData();
      const fileName = file.name.replace(/\s+/g, "_");
      const renamedFile = new File([file], fileName, { type: file.type });
      formData.append("avatar", renamedFile);
      setAvatarFileName(fileName);

      const token = sessionStorage.getItem("token") || localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const response = await axiosInstance.post("/avatars", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });


        setAvatar(response.data.data.avatar);
        setImagePreview(URL.createObjectURL(file)); // Tampilkan pratinjau gambar
      } catch (error) {
        console.error("Failed to upload avatar:", error.response?.data || "Network error or server is down");
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
        <div className="flex h-screen items-start bg-[#E0F7FA]">
      <div className="flex-grow p-5 max-w-3xl mx-auto ">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Profile</h1>
        <Card className="shadow-lg rounded-lg bg-white">
          <CardBody className="p-6">
            <div className="flex flex-col items-center mb-6">
              <Image
                src={
                  imagePreview
                    ? imagePreview
                    : avatar
                    ? `http://10.10.102.142:8080/api/v1/avatars/public/${avatar}`
                    : "path/to/default/avatar.png"
                }
                alt="Avatar"
                className="w-32 h-32 rounded-full border-4 border-blue-500"
              />
              {isEditing && (
                <input
                  type="file"
                  name="avatar"
                  onChange={handleAvatarChange}
                  className="mt-4"
                />
              )}
            </div>
            <form className="space-y-4" encType="multipart/form-data">
              {[
                { label: "Full Name", name: "fullname", value: fullname },
                { label: "Email", name: "email", value: email },
                { label: "Phone Number", name: "phoneNumber", value: phoneNumber },
                { label: "Address", name: "address", value: address }
              ].map(({ label, name, value }) => (
                <div key={name} className="flex items-center gap-4">
                  <Label className="w-1/3 text-right">{label}</Label>
                  <TextInput
                    type="text"
                    name={name}
                    value={value}
                    onChange={handleChange}
                    className="flex-grow rounded-lg p-2"
                    disabled={!isEditing}
                  />
                </div>
              ))}
              <div className="flex justify-end mt-6">
                <Button
                  color="blue"
                  className="px-6 py-2"
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
              </div>
            </form>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
              <ModalHeader>
                <span className="text-xl font-semibold">Save Profile</span>
              </ModalHeader>
              <ModalBody>
                <p className="text-lg text-gray-700">
                  Are you sure you want to save the profile?
                </p>
              </ModalBody>
              <ModalFooter className="flex justify-center space-x-4">
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
          </CardBody>
        </Card>
      </div>
    </div>

  );
};

export default Profile;
