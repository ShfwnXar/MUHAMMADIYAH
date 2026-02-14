import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { SportCard } from '../components/SportCard';
import { ParticipantSidebar } from '../components/ParticipantSidebar';
import { RegistrationWizard } from '../components/RegistrationWizard';
import { StepLockChecklist } from '../components/StepLockChecklist';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Swords, Zap, Target, Circle, Users2, Lock, AlertCircle, Clock, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';
import { BadmintonIcon } from '../components/icons/BadmintonIcon';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { getRegistrationProgress } from '../utils/registrationStorage';

export default function Dashboard() {
  const navigate = useNavigate();
  
  // Load registration progress from localStorage
  const [registrationProgress, setRegistrationProgress] = useState({
    step1Complete: false,
    step2Complete: false,
    step3Complete: false
  });

  // Load progress on mount and when returning to dashboard
  useEffect(() => {
    const loadProgress = () => {
      const progress = getRegistrationProgress();
      setRegistrationProgress(progress);
    };

    loadProgress();

    // Listen for storage changes from other tabs/windows
    window.addEventListener('storage', loadProgress);
    
    // Also check when window gains focus (user returns to page)
    window.addEventListener('focus', loadProgress);

    return () => {
      window.removeEventListener('storage', loadProgress);
      window.removeEventListener('focus', loadProgress);
    };
  }, []);

  // Mock stage schedule from admin settings (in real app, fetch from backend)
  const stageSchedule = {
    step2OpenDate: '2026-04-10T00:00:00', // Example: Step 2 opens April 10, 2026
    step2CloseDate: '2026-04-25T15:00:00', // Example: Atletik deadline
    isStep2Active: true // Admin can toggle this
  };

  // DEMO: Toggle function to test locked/unlocked states (can be removed in production)
  const toggleStep1Completion = () => {
    const newProgress = {
      ...registrationProgress,
      step1Complete: !registrationProgress.step1Complete
    };
    setRegistrationProgress(newProgress);
    
    // Also update localStorage for demo
    localStorage.setItem('muhammadiyah_games_registration', JSON.stringify(newProgress));
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDaysUntil = (dateStr: string) => {
    const now = new Date();
    const target = new Date(dateStr);
    const diff = target.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  const isStep2Locked = !registrationProgress.step1Complete;
  const daysUntilStep2Opens = getDaysUntil(stageSchedule.step2OpenDate);

  const sports = [
    {
      id: 'tapak-suci',
      name: 'Tapak Suci',
      description: 'Seni bela diri khas Muhammadiyah dengan kategori tanding, seni tunggal, ganda, dan beregu',
      icon: Swords,
      color: '#1FA84A',
      secondaryColor: '#D92B2B',
      route: '/sport/tapak-suci'
    },
    {
      id: 'atletik',
      name: 'Atletik',
      description: 'Nomor lari, lompat, dan lempar untuk kategori SMP, SMA, dan Mahasiswa',
      icon: Zap,
      color: '#D92B2B',
      secondaryColor: '#0C2C4A',
      route: '/sport/atletik'
    },
    {
      id: 'panahan',
      name: 'Panahan',
      description: 'Divisi standar nasional, barebow, recurve, compound, dan horsebow',
      icon: Target,
      color: '#1FA84A',
      secondaryColor: '#F6A500',
      route: '/sport/panahan'
    },
    {
      id: 'badminton',
      name: 'Bulutangkis',
      description: 'Beregu, tunggal, dan ganda putra/putri dengan sistem rally point',
      icon: BadmintonIcon,
      color: '#1FA84A',
      secondaryColor: '#0C2C4A',
      route: '/sport/badminton'
    },
    {
      id: 'tenis-meja',
      name: 'Tenis Meja',
      description: 'Kategori beregu, tunggal, ganda, dan campuran untuk kelahiran max 2008',
      icon: Circle,
      color: '#D92B2B',
      secondaryColor: '#0C2C4A',
      route: '/sport/tenis-meja'
    },
    {
      id: 'voli',
      name: 'Voli Indoor',
      description: 'Tim putra dan putri dengan kuota 12 atlet + 3 official per tim',
      icon: Users2,
      color: '#1FA84A',
      secondaryColor: '#D92B2B',
      route: '/sport/voli'
    }
  ];

  const handleLogout = () => {
    navigate('/participant-login');
  };

  const canContinueRegistration = registrationProgress.step1Complete;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar */}
      <ParticipantSidebar 
        registrationProgress={registrationProgress}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0C2C4A] to-[#1FA84A] text-white py-8 px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Dashboard Peserta</h1>
            <p className="text-white/90">
              Selamat datang di portal pendaftaran Muhammadiyah Games 2026
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-8 py-8 w-full">
          {/* Registration Wizard */}
          <RegistrationWizard 
            currentStep={registrationProgress.step1Complete ? (registrationProgress.step2Complete ? 3 : 2) : 1}
            step1Complete={registrationProgress.step1Complete}
            step2Complete={registrationProgress.step2Complete}
            step3Complete={registrationProgress.step3Complete}
          />

          {/* Step 2 Lock Alert Banner */}
          {isStep2Locked && (
            <div className="bg-amber-50 border border-[#F6A500] rounded-lg p-6 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-[#F6A500] rounded-full p-2 flex-shrink-0">
                  <Lock className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#0C2C4A]">
                  Tahap 2 Terkunci
                </h3>
              </div>
              <p className="text-slate-700 mb-4 ml-11">
                Selesaikan <span className="font-semibold text-[#D92B2B]">Tahap 1: Pilih Cabang & Kategori</span> untuk melanjutkan.
              </p>
              <div className="ml-11">
                <Button
                  onClick={() => navigate('/registration/step-1')}
                  className="bg-[#1FA84A] hover:bg-[#168f3d] text-white"
                >
                  Mulai Tahap 1
                </Button>
              </div>
            </div>
          )}

          {/* Success Alert when Step 1 Complete */}
          {!isStep2Locked && !registrationProgress.step2Complete && (
            <div className="bg-green-50 border border-[#1FA84A] rounded-lg p-6 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-[#1FA84A] rounded-full p-2 flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#0C2C4A]">
                  Tahap 1 Selesai
                </h3>
              </div>
              <p className="text-slate-700 mb-4 ml-11">
                Pilihan cabang olahraga dan kategori sudah tersimpan! Lanjutkan ke Tahap 2.
              </p>
              <div className="ml-11">
                <Button
                  onClick={() => navigate('/registration/step-2')}
                  className="bg-[#1FA84A] hover:bg-[#168f3d] text-white"
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Lanjut ke Tahap 2
                </Button>
              </div>
            </div>
          )}

          {/* All Steps Complete */}
          {registrationProgress.step3Complete && (
            <div className="bg-blue-50 border border-[#0C2C4A] rounded-lg p-6 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-[#0C2C4A] rounded-full p-2 flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#0C2C4A]">
                  Pendaftaran Selesai!
                </h3>
              </div>
              <p className="text-slate-700 ml-11">
                Pendaftaran Anda telah diterima. Pantau status melalui menu <strong>Tracking Status</strong>.
              </p>
            </div>
          )}

          {/* Info Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Card className="border-l-4 border-[#1FA84A]">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Informasi Penting</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Pastikan memenuhi persyaratan usia dan kategori</li>
                  <li>• Maksimal 2 cabang olahraga per peserta</li>
                  <li>• Upload dokumen lengkap untuk validasi</li>
                  <li>• Pembayaran setelah berkas terverifikasi</li>
                </ul>
              </CardContent>
            </Card>

            {/* Step Lock Checklist */}
            <div className="lg:col-span-2">
              <StepLockChecklist
                step1Complete={registrationProgress.step1Complete}
                step2Complete={registrationProgress.step2Complete}
                step3Complete={registrationProgress.step3Complete}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}