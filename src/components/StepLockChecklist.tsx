import React from 'react';
import { CheckCircle, Circle, Lock } from 'lucide-react';

interface StepLockChecklistProps {
  step1Complete: boolean;
  step2Complete: boolean;
  step3Complete: boolean;
  adminValidated?: boolean;
}

export function StepLockChecklist({ 
  step1Complete, 
  step2Complete, 
  step3Complete,
  adminValidated = false
}: StepLockChecklistProps) {
  const steps = [
    {
      id: 1,
      label: 'Pilih cabang lomba',
      condition: 'Data peserta aktif',
      status: step1Complete,
      color: 'text-[#1FA84A]'
    },
    {
      id: 2,
      label: 'Input data peserta',
      condition: 'Pembayaran & upload aktif',
      status: step2Complete,
      color: 'text-[#1FA84A]'
    },
    {
      id: 3,
      label: 'Pembayaran & upload berkas',
      condition: 'Menunggu validasi admin',
      status: step3Complete,
      color: 'text-[#F6A500]'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold text-[#0C2C4A] mb-4 flex items-center gap-2">
        <Lock className="w-5 h-5 text-[#F6A500]" />
        Checklist Pendaftaran
      </h3>
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-4 font-semibold text-sm text-slate-600 pb-2 border-b">
          <div>Tahap</div>
          <div>Kondisi</div>
        </div>
        {steps.map((step) => (
          <div key={step.id} className="grid grid-cols-2 gap-4 items-center">
            <div className="flex items-center gap-2">
              {step.status ? (
                <CheckCircle className={`w-5 h-5 ${step.color}`} />
              ) : (
                <Circle className="w-5 h-5 text-slate-300" />
              )}
              <span className={`text-sm ${step.status ? step.color : 'text-slate-500'}`}>
                {step.label}
              </span>
            </div>
            <div className={`text-sm ${step.status ? 'font-semibold text-[#0C2C4A]' : 'text-slate-400'}`}>
              {step.condition}
            </div>
          </div>
        ))}
      </div>
      
      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
          <span>Progress Pendaftaran</span>
          <span className="font-semibold">
            {[step1Complete, step2Complete, step3Complete].filter(Boolean).length}/3
          </span>
        </div>
        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#1FA84A] to-[#F6A500] transition-all duration-500"
            style={{ 
              width: `${([step1Complete, step2Complete, step3Complete].filter(Boolean).length / 3) * 100}%` 
            }}
          />
        </div>
      </div>
    </div>
  );
}