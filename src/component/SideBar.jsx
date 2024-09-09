import { Sidebar } from "flowbite-react";
import { BiBookAdd, BiHistory, BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { GiConfirmed } from "react-icons/gi";
import { HiChartPie } from "react-icons/hi2";
import React, { useEffect, useState, useContext } from "react";
import {jwtDecode} from "jwt-decode";
import axiosInstance from "../lib/axiosInstance";
import { AvatarContext } from "../context/AvatarContext";

const SideBar = () => {
  const { avatar, setAvatar } = useContext(AvatarContext);
  
  const fetchUserProfile = async () => {
    const token = sessionStorage.getItem("token") || localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;z
    }

    const decodedToken = jwtDecode(token);
    const url = `/orphanages/by-user/${decodedToken.sub}`;

    try {
      const response = await axiosInstance.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
      
      const { data } = response.data;
      setAvatar(data.avatar);
    } catch (error) {
      console.error("Failed to fetch user data:", error.response?.data || "Network error or server is down");
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar aria-label="Sidebar with content" className="max-w-1/5">
        <Sidebar.Items>
          {/* Bagian untuk menampilkan Avatar */}
          <div className="flex flex-col items-center py-4">
            <img
              src={`http://10.10.102.142:8080/api/v1/avatars/public/${avatar}`}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-blue-500 mb-4"
            />
          </div>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="/orphanage-dashboard" icon={HiChartPie}>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item href="/orphanage-requestBook" icon={BiBookAdd}>
              Request Buku
            </Sidebar.Item>
            {/* <Sidebar.Item href="/orphanage-confirmBook" icon={GiConfirmed}>
              Konfirmasi Barang
            </Sidebar.Item> */}
            <Sidebar.Item href="/history-donation-orphanage" icon={BiHistory}>
              History
            </Sidebar.Item>
            <Sidebar.Item href="/orphanage-profile" icon={CgProfile}>
              Edit Profile
            </Sidebar.Item>
            <Sidebar.Item
              href="/"
              icon={BiLogOut}
              onClick={() => {
                localStorage.removeItem('token');
                sessionStorage.removeItem('token');
              }}
            >
              Logout
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export default SideBar;