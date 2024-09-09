import { useEffect, useState, useRef } from "react";
import { Bar } from "react-chartjs-2";
import { Card } from "@nextui-org/react";
import SideBarAdmin from "../../component/SideBarAdmin";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import axiosInstance from "../../lib/axiosInstance";
import ReactECharts from "echarts-for-react/lib/core";
import * as echarts from "echarts";

// Register ChartJS components and plugins
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ChartDataLabels
);

const HomePage = () => {
  const [totalDonors, setTotalDonors] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);
  const [bookMonth, setBookMonth] = useState(Array(12).fill(0));
  const [loading, setLoading] = useState(true);
  const [donorDetails, setDonorDetails] = useState([]);
  const [statusBooks, setStatusBooks] = useState({
    delivered: 0,
    pending: 0,
    rejected: 0,
  });
  const [error, setError] = useState(null);

  // Options for ECharts pie chart
  const pieChartOptions = {
    title: { text: "Status Buku", left: "center" },
    tooltip: { trigger: "item" },
    legend: { orient: "vertical", left: "left" },
    series: [
      {
        name: "Status",
        type: "pie",
        radius: ["40%", "70%"],
        data: [
          { value: statusBooks.delivered, name: "Delivered", itemStyle: { color: "#00fa9a" } },
          { value: statusBooks.pending, name: "Pending", itemStyle: { color: "yellow" } },
          { value: statusBooks.rejected, name: "Rejected", itemStyle: { color: "red" } },
        ],
        label: { show: false },
        emphasis: { label: { show: true, fontSize: "20", fontWeight: "bold" } },
        labelLine: { show: false },
      },
    ],
  };

  // Component for rendering the status chart using ECharts
  const StatusChart = () => {
    const chartRef = useRef(null);

    useEffect(() => {
      const chartInstance = chartRef.current?.getEchartsInstance();
      if (chartInstance) chartInstance.setOption(pieChartOptions);

      return () => {
        if (chartRef.current) chartRef.current.getEchartsInstance()?.dispose();
      };
    }, []);

    return (
      <div style={{ width: "100%", height: "400px" }}>
        <ReactECharts ref={chartRef} echarts={echarts} option={pieChartOptions} style={{ width: "100%", height: "100%" }} />
      </div>
    );
  };

  // Component for rendering the total orphanages card
  const TotalOrphanagesCard = () => {
    const [totalOrphanages, setTotalOrphanages] = useState(0);

    useEffect(() => {
      const fetchOrphanages = async () => {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");

        try {
          let currentPage = 0;
          let allOrphanages = [];
          let hasMoreData = true;

          while (hasMoreData) {
            const response = await axiosInstance.get(`/orphanages?page=${currentPage}&limit=15`, {
              headers: { Authorization: `Bearer ${token}` },
            });

            const data = response.data.data.data;
            allOrphanages = [...allOrphanages, ...data];
            hasMoreData = data.length === 15;
            currentPage += 1;
          }

          setTotalOrphanages(allOrphanages.length);
        } catch {
          setError("Gagal memuat data panti asuhan");
        } finally {
          setLoading(false);
        }
      };

      fetchOrphanages();
    }, []);

    if (loading) return <p>Memuat data...</p>;
    if (error) return <p>{error}</p>;

    return (
      <Card className="p-6 bg-gradient-to-r from-pink-400 to-pink-600 shadow-lg text-white">
        <h3 className="text-lg font-semibold">Total Panti Asuhan</h3>
        <p className="text-3xl font-bold">{totalOrphanages}</p>
      </Card>
    );
  };

  // Fetch total books, donor details, and status books
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");

      try {
        let currentPage = 0;
        let totalQuantityDonated = 0;
        let statusCount = { delivered: 0, pending: 0, rejected: 0 };
        let bookMonth = Array(12).fill(0);
        let hasMoreData = true;
        let donationsByUser = {};

        while (hasMoreData) {
          const responseBooks = await axiosInstance.get(`/donations?page=${currentPage}&limit=15`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = responseBooks.data.data.data;

          totalQuantityDonated += data.reduce((sum, book) => sum + book.quantity_donated, 0);

          data.forEach((book) => {
            const month = new Date(book.created_at).getMonth();
            bookMonth[month] += book.quantity_donated;

            // Update status count
            statusCount[book.status] += book.quantity_donated;

            // Group donations by donor
            if (!donationsByUser[book.user_id]) {
              donationsByUser[book.user_id] = { fullname: "", totalDonated: 0 };
            }
            donationsByUser[book.user_id].totalDonated += book.quantity_donated;
          });

          hasMoreData = data.length === 15;
          currentPage += 1;
        }
        
        setTotalBooks(totalQuantityDonated);
        setStatusBooks(statusCount);
        setBookMonth(bookMonth);

        // Fetch donor names based on user IDs
        const donorNamesPromises = Object.keys(donationsByUser).map(async (userId) => {
          const response = await axiosInstance.get(`/donors/user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          donationsByUser[userId].fullname = response.data.data.fullname;
          return donationsByUser[userId];
        });

        const donorDetails = await Promise.all(donorNamesPromises);
        setDonorDetails(donorDetails);
        setTotalDonors(donorDetails.length); // Set total donors
      } catch {
        setError("Gagal Memuat Buku");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);


  // Data for monthly book donation bar chart
  const bookDonationData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Jumlah Buku Didonasikan",
        data: bookMonth,
        backgroundColor: "rgba(93, 12, 255, 0.7)",
        borderColor: "rgba(93, 12, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideBarAdmin />
      <div className="flex-1 p-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6 bg-gradient-to-r from-purple-500 to-purple-700 shadow-lg rounded-xl text-white">
            <h3 className="text-lg font-semibold">Total Donatur Terdaftar</h3>
            <p className="text-4xl font-bold mt-2">{totalDonors || "Loading..."}</p>
          </Card>

          <Card className="p-6 bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg text-white">
            <h3 className="text-lg font-semibold">Total Buku Didonasikan</h3>
            <p className="text-3xl font-bold">{totalBooks}</p>
          </Card>

          <TotalOrphanagesCard />
        </div>

        <StatusChart />

        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Detail Donatur</h2>
          {donorDetails.length === 0 ? (
            <p>Tidak ada data donatur.</p>
          ) : (
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Nama Donatur</th>
                  <th className="py-2 px-4 border-b">Total Buku Donasi</th>
                </tr>
              </thead>
              <tbody>
                {donorDetails.map((donor, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b">{donor.fullname}</td>
                    <td className="py-2 px-4 border-b">{donor.totalDonated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-6">Jumlah Buku Didonasikan Per Bulan</h2>
          <Bar data={bookDonationData} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;