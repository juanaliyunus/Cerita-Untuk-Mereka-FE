import React, { useEffect, useState } from "react";
import axiosInstance from "../lib/axiosInstance";
import { jwtDecode } from "jwt-decode"; // Fixed import

function DonorDonationHistory() {
  const [donationData, setDonationData] = useState([]);
  const [orphanagesData, setOrphanagesData] = useState([]);

  const fetchData = async () => {
    const token =
      sessionStorage.getItem("token") || localStorage.getItem("token");

    if (!token) {
      console.error("No token found");
      return;
    }

    const decodedToken = jwtDecode(token);

    const url = `/donations/user/${decodedToken.sub}?page=0`;

    try {
      const response = await axiosInstance.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const donationArray = response.data.data.data; // Adjusted based on schema
      if (Array.isArray(donationArray)) {
        setDonationData(donationArray);
      } else {
        console.error("Expected an array but got", donationArray);
      }
    } catch (error) {
      if (error.response) {
        console.error("Failed to fetch donation history", error.response.data);
      } else {
        console.error("Network error or server is down");
      }
    }
  };

  const fetchOrphanageData = async () => {
    const token =
      sessionStorage.getItem("token") || localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    const decodedToken = jwtDecode(token);

    const orphanageIds = [...new Set(donationData.map((d) => d.orphanages_id))];
    const orphanages = await Promise.all(
      orphanageIds.map(async (id) => {
        const url = `/orphanages/${id}`;
        try {
          const response = await axiosInstance.get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          return { id, ...response.data.data };
        } catch (error) {
          console.error(
            "Failed to fetch orphanage data",
            error.response?.data || error.message
          );
          return null;
        }
      })
    );

    setOrphanagesData(orphanages.filter(Boolean));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (donationData.length > 0) {
      donationData.forEach((donation) => {
        console.log(donation.id);
      });
      fetchOrphanageData();
    }
  }, [donationData]);

  console.log(donationData);
  console.log(orphanagesData);

  return (
    <div className="flex justify-center mt-8">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Quantity Donated
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Book Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Orphanage Name
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Array.isArray(donationData) && donationData.length > 0 ? (
            donationData.map((data) => (
              <tr key={data.id}>
                <td className="px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-900">
                  {data.status}
                </td>
                <td className="px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-900">
                  {data.quantity_donated}
                </td>
                <td className="px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-900">
                  {data.book_name}
                </td>
                <td className="px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-900">
                  {orphanagesData.find(
                    (orphanage) => orphanage.id === data.orphanages_id
                  )?.name || "Unknown"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
              >
                No donation data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DonorDonationHistory;
