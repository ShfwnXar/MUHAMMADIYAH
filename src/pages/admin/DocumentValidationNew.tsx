// Admin Document Validation Page
// 3-state validation workflow: Diterima / Perlu Revisi / Ditolak

import React, { useState } from 'react';
import { AdminSidebar } from '../../components/AdminSidebar';
import { Header } from '../../components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Textarea } from '../../components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  Eye,
  Download,
  Filter
} from 'lucide-react';
import { 
  REQUIRED_DOCUMENTS, 
  DocumentType,
  DocumentValidationStatus,
  RegistrationStatus,
  STATUS_LABELS
} from '../../utils/constants';
import { adminRegistrationAPI } from '../../utils/api';
import { toast } from 'sonner@2.0.3';

interface Registration {
  id: string;
  registration_number: string;
  sport: string;
  participant_name: string;
  status: RegistrationStatus;
  documents: {
    [key in DocumentType]?: {
      filename: string;
      url: string;
      validation_status: DocumentValidationStatus;
      validation_note?: string;
    };
  };
}

export default function DocumentValidation() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<{
    type: DocumentType;
    url: string;
    status: DocumentValidationStatus;
  } | null>(null);
  
  const [validationNote, setValidationNote] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  // Load registrations
  React.useEffect(() => {
    loadRegistrations();
  }, []);

  const loadRegistrations = async () => {
    try {
      // TODO: Call API
      // const data = await adminRegistrationAPI.list({ status: 'awaiting_admin_validation' });
      // setRegistrations(data);

      // Mock data
      setRegistrations([
        {
          id: '1',
          registration_number: 'MG2026-PS-0001',
          sport: 'Pencak Silat Tapak Suci',
          participant_name: 'Ahmad Fauzi',
          status: 'awaiting_admin_validation',
          documents: {
            dapodik_pd_dikti: {
              filename: 'dapodik.pdf',
              url: '#',
              validation_status: 'pending'
            },
            ktp_kia: {
              filename: 'ktp.jpg',
              url: '#',
              validation_status: 'pending'
            },
            kartu_pelajar_ktm: {
              filename: 'kartu_pelajar.jpg',
              url: '#',
              validation_status: 'pending'
            },
            raport_khs: {
              filename: 'raport.pdf',
              url: '#',
              validation_status: 'pending'
            },
            pas_foto: {
              filename: 'foto.jpg',
              url: '#',
              validation_status: 'pending'
            },
            bukti_pembayaran: {
              filename: 'bukti_bayar.jpg',
              url: '#',
              validation_status: 'pending'
            }
          }
        }
      ]);
    } catch (error) {
      toast.error('Gagal memuat data pendaftaran');
    }
  };

  const handleValidateDocument = async (
    registrationId: string,
    docType: DocumentType,
    status: DocumentValidationStatus
  ) => {
    if (status !== 'approved' && !validationNote.trim()) {
      toast.error('Catatan wajib diisi untuk status Ditolak atau Perlu Revisi');
      return;
    }

    setIsValidating(true);

    try {
      // TODO: Call API
      // await adminRegistrationAPI.validateDocument(
      //   registrationId,
      //   docType,
      //   status,
      //   validationNote
      // );

      toast.success(`Dokumen ${docType} berhasil divalidasi`);
      setSelectedDocument(null);
      setValidationNote('');
      loadRegistrations();
    } catch (error) {
      toast.error('Gagal memvalidasi dokumen');
    } finally {
      setIsValidating(false);
    }
  };

  const getValidationBadge = (status: DocumentValidationStatus) => {
    switch (status) {
      case 'approved':
        return (
          <Badge className="bg-green-600 text-white">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Diterima
          </Badge>
        );
      case 'rejected':
        return (
          <Badge className="bg-red-600 text-white">
            <XCircle className="w-3 h-3 mr-1" />
            Ditolak
          </Badge>
        );
      case 'revision_required':
        return (
          <Badge className="bg-orange-600 text-white">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Perlu Revisi
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-600 text-white">
            Pending
          </Badge>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar currentPage="validation" />

      <div className="flex-1">
        <Header variant="admin" />

        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-[#0C2C4A] mb-2">
                Validasi Dokumen
              </h1>
              <p className="text-gray-600">
                Verifikasi kelengkapan dan keabsahan 6 dokumen wajib pendaftaran
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Total Pendaftaran</p>
                    <p className="text-3xl font-bold text-[#0C2C4A]">{registrations.length}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Menunggu Validasi</p>
                    <p className="text-3xl font-bold text-blue-600">12</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Perlu Revisi</p>
                    <p className="text-3xl font-bold text-orange-600">5</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Ditolak</p>
                    <p className="text-3xl font-bold text-red-600">2</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Registrations List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Daftar Pendaftaran</span>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {registrations.map((registration) => (
                    <Card key={registration.id} className="border-2">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-bold text-[#0C2C4A] text-lg">
                              {registration.registration_number}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {registration.participant_name} • {registration.sport}
                            </p>
                            <Badge className="mt-2">
                              {STATUS_LABELS[registration.status]}
                            </Badge>
                          </div>
                          <Button
                            onClick={() => setSelectedRegistration(
                              selectedRegistration?.id === registration.id ? null : registration
                            )}
                            variant="outline"
                            size="sm"
                          >
                            {selectedRegistration?.id === registration.id ? 'Tutup' : 'Lihat Detail'}
                          </Button>
                        </div>

                        {/* Document Grid - Only 6 Documents */}
                        {selectedRegistration?.id === registration.id && (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 pt-6 border-t">
                            {REQUIRED_DOCUMENTS.map((docConfig) => {
                              const doc = registration.documents[docConfig.type];
                              
                              return (
                                <div
                                  key={docConfig.type}
                                  className={`border-2 rounded-lg p-4 ${
                                    doc?.validation_status === 'approved'
                                      ? 'border-green-500 bg-green-50'
                                      : doc?.validation_status === 'rejected'
                                      ? 'border-red-500 bg-red-50'
                                      : doc?.validation_status === 'revision_required'
                                      ? 'border-orange-500 bg-orange-50'
                                      : 'border-gray-300 bg-white'
                                  }`}
                                >
                                  <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1">
                                      <h4 className="font-semibold text-sm text-[#0C2C4A]">
                                        {docConfig.label}
                                      </h4>
                                      <p className="text-xs text-gray-600 mt-1">
                                        {doc?.filename || 'Belum diupload'}
                                      </p>
                                    </div>
                                    {doc && getValidationBadge(doc.validation_status)}
                                  </div>

                                  {doc && (
                                    <>
                                      {/* Action Buttons */}
                                      <div className="flex gap-2 mt-3">
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          className="flex-1"
                                          onClick={() => window.open(doc.url, '_blank')}
                                        >
                                          <Eye className="w-3 h-3 mr-1" />
                                          Lihat
                                        </Button>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => setSelectedDocument({
                                            type: docConfig.type,
                                            url: doc.url,
                                            status: doc.validation_status
                                          })}
                                          className="bg-[#1FA84A] text-white hover:bg-[#168f3d]"
                                        >
                                          Validasi
                                        </Button>
                                      </div>

                                      {/* Validation Note */}
                                      {doc.validation_note && (
                                        <div className="mt-3 p-2 bg-white rounded border border-gray-200">
                                          <p className="text-xs text-gray-600 font-semibold mb-1">
                                            Catatan:
                                          </p>
                                          <p className="text-xs text-gray-700">
                                            {doc.validation_note}
                                          </p>
                                        </div>
                                      )}
                                    </>
                                  )}

                                  {!doc && (
                                    <p className="text-xs text-gray-500 italic mt-2">
                                      Dokumen belum diupload oleh peserta
                                    </p>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}

                  {registrations.length === 0 && (
                    <div className="text-center py-12">
                      <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-600">Tidak ada pendaftaran yang perlu divalidasi</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Validation Modal */}
      {selectedDocument && (
        <Dialog open={true} onOpenChange={() => setSelectedDocument(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Validasi Dokumen</DialogTitle>
              <DialogDescription>
                Pilih status validasi dan berikan catatan jika diperlukan
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {/* Document Preview */}
              <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center min-h-[200px]">
                <p className="text-gray-600 text-sm">Preview dokumen: {selectedDocument.type}</p>
              </div>

              {/* Validation Note */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  Catatan Validasi <span className="text-red-600">*</span>
                </Label>
                <Textarea
                  placeholder="Berikan catatan untuk status Ditolak atau Perlu Revisi (wajib)"
                  value={validationNote}
                  onChange={(e) => setValidationNote(e.target.value)}
                  rows={4}
                  className="w-full"
                />
              </div>
            </div>

            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={() => setSelectedDocument(null)}
                disabled={isValidating}
              >
                Batal
              </Button>
              <Button
                onClick={() => {
                  if (selectedRegistration) {
                    handleValidateDocument(
                      selectedRegistration.id,
                      selectedDocument.type,
                      'approved'
                    );
                  }
                }}
                disabled={isValidating}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Terima
              </Button>
              <Button
                onClick={() => {
                  if (selectedRegistration) {
                    handleValidateDocument(
                      selectedRegistration.id,
                      selectedDocument.type,
                      'revision_required'
                    );
                  }
                }}
                disabled={isValidating}
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Perlu Revisi
              </Button>
              <Button
                onClick={() => {
                  if (selectedRegistration) {
                    handleValidateDocument(
                      selectedRegistration.id,
                      selectedDocument.type,
                      'rejected'
                    );
                  }
                }}
                disabled={isValidating}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Tolak
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>;
}
