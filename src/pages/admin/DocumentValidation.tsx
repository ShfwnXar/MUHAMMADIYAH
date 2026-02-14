import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { AdminSidebar } from '../../components/AdminSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Badge } from '../../components/ui/badge';
import { 
  FileCheck2, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock,
  FileText,
  Image as ImageIcon,
  AlertCircle,
  RefreshCw,
  MessageSquare
} from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import { REQUIRED_DOCUMENTS, DocumentType } from '../../utils/constants';

type DocumentStatus = 'pending' | 'approved' | 'revision_required' | 'rejected';

interface Document {
  id: string;
  type: DocumentType;
  label: string;
  fileType: string;
  status: DocumentStatus;
  url: string;
  revisionNote?: string;
  rejectionReason?: string;
}

interface Participant {
  id: string;
  name: string;
  sport: string;
  category: string;
  educationLevel: string;
  status: 'pending' | 'verified' | 'rejected';
  documents: Document[];
}

export default function DocumentValidation() {
  const navigate = useNavigate();
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  
  // Modal states
  const [revisionDialogOpen, setRevisionDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [currentDocumentId, setCurrentDocumentId] = useState<string | null>(null);
  const [revisionNote, setRevisionNote] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [previewDocument, setPreviewDocument] = useState<Document | null>(null);

  const handleLogout = () => {
    navigate('/admin-login');
  };

  // Generate 6 documents for each participant
  const generateParticipantDocuments = (participantId: string): Document[] => {
    return REQUIRED_DOCUMENTS.map((docConfig, idx) => ({
      id: `${participantId}-${docConfig.type}`,
      type: docConfig.type,
      label: docConfig.label,
      fileType: docConfig.acceptedFormats.includes('PDF') ? 'pdf' : 'image',
      status: 'pending' as DocumentStatus,
      url: '#'
    }));
  };

  // Mock participant data with 6 documents each
  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: '1',
      name: 'Ahmad Fauzan',
      sport: 'Tapak Suci',
      category: 'Tanding Perorangan',
      educationLevel: 'SMA/SMK/MA',
      status: 'pending',
      documents: generateParticipantDocuments('1')
    },
    {
      id: '2',
      name: 'Siti Nurhaliza',
      sport: 'Panahan',
      category: 'Individu',
      educationLevel: 'Mahasiswa',
      status: 'pending',
      documents: generateParticipantDocuments('2')
    },
    {
      id: '3',
      name: 'Budi Santoso',
      sport: 'Bulutangkis',
      category: 'Tunggal Putra',
      educationLevel: 'SMP/MTs',
      status: 'pending',
      documents: generateParticipantDocuments('3')
    }
  ]);

  const handlePreview = (doc: Document) => {
    setPreviewDocument(doc);
    setPreviewDialogOpen(true);
  };

  const handleApprove = (participantId: string, docId: string) => {
    setParticipants(prev =>
      prev.map(p =>
        p.id === participantId
          ? {
              ...p,
              documents: p.documents.map(d =>
                d.id === docId
                  ? { ...d, status: 'approved' as DocumentStatus, revisionNote: undefined }
                  : d
              )
            }
          : p
      )
    );
    toast.success('Dokumen diterima');
  };

  const openRevisionDialog = (docId: string) => {
    setCurrentDocumentId(docId);
    setRevisionNote('');
    setRevisionDialogOpen(true);
  };

  const handleRequestRevision = () => {
    if (!revisionNote.trim()) {
      toast.error('Catatan revisi wajib diisi');
      return;
    }

    if (!selectedParticipant || !currentDocumentId) return;

    setParticipants(prev =>
      prev.map(p =>
        p.id === selectedParticipant.id
          ? {
              ...p,
              documents: p.documents.map(d =>
                d.id === currentDocumentId
                  ? { 
                      ...d, 
                      status: 'revision_required' as DocumentStatus, 
                      revisionNote: revisionNote.trim()
                    }
                  : d
              )
            }
          : p
      )
    );

    toast.info('Dokumen ditandai perlu revisi');
    setRevisionDialogOpen(false);
    setRevisionNote('');
    setCurrentDocumentId(null);

    // Update selected participant to reflect changes
    const updatedParticipant = participants.find(p => p.id === selectedParticipant.id);
    if (updatedParticipant) {
      setSelectedParticipant({
        ...updatedParticipant,
        documents: updatedParticipant.documents.map(d =>
          d.id === currentDocumentId
            ? { ...d, status: 'revision_required' as DocumentStatus, revisionNote: revisionNote.trim() }
            : d
        )
      });
    }
  };

  const openRejectDialog = (docId: string) => {
    setCurrentDocumentId(docId);
    setRejectionReason('');
    setRejectDialogOpen(true);
  };

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      toast.error('Alasan penolakan wajib diisi');
      return;
    }

    if (!selectedParticipant || !currentDocumentId) return;

    setParticipants(prev =>
      prev.map(p =>
        p.id === selectedParticipant.id
          ? {
              ...p,
              documents: p.documents.map(d =>
                d.id === currentDocumentId
                  ? { 
                      ...d, 
                      status: 'rejected' as DocumentStatus, 
                      rejectionReason: rejectionReason.trim(),
                      revisionNote: undefined
                    }
                  : d
              )
            }
          : p
      )
    );

    toast.error('Dokumen ditolak');
    setRejectDialogOpen(false);
    setRejectionReason('');
    setCurrentDocumentId(null);

    // Update selected participant
    const updatedParticipant = participants.find(p => p.id === selectedParticipant.id);
    if (updatedParticipant) {
      setSelectedParticipant({
        ...updatedParticipant,
        documents: updatedParticipant.documents.map(d =>
          d.id === currentDocumentId
            ? { ...d, status: 'rejected' as DocumentStatus, rejectionReason: rejectionReason.trim() }
            : d
        )
      });
    }
  };

  const handleValidateParticipant = () => {
    if (!selectedParticipant) return;
    
    const hasRejected = selectedParticipant.documents.some(d => d.status === 'rejected');
    const hasRevisionRequired = selectedParticipant.documents.some(d => d.status === 'revision_required');
    const hasPending = selectedParticipant.documents.some(d => d.status === 'pending');
    const allApproved = selectedParticipant.documents.every(d => d.status === 'approved');

    if (hasRejected) {
      toast.error('Terdapat dokumen yang ditolak. Peserta tidak dapat divalidasi.');
      return;
    }

    if (hasRevisionRequired) {
      toast.error('Terdapat dokumen yang perlu revisi. Tunggu peserta upload ulang.');
      return;
    }

    if (hasPending) {
      toast.error('Semua dokumen harus direview terlebih dahulu.');
      return;
    }

    if (allApproved) {
      setParticipants(prev =>
        prev.map(p =>
          p.id === selectedParticipant.id
            ? { ...p, status: 'verified' as const }
            : p
        )
      );
      toast.success(`✅ Peserta ${selectedParticipant.name} berhasil divalidasi!\n\nStatus: TERVERIFIKASI`);
      setSelectedParticipant(null);
    }
  };

  const getStatusBadge = (status: DocumentStatus) => {
    switch (status) {
      case 'approved':
        return (
          <Badge className="bg-green-100 text-green-700 border-green-300">
            <CheckCircle className="w-3 h-3 mr-1" />
            Diterima
          </Badge>
        );
      case 'revision_required':
        return (
          <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300">
            <RefreshCw className="w-3 h-3 mr-1" />
            Revisi
          </Badge>
        );
      case 'rejected':
        return (
          <Badge className="bg-red-100 text-red-700 border-red-300">
            <XCircle className="w-3 h-3 mr-1" />
            Ditolak
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-700 border-gray-300">
            <Clock className="w-3 h-3 mr-1" />
            Menunggu
          </Badge>
        );
    }
  };

  const getParticipantStatusIcon = (participant: Participant) => {
    if (participant.status === 'verified') {
      return <CheckCircle className="w-4 h-4 text-green-600" />;
    }
    
    const hasRejected = participant.documents.some(d => d.status === 'rejected');
    if (hasRejected) {
      return <XCircle className="w-4 h-4 text-red-600" />;
    }

    const hasRevisionRequired = participant.documents.some(d => d.status === 'revision_required');
    if (hasRevisionRequired) {
      return <RefreshCw className="w-4 h-4 text-yellow-600" />;
    }

    return <Clock className="w-4 h-4 text-gray-400" />;
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <AdminSidebar onLogout={handleLogout} />

      <div className="flex-1">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0C2C4A] to-[#D92B2B] text-white py-12 px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-2">Validasi Berkas Peserta</h1>
            <p className="text-white/90 text-lg">
              Verifikasi 6 dokumen wajib untuk setiap peserta
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-8 py-8">
          {/* Info Banner */}
          <Card className="mb-6 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="font-bold text-blue-900 mb-2">6 Dokumen Wajib yang Harus Divalidasi</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm mb-4">
                    {REQUIRED_DOCUMENTS.map((doc, idx) => (
                      <div key={doc.type} className="flex items-center gap-2 bg-white rounded p-2 border border-blue-200">
                        <span className="font-semibold text-blue-900">{idx + 1}.</span>
                        <span className="text-blue-800">{doc.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm mt-3">
                    <div className="bg-white rounded-lg p-3 border border-green-200">
                      <p className="font-semibold text-green-800 mb-1">✅ Terima</p>
                      <p className="text-green-700 text-xs">Dokumen valid dan memenuhi syarat</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-yellow-200">
                      <p className="font-semibold text-yellow-800 mb-1">🔄 Minta Revisi</p>
                      <p className="text-yellow-700 text-xs">Peserta dapat upload ulang dengan catatan</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-red-200">
                      <p className="font-semibold text-red-800 mb-1">❌ Tolak</p>
                      <p className="text-red-700 text-xs">Dokumen ditolak permanen</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Participant List */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#0C2C4A]">Daftar Peserta</CardTitle>
                  <CardDescription>
                    {participants.filter(p => p.status !== 'verified').length} peserta menunggu validasi
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {participants.map((participant) => (
                      <button
                        key={participant.id}
                        onClick={() => setSelectedParticipant(participant)}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                          selectedParticipant?.id === participant.id
                            ? 'border-[#1FA84A] bg-[#1FA84A]/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-[#0C2C4A]">{participant.name}</h4>
                            <p className="text-sm text-gray-600">{participant.sport}</p>
                            <p className="text-xs text-gray-500">{participant.category}</p>
                            <Badge variant="outline" className="mt-2 text-xs">
                              {participant.educationLevel}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1">
                            {getParticipantStatusIcon(participant)}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Document Detail View */}
            <div className="lg:col-span-2">
              {selectedParticipant ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-[#0C2C4A]">
                      Detail Berkas - {selectedParticipant.name}
                    </CardTitle>
                    <CardDescription>
                      {selectedParticipant.sport} - {selectedParticipant.category} ({selectedParticipant.educationLevel})
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Document Progress */}
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-blue-900">Progress Verifikasi</span>
                        <span className="text-blue-800">
                          {selectedParticipant.documents.filter(d => d.status === 'approved').length} / {selectedParticipant.documents.length} Dokumen
                        </span>
                      </div>
                      <div className="w-full bg-blue-200 rounded-full h-3">
                        <div 
                          className="bg-[#1FA84A] h-3 rounded-full transition-all"
                          style={{ 
                            width: `${(selectedParticipant.documents.filter(d => d.status === 'approved').length / selectedParticipant.documents.length) * 100}%` 
                          }}
                        />
                      </div>
                    </div>

                    {/* Document Checklist */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-[#0C2C4A]">Dokumen Persyaratan ({selectedParticipant.documents.length} Dokumen)</h4>
                      
                      {selectedParticipant.documents.map((doc) => (
                        <div
                          key={doc.id}
                          className={`border-2 rounded-lg p-4 space-y-3 ${
                            doc.status === 'approved' 
                              ? 'border-green-200 bg-green-50/50' 
                              : doc.status === 'revision_required'
                              ? 'border-yellow-200 bg-yellow-50/50'
                              : doc.status === 'rejected'
                              ? 'border-red-200 bg-red-50/50'
                              : 'border-gray-200'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3 flex-1">
                              {doc.fileType === 'image' ? (
                                <ImageIcon className="w-5 h-5 text-blue-500 flex-shrink-0" />
                              ) : (
                                <FileText className="w-5 h-5 text-red-500 flex-shrink-0" />
                              )}
                              <div className="flex-1">
                                <p className="font-semibold text-gray-900">{doc.label}</p>
                                <p className="text-xs text-gray-500">{doc.type}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              {getStatusBadge(doc.status)}
                            </div>
                          </div>

                          {/* Revision/Rejection Notes Display */}
                          {doc.revisionNote && (
                            <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3">
                              <div className="flex items-start gap-2">
                                <MessageSquare className="w-4 h-4 text-yellow-700 flex-shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-xs font-semibold text-yellow-900">Catatan Revisi:</p>
                                  <p className="text-sm text-yellow-800 mt-1">{doc.revisionNote}</p>
                                </div>
                              </div>
                            </div>
                          )}

                          {doc.rejectionReason && (
                            <div className="bg-red-50 border border-red-300 rounded-lg p-3">
                              <div className="flex items-start gap-2">
                                <XCircle className="w-4 h-4 text-red-700 flex-shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-xs font-semibold text-red-900">Alasan Penolakan:</p>
                                  <p className="text-sm text-red-800 mt-1">{doc.rejectionReason}</p>
                                  <p className="text-xs text-red-600 mt-2">⚠️ Dokumen terkunci, tidak dapat diubah</p>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handlePreview(doc)}
                              className="w-full"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              Preview
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleApprove(selectedParticipant.id, doc.id)}
                              disabled={doc.status === 'rejected'}
                              className={`w-full ${
                                doc.status === 'approved'
                                  ? 'bg-green-600 hover:bg-green-700 text-white'
                                  : 'bg-green-50 border border-green-500 text-green-700 hover:bg-green-100'
                              }`}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Terima
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openRevisionDialog(doc.id)}
                              disabled={doc.status === 'rejected'}
                              className={`w-full ${
                                doc.status === 'revision_required'
                                  ? 'bg-yellow-50 border-yellow-500 text-yellow-700'
                                  : 'border-yellow-400 text-yellow-700 hover:bg-yellow-50'
                              }`}
                            >
                              <RefreshCw className="w-4 h-4 mr-1" />
                              Minta Revisi
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openRejectDialog(doc.id)}
                              disabled={doc.status === 'rejected'}
                              className={`w-full ${
                                doc.status === 'rejected'
                                  ? 'bg-red-600 text-white cursor-not-allowed'
                                  : 'border-red-400 text-red-700 hover:bg-red-50'
                              }`}
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Tolak
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Final Validation Button */}
                    <div className="pt-4 border-t border-gray-200">
                      <Button
                        onClick={handleValidateParticipant}
                        className="w-full bg-[#1FA84A] hover:bg-[#1FA84A]/90 text-white"
                        size="lg"
                      >
                        <FileCheck2 className="w-5 h-5 mr-2" />
                        VALIDASI PESERTA SELESAI
                      </Button>
                      <p className="text-xs text-center text-gray-500 mt-2">
                        Semua 6 dokumen harus "Diterima" untuk validasi final
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <FileCheck2 className="w-16 h-16 text-gray-300 mb-4" />
                    <p className="text-gray-500">Pilih peserta untuk melihat detail dokumen</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Revision Dialog */}
      <Dialog open={revisionDialogOpen} onOpenChange={setRevisionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-yellow-700">
              <RefreshCw className="w-5 h-5" />
              Minta Revisi Dokumen
            </DialogTitle>
            <DialogDescription>
              Berikan catatan kepada peserta tentang apa yang perlu diperbaiki. Peserta dapat upload ulang dokumen ini.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="revision-note" className="font-semibold">
                Catatan Revisi <span className="text-red-600">*</span>
              </Label>
              <Textarea
                id="revision-note"
                placeholder="Contoh: Foto terlalu gelap, mohon upload ulang dengan pencahayaan lebih baik"
                value={revisionNote}
                onChange={(e) => setRevisionNote(e.target.value)}
                rows={4}
                className="resize-none"
              />
              <p className="text-xs text-gray-500">
                Catatan ini akan dilihat oleh peserta saat upload ulang
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setRevisionDialogOpen(false);
                setRevisionNote('');
              }}
            >
              Batal
            </Button>
            <Button
              onClick={handleRequestRevision}
              className="bg-yellow-600 hover:bg-yellow-700 text-white"
              disabled={!revisionNote.trim()}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Kirim Permintaan Revisi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-700">
              <XCircle className="w-5 h-5" />
              Tolak Dokumen
            </DialogTitle>
            <DialogDescription>
              Dokumen yang ditolak akan terkunci permanen dan peserta tidak dapat mengubahnya. Pastikan keputusan ini sudah final.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-800 font-semibold">⚠️ Peringatan:</p>
              <p className="text-sm text-red-700 mt-1">
                Penolakan bersifat permanen. Gunakan "Minta Revisi" jika dokumen masih bisa diperbaiki.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rejection-reason" className="font-semibold">
                Alasan Penolakan <span className="text-red-600">*</span>
              </Label>
              <Textarea
                id="rejection-reason"
                placeholder="Contoh: Dokumen palsu / tidak sesuai / tidak dapat diverifikasi"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setRejectDialogOpen(false);
                setRejectionReason('');
              }}
            >
              Batal
            </Button>
            <Button
              onClick={handleReject}
              className="bg-red-600 hover:bg-red-700 text-white"
              disabled={!rejectionReason.trim()}
            >
              <XCircle className="w-4 h-4 mr-2" />
              Tolak Permanen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Preview Dokumen: {previewDocument?.label}
            </DialogTitle>
            <DialogDescription>
              Pratinjau dokumen yang diupload peserta
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                {previewDocument?.fileType === 'pdf' ? (
                  <FileText className="w-24 h-24 text-gray-400 mx-auto mb-4" />
                ) : (
                  <ImageIcon className="w-24 h-24 text-gray-400 mx-auto mb-4" />
                )}
                <p className="text-gray-500 mb-2">Preview: {previewDocument?.label}</p>
                <p className="text-sm text-gray-400">[Simulasi tampilan dokumen]</p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setPreviewDialogOpen(false)}>
              Tutup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}