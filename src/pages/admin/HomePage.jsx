import { Bar, Pie, Line } from 'react-chartjs-2';
import { Card } from "@nextui-org/react";
import SideBarAdmin from "../../component/SideBarAdmin";
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, LineElement, PointElement } from 'chart.js';
import { useEffect, useState } from 'react';
import axiosInstance from '../../lib/axiosInstance';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, LineElement, PointElement);

const HomePage = () => {

  const TotalOrphanagesCard = () => {
    const [totalOrphanages, setTotalOrphanages] = useState(0);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchOrphanages = async () => {
        try {
          const response = await axiosInstance.get('/orphanages');
          const data = response.data;
          setTotalOrphanages(data.length); 
        } catch (error) {
          setError('Gagal memuat data panti asuhan');
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

  // Data for various charts
  const bookDonationData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Jumlah Buku Didonasikan',
        data: [50, 100, 150, 200, 250, 300, 350],
        backgroundColor: 'rgba(93, 12, 255, 0.7)',
        borderColor: 'rgba(93, 12, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const bookCategoryData = {
    labels: ['Buku Pelajaran', 'Novel', 'Komik', 'Majalah'],
    datasets: [
      {
        data: [200, 150, 100, 50],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  const donationTimeData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Donasi Buku 2024',
        data: [50, 100, 75, 150, 125, 200, 175],
        borderColor: 'rgba(255, 159, 64, 1)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };
  

  const bookConfirmationData = {
    labels: ['Terkonfirmasi', 'Pending'],
    datasets: [
      {
        data: [300, 50],
        backgroundColor: ['#4ADE80', '#F87171'],
        hoverBackgroundColor: ['#4ADE80', '#F87171'],
      },
    ],
  };

  return (
<div className="flex min-h-screen bg-gray-100">
  <SideBarAdmin />
  <div className="flex-1 p-8 space-y-10">

    {/* Section Statistik Donatur */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <Card className="p-6 bg-gradient-to-r from-purple-500 to-purple-700 shadow-lg rounded-xl text-white">
        <h3 className="text-lg font-semibold">Total Donatur Terdaftar</h3>
        <p className="text-4xl font-bold mt-2">500</p>
      </Card>
      <Card className="p-6 bg-gradient-to-r from-green-400 to-green-600 shadow-lg rounded-xl text-white">
        <h3 className="text-lg font-semibold">Donatur Aktif</h3>
        <p className="text-4xl font-bold mt-2">150</p>
      </Card>
      <TotalOrphanagesCard />
    </div>

    {/* Grafik Donasi Buku dan Status Konfirmasi */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Status Konfirmasi Buku</h2>
        <div className="relative h-72">
          <Pie data={bookConfirmationData} />
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Donasi Berdasarkan Kategori Buku</h2>
        <div className="relative h-72">
          <Pie data={bookCategoryData} />
        </div>
      </div>
    </div>

    {/* Grafik Donasi Buku dan Donasi Berdasarkan Waktu */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Grafik Donasi Buku</h2>
        <div className="relative h-72">
          <Bar data={bookDonationData} />
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Donasi Berdasarkan Waktu</h2>
        <div className="relative h-72">
          <Line data={donationTimeData} />
        </div>
      </div>
    </div>

    {/* Tabel Donatur */}
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Detail Donatur</h2>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4 border-b text-left text-gray-700">Nama Donatur</th>
            <th className="py-3 px-4 border-b text-left text-gray-700">Jumlah Buku Didonasikan</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4 border-b">John Doe</td>
            <td className="py-2 px-4 border-b">120</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">Jane Smith</td>
            <td className="py-2 px-4 border-b">80</td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* Panti Asuhan Aktif */}
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Panti Asuhan Aktif</h2>
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
