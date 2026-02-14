import React from 'react';
import { useNavigate } from 'react-router';
import { AdminSidebar } from '../../components/AdminSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { XCircle, Eye, RefreshCw } from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function RejectedDocuments() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/admin-login');
  };

  const rejectedParticipants = [
    {
      id: '1',
      name: 'Dewi Sartika',
      sport: 'Voli Indoor',
      category: 'Tim Putri',
      reason: 'Surat kesehatan tidak lengkap',
      rejectedDate: '2026-01-25'
    },
    {
      id: '2',
      name: 'Bambang Suryanto',
      sport: 'Tenis Meja',
      category: 'Tunggal Putra',
      reason: 'Foto tidak sesuai ketentuan (latar belakang merah)',
      rejectedDate: '2026-01-24'
    }
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <AdminSidebar onLogout={handleLogout} />

      <div className="flex-1">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#D92B2B] to-[#0C2C4A] text-white py-12 px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-2">
              <XCircle className="w-10 h-10" />
              <h1 className="text-4xl font-bold">Rejected Documents</h1>
            </div>
            <p className="text-white/90 text-lg">
              Berkas yang ditolak dan memerlukan perbaikan dari peserta
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-8 py-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-[#0C2C4A]">
                Dokumen Ditolak - {rejectedParticipants.length} Peserta
              </CardTitle>
              <CardDescription>
                Peserta perlu memperbaiki dokumen sesuai catatan admin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">No</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Nama Peserta</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Cabang Olahraga</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Alasan Penolakan</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Tanggal Ditolak</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rejectedParticipants.map((participant, index) => (
                      <tr key={participant.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4 text-sm">{index + 1}</td>
                        <td className="py-4 px-4">
                          <p className="font-medium text-[#0C2C4A]">{participant.name}</p>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600">{participant.sport}</td>
                        <td className="py-4 px-4">
                          <p className="text-sm text-red-600 max-w-xs">{participant.reason}</p>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600">{participant.rejectedDate}</td>
                        <td className="py-4 px-4">
                          <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">
                            <XCircle className="w-3 h-3" />
                            Ditolak
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="text-blue-600">
                              <RefreshCw className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Info Box */}
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-medium text-yellow-900 mb-2">Informasi</h4>
            <p className="text-sm text-yellow-800">
              Peserta dengan dokumen ditolak akan menerima notifikasi untuk memperbaiki berkas. Setelah diperbaiki, dokumen akan masuk kembali ke antrian validasi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
