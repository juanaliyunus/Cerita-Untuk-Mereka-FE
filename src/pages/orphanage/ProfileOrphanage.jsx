import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import SideBar from "../../component/SideBar";
import axiosInstance from "../../lib/axiosInstance";

function ProfileOrphanage() {
  const [isEditing, setIsEditing] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(""); // New state for preview
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
  }, []); // Empty dependency array to run once on mount

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsAvatarChanged(true);
      setAvatarPreview(URL.createObjectURL(file)); // Set preview image
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
        // Avatar already uploaded, no need to call handleAvatarChange here
        formData.append("avatar", avatarFileName);
      }
      await axiosInstance.put(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setIsEditing(false); // Reset editing mode
      fetchData(); // Update the displayed data immediately after save
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
    <div className="flex h-screen bg-[#E0F7FA]">
      <SideBar />
      <div className="flex-grow p-8 flex flex-col items-center">
        <Card className="shadow-lg rounded-lg bg-white p-8 w-full max-w-4xl">
          <CardHeader>
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Edit Profile</h1>
          </CardHeader>
          <CardBody>
            <div className="flex justify-center mb-6">
              <img
                src={
                  avatarPreview || // Display preview if available
                  (avatar
                    ? `http://10.10.102.142:8080/api/v1/avatars/public/${avatar}`
                    : 'path/to/default/avatar.png')
                }
                alt="Avatar"
                className="w-32 h-32 rounded-full border-4 border-blue-500"
              />
            </div>
            <form className="space-y-6" encType="multipart/form-data">
              <input
                type="file"
                name="avatar"
                onChange={handleAvatarChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-lg file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100 transition duration-150"
                disabled={!isEditing}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: 'Nama Panti', name: 'name', type: 'text', value: name },
                  { label: 'Email', name: 'email', type: 'email', value: email },
                  { label: 'Nomor Telepon', name: 'phone', type: 'text', value: phone },
                  { label: 'Alamat', name: 'address', type: 'text', value: address },
                  { label: 'Deskripsi', name: 'description', type: 'text', value: description },
                  { label: 'Website', name: 'website', type: 'text', value: website },
                ].map(({ label, name, type, value }) => (
                  <div key={name} className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">{label}</label>
                    <input
                      type={type}
                      name={name}
                      value={value}
                      onChange={handleChange}
                      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={!isEditing}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-8">
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
              <Modal open={openModal} onClose={() => setOpenModal(false)} className="p-6 bg-white shadow-lg rounded-lg">
                <ModalHeader>
                  <h2 className="text-xl font-semibold text-gray-800">Konfirmasi Simpan</h2>
                </ModalHeader>
                <ModalBody>
                  <p>Apakah Anda yakin ingin menyimpan perubahan?</p>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="gray"
                    onClick={() => setOpenModal(false)}
                  >
                    Batal
                  </Button>
                  <Button
                    onClick={() => {
                      handleSave();
                      setOpenModal(false);
                    }}
                  >
                    Simpan
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
