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
import { Clock, Book, ShirtIcon, Bell, ArrowRight } from "lucide-react";
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
        // Set data kebutuhan ke state jika diperlukan
        // setNeedsData(needsData); // Uncomment jika ada state untuk menyimpan data kebutuhan
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
      <div className="flex-grow p-6 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <StatCard title="Total Donasi" value={totalDonations} icon={Book} />
          <StatCard title="Kebutuhan Terpenuhi" value={percentage.toFixed(0) + "%"} icon={Bell} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Trend Donasi</h2>
            </CardHeader>
            <Divider />
            <CardBody>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={bookMonth.map((donations, index) => ({
                    name: new Date(0, index).toLocaleString("default", {
                      month: "short",
                    }),
                    donations,
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="donations" fill="var(--nextui-primary)" />
                </BarChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Aktivitas Terbaru</h2>
            </CardHeader>
            <Divider />
            <CardBody>
              <ActivityItem
                icon={Book}
                title="Donasi Buku Baru"
                time="5 menit lalu"
              />
              <ActivityItem
                icon={ShirtIcon}
                title="Pengiriman dalam proses"
                time="2 hari lalu"
              />
              <ActivityItem
                icon={Bell}
                title="Pesan baru dari Donatur"
                time="1 jam lalu"
              />
              <Button variant="flat" color="primary" className="w-full mt-4">
                Lihat Semua Aktivitas
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardBody>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <BookNeeded></BookNeeded>

          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Pengumuman</h2>
            </CardHeader>
            <Divider />
            <CardBody>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Acara Bazar Buku</h3>
                  <p className="text-sm text-default-500">Minggu depan</p>
                </div>
                <div>
                  <h3 className="font-medium">Liburan Bersama Anak-anak</h3>
                  <p className="text-sm text-default-500">Bulan depan</p>
                </div>
              </div>
              <Button variant="flat" color="primary" className="w-full mt-4">
                Lihat Semua Pengumuman
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
