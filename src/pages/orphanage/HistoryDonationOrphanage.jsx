import { useEffect, useState } from "react";
import SideBar from "../../component/SideBar";
import {jwtDecode} from "jwt-decode"; // Perbaiki impor jwtDecode
import axiosInstance from "../../lib/axiosInstance";
import { Button, Input } from "@nextui-org/react";

function HistoryDonationOrphanage() {
  const [orphanageId, setOrphanageId] = useState("");
  const [donationData, setDonationData] = useState([]);
  const [donorDetails, setDonorDetails] = useState({});
  const [feedback, setFeedback] = useState({ text: {}, status: {} });
  const [feedbackData, setFeedbackData] = useState([]);

  console.log("donation ", donationData);
  console.log("feedback ", feedbackData);

  const getToken = () =>
    sessionStorage.getItem("token") || localStorage.getItem("token");

  const fetchOrphanageId = async () => {
    const token = getToken();
    if (!token) return console.error("No token found");

    try {
      const decodedToken = jwtDecode(token);
      const response = await axiosInstance.get(
        `/orphanages/by-user/${decodedToken.sub}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOrphanageId(response.data.data.id);
    } catch (error) {
      handleError(error, "Failed to fetch orphanage ID");
    }
  };

  const fetchDonationData = async (orphanageId) => {
    const token = getToken();
    if (!token) return console.error("No token found");

    try {
      const response = await axiosInstance.get(
        `/donations/orphanage/${orphanageId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const donations = response.data.data.data;
      // Urutkan donasi berdasarkan created_at
      donations.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      setDonationData(donations);
      donations.forEach((donation) => fetchDonorDetails(donation.user_id, donation.id));
    } catch (error) {
      handleError(error, "Failed to fetch donation data");
    }
  };

  const fetchDonorDetails = async (userId,donationId) => {
    const token = getToken();
    try {
      const response = await axiosInstance.get(`/donors/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { fullname, id } = response.data.data;
      setDonorDetails((prev) => ({ ...prev, [userId]: { fullname, id } }));
      // console.log("asasass",response.data.data.id)
      // console.log("asasasas",donationId)
      fetchFeedbackDonor(donationId,response.data.data.id,orphanageId)
    } catch (error) {
      handleError(error, "Failed to fetch donor details");
    }
  };

  const fetchFeedbackDonor = async (donationId,donorId,orphanagesId) => {
    const token = getToken();
    try {
      const response = await axiosInstance.get(`/feedback/donor/${donorId}/orphanages/${orphanagesId}/donation/${donationId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data.data,"sasasas")
      setFeedback((prev) => ({
        ...prev,
        status: { ...prev.status, [donationId]: response.data.data }, // Tandai feedback sudah dikirim
        text: { ...prev.text, [donationId]: "" },
      }));
    } catch (error) {
      handleError(error, "Failed to fetch donor details");
    }
  }

  const fetchFeedback = async () => {
    const token = getToken();
    try {
      const response = await axiosInstance.get(
        `/feedback/by-orphanages/${orphanageId}?page=0`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // let data = [];
      // data.push(...response.data.data.data)
      setFeedbackData(response.data.data.data);
      // console.log("asasasa" , response.data.data.total_page)
      // for (let i = 1; i < response.data.data.total_page; i++) {
      //   const response = await axiosInstance.get(
      //     `/feedback/by-orphanages/${orphanageId}?page=${i}`,
      //     {
      //       headers: { Authorization: `Bearer ${token}` },
      //     }
      //   );
      //   data.push(...response.data.data.data)
      //   // setFeedbackData(response.data.data.data);
      // }
      // console.log("data: ", data)
      // setFeedbackData(data)
    } catch (error) {
      handleError(error, "Failed to fetch feedback");
    }
  };

  const handleSubmitFeedback = async (e, donationId, userId) => {
    e.preventDefault();
    if (feedback.status[donationId]) return; // Cegah pengiriman ulang

    if (!window.confirm("Are you sure you want to submit this feedback?"))
      return;

    const token = getToken();
    if (!token) return console.error("No token found");

    const feedbackPayload = {
      donor_id: donorDetails[userId].id,
      orphanages_id: orphanageId,
      feedback_text: feedback.text[donationId],
    };


    try {
      await axiosInstance.post("/feedback", feedbackPayload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("first", token)
      setFeedback((prev) => ({
        ...prev,
        status: { ...prev.status, [donationId]: true }, // Tandai feedback sudah dikirim
        text: { ...prev.text, [donationId]: "" },
      }));
      const response = await axiosInstance.get(`/feedback/status-feedback/${donationId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response,"response")
    } catch (error) {
      handleError(error, "Failed to submit feedback");
    }
  };

  const handleError = (error, message) => {
    if (error.response) {
      console.error(message, error.response.data);
    } else {
      console.error("Network error or server is down");
    }
  };

  const formatDate = (timestamp) => new Date(timestamp).toLocaleDateString();

  useEffect(() => {
    fetchOrphanageId();
  }, []);

  useEffect(() => {
    if (orphanageId) {
      fetchDonationData(orphanageId);
      fetchFeedback();
    }
  }, [orphanageId]);

  return (
    <div className="flex h-screen bg-[#E0F7FA]">
      <SideBar />
      <div className="w-full p-8">
        <h1 className="text-2xl font-bold mb-4">History of Donations</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "Donor Name",
                  "Book Name",
                  "Quantity Donated",
                  "Donation Date",
                  "Status",
                  "Feedback",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {donationData.length > 0 ? (
                donationData.map((donation) => {
                  return (
                    <tr key={donation.id}>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {donorDetails[donation.user_id]?.fullname || "Loading..."}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {donation.book_name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {donation.quantity_donated}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatDate(donation.created_at)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {donation.status}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {feedback.status[donation.id] ? (
                          <span>✔️ Feedback terkirim</span>
                        ) : (
                          <form
                            onSubmit={(e) =>
                              handleSubmitFeedback(
                                e,
                                donation.id,
                                donation.user_id
                              )
                            }
                          >
                            <Input
                              type="text"
                              value={feedback.text[donation.id] || ""}
                              onChange={(e) =>
                                setFeedback((prev) => ({
                                  ...prev,
                                  text: {
                                    ...prev.text,
                                    [donation.id]: e.target.value,
                                  },
                                }))
                              }
                              placeholder="Enter feedback"
                              className="px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                              disabled={feedback.status[donation.id] || donation.status !== 'delivered'} // Nonaktifkan jika sudah kirim atau status bukan 'Delivered'
                            />
                            {donation.status === 'delivered' && (
                              <Button
                                type="submit"
                                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled={feedback.status[donation.id]} // Nonaktifkan jika sudah kirim
                              >
                                Submit
                              </Button>
                            )}
                          </form>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-4 text-sm text-gray-500 text-center"
                  >
                    No donation data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default HistoryDonationOrphanage;