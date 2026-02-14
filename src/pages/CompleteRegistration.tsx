// Complete Registration Page with Multi-Registration Support
// Backend-ready with proper API integration points

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { DocumentUploadSection } from '../components/DocumentUploadSection';
import { SubmitRegistrationModal } from '../components/SubmitRegistrationModal';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  Plus, 
  FileText, 
  Users, 
  DollarSign, 
  Send,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { 
  DocumentType, 
  SportSlug, 
  SPORTS, 
  BANK_ACCOUNT,
  EDUCATION_LEVELS,
  EducationLevel,
  RegistrationStatus
} from '../utils/constants';
import { calculateRegistrationCost, formatCurrency } from '../utils/pricingCalculation';
import { registrationAPI } from '../utils/api';
import { toast } from 'sonner@2.0.3';

interface UploadedFile {
  file: File;
  url: string;
  uploadedAt: Date;
}

interface RegistrationData {
  id?: string;
  registration_number?: string;
  sport: SportSlug | null;
  level: EducationLevel | null;
  team_name: string;
  participant_count: number;
  official_count: number;
  status: RegistrationStatus;
}

export default function CompleteRegistration() {
  const navigate = useNavigate();
  
  // State for registrations list
  const [registrations, setRegistrations] = useState<RegistrationData[]>([]);
  const [activeRegistrationId, setActiveRegistrationId] = useState<string | null>(null);

  // State for current registration
  const [currentRegistration, setCurrentRegistration] = useState<RegistrationData>({
    sport: null,
    level: null,
    team_name: '',
    participant_count: 0,
    official_count: 0,
    status: 'draft'
  });

  // State for documents
  const [documents, setDocuments] = useState<Record<DocumentType, UploadedFile | null>>({
    dapodik_pd_dikti: null,
    ktp_kia: null,
    kartu_pelajar_ktm: null,
    raport_khs: null,
    pas_foto: null,
    bukti_pembayaran: null
  });

  const [uploadingDoc, setUploadingDoc] = useState<DocumentType | null>(null);

  // Submit modal state
  const [modalState, setModalState] = useState<'confirmation' | 'loading' | 'success' | 'error' | null>(null);
  const [submitError, setSubmitError] = useState<string>('');

  // Load user registrations on mount
  useEffect(() => {
    loadUserRegistrations();
  }, []);

  const loadUserRegistrations = async () => {
    try {
      // TODO: Call API to load user's registrations
      // const data = await registrationAPI.list();
      // setRegistrations(data);
      
      // Mock data for development
      setRegistrations([]);
    } catch (error) {
      toast.error('Gagal memuat data pendaftaran');
    }
  };

  const handleDocumentUpload = async (docType: DocumentType, file: File) => {
    setUploadingDoc(docType);
    
    try {
      // TODO: Call API to upload document
      // if (activeRegistrationId) {
      //   await registrationAPI.uploadDocument(activeRegistrationId, docType, file);
      // }

      // Mock upload - create object URL for preview
      const url = URL.createObjectURL(file);
      setDocuments(prev => ({
        ...prev,
        [docType]: {
          file,
          url,
          uploadedAt: new Date()
        }
      }));

      toast.success(`${docType} berhasil diupload`);
    } catch (error) {
      toast.error('Upload gagal. Silakan coba lagi.');
    } finally {
      setUploadingDoc(null);
    }
  };

  const handleDocumentRemove = (docType: DocumentType) => {
    // TODO: Call API to delete document
    // if (activeRegistrationId) {
    //   await registrationAPI.deleteDocument(activeRegistrationId, docType);
    // }

    // Revoke object URL to prevent memory leak
    if (documents[docType]?.url) {
      URL.revokeObjectURL(documents[docType]!.url);
    }

    setDocuments(prev => ({
      ...prev,
      [docType]: null
    }));

    toast.success(`${docType} berhasil dihapus`);
  };

  const handleSubmitRegistration = () => {
    // Validate required documents
    const requiredDocs: DocumentType[] = [
      'dapodik_pd_dikti',
      'ktp_kia',
      'kartu_pelajar_ktm',
      'raport_khs',
      'pas_foto'
    ];

    const missingDocs = requiredDocs.filter(doc => !documents[doc]);

    if (missingDocs.length > 0) {
      toast.error('Lengkapi semua dokumen wajib sebelum submit');
      return;
    }

    // Show confirmation modal
    setModalState('confirmation');
  };

  const handleConfirmSubmit = async () => {
    setModalState('loading');

    try {
      // TODO: Call API to submit registration
      // if (activeRegistrationId) {
      //   await registrationAPI.submit(activeRegistrationId);
      // }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      setModalState('success');
      
      // Reload registrations
      setTimeout(() => {
        loadUserRegistrations();
      }, 1000);
    } catch (error) {
      setSubmitError('Terjadi kesalahan saat mengirim pendaftaran. Silakan coba lagi.');
      setModalState('error');
    }
  };

  const handleRetrySubmit = () => {
    setModalState('confirmation');
  };

  const handleCloseModal = () => {
    setModalState(null);
  };

  // Calculate pricing
  const pricingBreakdown = currentRegistration.sport
    ? calculateRegistrationCost(
        currentRegistration.sport,
        currentRegistration.participant_count,
        currentRegistration.official_count
      )
    : null;

  // Check if can submit
  const canSubmit = 
    currentRegistration.sport &&
    currentRegistration.level &&
    currentRegistration.participant_count > 0 &&
    documents.dapodik_pd_dikti &&
    documents.ktp_kia &&
    documents.kartu_pelajar_ktm &&
    documents.raport_khs &&
    documents.pas_foto;

  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="participant" showNavigation />

      <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#0C2C4A] mb-2">
              Pendaftaran Muhammadiyah Games 2026
            </h1>
            <p className="text-gray-600">
              Lengkapi data dan upload dokumen untuk melanjutkan pendaftaran
            </p>
          </div>

          {/* Multi-Registration Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-[#0C2C4A] mb-1">Multi-Pendaftaran Tersedia</h4>
                <p className="text-sm text-gray-700">
                  Anda dapat membuat beberapa pendaftaran untuk cabang olahraga yang berbeda. Setiap pendaftaran akan memiliki nomor registrasi unik.
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Registration Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Sport Selection Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Data Pendaftaran
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Sport Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cabang Olahraga <span className="text-red-600">*</span>
                    </label>
                    <select
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1FA84A] focus:border-transparent"
                      value={currentRegistration.sport || ''}
                      onChange={(e) => setCurrentRegistration(prev => ({
                        ...prev,
                        sport: e.target.value as SportSlug
                      }))}
                    >
                      <option value="">-- Pilih Cabang Olahraga --</option>
                      {Object.entries(SPORTS).map(([slug, sport]) => (
                        <option key={slug} value={slug}>
                          {sport.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Level Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Jenjang <span className="text-red-600">*</span>
                    </label>
                    <select
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1FA84A] focus:border-transparent"
                      value={currentRegistration.level || ''}
                      onChange={(e) => setCurrentRegistration(prev => ({
                        ...prev,
                        level: e.target.value as EducationLevel
                      }))}
                    >
                      <option value="">-- Pilih Jenjang --</option>
                      {EDUCATION_LEVELS.map(level => (
                        <option key={level.value} value={level.value}>
                          {level.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Participant Count */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Jumlah Peserta <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1FA84A] focus:border-transparent"
                      value={currentRegistration.participant_count}
                      onChange={(e) => setCurrentRegistration(prev => ({
                        ...prev,
                        participant_count: parseInt(e.target.value) || 0
                      }))}
                    />
                  </div>

                  {/* Official Count */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Jumlah Official
                    </label>
                    <input
                      type="number"
                      min="0"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1FA84A] focus:border-transparent"
                      value={currentRegistration.official_count}
                      onChange={(e) => setCurrentRegistration(prev => ({
                        ...prev,
                        official_count: parseInt(e.target.value) || 0
                      }))}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Document Upload Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Upload Dokumen (6 Wajib)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <DocumentUploadSection
                    documents={documents}
                    onUpload={handleDocumentUpload}
                    onRemove={handleDocumentRemove}
                    isUploading={uploadingDoc}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Right: Summary & Actions */}
            <div className="space-y-6">
              {/* Pricing Summary */}
              {pricingBreakdown && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <DollarSign className="w-5 h-5" />
                      Rincian Biaya
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          {pricingBreakdown.isVolleyball 
                            ? 'Biaya Tim' 
                            : `Peserta (${pricingBreakdown.participantCount})`}
                        </span>
                        <span className="font-semibold">
                          {formatCurrency(pricingBreakdown.participantFee)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Official ({pricingBreakdown.officialCount})
                        </span>
                        <span className="font-semibold">
                          {formatCurrency(pricingBreakdown.officialFee)}
                        </span>
                      </div>
                      <div className="border-t pt-2 mt-2 flex justify-between items-center">
                        <span className="font-bold text-[#0C2C4A]">Total</span>
                        <span className="text-xl font-bold text-[#1FA84A]">
                          {formatCurrency(pricingBreakdown.total)}
                        </span>
                      </div>
                    </div>

                    {/* Bank Account Info */}
                    <div className="bg-gray-50 rounded-lg p-3 mt-4 space-y-1 text-xs">
                      <p className="font-semibold text-[#0C2C4A] mb-2">Transfer ke:</p>
                      <p><span className="text-gray-600">Bank:</span> <span className="font-semibold">{BANK_ACCOUNT.bank}</span></p>
                      <p><span className="text-gray-600">Rekening:</span> <span className="font-mono font-bold">{BANK_ACCOUNT.accountNumber}</span></p>
                      <p><span className="text-gray-600">A/N:</span> <span className="font-semibold">{BANK_ACCOUNT.accountName}</span></p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Submit Button */}
              <Button
                className="w-full bg-[#1FA84A] hover:bg-[#168f3d] text-white"
                size="lg"
                onClick={handleSubmitRegistration}
                disabled={!canSubmit}
              >
                <Send className="w-4 h-4 mr-2" />
                Kirim Pendaftaran
              </Button>

              {/* Info Card */}
              <Card className="bg-amber-50 border-amber-200">
                <CardContent className="pt-6">
                  <h4 className="font-semibold text-[#0C2C4A] mb-2 text-sm">Catatan Penting</h4>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>• Upload 6 dokumen wajib</li>
                    <li>• Bukti bayar bisa diupload nanti</li>
                    <li>• Maksimal 2MB per file</li>
                    <li>• Format: PDF, JPG, PNG</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Submit Modal */}
      {modalState && (
        <SubmitRegistrationModal
          isOpen={true}
          onClose={handleCloseModal}
          state={modalState}
          onConfirm={handleConfirmSubmit}
          onRetry={handleRetrySubmit}
          registrationSummary={currentRegistration.sport ? {
            sportName: SPORTS[currentRegistration.sport].name,
            level: currentRegistration.level || '',
            participantCount: currentRegistration.participant_count,
            officialCount: currentRegistration.official_count
          } : undefined}
          documentsChecklist={Object.fromEntries(
            Object.entries(documents).map(([key, value]) => [key, value !== null])
          )}
          pricingBreakdown={pricingBreakdown || undefined}
          registrationNumber={currentRegistration.registration_number}
          registrationStatus={currentRegistration.status}
          errorMessage={submitError}
        />
      )}
    </div>
  );
}
