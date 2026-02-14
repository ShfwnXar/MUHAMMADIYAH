import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ParticipantSidebar } from '../../components/ParticipantSidebar';
import { RegistrationWizard } from '../../components/RegistrationWizard';
import { ParticipantDocumentUpload } from '../../components/ParticipantDocumentUpload';
import { EntryProgressBar } from '../../components/EntryProgressBar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { 
  DollarSign, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle,
  User,
  Users,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { getRegistrationProgress, completeStep3, CategoryEntry } from '../../utils/registrationStorage';
import { REQUIRED_DOCUMENTS, DocumentType } from '../../utils/constants';
import { toast } from 'sonner';

interface DocumentUpload {
  file: File | null;
  uploaded: boolean;
  url?: string;
}

type ParticipantDocuments = Record<DocumentType, DocumentUpload>;

interface EntryDocuments {
  [participantId: string]: ParticipantDocuments;
}

export default function Step3() {
  const navigate = useNavigate();
  const [registrationProgress, setRegistrationProgress] = useState({
    step1Complete: false,
    step2Complete: false,
    step3Complete: false
  });

  const [categoryEntries, setCategoryEntries] = useState<CategoryEntry[]>([]);
  const [expandedEntries, setExpandedEntries] = useState<Set<string>>(new Set());
  const [entryDocuments, setEntryDocuments] = useState<Record<string, EntryDocuments>>({});

  // Load progress from localStorage on mount
  useEffect(() => {
    const progress = getRegistrationProgress();
    setRegistrationProgress(progress);
    
    // Redirect if previous steps not completed
    if (!progress.step1Complete || !progress.step2Complete) {
      toast.error('Silakan selesaikan step sebelumnya terlebih dahulu');
      navigate('/registration/step-1');
      return;
    }

    if (!progress.step2Data?.categoryEntries) {
      toast.error('Data peserta tidak ditemukan');
      navigate('/registration/step-2');
      return;
    }

    // Load category entries
    setCategoryEntries(progress.step2Data.categoryEntries);

    // Initialize document structure
    const initialDocs: Record<string, EntryDocuments> = {};
    const initialExpanded = new Set<string>();
    
    progress.step2Data.categoryEntries.forEach(category => {
      category.entries.forEach(entry => {
        const entryKey = `${category.sportId}-${category.categoryId}-${entry.id}`;
        
        // Auto-expand first entry
        if (Object.keys(initialDocs).length === 0) {
          initialExpanded.add(entryKey);
        }

        const entryDocs: EntryDocuments = {};
        
        // Initialize participant documents (6 docs each)
        entry.participants.forEach(participant => {
          const participantDocs: ParticipantDocuments = {} as ParticipantDocuments;
          REQUIRED_DOCUMENTS.forEach(docConfig => {
            participantDocs[docConfig.type] = { file: null, uploaded: false };
          });
          entryDocs[participant.id] = participantDocs;
        });

        // Initialize team member documents if beregu
        if (entry.team) {
          entry.team.members.forEach((member, idx) => {
            const memberId = `${entry.team!.id}-member-${idx}`;
            const memberDocs: ParticipantDocuments = {} as ParticipantDocuments;
            REQUIRED_DOCUMENTS.forEach(docConfig => {
              memberDocs[docConfig.type] = { file: null, uploaded: false };
            });
            entryDocs[memberId] = memberDocs;
          });
        }

        initialDocs[entry.id] = entryDocs;
      });
    });
    
    setEntryDocuments(initialDocs);
    setExpandedEntries(initialExpanded);
  }, [navigate]);

  const handleLogout = () => {
    navigate('/participant-login');
  };

  const calculateTotalCost = () => {
    return categoryEntries.reduce((sum, cat) => 
      sum + (cat.entries.length * cat.pricePerEntry), 0
    );
  };

  const toggleEntryExpansion = (entryKey: string) => {
    setExpandedEntries(prev => {
      const newSet = new Set(prev);
      if (newSet.has(entryKey)) {
        newSet.delete(entryKey);
      } else {
        newSet.add(entryKey);
      }
      return newSet;
    });
  };

  const handleFileUpload = (entryId: string, participantId: string, docType: DocumentType, file: File) => {
    // Validate file
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Ukuran file maksimal 2MB');
      return;
    }

    const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      toast.error('Format file harus JPG, PNG, atau PDF');
      return;
    }

    // Simulate upload
    setEntryDocuments(prev => ({
      ...prev,
      [entryId]: {
        ...prev[entryId],
        [participantId]: {
          ...prev[entryId][participantId],
          [docType]: {
            file,
            uploaded: true,
            url: URL.createObjectURL(file)
          }
        }
      }
    }));

    toast.success('File berhasil diupload');
  };

  const removeFile = (entryId: string, participantId: string, docType: DocumentType) => {
    setEntryDocuments(prev => ({
      ...prev,
      [entryId]: {
        ...prev[entryId],
        [participantId]: {
          ...prev[entryId][participantId],
          [docType]: {
            file: null,
            uploaded: false
          }
        }
      }
    }));
    toast.info('File dihapus');
  };

  const getEntryDocumentProgress = (entryId: string) => {
    const docs = entryDocuments[entryId];
    if (!docs) return { uploaded: 0, total: 0 };

    let uploaded = 0;
    let total = 0;

    // Count all participant documents
    Object.keys(docs).forEach(participantId => {
      const participantDocs = docs[participantId];
      REQUIRED_DOCUMENTS.forEach(docConfig => {
        total++;
        if (participantDocs[docConfig.type]?.uploaded) uploaded++;
      });
    });

    return { uploaded, total };
  };

  const getTotalDocumentProgress = () => {
    let uploaded = 0;
    let total = 0;

    Object.keys(entryDocuments).forEach(entryId => {
      const progress = getEntryDocumentProgress(entryId);
      uploaded += progress.uploaded;
      total += progress.total;
    });

    return { uploaded, total };
  };

  const isAllDocumentsUploaded = () => {
    const progress = getTotalDocumentProgress();
    return progress.uploaded === progress.total && progress.total > 0;
  };

  const handleSubmit = () => {
    if (!isAllDocumentsUploaded()) {
      toast.error('Lengkapi semua dokumen sebelum mengirim pendaftaran');
      return;
    }

    // Create breakdown
    const breakdown = categoryEntries.map(cat => ({
      sportName: cat.sportName,
      categoryName: cat.categoryName,
      numberOfEntries: cat.entries.length,
      pricePerEntry: cat.pricePerEntry,
      subtotal: cat.entries.length * cat.pricePerEntry
    }));

    // Save Step 3
    completeStep3(breakdown, calculateTotalCost());

    toast.success('Pendaftaran berhasil dikirim!');
    
    // Navigate to dashboard
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  const totalProgress = getTotalDocumentProgress();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <ParticipantSidebar 
        registrationProgress={registrationProgress}
        onLogout={handleLogout}
      />

      <div className="flex-1">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0C2C4A] to-[#1FA84A] text-white py-12 px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-2">Step 3: Upload Berkas Peserta</h1>
            <p className="text-white/90 text-lg">
              Upload 6 dokumen wajib untuk setiap peserta
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-8 py-8">
          <RegistrationWizard 
            currentStep={3}
            step1Complete={registrationProgress.step1Complete}
            step2Complete={registrationProgress.step2Complete}
            step3Complete={registrationProgress.step3Complete}
          />

          {/* Info Banner */}
          <Card className="mb-6 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-blue-900 mb-2">6 Dokumen Wajib untuk Setiap Peserta</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                    {REQUIRED_DOCUMENTS.map((doc, idx) => (
                      <div key={doc.type} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600" />
                        <span className="text-blue-800">{doc.label}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-blue-700 mt-3">
                    Format: {REQUIRED_DOCUMENTS[0].acceptedFormats} • Max: {REQUIRED_DOCUMENTS[0].maxSize}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SECTION 1: PAYMENT SUMMARY */}
          <Card className="mb-6 border-2 border-[#D92B2B] shadow-lg">
            <CardHeader className="bg-gradient-to-r from-[#D92B2B]/10 to-[#D92B2B]/5">
              <div className="flex items-center gap-3">
                <div className="bg-[#D92B2B] rounded-full p-3">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-[#0C2C4A]">Rincian Biaya Pendaftaran</CardTitle>
                  <CardDescription>Total pembayaran untuk semua entri yang didaftarkan</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {categoryEntries.map((category, idx) => (
                  <div key={idx} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-center gap-2 mb-3">
                      {category.categoryType === 'beregu' ? (
                        <Users className="w-5 h-5 text-[#1FA84A]" />
                      ) : (
                        <User className="w-5 h-5 text-[#1FA84A]" />
                      )}
                      <h3 className="font-bold text-[#0C2C4A]">
                        {category.sportName} - {category.categoryName}
                      </h3>
                      <Badge variant="outline" className="ml-auto">
                        {category.entries.length} entri
                      </Badge>
                    </div>
                    <div className="ml-7 space-y-2">
                      {category.entries.map((entry) => (
                        <div key={entry.id} className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded">
                          <span className="text-gray-700">
                            Entri #{entry.entryNumber}: {
                              entry.team 
                                ? `${entry.team.namaTim}`
                                : entry.participants.length === 1
                                ? entry.participants[0].nama
                                : entry.participants.map(p => p.nama).join(' & ')
                            }
                          </span>
                          <span className="font-semibold text-[#0C2C4A]">
                            Rp {category.pricePerEntry.toLocaleString('id-ID')}
                          </span>
                        </div>
                      ))}
                      <div className="flex items-center justify-between pt-2 border-t mt-2">
                        <span className="font-semibold text-gray-700">Subtotal:</span>
                        <span className="font-bold text-[#0C2C4A]">
                          Rp {(category.entries.length * category.pricePerEntry).toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t-2 border-[#D92B2B] bg-gradient-to-r from-[#D92B2B]/5 to-[#D92B2B]/10 -mx-6 px-6 py-4 rounded-b-lg">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-[#0C2C4A]">TOTAL PEMBAYARAN:</span>
                  <span className="text-4xl font-bold text-[#D92B2B]">
                    Rp {calculateTotalCost().toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SECTION 2: DOCUMENT UPLOADS PER ENTRY */}
          <Card className="mb-6 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-[#1FA84A]/10 to-[#1FA84A]/5">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-[#0C2C4A]">Upload Dokumen Peserta</CardTitle>
                  <CardDescription>
                    {REQUIRED_DOCUMENTS.length} dokumen wajib per peserta
                  </CardDescription>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total Progress</p>
                  <p className="text-2xl font-bold text-[#0C2C4A]">
                    {totalProgress.uploaded}/{totalProgress.total}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {categoryEntries.map((category) => (
                  <div key={`${category.sportId}-${category.categoryId}`}>
                    <div className="mb-4 pb-3 border-b-2 border-gray-200">
                      <div className="flex items-center gap-2">
                        {category.categoryType === 'beregu' ? (
                          <Users className="w-5 h-5 text-[#1FA84A]" />
                        ) : (
                          <User className="w-5 h-5 text-[#1FA84A]" />
                        )}
                        <h3 className="font-bold text-[#0C2C4A]">
                          {category.sportName} - {category.categoryName}
                        </h3>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {category.entries.map((entry) => {
                        const entryKey = `${category.sportId}-${category.categoryId}-${entry.id}`;
                        const isExpanded = expandedEntries.has(entryKey);
                        const progress = getEntryDocumentProgress(entry.id);

                        return (
                          <Card key={entry.id} className="border-2 border-gray-200 overflow-hidden">
                            {/* Entry Header */}
                            <div 
                              className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 cursor-pointer hover:from-gray-100 hover:to-gray-150 transition-colors"
                              onClick={() => toggleEntryExpansion(entryKey)}
                            >
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                  <div className="bg-[#1FA84A] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                                    {entry.entryNumber}
                                  </div>
                                  <div>
                                    <p className="font-bold text-[#0C2C4A]">
                                      ENTRI #{entry.entryNumber}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      {entry.team 
                                        ? `${entry.team.namaTim} (${entry.team.members.length} pemain)`
                                        : entry.participants.length === 1
                                        ? entry.participants[0].nama
                                        : entry.participants.map(p => p.nama).join(' & ')
                                      }
                                    </p>
                                  </div>
                                </div>
                                <Button variant="ghost" size="sm">
                                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                </Button>
                              </div>
                              <EntryProgressBar uploaded={progress.uploaded} total={progress.total} />
                            </div>

                            {/* Entry Content */}
                            {isExpanded && (
                              <div className="p-6 bg-white border-t-2">
                                {/* Participant Documents */}
                                {entry.participants.map((participant) => (
                                  <ParticipantDocumentUpload
                                    key={participant.id}
                                    participantName={participant.nama}
                                    participantId={participant.id}
                                    documents={entryDocuments[entry.id]?.[participant.id] || {} as ParticipantDocuments}
                                    onUpload={(docType, file) => handleFileUpload(entry.id, participant.id, docType, file)}
                                    onRemove={(docType) => removeFile(entry.id, participant.id, docType)}
                                  />
                                ))}

                                {/* Team Member Documents */}
                                {entry.team && (
                                  <div className="mt-6">
                                    <h4 className="font-bold text-[#0C2C4A] mb-4 flex items-center gap-2">
                                      <Users className="w-5 h-5 text-[#1FA84A]" />
                                      ANGGOTA TIM
                                    </h4>
                                    <div className="space-y-4">
                                      {entry.team.members.map((member, mIdx) => {
                                        const memberId = `${entry.team!.id}-member-${mIdx}`;
                                        return (
                                          <ParticipantDocumentUpload
                                            key={memberId}
                                            participantName={`${member.nama} - ${member.posisi}`}
                                            participantId={memberId}
                                            documents={entryDocuments[entry.id]?.[memberId] || {} as ParticipantDocuments}
                                            onUpload={(docType, file) => handleFileUpload(entry.id, memberId, docType, file)}
                                            onRemove={(docType) => removeFile(entry.id, memberId, docType)}
                                          />
                                        );
                                      })}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* SECTION 3: SUBMIT BUTTON */}
          <Card className="border-2 border-[#1FA84A] shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-[#0C2C4A] text-lg">Progress Upload</h3>
                  <p className="text-sm text-gray-600">
                    {totalProgress.uploaded} dari {totalProgress.total} dokumen telah diupload
                  </p>
                </div>
                <div className="text-right">
                  {isAllDocumentsUploaded() ? (
                    <Badge className="bg-green-100 text-green-700 border-green-300 text-lg px-4 py-2">
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      Semua Dokumen Lengkap
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-lg px-4 py-2">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      {totalProgress.total - totalProgress.uploaded} Dokumen Tersisa
                    </Badge>
                  )}
                </div>
              </div>
              
              <EntryProgressBar uploaded={totalProgress.uploaded} total={totalProgress.total} />
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/registration/step-2')}
                  className="w-full"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Kembali ke Step 2
                </Button>
                <Button
                  size="lg"
                  onClick={handleSubmit}
                  disabled={!isAllDocumentsUploaded()}
                  className="w-full bg-[#1FA84A] hover:bg-[#1FA84A]/90 text-white disabled:opacity-50"
                >
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Kirim Pendaftaran
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
