import React from 'react';
import { useNavigate } from 'react-router';
import { ParticipantSidebar } from '../components/ParticipantSidebar';
import { Footer } from '../components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { CheckCircle, Clock, XCircle, AlertCircle, Package } from 'lucide-react';

export default function TrackingStatus() {
  const navigate = useNavigate();

  const registrationProgress = {
    step1Complete: false,
    step2Complete: false,
    step3Complete: false
  };

  const handleLogout = () => {
    navigate('/participant-login');
  };

  // Simplified tracking statuses - ONLY shows AFTER registration is submitted
  const currentStatus = 'waiting_payment'; // Options: waiting_payment, pending_verification, document_revision, verified, rejected

  const statusInfo = {
    waiting_payment: {
      icon: Clock,
      color: 'amber',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-500',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
      title: 'Menunggu Pembayaran',
      description: 'Silakan lakukan pembayaran sesuai instruksi yang diberikan'
    },
    pending_verification: {
      icon: Clock,
      color: 'blue',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-500',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      title: 'Menunggu Validasi Admin',
      description: 'Dokumen Anda sedang dalam proses verifikasi oleh panitia'
    },
    document_revision: {
      icon: AlertCircle,
      color: 'orange',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-500',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
      title: 'Revisi Dokumen Diperlukan',
      description: 'Beberapa dokumen perlu diperbaiki. Silakan cek catatan admin'
    },
    verified: {
      icon: CheckCircle,
      color: 'green',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-500',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      title: 'Terverifikasi',
      description: 'Pendaftaran Anda telah disetujui. Selamat berkompetisi!'
    },
    rejected: {
      icon: XCircle,
      color: 'red',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-500',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      title: 'Ditolak',
      description: 'Pendaftaran tidak dapat diproses. Hubungi panitia untuk informasi lebih lanjut'
    }
  };

  const status = statusInfo[currentStatus];
  const StatusIcon = status.icon;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <ParticipantSidebar 
        registrationProgress={registrationProgress}
        onLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0C2C4A] to-[#1FA84A] text-white py-8 px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Tracking Status Pendaftaran</h1>
            <p className="text-white/90">
              Pantau status pendaftaran Anda secara real-time
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-8 py-8 w-full">
          {/* Current Status Card */}
          <Card className={`mb-6 border-l-4 ${status.borderColor} ${status.bgColor}`}>
            <CardHeader>
              <CardTitle className="text-[#0C2C4A] flex items-center gap-3">
                <div className={`${status.iconBg} p-3 rounded-full`}>
                  <StatusIcon className={`w-6 h-6 ${status.iconColor}`} />
                </div>
                <div>
                  <p className="text-xl">{status.title}</p>
                  <p className="text-sm text-gray-600 font-normal mt-1">{status.description}</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentStatus === 'waiting_payment' && (
                <div className="bg-white rounded-lg p-4 border border-amber-200">
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Informasi Pembayaran:</strong>
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• Total yang harus dibayar akan ditampilkan setelah semua data lengkap</li>
                    <li>• Upload bukti pembayaran di halaman Step 3</li>
                    <li>• Verifikasi membutuhkan waktu 1-3 hari kerja</li>
                  </ul>
                </div>
              )}

              {currentStatus === 'document_revision' && (
                <div className="bg-white rounded-lg p-4 border border-orange-200 mt-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Catatan dari Admin:</p>
                  <p className="text-sm text-gray-600 italic">
                    "Foto KTP kurang jelas. Silakan upload ulang dengan resolusi lebih tinggi."
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#0C2C4A] text-lg">Alur Pendaftaran</CardTitle>
              <CardDescription>
                Tahapan proses verifikasi pendaftaran
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1FA84A] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                    1
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-700">Lengkapi Data & Upload Dokumen</p>
                    <p className="text-sm text-gray-600 mt-1">Isi semua data peserta dan upload dokumen persyaratan</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1FA84A] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                    2
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-700">Lakukan Pembayaran</p>
                    <p className="text-sm text-gray-600 mt-1">Transfer sesuai nominal dan upload bukti pembayaran</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold text-sm flex-shrink-0">
                    3
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-700">Verifikasi Admin</p>
                    <p className="text-sm text-gray-600 mt-1">Panitia melakukan validasi dokumen dan pembayaran (1-3 hari kerja)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold text-sm flex-shrink-0">
                    4
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-700">Pendaftaran Terverifikasi</p>
                    <p className="text-sm text-gray-600 mt-1">Anda akan mendapat notifikasi dan dapat mengikuti kompetisi</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Help Section */}
          <Card className="mt-6 border-[#F6A500]">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[#F6A500] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-700 mb-1">Butuh Bantuan?</p>
                  <p className="text-sm text-gray-600">
                    Jika ada kendala atau pertanyaan, hubungi panitia melalui email: <strong>info@muhammadiyahgames.id</strong> atau WhatsApp: <strong>+62 812-3456-7890</strong>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}