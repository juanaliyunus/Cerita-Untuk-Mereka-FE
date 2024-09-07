import { Bar, Pie, Line } from "react-chartjs-2";
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
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useEffect, useState, useRef } from "react";
import axiosInstance from "../../lib/axiosInstance";
import { color } from "framer-motion";
import ReactECharts from 'echarts-for-react/lib/core';
import * as echarts from 'echarts';

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
  const [bookMonth, setBookMonth] = useState(Array(12).fill(0)); // Inisialisasi sebagai array
  const [loading, setLoading] = useState(true);
  const [donorNames, setDonorNames] = useState();
  const [donorDonated, setDonorDonated] = useState(0);
  const [statusBooks, setStatusBooks] = useState({
    delivered: 0,
    pending: 0,
    rejected: 0,
  });
  const [error, setError] = useState(null);

  const option = {
    title: {
      text: 'Status Buku',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: 'Status',
        type: 'pie',
        radius: ['40%', '70%'], 
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '20',
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: statusBooks.delivered, name: 'Delivered', itemStyle: { color: '#00fa9a' } },
          { value: statusBooks.pending, name: 'Pending', itemStyle: { color: 'yellow' } },
          { value: statusBooks.rejected, name: 'Rejected', itemStyle: { color: 'red' } },
        ],
      },
    ],
  };

  const StatusChart = () => {
    const chartRef = useRef(null);

    useEffect(() => {
      const chartInstance = chartRef.current?.getEchartsInstance();
      if (chartInstance) {
        // Lakukan sesuatu dengan chartInstance
        chartInstance.setOption(option);
      }

      return () => {
        if (chartRef.current) {
          const instance = chartRef.current.getEchartsInstance();
          if (instance) {
            instance.dispose();
          }
        }
      };
    }, []);

    const getOption = () => {
      return option;
    };

    return (
      <div id="status-chart" style={{ width: '100%', height: '400px' }}>
        <ReactECharts
          ref={chartRef}
          echarts={echarts}
          option={getOption()}
          notMerge={true}
          lazyUpdate={true}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    );
  };

  const TotalOrphanagesCard = () => {
    const [totalOrphanages, setTotalOrphanages] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchOrphanages = async () => {
        setLoading(true);
        setError(null);
        const token =
          localStorage.getItem("token") || sessionStorage.getItem("token");

        try {
          let currentPage = 0;
          let allOrphanages = [];
          let hasMoreData = true;

          while (hasMoreData) {
            const response = await axiosInstance.get(
              `/orphanages?page=${currentPage}&limit=15`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            const data = response.data.data.data;
            allOrphanages = [...allOrphanages, ...data];
            hasMoreData = data.length === 15;
            currentPage += 1;
          }

          setTotalOrphanages(allOrphanages.length);
        } catch (error) {
          setError("Gagal memuat data panti asuhan");
        } finally {
          setLoading(false);
        }
      };

      fetchOrphanages();
    }, [loading]);

    if (loading) return <p>Memuat data...</p>;
    if (error) return <p>{error}</p>;

    return (
      <Card className="p-6 bg-gradient-to-r from-pink-400 to-pink-600 shadow-lg text-white">
        <h3 className="text-lg font-semibold">Total Panti Asuhan</h3>
        <p className="text-3xl font-bold">{totalOrphanages}</p>
      </Card>
    );
  };

  useEffect(() => {
    const fetchDonors = async () => {
      setLoading(true);
      setError(null);
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      try {
        console.log(token);
        let currentPage = 0;
        let allDonors = [];
        let hasMoreData = true;

        while (hasMoreData) {
          const responseDonor = await axiosInstance.get(
            `/donors?page=${currentPage}&limit=15`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const data = responseDonor.data.data.data;
          allDonors = [...allDonors, ...data];
          hasMoreData = data.length === 15;
          currentPage += 1;
        }

        setTotalDonors(allDonors.length);
      } catch (error) {
        setError("Gagal memuat data Donatur");
      } finally {
        setLoading(false);
      }
    };

    fetchDonors();
  }, [loading]);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      try {
        let currentPage = 0;
        let totalQuantityDonated = 0;
        let statusCount = { delivered: 0, pending: 0, rejected: 0 };
        let bookMonth = Array(12).fill(0); // Inisialisasi array untuk jumlah buku per bulan
        let hasMoreData = true;
        let userIds = [];
        let userDonate = [];

        while (hasMoreData) {
          const responseBooks = await axiosInstance.get(
            `/donations?page=${currentPage}&limit=15`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = responseBooks.data.data.data;
          console.log(`Page ${currentPage}: `, data.length, " items");

          totalQuantityDonated += data.reduce(
            (sum, book) => sum + book.quantity_donated,
            0
          );

          let pageStatusCount = { delivered: 0, pending: 0, rejected: 0 };

          data.forEach(book => {
            console.log("Status buku Per Page", book)
            if (book.status === "delivered") {
              pageStatusCount.delivered += book.quantity_donated;
            } else if (book.status === "pending") {
              pageStatusCount.pending += book.quantity_donated;
            } else {
              pageStatusCount.rejected += book.quantity_donated;
            }

            const month = new Date(book.created_at).getMonth();
            bookMonth[month] += book.quantity_donated;

            // Ambil user_id dari setiap buku
            userDonate.push(book.quantity_donated)
            userIds.push(book.user_id);
          });

          statusCount.delivered += pageStatusCount.delivered;
          statusCount.pending += pageStatusCount.pending;
          statusCount.rejected += pageStatusCount.rejected;

          console.log(`Page ${currentPage} Status Count: `, pageStatusCount);

          hasMoreData = data.length === 15;
          currentPage += 1;
        }

        console.log("Total Quantity Donated: ", totalQuantityDonated);
        console.log("Status Count: ", statusCount);
        console.log("Book Month: ", bookMonth);
        console.log("user Donate: ", userDonate)

        setTotalBooks(totalQuantityDonated);
        setStatusBooks(statusCount);
        setBookMonth(bookMonth); // Set jumlah buku per bulan
        setDonorDonated(userDonate);

        // Ambil fullname dari setiap user_id
        const donorNamesPromises = userIds.map(async (userId) => {
          const response = await axiosInstance.get(`/donors/user/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          return response.data.data.fullname;
        });

        const donorNames = await Promise.all(donorNamesPromises);
        setDonorNames(donorNames); // Set donor names
        console.log("Donor Name",donorNames)
      } catch (error) {
        setError("Gagal Memuat Buku");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

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

  const bookCategoryData = {
    labels: ["Buku Pelajaran", "Novel", "Komik", "Majalah"],
    datasets: [
      {
        data: [200, 150, 100, 50],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  const donationTimeData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Donasi Buku 2024",
        data: [50, 100, 75, 150, 125, 200, 175],
        borderColor: "rgba(255, 159, 64, 1)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        fill: true,
        tension: 0.4,
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
            <p className="text-4xl font-bold mt-2">
              {totalDonors || "Loading..."}
            </p>
          </Card>
          <Card className="p-6 bg-gradient-to-r from-green-400 to-green-600 shadow-lg rounded-xl text-white">
            <h3 className="text-lg font-semibold">Buku yang Di Donasikan</h3>
            <p className="text-4xl font-bold mt-2">
              {totalBooks || "Loading..."}
            </p>
          </Card>
          <TotalOrphanagesCard />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md flex">
            <div className="w-1/2">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Status Konfirmasi Buku
              </h2>
              <StatusChart />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Grafik Donasi Buku
            </h2>
            <div className="relative h-72">
              <Bar data={bookDonationData} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md h-full">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Donasi Berdasarkan Waktu
            </h2>
            <div className="relative h-full">
              <Line data={bookDonationData} />
            </div>
          </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Detail Donatur
          </h2>
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 border-b text-left text-gray-700">
                  Nama Donatur
                </th>
                <th className="py-3 px-4 border-b text-left text-gray-700">
                  Jumlah Buku Didonasikan
                </th>
              </tr>
            </thead>
            <tbody>
              {donorNames && donorNames.map((donorName, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{donorName}</td>
                  <td className="py-2 px-4 border-b">{donorDonated[index]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>


        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Panti Asuhan Aktif
          </h2>
          <ul className="divide-y divide-gray-200">
            <li className="py-4 flex justify-between">
              <span>Panti A</span>
              <span className="font-bold text-gray-700">200 Buku</span>
            </li>
            <li className="py-4 flex justify-between">
              <span>Panti B</span>
              <span className="font-bold text-gray-700">150 Buku</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;