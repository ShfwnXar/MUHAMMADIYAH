// Submit Registration Modal Component
// Confirmation → Loading → Success/Error flow

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  CheckCircle2, 
  XCircle, 
  Loader2, 
  FileCheck, 
  DollarSign,
  AlertCircle,
  ArrowRight,
  Plus
} from 'lucide-react';
import { REQUIRED_DOCUMENTS, BANK_ACCOUNT } from '../utils/constants';
import { formatCurrency, PricingBreakdown } from '../utils/pricingCalculation';

type ModalState = 'confirmation' | 'loading' | 'success' | 'error';

interface SubmitRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: ModalState;
  onConfirm: () => void;
  onRetry?: () => void;
  // Data for confirmation screen
  registrationSummary?: {
    sportName: string;
    level: string;
    participantCount: number;
    officialCount: number;
  };
  documentsChecklist?: {
    [key: string]: boolean;
  };
  pricingBreakdown?: PricingBreakdown;
  // Data for success screen
  registrationNumber?: string;
  registrationStatus?: string;
  // Data for error screen
  errorMessage?: string;
}

export function SubmitRegistrationModal({
  isOpen,
  onClose,
  state,
  onConfirm,
  onRetry,
  registrationSummary,
  documentsChecklist,
  pricingBreakdown,
  registrationNumber,
  registrationStatus,
  errorMessage
}: SubmitRegistrationModalProps) {
  
  // Prevent closing during loading
  const handleClose = () => {
    if (state !== 'loading') {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* CONFIRMATION STATE */}
        {state === 'confirmation' && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl text-[#0C2C4A] flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-[#F6A500]" />
                Konfirmasi Pengiriman Pendaftaran
              </DialogTitle>
              <DialogDescription>
                Pastikan semua data dan dokumen sudah benar sebelum mengirim pendaftaran.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Registration Summary */}
              {registrationSummary && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-[#0C2C4A] mb-3 flex items-center gap-2">
                    <FileCheck className="w-4 h-4" />
                    Ringkasan Pendaftaran
                  </h4>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Cabang Olahraga:</dt>
                      <dd className="font-semibold text-[#0C2C4A]">{registrationSummary.sportName}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Jenjang:</dt>
                      <dd className="font-semibold text-[#0C2C4A]">{registrationSummary.level}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Jumlah Peserta:</dt>
                      <dd className="font-semibold text-[#0C2C4A]">{registrationSummary.participantCount} orang</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Jumlah Official:</dt>
                      <dd className="font-semibold text-[#0C2C4A]">{registrationSummary.officialCount} orang</dd>
                    </div>
                  </dl>
                </div>
              )}

              {/* Documents Checklist */}
              {documentsChecklist && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-[#0C2C4A] mb-3">Checklist Dokumen</h4>
                  <div className="space-y-2">
                    {REQUIRED_DOCUMENTS.map((doc) => {
                      const isUploaded = documentsChecklist[doc.type] || false;
                      return (
                        <div key={doc.type} className="flex items-center gap-2">
                          {isUploaded ? (
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-500" />
                          )}
                          <span className={`text-sm ${isUploaded ? 'text-gray-700' : 'text-red-600'}`}>
                            {doc.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Pricing Breakdown */}
              {pricingBreakdown && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-[#0C2C4A] mb-3 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Total Biaya
                  </h4>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">
                        {pricingBreakdown.isVolleyball 
                          ? 'Biaya Tim (1 tim)' 
                          : `Biaya Peserta (${pricingBreakdown.participantCount} orang)`}
                      </dt>
                      <dd className="font-semibold">{formatCurrency(pricingBreakdown.participantFee)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Biaya Official ({pricingBreakdown.officialCount} orang)</dt>
                      <dd className="font-semibold">{formatCurrency(pricingBreakdown.officialFee)}</dd>
                    </div>
                    <div className="border-t border-green-300 pt-2 mt-2 flex justify-between items-center">
                      <dt className="font-bold text-[#0C2C4A]">Total Pembayaran:</dt>
                      <dd className="text-xl font-bold text-[#1FA84A]">{formatCurrency(pricingBreakdown.total)}</dd>
                    </div>
                  </dl>

                  {/* Bank Info */}
                  <div className="mt-4 pt-4 border-t border-green-300">
                    <p className="text-xs text-gray-600 mb-2">Transfer ke rekening:</p>
                    <div className="bg-white rounded p-3 space-y-1">
                      <p className="text-sm"><span className="text-gray-600">Bank:</span> <span className="font-semibold">{BANK_ACCOUNT.bank}</span></p>
                      <p className="text-sm"><span className="text-gray-600">Rekening:</span> <span className="font-mono font-bold">{BANK_ACCOUNT.accountNumber}</span></p>
                      <p className="text-sm"><span className="text-gray-600">A/N:</span> <span className="font-semibold">{BANK_ACCOUNT.accountName}</span></p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Kembali
              </Button>
              <Button 
                onClick={onConfirm}
                className="bg-[#1FA84A] hover:bg-[#168f3d] text-white"
              >
                Ya, Kirim Sekarang
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </DialogFooter>
          </>
        )}

        {/* LOADING STATE */}
        {state === 'loading' && (
          <div className="py-12 text-center">
            <Loader2 className="w-16 h-16 text-[#1FA84A] animate-spin mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#0C2C4A] mb-2">
              Mengirim Pendaftaran...
            </h3>
            <p className="text-gray-600">
              Mohon tunggu, jangan tutup halaman ini.
            </p>
          </div>
        )}

        {/* SUCCESS STATE */}
        {state === 'success' && (
          <>
            <div className="py-8 text-center">
              <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-[#0C2C4A] mb-2">
                Pendaftaran Berhasil Dikirim!
              </h3>
              <p className="text-gray-600 mb-6">
                Pendaftaran Anda telah berhasil disubmit ke sistem.
              </p>

              {/* Registration Number */}
              {registrationNumber && (
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
                  <p className="text-sm text-gray-600 mb-2">Nomor Registrasi Anda:</p>
                  <p className="text-3xl font-bold text-[#0C2C4A] font-mono tracking-wider">
                    {registrationNumber}
                  </p>
                  <Badge className="mt-3 bg-blue-600">
                    {registrationStatus || 'Menunggu Pembayaran'}
                  </Badge>
                </div>
              )}

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 text-left">
                <h4 className="font-semibold text-[#0C2C4A] mb-2">Langkah Selanjutnya:</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>✓ Simpan nomor registrasi Anda</li>
                  <li>✓ Upload bukti pembayaran jika belum</li>
                  <li>✓ Pantau status validasi di Dashboard</li>
                  <li>✓ Tunggu konfirmasi dari panitia</li>
                </ul>
              </div>
            </div>

            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button 
                variant="outline" 
                onClick={handleClose}
                className="w-full sm:w-auto"
              >
                Lihat Detail Pendaftaran
              </Button>
              <Button 
                onClick={handleClose}
                className="bg-[#1FA84A] hover:bg-[#168f3d] text-white w-full sm:w-auto"
              >
                <Plus className="w-4 h-4 mr-2" />
                Tambah Peserta Baru
              </Button>
            </DialogFooter>
          </>
        )}

        {/* ERROR STATE */}
        {state === 'error' && (
          <>
            <div className="py-8 text-center">
              <div className="bg-red-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <XCircle className="w-12 h-12 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-[#0C2C4A] mb-2">
                Pendaftaran Gagal
              </h3>
              <p className="text-gray-600 mb-4">
                Terjadi kesalahan saat mengirim pendaftaran.
              </p>

              {/* Error Message */}
              {errorMessage && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left">
                  <p className="text-sm text-red-800">
                    <strong>Error:</strong> {errorMessage}
                  </p>
                </div>
              )}

              <p className="text-sm text-gray-600">
                Silakan coba lagi atau hubungi panitia jika masalah berlanjut.
              </p>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Kembali
              </Button>
              <Button 
                onClick={onRetry}
                className="bg-[#D92B2B] hover:bg-[#b82424] text-white"
              >
                Coba Lagi
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
