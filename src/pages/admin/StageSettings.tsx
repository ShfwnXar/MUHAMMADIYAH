import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { AdminSidebar } from '../../components/AdminSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Label } from '../../components/ui/label';
import { Switch } from '../../components/ui/switch';
import { 
  Calendar, 
  Clock, 
  Lock, 
  Unlock, 
  Save, 
  RotateCcw, 
  AlertCircle,
  CheckCircle,
  XCircle,
  BookOpen,
  ShieldCheck
} from 'lucide-react';
import { toast } from 'sonner';

type StageStatus = 'scheduled' | 'open' | 'locked' | 'closed' | 'thb-mode';

interface StageConfig {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  dependency?: number; // Stage ID that must be completed first
  isValidation?: boolean; // Special case for validation stage
}

export default function StageSettings() {
  const navigate = useNavigate();
  
  const [thbMode, setThbMode] = useState(false);
  const [stages, setStages] = useState<StageConfig[]>([
    {
      id: 1,
      title: 'Step 1: Pilih Cabang & Kategori',
      description: 'Peserta memilih cabang olahraga, kategori, jenjang, dan detail teknis',
      startDate: '2026-03-01',
      endDate: '2026-04-15',
      isActive: true
    },
    {
      id: 2,
      title: 'Step 2: Data Peserta',
      description: 'Input data lengkap peserta (tunggal/ganda/beregu)',
      startDate: '2026-03-05',
      endDate: '2026-04-20',
      isActive: true,
      dependency: 1
    },
    {
      id: 3,
      title: 'Step 3: Pembayaran & Upload Berkas',
      description: 'Upload dokumen dan bukti pembayaran',
      startDate: '2026-03-10',
      endDate: '2026-04-25',
      isActive: true,
      dependency: 2
    }
  ]);

  const [completedStages, setCompletedStages] = useState<number[]>([]);

  const handleLogout = () => {
    navigate('/admin-login');
  };

  const updateStage = (id: number, field: keyof StageConfig, value: any) => {
    if (thbMode) {
      toast.error('Mode THB aktif - tanggal dikontrol otomatis');
      return;
    }

    setStages(stages.map(stage => 
      stage.id === id ? { ...stage, [field]: value } : stage
    ));
  };

  const handleSave = () => {
    toast.success('Jadwal tahapan berhasil disimpan!');
  };

  const handleReset = () => {
    setStages([
      {
        id: 1,
        title: 'Step 1: Pilih Cabang & Kategori',
        description: 'Peserta memilih cabang olahraga, kategori, jenjang, dan detail teknis',
        startDate: '2026-03-01',
        endDate: '2026-04-15',
        isActive: true
      },
      {
        id: 2,
        title: 'Step 2: Data Peserta',
        description: 'Input data lengkap peserta (tunggal/ganda/beregu)',
        startDate: '2026-03-05',
        endDate: '2026-04-20',
        isActive: true,
        dependency: 1
      },
      {
        id: 3,
        title: 'Step 3: Pembayaran & Upload Berkas',
        description: 'Upload dokumen dan bukti pembayaran',
        startDate: '2026-03-10',
        endDate: '2026-04-25',
        isActive: true,
        dependency: 2
      }
    ]);
    setThbMode(false);
    toast.success('Jadwal berhasil direset ke default!');
  };

  const applyThbMode = () => {
    setThbMode(true);
    
    // Apply THB-compliant dates
    setStages([
      {
        id: 1,
        title: 'Step 1: Pilih Cabang & Kategori',
        description: 'Peserta memilih cabang olahraga, kategori, jenjang, dan detail teknis',
        startDate: '2026-02-01',
        endDate: '2026-04-30',
        isActive: true
      },
      {
        id: 2,
        title: 'Step 2: Data Peserta',
        description: 'Input data lengkap peserta (tunggal/ganda/beregu)',
        startDate: '2026-02-01',
        endDate: '2026-05-05',
        isActive: true,
        dependency: 1
      },
      {
        id: 3,
        title: 'Step 3: Pembayaran & Upload Berkas',
        description: 'Upload dokumen dan bukti pembayaran',
        startDate: '2026-02-01',
        endDate: '2026-05-15',
        isActive: true,
        dependency: 2
      }
    ]);

    toast.success('Mode THB diaktifkan - jadwal sesuai Technical Handbook');
  };

  const disableThbMode = () => {
    setThbMode(false);
    toast.info('Mode THB dinonaktifkan - Anda dapat edit tanggal manual');
  };

  const getStageStatus = (stage: StageConfig): StageStatus => {
    if (thbMode) return 'thb-mode';
    
    if (!stage.isActive) return 'locked';

    // Check dependency
    if (stage.dependency && !completedStages.includes(stage.dependency)) {
      return 'locked';
    }

    const now = new Date();
    const start = new Date(stage.startDate);
    const end = new Date(stage.endDate);

    if (now < start) return 'scheduled';
    if (now > end) return 'closed';
    return 'open';
  };

  const getStatusBadge = (status: StageStatus) => {
    switch (status) {
      case 'open':
        return (
          <Badge className="bg-green-500 text-white hover:bg-green-600">
            <CheckCircle className="w-3 h-3 mr-1" />
            Open
          </Badge>
        );
      case 'scheduled':
        return (
          <Badge className="bg-blue-500 text-white hover:bg-blue-600">
            <Clock className="w-3 h-3 mr-1" />
            Scheduled
          </Badge>
        );
      case 'locked':
        return (
          <Badge className="bg-gray-500 text-white hover:bg-gray-600">
            <Lock className="w-3 h-3 mr-1" />
            Locked
          </Badge>
        );
      case 'closed':
        return (
          <Badge className="bg-red-500 text-white hover:bg-red-600">
            <XCircle className="w-3 h-3 mr-1" />
            Closed
          </Badge>
        );
      case 'thb-mode':
        return (
          <Badge className="bg-purple-500 text-white hover:bg-purple-600">
            <BookOpen className="w-3 h-3 mr-1" />
            THB Mode
          </Badge>
        );
    }
  };

  const getStatusDescription = (status: StageStatus, stage: StageConfig) => {
    switch (status) {
      case 'open':
        return '✅ Tahap aktif dan dapat diakses peserta';
      case 'scheduled':
        return `📅 Akan dibuka pada ${new Date(stage.startDate).toLocaleDateString('id-ID')}`;
      case 'locked':
        if (!stage.isActive) {
          return '🔒 Tahap dinonaktifkan oleh admin';
        }
        if (stage.dependency) {
          return `🔒 Menunggu Step ${stage.dependency} selesai`;
        }
        return '🔒 Tahap terkunci';
      case 'closed':
        return `❌ Ditutup sejak ${new Date(stage.endDate).toLocaleDateString('id-ID')}`;
      case 'thb-mode':
        return '📖 Dikontrol otomatis sesuai Technical Handbook';
    }
  };

  const toggleStageCompletion = (stageId: number) => {
    if (completedStages.includes(stageId)) {
      setCompletedStages(completedStages.filter(id => id !== stageId));
      toast.info(`Step ${stageId} ditandai belum selesai`);
    } else {
      setCompletedStages([...completedStages, stageId]);
      toast.success(`Step ${stageId} ditandai selesai`);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <AdminSidebar onLogout={handleLogout} />

      <div className="flex-1">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0C2C4A] to-[#1FA84A] text-white py-12 px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-2">Pengaturan Tahapan Pendaftaran</h1>
            <p className="text-white/90 text-lg">
              Kontrol jadwal, status, dan dependensi setiap tahap registrasi
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-8 py-8">
          {/* THB Mode Control */}
          <Card className={`mb-6 ${thbMode ? 'border-2 border-purple-500' : ''}`}>
            <CardHeader className={thbMode ? 'bg-purple-50' : ''}>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-[#0C2C4A]">
                    <BookOpen className="w-6 h-6 text-purple-600" />
                    Mode Technical Handbook (THB)
                  </CardTitle>
                  <CardDescription className="mt-2">
                    Aktifkan untuk menggunakan jadwal otomatis sesuai Technical Handbook Muhammadiyah Games 2026
                  </CardDescription>
                </div>
                <div className="flex items-center gap-3">
                  {thbMode ? (
                    <Button
                      variant="outline"
                      onClick={disableThbMode}
                      className="border-purple-500 text-purple-700 hover:bg-purple-50"
                    >
                      Nonaktifkan THB Mode
                    </Button>
                  ) : (
                    <Button
                      onClick={applyThbMode}
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      Aktifkan THB Mode
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            {thbMode && (
              <CardContent className="pt-6 bg-purple-50">
                <div className="bg-white rounded-lg p-4 border-2 border-purple-200">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold text-purple-900 mb-2">Mode THB Aktif</p>
                      <ul className="text-sm text-purple-800 space-y-1">
                        <li>• Input tanggal manual <strong>dikunci</strong></li>
                        <li>• Jadwal diterapkan otomatis sesuai THB 2026</li>
                        <li>• Step 1-3: 1 Februari - 15 Mei 2026</li>
                        <li>• Validasi Admin: Otomatis setelah Step 3 tutup</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Status Legend */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-[#0C2C4A]">Status Tahapan</CardTitle>
              <CardDescription>Penjelasan status yang mungkin muncul</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-500 text-white">
                    <Clock className="w-3 h-3 mr-1" />
                    Scheduled
                  </Badge>
                  <span className="text-sm text-gray-600">Belum dimulai</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-500 text-white">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Open
                  </Badge>
                  <span className="text-sm text-gray-600">Sedang berjalan</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-gray-500 text-white">
                    <Lock className="w-3 h-3 mr-1" />
                    Locked
                  </Badge>
                  <span className="text-sm text-gray-600">Terkunci</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-red-500 text-white">
                    <XCircle className="w-3 h-3 mr-1" />
                    Closed
                  </Badge>
                  <span className="text-sm text-gray-600">Sudah ditutup</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-purple-500 text-white">
                    <BookOpen className="w-3 h-3 mr-1" />
                    THB Mode
                  </Badge>
                  <span className="text-sm text-gray-600">Dikontrol THB</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline Preview (Read-Only) */}
          <Card className="mb-6 border-2 border-blue-200">
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-[#0C2C4A]">Preview Timeline (Read-Only)</CardTitle>
              <CardDescription>
                Visualisasi jadwal tahapan - hanya untuk referensi, tidak dapat diedit di sini
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {stages.map((stage, index) => {
                  const status = getStageStatus(stage);
                  const isCompleted = completedStages.includes(stage.id);
                  
                  return (
                    <div key={stage.id} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                          isCompleted 
                            ? 'bg-green-600' 
                            : status === 'open' 
                            ? 'bg-[#1FA84A]' 
                            : 'bg-gray-400'
                        }`}>
                          {isCompleted ? <CheckCircle className="w-5 h-5" /> : stage.id}
                        </div>
                        {index < stages.length - 1 && (
                          <div className="w-0.5 h-16 bg-gray-300 my-1" />
                        )}
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-bold text-[#0C2C4A]">{stage.title}</h4>
                            <p className="text-sm text-gray-600">{stage.description}</p>
                          </div>
                          {getStatusBadge(status)}
                        </div>
                        <div className="text-sm text-gray-600">
                          📅 {new Date(stage.startDate).toLocaleDateString('id-ID')} - {new Date(stage.endDate).toLocaleDateString('id-ID')}
                        </div>
                        {stage.dependency && (
                          <div className="text-xs text-gray-500 mt-1">
                            🔗 Membutuhkan Step {stage.dependency} selesai
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
                
                {/* Validation Stage (Auto) */}
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold bg-purple-600 text-white">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-bold text-[#0C2C4A]">Validasi Admin</h4>
                        <p className="text-sm text-gray-600">Review dan approve dokumen peserta</p>
                      </div>
                      <Badge className="bg-purple-500 text-white">
                        <ShieldCheck className="w-3 h-3 mr-1" />
                        Automatic
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      📅 Otomatis aktif setelah Step 3 ditutup
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      ⚙️ Tidak memerlukan konfigurasi tanggal
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Editable Stage Settings */}
          <div className="space-y-6 mb-8">
            <h2 className="text-2xl font-bold text-[#0C2C4A]">Pengaturan Tahapan</h2>
            
            {stages.map((stage) => {
              const status = getStageStatus(stage);
              const isCompleted = completedStages.includes(stage.id);
              
              return (
                <Card key={stage.id} className="border-2">
                  <CardHeader className="bg-gradient-to-r from-[#0C2C4A]/5 to-[#1FA84A]/5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                          isCompleted 
                            ? 'bg-green-600' 
                            : 'bg-[#0C2C4A]'
                        }`}>
                          {stage.id}
                        </div>
                        <div>
                          <CardTitle className="text-[#0C2C4A]">{stage.title}</CardTitle>
                          <CardDescription>{stage.description}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {getStatusBadge(status)}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleStageCompletion(stage.id)}
                          className={isCompleted ? 'border-green-500 text-green-700' : ''}
                        >
                          {isCompleted ? (
                            <>
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Selesai
                            </>
                          ) : (
                            <>
                              <Clock className="w-4 h-4 mr-1" />
                              Tandai Selesai
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-6 space-y-6">
                    {/* Status Info */}
                    <div className={`p-4 rounded-lg border-2 ${
                      status === 'open' 
                        ? 'bg-green-50 border-green-200' 
                        : status === 'locked' 
                        ? 'bg-gray-50 border-gray-200'
                        : status === 'closed'
                        ? 'bg-red-50 border-red-200'
                        : status === 'thb-mode'
                        ? 'bg-purple-50 border-purple-200'
                        : 'bg-blue-50 border-blue-200'
                    }`}>
                      <p className="text-sm font-semibold text-gray-900">
                        {getStatusDescription(status, stage)}
                      </p>
                    </div>

                    {/* Dependency Info */}
                    {stage.dependency && (
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <div className="flex items-start gap-2">
                          <Lock className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-semibold text-amber-900">Dependensi</p>
                            <p className="text-sm text-amber-800 mt-1">
                              Tahap ini hanya terbuka setelah Step {stage.dependency} selesai
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Date Inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-green-600" />
                          Tanggal Buka
                        </Label>
                        <input
                          type="date"
                          value={stage.startDate}
                          onChange={(e) => updateStage(stage.id, 'startDate', e.target.value)}
                          disabled={thbMode}
                          className={`w-full px-4 py-3 border-2 rounded-lg transition-colors ${
                            thbMode 
                              ? 'bg-gray-100 border-gray-300 cursor-not-allowed text-gray-500' 
                              : 'bg-white border-gray-300 focus:border-[#1FA84A] focus:outline-none'
                          }`}
                        />
                        {thbMode && (
                          <p className="text-xs text-purple-600">🔒 Dikontrol oleh THB Mode</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-red-600" />
                          Tanggal Tutup
                        </Label>
                        <input
                          type="date"
                          value={stage.endDate}
                          onChange={(e) => updateStage(stage.id, 'endDate', e.target.value)}
                          disabled={thbMode}
                          className={`w-full px-4 py-3 border-2 rounded-lg transition-colors ${
                            thbMode 
                              ? 'bg-gray-100 border-gray-300 cursor-not-allowed text-gray-500' 
                              : 'bg-white border-gray-300 focus:border-[#1FA84A] focus:outline-none'
                          }`}
                        />
                        {thbMode && (
                          <p className="text-xs text-purple-600">🔒 Dikontrol oleh THB Mode</p>
                        )}
                      </div>
                    </div>

                    {/* Active Toggle */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center gap-3">
                        {stage.isActive ? (
                          <Unlock className="w-5 h-5 text-green-600" />
                        ) : (
                          <Lock className="w-5 h-5 text-gray-400" />
                        )}
                        <div>
                          <Label className="font-semibold text-gray-900">Aktifkan Tahap</Label>
                          <p className="text-sm text-gray-600">
                            {stage.isActive 
                              ? 'Tahap dapat diakses peserta (jika memenuhi kondisi)' 
                              : 'Tahap dinonaktifkan sementara oleh admin'}
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={stage.isActive}
                        onCheckedChange={(checked) => updateStage(stage.id, 'isActive', checked)}
                      />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Validation Stage Info (Read-Only) */}
          <Card className="mb-8 border-2 border-purple-200">
            <CardHeader className="bg-purple-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-purple-600 text-white">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle className="text-[#0C2C4A]">Validasi Admin (Otomatis)</CardTitle>
                  <CardDescription>
                    Tahap validasi tidak memerlukan konfigurasi tanggal
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-purple-900 mb-2">Aktivasi Otomatis</p>
                    <ul className="text-sm text-purple-800 space-y-1">
                      <li>• Validasi admin mulai aktif setelah Step 3 ditutup</li>
                      <li>• Tidak memerlukan pengaturan tanggal</li>
                      <li>• Admin dapat memvalidasi dokumen kapan saja</li>
                      <li>• Peserta hanya dapat melihat status validasi</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-4 justify-end">
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="border-[#0C2C4A] text-[#0C2C4A] hover:bg-gray-50"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset ke Default
                </Button>
                <Button
                  onClick={handleSave}
                  className="bg-[#1FA84A] hover:bg-[#168f3d] text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Simpan Pengaturan
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
