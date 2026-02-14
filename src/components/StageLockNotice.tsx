import React from 'react';
import { Lock, Clock, AlertCircle } from 'lucide-react';

interface StageLockNoticeProps {
  stageNumber: number;
  stageName: string;
  openDate?: string;
  closeDate?: string;
  isLocked?: boolean;
  reason?: 'not-started' | 'ended' | 'inactive' | 'prerequisite';
}

export function StageLockNotice({ 
  stageNumber, 
  stageName, 
  openDate, 
  closeDate,
  isLocked = false,
  reason = 'not-started'
}: StageLockNoticeProps) {
  if (!isLocked) return null;

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDaysUntilOpen = (dateStr?: string) => {
    if (!dateStr) return 0;
    const now = new Date();
    const target = new Date(dateStr);
    const diff = target.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const getNoticeContent = () => {
    switch (reason) {
      case 'not-started':
        const daysUntil = getDaysUntilOpen(openDate);
        return {
          icon: <Clock className="w-12 h-12 text-[#F6A500]" />,
          title: `🔒 Tahap ${stageNumber} Belum Dibuka`,
          message: openDate ? (
            <>
              <div className="text-lg font-semibold text-slate-700 mb-2">
                Dibuka pada: {formatDate(openDate)}
              </div>
              {daysUntil > 0 && (
                <div className="inline-block bg-[#F6A500] text-white px-4 py-2 rounded-full font-semibold">
                  🕒 {daysUntil} hari lagi
                </div>
              )}
            </>
          ) : (
            <div className="text-slate-600">Jadwal pembukaan akan segera diumumkan</div>
          ),
          bgColor: 'bg-amber-50',
          borderColor: 'border-[#F6A500]'
        };
      
      case 'ended':
        return {
          icon: <Lock className="w-12 h-12 text-[#D92B2B]" />,
          title: `Tahap ${stageNumber} Sudah Ditutup`,
          message: closeDate ? (
            <div className="text-slate-600">
              Tahap ini telah ditutup pada {formatDate(closeDate)}
            </div>
          ) : (
            <div className="text-slate-600">Tahap ini sudah tidak dapat diakses</div>
          ),
          bgColor: 'bg-red-50',
          borderColor: 'border-[#D92B2B]'
        };
      
      case 'inactive':
        return {
          icon: <AlertCircle className="w-12 h-12 text-slate-400" />,
          title: `Tahap ${stageNumber} Sedang Nonaktif`,
          message: (
            <div className="text-slate-600">
              Tahap ini sedang dinonaktifkan sementara oleh admin
            </div>
          ),
          bgColor: 'bg-slate-50',
          borderColor: 'border-slate-400'
        };
      
      case 'prerequisite':
        return {
          icon: <Lock className="w-12 h-12 text-[#0C2C4A]" />,
          title: `Selesaikan Tahap Sebelumnya`,
          message: (
            <div className="text-slate-600">
              Anda harus menyelesaikan Tahap {stageNumber - 1} terlebih dahulu
            </div>
          ),
          bgColor: 'bg-blue-50',
          borderColor: 'border-[#0C2C4A]'
        };
      
      default:
        return {
          icon: <Lock className="w-12 h-12 text-slate-400" />,
          title: 'Tahap Terkunci',
          message: <div className="text-slate-600">Tahap ini belum dapat diakses</div>,
          bgColor: 'bg-slate-50',
          borderColor: 'border-slate-400'
        };
    }
  };

  const content = getNoticeContent();

  return (
    <div className={`${content.bgColor} border-2 ${content.borderColor} rounded-lg p-8 text-center`}>
      <div className="flex justify-center mb-4">
        {content.icon}
      </div>
      <h2 className="text-2xl font-bold text-[#0C2C4A] mb-4">
        {content.title}
      </h2>
      <div className="mb-6">
        {content.message}
      </div>
      {openDate && reason === 'not-started' && (
        <div className="text-sm text-slate-500">
          Silakan kembali lagi pada tanggal yang telah ditentukan
        </div>
      )}
    </div>
  );
}
