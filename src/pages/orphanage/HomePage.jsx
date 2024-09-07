import React from 'react';
import { Card, CardBody, CardHeader, Divider, Badge, Button, Avatar } from "@nextui-org/react";
import SideBar from '../../component/SideBar';
import OrphanageCard from '../../component/OrphanageCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Clock, Book, ShirtIcon, Bell, ArrowRight } from 'lucide-react';
import BookNeeded from '../../component/BookNeeded';

const data = [
  { name: 'Jan', donations: 65 },
  { name: 'Feb', donations: 59 },
  { name: 'Mar', donations: 80 },
  { name: 'Apr', donations: 81 },
  { name: 'May', donations: 56 },
  { name: 'Jun', donations: 55 },
  { name: 'Jul', donations: 40 },
];

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

function HomePage() {
  return (
    <div className="flex h-screen bg-[#E0F7FA]">
      <SideBar />
      <div className="flex-grow p-6 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <StatCard title="Total Donasi" value="120" icon={Book} />
          <StatCard title="Jumlah Anak" value="45" icon={ShirtIcon} />
          <StatCard title="Kebutuhan Terpenuhi" value="80%" icon={Bell} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Trend Donasi</h2>
            </CardHeader>
            <Divider />
            <CardBody>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
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
              <ActivityItem icon={Book} title="Donasi Buku Baru" time="5 menit lalu" />
              <ActivityItem icon={ShirtIcon} title="Pengiriman dalam proses" time="2 hari lalu" />
              <ActivityItem icon={Bell} title="Pesan baru dari Donatur" time="1 jam lalu" />
              <Button variant="flat" color="primary" className="w-full mt-4">
                Lihat Semua Aktivitas
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardBody>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        
        
        <BookNeeded>
        </BookNeeded>
        

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
}

export default HomePage;