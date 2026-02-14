import React from 'react';
import { useNavigate } from 'react-router';
import { AdminSidebar } from '../../components/AdminSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { CheckCircle, Download, Eye } from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function ApprovedParticipants() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/admin-login');
  };

  const approvedParticipants = [
    {
      id: '1',
      name: 'Muhammad Rizki',
      sport: 'Tapak Suci',
      category: 'Tanding Putra Kelas C',
      registrationDate: '2026-01-15',
      validatedDate: '2026-01-20'
    },
    {
      id: '2',
      name: 'Fatimah Zahra',
      sport: 'Panahan',
      category: 'Recurve Putri',
      registrationDate: '2026-01-16',
      validatedDate: '2026-01-21'
    },
    {
      id: '3',
      name: 'Ali Akbar',
      sport: 'Atletik',
      category: 'Lari 100m Putra SMA',
      registrationDate: '2026-01-17',
      validatedDate: '2026-01-22'
    }
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <AdminSidebar onLogout={handleLogout} />

      <div className="flex-1">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1FA84A] to-[#0C2C4A] text-white py-12 px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-10 h-10" />
              <h1 className="text-4xl font-bold">Approved Participants</h1>
            </div>
            <p className="text-white/90 text-lg">
              Daftar peserta yang sudah tervalidasi dan terdaftar resmi
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-8 py-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-[#0C2C4A]">
                ✅ Registrasi Resmi - {approvedParticipants.length} Peserta
              </CardTitle>
              <CardDescription>
                Peserta dengan status registrasi resmi dan berkas lengkap
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
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Kategori</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Tanggal Validasi</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {approvedParticipants.map((participant, index) => (
                      <tr key={participant.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4 text-sm">{index + 1}</td>
                        <td className="py-4 px-4">
                          <p className="font-medium text-[#0C2C4A]">{participant.name}</p>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600">{participant.sport}</td>
                        <td className="py-4 px-4 text-sm text-gray-600">{participant.category}</td>
                        <td className="py-4 px-4 text-sm text-gray-600">{participant.validatedDate}</td>
                        <td className="py-4 px-4">
                          <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                            <CheckCircle className="w-3 h-3" />
                            Tervalidasi
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4" />
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
        </div>
      </div>
    </div>
  );
}
