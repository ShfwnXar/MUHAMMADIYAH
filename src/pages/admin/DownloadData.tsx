import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { AdminSidebar } from '../../components/AdminSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Checkbox } from '../../components/ui/checkbox';
import { Label } from '../../components/ui/label';
import { 
  Download, 
  FileSpreadsheet, 
  FileText, 
  Filter,
  Users,
  User,
  CheckCircle2,
  XCircle,
  Clock,
  FileDown
} from 'lucide-react';
import { toast } from 'sonner';

interface FilterState {
  sport: string;
  category: string;
  format: string;
  validationStatus: string[];
}

export default function DownloadData() {
  const navigate = useNavigate();
  
  const [filters, setFilters] = useState<FilterState>({
    sport: 'all',
    category: 'all',
    format: 'all',
    validationStatus: ['approved']
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const handleLogout = () => {
    navigate('/admin-login');
  };

  // Mock data structure matching registration system
  const sports = [
    { id: 'tapak-suci', name: 'Tapak Suci' },
    { id: 'atletik', name: 'Atletik' },
    { id: 'panahan', name: 'Panahan' },
    { id: 'badminton', name: 'Bulutangkis' },
    { id: 'tenis-meja', name: 'Tenis Meja' },
    { id: 'voli', name: 'Voli Indoor' }
  ];

  const categories = {
    'tapak-suci': [
      { id: 'tanding-a', name: 'Tanding Kelas A', format: 'tunggal' },
      { id: 'tanding-b', name: 'Tanding Kelas B', format: 'tunggal' },
      { id: 'seni-tunggal', name: 'Seni Tunggal', format: 'tunggal' },
      { id: 'seni-ganda', name: 'Seni Ganda', format: 'ganda' },
      { id: 'seni-beregu', name: 'Seni Beregu', format: 'beregu' }
    ],
    'badminton': [
      { id: 'tunggal-putra', name: 'Tunggal Putra', format: 'tunggal' },
      { id: 'tunggal-putri', name: 'Tunggal Putri', format: 'tunggal' },
      { id: 'ganda-putra', name: 'Ganda Putra', format: 'ganda' },
      { id: 'ganda-putri', name: 'Ganda Putri', format: 'ganda' },
      { id: 'beregu-putra', name: 'Beregu Putra', format: 'beregu' },
      { id: 'beregu-putri', name: 'Beregu Putri', format: 'beregu' }
    ],
    'voli': [
      { id: 'putra', name: 'Tim Putra', format: 'beregu' },
      { id: 'putri', name: 'Tim Putri', format: 'beregu' }
    ]
  };

  const availableCategories = filters.sport !== 'all' && categories[filters.sport as keyof typeof categories] 
    ? categories[filters.sport as keyof typeof categories]
    : [];

  // Mock participant data for preview
  const mockParticipantCount = {
    total: 247,
    approved: 198,
    pending: 32,
    rejected: 17,
    filtered: filters.sport === 'all' ? 247 : 45
  };

  const toggleValidationStatus = (status: string) => {
    setFilters(prev => {
      const currentStatuses = prev.validationStatus;
      if (currentStatuses.includes(status)) {
        return {
          ...prev,
          validationStatus: currentStatuses.filter(s => s !== status)
        };
      } else {
        return {
          ...prev,
          validationStatus: [...currentStatuses, status]
        };
      }
    });
  };

  const handleDownloadExcel = async () => {
    setIsGenerating(true);
    
    // Simulate generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // In production, this would call an API endpoint
    const sportName = filters.sport === 'all' 
      ? 'Semua_Cabang' 
      : sports.find(s => s.id === filters.sport)?.name.replace(/\s/g, '_');
    
    const categoryName = filters.category === 'all'
      ? 'Semua_Kategori'
      : availableCategories.find(c => c.id === filters.category)?.name.replace(/\s/g, '_');

    const filename = `Data_Peserta_${sportName}_${categoryName}_${new Date().toISOString().split('T')[0]}.xlsx`;

    toast.success(`File Excel berhasil dibuat: ${filename}`);
    toast.info('Dalam implementasi real, file akan diunduh otomatis');
    
    setIsGenerating(false);
  };

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));

    const sportName = filters.sport === 'all' 
      ? 'Semua_Cabang' 
      : sports.find(s => s.id === filters.sport)?.name.replace(/\s/g, '_');
    
    const filename = `Ringkasan_Peserta_${sportName}_${new Date().toISOString().split('T')[0]}.pdf`;

    toast.success(`File PDF berhasil dibuat: ${filename}`);
    toast.info('Dalam implementasi real, file akan diunduh otomatis');
    
    setIsGenerating(false);
  };

  const handleDownloadCSV = async () => {
    setIsGenerating(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));

    const sportName = filters.sport === 'all' 
      ? 'Semua_Cabang' 
      : sports.find(s => s.id === filters.sport)?.name.replace(/\s/g, '_');
    
    const filename = `Data_Peserta_${sportName}_${new Date().toISOString().split('T')[0]}.csv`;

    toast.success(`File CSV berhasil dibuat: ${filename}`);
    toast.info('Dalam implementasi real, file akan diunduh otomatis');
    
    setIsGenerating(false);
  };

  const getFilteredCount = () => {
    let count = mockParticipantCount.total;
    
    // Apply validation status filter
    if (filters.validationStatus.length > 0) {
      if (filters.validationStatus.includes('approved') && !filters.validationStatus.includes('pending') && !filters.validationStatus.includes('rejected')) {
        count = mockParticipantCount.approved;
      } else if (filters.validationStatus.includes('pending') && !filters.validationStatus.includes('approved') && !filters.validationStatus.includes('rejected')) {
        count = mockParticipantCount.pending;
      } else if (filters.validationStatus.includes('rejected') && !filters.validationStatus.includes('approved') && !filters.validationStatus.includes('pending')) {
        count = mockParticipantCount.rejected;
      }
    }
    
    // Apply sport/category filter
    if (filters.sport !== 'all') {
      count = Math.floor(count * 0.35);
    }
    
    return count;
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <AdminSidebar onLogout={handleLogout} />

      <div className="flex-1">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0C2C4A] to-[#1FA84A] text-white py-12 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-2">
              <FileDown className="w-10 h-10" />
              <h1 className="text-4xl font-bold">Unduh Data Peserta</h1>
            </div>
            <p className="text-white/90 text-lg">
              Export data peserta tervalidasi untuk keperluan teknis lomba
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-8 py-8">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-l-4 border-blue-500">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Peserta</p>
                    <p className="text-3xl font-bold text-[#0C2C4A]">
                      {mockParticipantCount.total}
                    </p>
                  </div>
                  <Users className="w-10 h-10 text-blue-500 opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-green-500">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Disetujui</p>
                    <p className="text-3xl font-bold text-green-600">
                      {mockParticipantCount.approved}
                    </p>
                  </div>
                  <CheckCircle2 className="w-10 h-10 text-green-500 opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-yellow-500">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Menunggu</p>
                    <p className="text-3xl font-bold text-yellow-600">
                      {mockParticipantCount.pending}
                    </p>
                  </div>
                  <Clock className="w-10 h-10 text-yellow-500 opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-red-500">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Ditolak</p>
                    <p className="text-3xl font-bold text-red-600">
                      {mockParticipantCount.rejected}
                    </p>
                  </div>
                  <XCircle className="w-10 h-10 text-red-500 opacity-50" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Filter Panel */}
            <div className="lg:col-span-1">
              <Card className="shadow-lg sticky top-8">
                <CardHeader className="bg-gradient-to-r from-[#1FA84A]/10 to-[#1FA84A]/5">
                  <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-[#1FA84A]" />
                    <CardTitle className="text-[#0C2C4A]">Filter Data</CardTitle>
                  </div>
                  <CardDescription>
                    Pilih kriteria data yang akan diunduh
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  {/* Sport Filter */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-[#0C2C4A]">
                      Cabang Olahraga
                    </Label>
                    <Select 
                      value={filters.sport} 
                      onValueChange={(value) => setFilters(prev => ({ 
                        ...prev, 
                        sport: value,
                        category: 'all' // Reset category when sport changes
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih cabang olahraga" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua Cabang Olahraga</SelectItem>
                        {sports.map(sport => (
                          <SelectItem key={sport.id} value={sport.id}>
                            {sport.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Category Filter */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-[#0C2C4A]">
                      Kategori Lomba
                    </Label>
                    <Select 
                      value={filters.category} 
                      onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}
                      disabled={filters.sport === 'all'}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua Kategori</SelectItem>
                        {availableCategories.map(cat => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {filters.sport === 'all' && (
                      <p className="text-xs text-gray-500">
                        Pilih cabang olahraga terlebih dahulu
                      </p>
                    )}
                  </div>

                  {/* Format Filter */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-[#0C2C4A]">
                      Format Lomba
                    </Label>
                    <Select 
                      value={filters.format} 
                      onValueChange={(value) => setFilters(prev => ({ ...prev, format: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua Format</SelectItem>
                        <SelectItem value="tunggal">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Tunggal / Individu
                          </div>
                        </SelectItem>
                        <SelectItem value="ganda">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            Ganda / Pasangan
                          </div>
                        </SelectItem>
                        <SelectItem value="beregu">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            Beregu / Tim
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Validation Status Filter */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-[#0C2C4A]">
                      Status Validasi
                    </Label>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Checkbox 
                          id="approved"
                          checked={filters.validationStatus.includes('approved')}
                          onCheckedChange={() => toggleValidationStatus('approved')}
                        />
                        <label 
                          htmlFor="approved"
                          className="text-sm flex items-center gap-2 cursor-pointer"
                        >
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span>Disetujui</span>
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            {mockParticipantCount.approved}
                          </Badge>
                        </label>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Checkbox 
                          id="pending"
                          checked={filters.validationStatus.includes('pending')}
                          onCheckedChange={() => toggleValidationStatus('pending')}
                        />
                        <label 
                          htmlFor="pending"
                          className="text-sm flex items-center gap-2 cursor-pointer"
                        >
                          <Clock className="w-4 h-4 text-yellow-600" />
                          <span>Menunggu</span>
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                            {mockParticipantCount.pending}
                          </Badge>
                        </label>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Checkbox 
                          id="rejected"
                          checked={filters.validationStatus.includes('rejected')}
                          onCheckedChange={() => toggleValidationStatus('rejected')}
                        />
                        <label 
                          htmlFor="rejected"
                          className="text-sm flex items-center gap-2 cursor-pointer"
                        >
                          <XCircle className="w-4 h-4 text-red-600" />
                          <span>Ditolak</span>
                          <Badge variant="outline" className="bg-red-50 text-red-700">
                            {mockParticipantCount.rejected}
                          </Badge>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Result Preview */}
                  <div className="pt-4 border-t">
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                      <p className="text-sm font-semibold text-[#0C2C4A] mb-2">
                        Data yang akan diunduh:
                      </p>
                      <p className="text-3xl font-bold text-blue-600">
                        {getFilteredCount()} peserta
                      </p>
                      {filters.validationStatus.length === 0 && (
                        <p className="text-xs text-red-600 mt-2">
                          ⚠️ Pilih minimal 1 status validasi
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Download Options */}
            <div className="lg:col-span-2 space-y-6">
              {/* Excel Download */}
              <Card className="shadow-lg border-2 border-[#1FA84A]">
                <CardHeader className="bg-gradient-to-r from-[#1FA84A]/10 to-[#1FA84A]/5">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-600 rounded-lg p-3">
                      <FileSpreadsheet className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-[#0C2C4A]">Excel (.xlsx)</CardTitle>
                      <CardDescription>
                        Format utama - Data terstruktur dengan sheet terpisah
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-[#0C2C4A] mb-3">Struktur File Excel:</h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 font-bold">•</span>
                          <span><strong>Sheet 1: Ringkasan</strong> - Overview jumlah peserta per kategori</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 font-bold">•</span>
                          <span><strong>Sheet 2: Data Individu</strong> - Daftar peserta tunggal/ganda</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 font-bold">•</span>
                          <span><strong>Sheet 3: Data Tim</strong> - Informasi tim dan anggota (jika ada)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 font-bold">•</span>
                          <span><strong>Sheet 4: Kontak & Dokumen</strong> - Info kontak dan status dokumen</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-800">
                        <strong>💡 Rekomendasi:</strong> Gunakan format Excel untuk data lengkap yang mudah dianalisis dan dicetak
                      </p>
                    </div>

                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700 text-white gap-2"
                      size="lg"
                      onClick={handleDownloadExcel}
                      disabled={isGenerating || filters.validationStatus.length === 0}
                    >
                      {isGenerating ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Membuat file...
                        </>
                      ) : (
                        <>
                          <Download className="w-5 h-5" />
                          Unduh Excel (.xlsx)
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* PDF Download */}
              <Card className="shadow-lg border-2 border-[#D92B2B]">
                <CardHeader className="bg-gradient-to-r from-[#D92B2B]/10 to-[#D92B2B]/5">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-600 rounded-lg p-3">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-[#0C2C4A]">PDF (.pdf)</CardTitle>
                      <CardDescription>
                        Ringkasan untuk presentasi atau distribusi
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-[#0C2C4A] mb-3">Konten PDF:</h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 font-bold">•</span>
                          <span>Header dengan logo Muhammadiyah Games 2026</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 font-bold">•</span>
                          <span>Tabel ringkasan peserta per kategori</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 font-bold">•</span>
                          <span>Daftar nama peserta dengan nomor urut</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 font-bold">•</span>
                          <span>Format siap cetak dengan pagination</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <p className="text-sm text-amber-800">
                        <strong>📄 Gunakan untuk:</strong> Dokumentasi resmi, absensi, atau distribusi ke juri
                      </p>
                    </div>

                    <Button 
                      className="w-full bg-red-600 hover:bg-red-700 text-white gap-2"
                      size="lg"
                      onClick={handleDownloadPDF}
                      disabled={isGenerating || filters.validationStatus.length === 0}
                    >
                      {isGenerating ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Membuat file...
                        </>
                      ) : (
                        <>
                          <Download className="w-5 h-5" />
                          Unduh PDF (.pdf)
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* CSV Download */}
              <Card className="shadow-lg border-2 border-[#F6A500]">
                <CardHeader className="bg-gradient-to-r from-[#F6A500]/10 to-[#F6A500]/5">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#F6A500] rounded-lg p-3">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-[#0C2C4A]">CSV (.csv)</CardTitle>
                      <CardDescription>
                        Format universal untuk integrasi sistem
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-[#0C2C4A] mb-3">Karakteristik CSV:</h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="text-[#F6A500] font-bold">•</span>
                          <span>Format teks sederhana (comma-separated values)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#F6A500] font-bold">•</span>
                          <span>Dapat dibuka di Excel, Google Sheets, atau editor teks</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#F6A500] font-bold">•</span>
                          <span>Mudah diimport ke sistem lain (database, CRM, dll)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#F6A500] font-bold">•</span>
                          <span>Ukuran file lebih kecil, proses cepat</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <p className="text-sm text-purple-800">
                        <strong>🔗 Gunakan untuk:</strong> Import ke sistem scoring, database, atau aplikasi pihak ketiga
                      </p>
                    </div>

                    <Button 
                      className="w-full bg-[#F6A500] hover:bg-[#d89100] text-white gap-2"
                      size="lg"
                      onClick={handleDownloadCSV}
                      disabled={isGenerating || filters.validationStatus.length === 0}
                    >
                      {isGenerating ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Membuat file...
                        </>
                      ) : (
                        <>
                          <Download className="w-5 h-5" />
                          Unduh CSV (.csv)
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Info Card */}
              <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-500 rounded-full p-2 flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0C2C4A] mb-2">Catatan Penting</h4>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>• File akan otomatis diberi nama sesuai filter dan tanggal download</li>
                        <li>• Data peserta yang diunduh sudah tervalidasi sesuai filter status</li>
                        <li>• Untuk data tim, anggota tim akan tercantum di sheet/section terpisah</li>
                        <li>• Semua data sudah dienkripsi dan aman untuk distribusi internal</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
