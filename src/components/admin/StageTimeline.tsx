import React from 'react';
import { CheckCircle, Calendar, FileText, Upload, Shield } from 'lucide-react';

interface StageConfig {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

interface StageTimelineProps {
  stages: StageConfig[];
}

export function StageTimeline({ stages }: StageTimelineProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
  };

  const getStageIcon = (id: number) => {
    switch (id) {
      case 1:
        return FileText;
      case 2:
        return Calendar;
      case 3:
        return Upload;
      default:
        return CheckCircle;
    }
  };

  const isStageActive = (stage: StageConfig) => {
    if (!stage.isActive) return false;
    const now = new Date();
    const start = new Date(stage.startDate);
    const end = new Date(stage.endDate);
    return now >= start && now <= end;
  };

  const isStagePassed = (stage: StageConfig) => {
    const now = new Date();
    const end = new Date(stage.endDate);
    return now > end;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-xl font-bold text-[#0C2C4A] mb-6 flex items-center gap-2">
        <Calendar className="w-6 h-6 text-[#1FA84A]" />
        Timeline Preview Tahapan Pendaftaran
      </h2>

      {/* Desktop Timeline */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-10 left-0 right-0 h-1 bg-slate-200" style={{ left: '5%', right: '5%' }} />
          
          {/* Timeline Items */}
          <div className="relative flex justify-between items-start">
            {stages.map((stage, index) => {
              const Icon = getStageIcon(stage.id);
              const isActive = isStageActive(stage);
              const isPassed = isStagePassed(stage);
              
              return (
                <div key={stage.id} className="flex flex-col items-center" style={{ flex: 1 }}>
                  {/* Icon Circle */}
                  <div className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center border-4 transition-all ${
                    isActive 
                      ? 'bg-[#1FA84A] border-[#1FA84A] shadow-lg shadow-green-300' 
                      : isPassed
                      ? 'bg-slate-400 border-slate-400'
                      : stage.isActive
                      ? 'bg-white border-[#F6A500]'
                      : 'bg-slate-100 border-slate-300'
                  }`}>
                    <Icon className={`w-8 h-8 ${
                      isActive || isPassed ? 'text-white' : stage.isActive ? 'text-[#F6A500]' : 'text-slate-400'
                    }`} />
                  </div>

                  {/* Stage Info */}
                  <div className="mt-4 text-center max-w-[200px]">
                    <div className={`font-bold mb-1 ${
                      isActive ? 'text-[#1FA84A]' : isPassed ? 'text-slate-500' : 'text-[#0C2C4A]'
                    }`}>
                      Tahap {stage.id}
                    </div>
                    <div className="text-sm text-slate-600 mb-2 line-clamp-2">
                      {stage.title.replace(/^Tahap \d+: /, '')}
                    </div>
                    
                    {/* Date Range */}
                    {stage.isActive ? (
                      <div className="text-xs space-y-1">
                        <div className="flex items-center justify-center gap-1 text-[#1FA84A]">
                          <Calendar className="w-3 h-3" />
                          <span className="font-semibold">{formatDate(stage.startDate)}</span>
                        </div>
                        <div className="text-slate-400">—</div>
                        <div className="flex items-center justify-center gap-1 text-[#D92B2B]">
                          <Calendar className="w-3 h-3" />
                          <span className="font-semibold">{formatDate(stage.endDate)}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-xs text-slate-400">Nonaktif</div>
                    )}

                    {/* Status Badge */}
                    {isActive && (
                      <div className="mt-2 inline-block px-2 py-1 bg-[#1FA84A] text-white text-xs font-semibold rounded-full">
                        Sedang Berlangsung
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Validation Stage */}
            <div className="flex flex-col items-center" style={{ flex: 1 }}>
              <div className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center border-4 bg-white border-[#0C2C4A]">
                <Shield className="w-8 h-8 text-[#0C2C4A]" />
              </div>
              <div className="mt-4 text-center max-w-[200px]">
                <div className="font-bold text-[#0C2C4A] mb-1">
                  Validasi
                </div>
                <div className="text-sm text-slate-600 mb-2">
                  Admin Review
                </div>
                <div className="text-xs text-slate-500">
                  Setelah tahap 3 selesai
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Timeline */}
      <div className="md:hidden space-y-4">
        {stages.map((stage, index) => {
          const Icon = getStageIcon(stage.id);
          const isActive = isStageActive(stage);
          const isPassed = isStagePassed(stage);

          return (
            <div key={stage.id} className="relative">
              {index < stages.length && (
                <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-slate-200" />
              )}
              <div className="flex gap-4">
                <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center border-4 flex-shrink-0 ${
                  isActive 
                    ? 'bg-[#1FA84A] border-[#1FA84A]' 
                    : isPassed
                    ? 'bg-slate-400 border-slate-400'
                    : stage.isActive
                    ? 'bg-white border-[#F6A500]'
                    : 'bg-slate-100 border-slate-300'
                }`}>
                  <Icon className={`w-6 h-6 ${
                    isActive || isPassed ? 'text-white' : stage.isActive ? 'text-[#F6A500]' : 'text-slate-400'
                  }`} />
                </div>
                <div className="flex-1 pb-8">
                  <div className={`font-bold ${isActive ? 'text-[#1FA84A]' : 'text-[#0C2C4A]'}`}>
                    {stage.title}
                  </div>
                  <div className="text-sm text-slate-600 mb-2">{stage.description}</div>
                  {stage.isActive ? (
                    <div className="text-xs text-slate-500">
                      {formatDate(stage.startDate)} — {formatDate(stage.endDate)}
                    </div>
                  ) : (
                    <div className="text-xs text-slate-400">Nonaktif</div>
                  )}
                  {isActive && (
                    <div className="mt-2 inline-block px-2 py-1 bg-[#1FA84A] text-white text-xs font-semibold rounded-full">
                      Berlangsung
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Validation */}
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-full flex items-center justify-center border-4 bg-white border-[#0C2C4A] flex-shrink-0">
            <Shield className="w-6 h-6 text-[#0C2C4A]" />
          </div>
          <div className="flex-1">
            <div className="font-bold text-[#0C2C4A]">Validasi Admin</div>
            <div className="text-sm text-slate-600">Review dan approval berkas peserta</div>
          </div>
        </div>
      </div>
    </div>
  );
}
