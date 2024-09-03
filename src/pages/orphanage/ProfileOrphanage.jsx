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
import { jwtDecode } from "jwt-decode"; // Perbaiki import ini
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
  const [isAvatarChanged, setIsAvatarChanged] = useState(false); // Tambahkan state baru
  const [avatarFileName, setAvatarFileName] = useState(""); // Tambahkan state baru untuk menyimpan nama file avatar

  const fetchData = async () => {
    const token =
      sessionStorage.getItem("token") || localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    const decodedToken = jwtDecode(token);
    console.log("Decoded token data:", decodedToken);
    const url = `/orphanages/by-user/${decodedToken.sub}`;
    console.log("Fetching profile from URL:", url);

    try {
      const response = await axiosInstance.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Profile data:", response.data);
      setAvatar(response.data.data.avatar);
      setName(response.data.data.name);
      setEmail(response.data.data.email);
      setPhone(response.data.data.phone_number);
      setAddress(response.data.data.address);
      setDescription(response.data.data.description);
      setWebsite(response.data.data.web_url);
      setOrphanageId(response.data.data.id); // Simpan ID panti asuhan
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
      setIsAvatarChanged(true); // Tandai bahwa avatar telah diubah
      const formData = new FormData();
      const fileName = file.name.replace(/\s+/g, "_"); // Ganti spasi dengan _
      const renamedFile = new File([file], fileName, { type: file.type });
      formData.append("avatar", renamedFile);
      setAvatarFileName(fileName); // Simpan nama file avatar

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
        setAvatar(response.data.data.avatar); // Perbarui avatar dengan data dari respons
      } catch (error) {
        console.error("Failed to upload avatar:", error);
        if (error.response) {
          console.error("Error response data:", error.response.data);
        }
      }
    }
  };

  const handleSave = async () => {
    const url = `/orphanages/${orphanageId}`; // Gunakan orphanageId
    console.log("Saving profile to URL:", url); // Log URL

    const token =
      sessionStorage.getItem("token") || localStorage.getItem("token");
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
        await handleAvatarChange({ target: { files: [avatar] } }); // Unggah avatar jika telah diubah
      }
      const response = await axiosInstance.put(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Profile saved successfully", response.data);
      setIsEditing(false);
      // Tambahkan ini untuk auto refresh data setelah menyimpan
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
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "phone") {
      setPhone(value);
    } else if (name === "address") {
      setAddress(value);
    } else if (name === "description") {
      setDescription(value);
    } else if (name === "website") {
      setWebsite(value);
    }
  };

  return (
    <div className="flex h-screen items-start">
      <SideBar />
      <div className="flex-grow flex-wrap p-4">
        <h1 className="text-2xl font-bold">Edit Profile</h1>
        <Card>
          <CardHeader>
            <h1 className="font-bold">Edit Profile</h1>
          </CardHeader>
          <CardBody>
            <div className="flex flex-row gap-2 items-center justify-center">
              <Image
                src={
                  avatar
                    ? `http://10.10.102.142:8080/api/v1/avatars/public/${avatar}`
                    : "path/to/default/avatar.png" // Gambar default
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
                <Label className="w-1/4">Nama Panti</Label>
                <TextInput
                  type="text"
                  name="name"
                  value={name}
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
                <Label className="w-1/4">Nomor Telepon</Label>
                <TextInput
                  type="text"
                  name="phone"
                  value={phone}
                  onChange={handleChange}
                  className="flex-grow"
                  disabled={!isEditing}
                />
              </div>
              <div className="flex flex-row gap-2 items-center">
                <Label className="w-1/4">Alamat</Label>
                <TextInput
                  type="text"
                  name="address"
                  value={address}
                  onChange={handleChange}
                  className="flex-grow"
                  disabled={!isEditing}
                />
              </div>
              <div className="flex flex-row gap-2 items-center">
                <Label className="w-1/4">Deskripsi</Label>
                <TextInput
                  type="text"
                  name="description"
                  value={description}
                  onChange={handleChange}
                  className="flex-grow"
                  disabled={!isEditing}
                />
              </div>
              <div className="flex flex-row gap-2 items-center">
                <Label className="w-1/4">Website</Label>
                <TextInput
                  type="text"
                  name="website"
                  value={website}
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
}

export default ProfileOrphanage;
