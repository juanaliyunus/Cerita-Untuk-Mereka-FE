import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Badge,
  Button,
  Avatar,
} from "@nextui-org/react";
import SideBar from "../../component/SideBar";
import OrphanageCard from "../../component/OrphanageCard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {  Book, ShirtIcon, Bell, ArrowRight } from "lucide-react";
import BookNeeded from "../../component/BookNeeded";
import axiosInstance from "../../lib/axiosInstance";
import {jwtDecode} from "jwt-decode";

const StatCard = ({ title, value, icon: Icon }) => (
  <Card>
    <CardBody className="flex items-center p-4">
      <Icon className="h-8 w-8 text-primary mr-4" />
      <div>
        <p className="text-sm text-default-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </CardBody>
  </Card>
);

const ActivityItem = ({ icon: Icon, title, time }) => (
  <div className="flex items-center mb-4">
    <Avatar
      icon={<Icon className="h-5 w-5" />}
      classNames={{
        base: "bg-primary/10",
        icon: "text-primary",
      }}
    />
    <div className="ml-3">
      <p className="text-sm font-medium">{title}</p>
      <p className="text-xs text-default-500">{time}</p>
    </div>
  </div>
);

const HomePage = () => {
  const [bookMonth, setBookMonth] = useState(Array(12).fill(0));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalDonations, setTotalDonations] = useState(0);
  const [percentage, setPercentage] = useState(0);
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      try {
        const decodedToken = jwtDecode(token);
        const userID = decodedToken.sub;

        // Ambil data panti asuhan berdasarkan userID
        const responseOrphanage = await axiosInstance.get(`/orphanages/by-user/${userID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const orphanageId = responseOrphanage.data.data.id;

        let currentPage = 0;
        let bookMonthData = Array(12).fill(0);
        let totalDonations = 0;
        let hasMoreData = true;
        let qty = 0;
        let target = 0;

        while (hasMoreData) {
          const responseBooks = await axiosInstance.get(
            `/donations/orphanage/${orphanageId}?page=${currentPage}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = responseBooks.data.data.data;
          console.log("data: ", data)

          // Ambil data kebutuhan dari orphanageId
          const responseNeeds = await axiosInstance.get(`/orphanages/needs/by/${orphanageId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const needsData = responseNeeds.data.data;
          console.log("needsData: ", needsData)

          needsData.forEach(need => {
            console.log("need: ", need)
            qty += need.quantity
            target += need.target_quantity
          })
          
          data.forEach(book => {
            const month = new Date(book.created_at).getMonth();
            bookMonthData[month] += book.quantity_donated;
            totalDonations += book.quantity_donated;
            
          });
          
          const percentage = target === 0 ? 0 : (target / qty) * 100;
          console.log("percentage: ", percentage)
          setPercentage(percentage)
          hasMoreData = data.length === 15;
          currentPage += 1;
        }
        setBookMonth(bookMonthData);
        setTotalDonations(totalDonations);

      } catch (error) {
        setError("Gagal Memuat Buku");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
<div className="flex h-screen bg-[#E0F7FA]">
  <SideBar />
  <div className="flex-grow p-8 overflow-auto">
    <h1 className="text-4xl font-semibold mb-8 text-[#333]">Dashboard</h1>

    {/* Stat Card Row */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <StatCard
        title="Total Donasi"
        value={totalDonations}
        icon={Book}
        className="bg-white shadow-lg rounded-lg p-6"
      />
      <StatCard
        title="Kebutuhan Terpenuhi"
        value={`${percentage.toFixed(0)}%`}
        icon={Bell}
        className="bg-white shadow-lg rounded-lg p-6"
      />
    </div>

    {/* Trend Donasi and Book Needed Row */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <Card className="bg-white shadow-lg rounded-lg">
        <CardHeader className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-[#333]">Trend Donasi</h2>
        </CardHeader>
        <CardBody className="p-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={bookMonth.map((donations, index) => ({
                name: new Date(0, index).toLocaleString("default", {
                  month: "short",
                }),
                donations,
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="donations" fill="#007BFF" />
            </BarChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>

      <BookNeeded className="bg-white shadow-lg rounded-lg p-6" />
    </div>
  </div>
</div>


  );
};

export default HomePage;
