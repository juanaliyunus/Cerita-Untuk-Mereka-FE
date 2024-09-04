import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import { Button, Label, Modal, ModalBody, ModalFooter, ModalHeader, TextInput } from "flowbite-react";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import SideBar from "../../component/SideBar";
import axiosInstance from "../../lib/axiosInstance";

function ProfileOrphanage() {
  const [isEditing, setIsEditing] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [orphanageId, setOrphanageId] = useState("");
  const [isAvatarChanged, setIsAvatarChanged] = useState(false);
  const [avatarFileName, setAvatarFileName] = useState("");

  const fetchData = async () => {
    const token = sessionStorage.getItem("token") || localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    const decodedToken = jwtDecode(token);
    const url = `/orphanages/by-user/${decodedToken.sub}`;

    try {
      const response = await axiosInstance.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { data } = response.data;
      setAvatar(data.avatar);
      setName(data.name);
      setEmail(data.email);
      setPhone(data.phone_number);
      setAddress(data.address);
      setDescription(data.description);
      setWebsite(data.web_url);
      setOrphanageId(data.id);
    } catch (error) {
      console.error("Failed to fetch user data:", error.response?.data || "Network error or server is down");
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
      } catch (error) {
        console.error("Failed to upload avatar:", error.response?.data || "Network error or server is down");
      }
    }
  };

  const handleSave = async () => {
    const url = `/orphanages/${orphanageId}`;

    const token = sessionStorage.getItem("token") || localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone_number", phone);
    formData.append("address", address);
    formData.append("description", description);
    formData.append("web_url", website);

    try {
      if (isAvatarChanged) {
        await handleAvatarChange({ target: { files: [avatar] } });
      }
      await axiosInstance.put(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setIsEditing(false);
      fetchData();
    } catch (error) {
      console.error("Failed to save profile:", error.response?.data || "Network error or server is down");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "website":
        setWebsite(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <SideBar />
      <div className="flex-grow p-8">
        <Card className="shadow-lg rounded-lg bg-white p-6">
          <CardHeader>
            <h1 className="text-2xl font-semibold text-gray-800">Edit Profile</h1>
          </CardHeader>
          <CardBody>
            <div className="flex justify-center mb-6">
              <img
                src={
                  avatar
                    ? `http://10.10.102.142:8080/api/v1/avatars/public/${avatar}`
                    : 'path/to/default/avatar.png'
                }
                alt="Avatar"
                className="w-32 h-32 rounded-full border-4 border-blue-500"
              />
            </div>
            <form className="space-y-4" encType="multipart/form-data">
              <input
                type="file"
                name="avatar"
                onChange={handleAvatarChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                disabled={!isEditing}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: 'Nama Panti', name: 'name', type: 'text', value: name },
                  { label: 'Email', name: 'email', type: 'email', value: email },
                  { label: 'Nomor Telepon', name: 'phone', type: 'text', value: phone },
                  { label: 'Alamat', name: 'address', type: 'text', value: address },
                  { label: 'Deskripsi', name: 'description', type: 'text', value: description },
                  { label: 'Website', name: 'website', type: 'text', value: website },
                ].map(({ label, name, type, value }) => (
                  <div key={name} className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">{label}</label>
                    <input
                      type={type}
                      name={name}
                      value={value}
                      onChange={handleChange}
                      className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={!isEditing}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4">
                <Button
                  className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-150"
                  onClick={() => {
                    if (isEditing) {
                      setOpenModal(true);
                    } else {
                      setIsEditing(true);
                    }
                  }}
                >
                  {isEditing ? 'Save' : 'Edit'}
                </Button>
              </div>
              <Modal open={openModal} onClose={() => setOpenModal(false)} className="p-4 bg-white shadow-lg rounded-lg">
                <ModalHeader>
                  <span className="text-xl font-semibold text-gray-800">Save Profile</span>
                </ModalHeader>
                <ModalBody>
                  <p className="text-lg text-gray-700">Are you sure you want to save the profile?</p>
                </ModalBody>
                <ModalFooter className="flex justify-center gap-4">
                  <Button
                    color="primary"
                    onClick={() => {
                      handleSave();
                      setOpenModal(false);
                    }}
                    className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                  >
                    Save
                  </Button>
                  <Button
                    color="gray"
                    onClick={() => setOpenModal(false)}
                    className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300"
                  >
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
}

export default ProfileOrphanage;
