import React from 'react';
import { Check, Lock } from 'lucide-react';

interface RegistrationWizardProps {
  currentStep: number;
  step1Complete: boolean;
  step2Complete: boolean;
  step3Complete?: boolean;
}

export function RegistrationWizard({ currentStep, step1Complete, step2Complete, step3Complete = false }: RegistrationWizardProps) {
  const steps = [
    {
      number: 1,
      label: 'Pilih Cabang & Kategori',
      isComplete: step1Complete,
      isLocked: false
    },
    {
      number: 2,
      label: 'Data Peserta',
      isComplete: step2Complete,
      isLocked: !step1Complete
    },
    {
      number: 3,
      label: 'Pembayaran & Upload Berkas',
      isComplete: step3Complete,
      isLocked: !step2Complete
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <h3 className="text-lg font-bold text-[#0C2C4A] mb-6">Progress Pendaftaran</h3>
      
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const hasConnector = index < steps.length - 1;
          
          return (
            <div key={step.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                {/* Step Circle */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    step.isComplete
                      ? 'bg-[#1FA84A] text-white'
                      : step.isLocked
                      ? 'bg-gray-200 text-gray-400'
                      : currentStep === step.number
                      ? 'bg-[#0C2C4A] text-white ring-4 ring-[#0C2C4A]/20'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step.isComplete ? (
                    <Check className="w-6 h-6" />
                  ) : step.isLocked ? (
                    <Lock className="w-5 h-5" />
                  ) : (
                    <span className="font-bold">{step.number}</span>
                  )}
                </div>

                {/* Step Label */}
                <div className="mt-3 text-center">
                  <p
                    className={`text-sm font-medium ${
                      step.isLocked ? 'text-gray-400' : 'text-gray-700'
                    }`}
                  >
                    Step {step.number}
                  </p>
                  <p
                    className={`text-xs mt-1 ${
                      step.isLocked ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {step.label}
                  </p>
                  {/* Simplified lock message - inline with label */}
                  {step.isLocked && (
                    <p className="text-xs text-gray-400 mt-1">
                      Terkunci
                    </p>
                  )}
                </div>
              </div>

              {/* Connector Line */}
              {hasConnector && (
                <div className="flex-1 h-1 mx-2 -mt-16">
                  <div
                    className={`h-full transition-all ${
                      steps[index + 1].isComplete || currentStep > step.number
                        ? 'bg-[#1FA84A]'
                        : 'bg-gray-200'
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}