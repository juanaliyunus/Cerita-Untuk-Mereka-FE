import React, { useEffect, useState } from "react";
import SideBar from "../../component/SideBar";
import {jwtDecode} from "jwt-decode";
import axiosInstance from "../../lib/axiosInstance";

function HistoryDonationOrphanage() {
  const [orphanageId, setOrphanage_Id] = useState("");
  const [donationData, setDonationData] = useState([]);
  const [donorNames, setDonorNames] = useState({});

  // Fetch orphanageId
  const fetchOrphanageId = async () => {
    const token =
      sessionStorage.getItem("token") || localStorage.getItem("token");

    if (!token) {
      console.error("No token found");
      return;
    }

    const decodedToken = jwtDecode(token);
    const url = `/orphanages/by-user/${decodedToken.sub}`;

    try {
      const response = await axiosInstance.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const orphanage_id = response.data.data.id;
      setOrphanage_Id(orphanage_id);
    } catch (error) {
      if (error.response) {
        console.error("Failed to fetch orphanage id", error.response.data);
      } else {
        console.error("Network error or server is down");
      }
    }
  };

  // Fetch donation data for the orphanage
  const fetchDonationData = async (orphanageId) => {
    const token =
      sessionStorage.getItem("token") || localStorage.getItem("token");

    if (!token) {
      console.error("No token found");
      return;
    }

    const url = `/donations/orphanage/${orphanageId}`;

    try {
      const response = await axiosInstance.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const donationsArray = response.data.data.data;
      if (Array.isArray(donationsArray)) {
        setDonationData(donationsArray);
        // Fetch donor names for each user_id
        donationsArray.forEach((donation) => fetchDonorName(donation.user_id));
      } else {
        console.error("Expected an array but got", donationsArray);
      }
    } catch (error) {
      if (error.response) {
        console.error("Failed to fetch donation data", error.response.data);
      } else {
        console.error("Network error or server is down");
      }
    }
  };

  // Fetch donor name using user_id
  const fetchDonorName = async (userId) => {
    const token =
      sessionStorage.getItem("token") || localStorage.getItem("token");

    const url = `/donors/user/${userId}`;

    try {
      const response = await axiosInstance.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const fullname = response.data.data.fullname;
      console.log("fullname"+fullname);
      setDonorNames((prevNames) => ({
        ...prevNames,
        [userId]: fullname,
      }));
     
      
    } catch (error) {
      if (error.response) {
        console.error("Failed to fetch donor name", error.response.data);
      } else {
        console.error("Network error or server is down");
      }
    }
  };

  // Convert long timestamp to readable date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  useEffect(() => {
    fetchOrphanageId();
  }, []);

  useEffect(() => {
    if (orphanageId) {
      fetchDonationData(orphanageId);
    }
  }, [orphanageId]);

  return (
    <>
      <div className="flex h-screen bg-[#E0F7FA]">
        <SideBar />
        <div className="w-full p-8">
          <h1 className="text-2xl font-bold mb-4">History of Donations</h1>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Donor Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Book Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Quantity Donated
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Donation Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Array.isArray(donationData) && donationData.length > 0 ? (
                donationData.map((donation) => (
                  <tr key={donation.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {donorNames[donation.user_id] || "Loading..."}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {donation.book_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {donation.quantity_donated}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(donation.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {donation.status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
                  >
                    No donation data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default HistoryDonationOrphanage;
