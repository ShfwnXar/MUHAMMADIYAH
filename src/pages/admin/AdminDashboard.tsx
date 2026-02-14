import React from 'react';
import { useNavigate } from 'react-router';
import { AdminSidebar } from '../../components/AdminSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { FileCheck2, CheckCircle, XCircle, Clock, Users, FileDown, Settings } from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/admin-login');
  };

  const stats = [
    {
      label: 'Pending Validation',
      value: '12',
      icon: Clock,
      color: 'text-[#F6A500]',
      bgColor: 'bg-[#F6A500]/10'
    },
    {
      label: 'Approved',
      value: '45',
      icon: CheckCircle,
      color: 'text-[#1FA84A]',
      bgColor: 'bg-[#1FA84A]/10'
    },
    {
      label: 'Rejected',
      value: '8',
      icon: XCircle,
      color: 'text-[#D92B2B]',
      bgColor: 'bg-[#D92B2B]/10'
    },
    {
      label: 'Total Participants',
      value: '65',
      icon: Users,
      color: 'text-[#0C2C4A]',
      bgColor: 'bg-[#0C2C4A]/10'
    }
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <AdminSidebar onLogout={handleLogout} />

      <div className="flex-1">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0C2C4A] to-[#D92B2B] text-white py-12 px-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-white/90 text-lg">
              Sistem Validasi Berkas Peserta Muhammadiyah Games 2026
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-8 py-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <Card key={stat.label}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold text-[#0C2C4A]">{stat.value}</p>
                    </div>
                    <div className={`${stat.bgColor} ${stat.color} p-3 rounded-lg`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate('/admin/validation')}
            >
              <CardHeader>
                <CardTitle className="text-[#0C2C4A] flex items-center gap-2">
                  <FileCheck2 className="w-5 h-5 text-[#F6A500]" />
                  Validasi Berkas
                </CardTitle>
                <CardDescription>
                  Review dan validasi dokumen peserta yang menunggu approval
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  12 berkas menunggu validasi
                </p>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate('/admin/approved')}
            >
              <CardHeader>
                <CardTitle className="text-[#0C2C4A] flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#1FA84A]" />
                  Peserta Tervalidasi
                </CardTitle>
                <CardDescription>
                  Lihat daftar peserta yang sudah disetujui
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  45 peserta sudah tervalidasi
                </p>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate('/admin/form-penilaian')}
            >
              <CardHeader>
                <CardTitle className="text-[#0C2C4A] flex items-center gap-2">
                  <FileDown className="w-5 h-5 text-[#1FA84A]" />
                  Form Penilaian
                </CardTitle>
                <CardDescription>
                  Generate dan cetak form penilaian pertandingan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Download form untuk semua cabang olahraga
                </p>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate('/admin/stage-settings')}
            >
              <CardHeader>
                <CardTitle className="text-[#0C2C4A] flex items-center gap-2">
                  <Settings className="w-5 h-5 text-[#F6A500]" />
                  Pengaturan Tahapan
                </CardTitle>
                <CardDescription>
                  Kontrol jadwal pembukaan tahap pendaftaran
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Atur tanggal buka/tutup setiap tahap
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Info Section */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-bold text-blue-900 mb-2">Panduan Validasi</h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>• Periksa kelengkapan dokumen sesuai persyaratan cabang olahraga</li>
              <li>• Pastikan data peserta sesuai dengan KTP/Kartu Pelajar</li>
              <li>• Verifikasi persyaratan usia dan kategori lomba</li>
              <li>• Berikan catatan jika ada dokumen yang perlu diperbaiki</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}