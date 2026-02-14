import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { AdminSidebar } from '../../components/AdminSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { Trophy, Upload, Save, Edit, Eye, CheckCircle2, Medal, Award } from 'lucide-react';
import { toast } from 'sonner';

export default function CompetitionResults() {
  const navigate = useNavigate();
  
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  const [results, setResults] = useState({
    juara1: '',
    juara1Institusi: '',
    juara2: '',
    juara2Institusi: '',
    juara3: '',
    juara3Institusi: ''
  });

  const [documents, setDocuments] = useState({
    beritaAcara: null as File | null,
    dokumentasi: null as File | null
  });

  const [isPublished, setIsPublished] = useState(false);

  const sports = [
    { id: 'tapak-suci', name: 'Tapak Suci' },
    { id: 'atletik', name: 'Atletik' },
    { id: 'panahan', name: 'Panahan' },
    { id: 'badminton', name: 'Bulutangkis' },
    { id: 'tenis-meja', name: 'Tenis Meja' },
    { id: 'voli', name: 'Voli Indoor' }
  ];

  const categories = {
    'tapak-suci': ['Tanding Perorangan Putra', 'Tanding Perorangan Putri', 'Seni Tunggal', 'Seni Ganda', 'Bebas Beregu'],
    'atletik': ['100m Putra', '100m Putri', '400m Putra', '400m Putri', '800m Putra', '800m Putri', 'Lompat Jauh', 'Tolak Peluru'],
    'panahan': ['Standar SD', 'Standar SMP', 'Barebow', 'Compound', 'Recurve'],
    'badminton': ['Tunggal Putra', 'Tunggal Putri', 'Ganda Putra', 'Ganda Putri'],
    'tenis-meja': ['Tunggal Putra', 'Tunggal Putri', 'Ganda Putra', 'Ganda Putri', 'Ganda Campuran'],
    'voli': ['Tim Putra', 'Tim Putri']
  };

  const handleFileUpload = (fileType: 'beritaAcara' | 'dokumentasi', event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setDocuments(prev => ({
        ...prev,
        [fileType]: file
      }));
    }
  };

  const handleSave = () => {
    if (!selectedSport || !selectedCategory) {
      toast.error('Pilih cabang olahraga dan kategori terlebih dahulu');
      return;
    }

    if (!results.juara1 || !results.juara2 || !results.juara3) {
      toast.error('Lengkapi data juara 1, 2, dan 3');
      return;
    }

    toast.success('✅ Hasil lomba berhasil disimpan!', {
      description: 'Data telah tersimpan dan bisa diedit kembali',
    });
  };

  const handlePublish = () => {
    if (!selectedSport || !selectedCategory) {
      toast.error('Pilih cabang olahraga dan kategori terlebih dahulu');
      return;
    }

    if (!results.juara1 || !results.juara2 || !results.juara3) {
      toast.error('Lengkapi data juara terlebih dahulu');
      return;
    }

    setIsPublished(true);
    toast.success('🏆 Hasil lomba berhasil dipublikasikan!', {
      description: 'Hasil sudah dapat dilihat oleh peserta',
      duration: 5000,
    });
  };

  const handleLogout = () => {
    navigate('/admin-login');
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <AdminSidebar onLogout={handleLogout} />

      <div className="flex-1">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0C2C4A] to-[#D92B2B] text-white py-12 px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white/20 p-3 rounded-lg">
                <Trophy className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">Manajemen Hasil Lomba</h1>
                <p className="text-white/90 text-lg">
                  Input dan publikasi juara per cabang olahraga
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-8 py-8">
          {/* Selection Card */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-[#0C2C4A]">Pilih Cabang & Kategori Lomba</CardTitle>
              <CardDescription>
                Pilih cabang olahraga dan kategori untuk input hasil
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Cabang Olahraga *</Label>
                  <Select value={selectedSport} onValueChange={setSelectedSport}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih cabang olahraga" />
                    </SelectTrigger>
                    <SelectContent>
                      {sports.map((sport) => (
                        <SelectItem key={sport.id} value={sport.id}>
                          {sport.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Kategori Lomba *</Label>
                  <Select 
                    value={selectedCategory} 
                    onValueChange={setSelectedCategory}
                    disabled={!selectedSport}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedSport && categories[selectedSport as keyof typeof categories]?.map((cat, idx) => (
                        <SelectItem key={idx} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Input Form */}
          {selectedSport && selectedCategory && (
            <>
              {/* Champion Input Cards */}
              <div className="grid gap-6 mb-6">
                {/* Juara 1 */}
                <Card className="border-2 border-[#F6A500]">
                  <CardHeader className="bg-gradient-to-r from-[#F6A500]/20 to-[#F6A500]/10">
                    <CardTitle className="flex items-center gap-3 text-[#0C2C4A]">
                      <div className="bg-[#F6A500] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                        1
                      </div>
                      Juara 1 (Emas)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Nama Peserta / Tim *</Label>
                        <Input
                          value={results.juara1}
                          onChange={(e) => setResults({...results, juara1: e.target.value})}
                          placeholder="Nama pemenang juara 1"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Asal Institusi *</Label>
                        <Input
                          value={results.juara1Institusi}
                          onChange={(e) => setResults({...results, juara1Institusi: e.target.value})}
                          placeholder="Sekolah/Universitas"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Juara 2 */}
                <Card className="border-2 border-gray-400">
                  <CardHeader className="bg-gradient-to-r from-gray-200 to-gray-100">
                    <CardTitle className="flex items-center gap-3 text-[#0C2C4A]">
                      <div className="bg-gray-400 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                        2
                      </div>
                      Juara 2 (Perak)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Nama Peserta / Tim *</Label>
                        <Input
                          value={results.juara2}
                          onChange={(e) => setResults({...results, juara2: e.target.value})}
                          placeholder="Nama pemenang juara 2"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Asal Institusi *</Label>
                        <Input
                          value={results.juara2Institusi}
                          onChange={(e) => setResults({...results, juara2Institusi: e.target.value})}
                          placeholder="Sekolah/Universitas"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Juara 3 */}
                <Card className="border-2 border-amber-700">
                  <CardHeader className="bg-gradient-to-r from-amber-100 to-amber-50">
                    <CardTitle className="flex items-center gap-3 text-[#0C2C4A]">
                      <div className="bg-amber-700 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                        3
                      </div>
                      Juara 3 (Perunggu)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Nama Peserta / Tim *</Label>
                        <Input
                          value={results.juara3}
                          onChange={(e) => setResults({...results, juara3: e.target.value})}
                          placeholder="Nama pemenang juara 3"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Asal Institusi *</Label>
                        <Input
                          value={results.juara3Institusi}
                          onChange={(e) => setResults({...results, juara3Institusi: e.target.value})}
                          placeholder="Sekolah/Universitas"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Optional Documents */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-[#0C2C4A]">Upload Dokumen (Opsional)</CardTitle>
                  <CardDescription>
                    Berita acara dan dokumentasi hasil lomba
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Berita Acara Pertandingan</Label>
                        <p className="text-sm text-gray-600">File PDF berita acara hasil lomba</p>
                      </div>
                      {documents.beritaAcara && <CheckCircle2 className="w-5 h-5 text-[#1FA84A]" />}
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        className="gap-2"
                        onClick={() => document.getElementById('ba-input')?.click()}
                      >
                        <Upload className="w-4 h-4" />
                        {documents.beritaAcara ? 'Ganti File' : 'Pilih File'}
                      </Button>
                      <input
                        id="ba-input"
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        onChange={(e) => handleFileUpload('beritaAcara', e)}
                      />
                      {documents.beritaAcara && (
                        <span className="text-sm text-gray-600">{documents.beritaAcara.name}</span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Dokumentasi Hasil</Label>
                        <p className="text-sm text-gray-600">Foto podium atau sertifikat (JPG/PNG)</p>
                      </div>
                      {documents.dokumentasi && <CheckCircle2 className="w-5 h-5 text-[#1FA84A]" />}
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        className="gap-2"
                        onClick={() => document.getElementById('doc-input')?.click()}
                      >
                        <Upload className="w-4 h-4" />
                        {documents.dokumentasi ? 'Ganti File' : 'Pilih File'}
                      </Button>
                      <input
                        id="doc-input"
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        className="hidden"
                        onChange={(e) => handleFileUpload('dokumentasi', e)}
                      />
                      {documents.dokumentasi && (
                        <span className="text-sm text-gray-600">{documents.dokumentasi.name}</span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {isPublished && (
                        <Badge className="bg-[#1FA84A] text-white text-sm px-3 py-1">
                          <CheckCircle2 className="w-4 h-4 mr-1" />
                          Dipublikasikan
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={handleSave}
                        className="gap-2"
                      >
                        <Save className="w-4 h-4" />
                        Simpan Draft
                      </Button>
                      <Button
                        className="bg-[#1FA84A] hover:bg-[#1FA84A]/90 gap-2"
                        size="lg"
                        onClick={handlePublish}
                        disabled={isPublished}
                      >
                        <Trophy className="w-4 h-4" />
                        {isPublished ? 'Sudah Dipublikasikan' : 'Publikasikan Hasil'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
