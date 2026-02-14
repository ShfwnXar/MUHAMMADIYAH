import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ParticipantSidebar } from '../../components/ParticipantSidebar';
import { RegistrationWizard } from '../../components/RegistrationWizard';
import { Footer } from '../../components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { User, Users, Plus, X, ArrowRight, ArrowLeft, AlertCircle, ChevronDown, ChevronRight, DollarSign } from 'lucide-react';
import { getRegistrationProgress, completeStep2, generateId, Participant, Team, CategoryEntry, RegistrationEntry, TeamMember } from '../../utils/registrationStorage';
import { toast } from 'sonner';

export default function Step2() {
  const navigate = useNavigate();
  const [registrationProgress, setRegistrationProgress] = useState({
    step1Complete: false,
    step2Complete: false,
    step3Complete: false
  });

  const [selectedSports, setSelectedSports] = useState<any[]>([]);
  const [categoryEntries, setCategoryEntries] = useState<CategoryEntry[]>([]);
  const [expandedCategory, setExpandedCategory] = useState<string>('');
  const [expandedEntry, setExpandedEntry] = useState<string>('');

  // Form states for adding new entry
  const [participantForms, setParticipantForms] = useState<Omit<Participant, 'id'>[]>([{
    nama: '',
    nik: '',
    tanggalLahir: '',
    jenisKelamin: '',
    alamat: '',
    kota: '',
    provinsi: '',
    nomorTelepon: '',
    email: '',
    namaSekolah: '',
    jenisSekolah: ''
  }]);

  const [teamForm, setTeamForm] = useState<Omit<Team, 'id'>>({
    namaTim: '',
    kategori: '',
    namaManager: '',
    kontakManager: '',
    namaSekolah: '',
    jenisSekolah: '',
    members: [{ nama: '', nik: '', tanggalLahir: '', posisi: '' }]
  });

  // Load progress from localStorage on mount
  useEffect(() => {
    const progress = getRegistrationProgress();
    setRegistrationProgress(progress);
    
    // Redirect to Step 1 if not completed
    if (!progress.step1Complete || !progress.step1Data?.selectedSports) {
      toast.error('Silakan pilih cabang dan kategori lomba terlebih dahulu');
      navigate('/registration/step-1');
      return;
    }

    // Load selected sports from Step 1
    const sports = progress.step1Data.selectedSports;
    setSelectedSports(sports);

    // Initialize or load category entries
    if (progress.step2Data?.categoryEntries) {
      setCategoryEntries(progress.step2Data.categoryEntries);
    } else {
      // Initialize empty category entries
      const initialEntries: CategoryEntry[] = sports.map(sport => ({
        sportId: sport.sportId,
        sportName: sport.sportName,
        categoryId: sport.categoryId,
        categoryName: sport.categoryName,
        categoryType: sport.categoryType,
        pricePerEntry: sport.price,
        entries: []
      }));
      setCategoryEntries(initialEntries);
    }

    // Auto-expand first category
    if (sports.length > 0 && !expandedCategory) {
      setExpandedCategory(`${sports[0].sportId}-${sports[0].categoryId}`);
    }
  }, [navigate]);

  const handleLogout = () => {
    navigate('/participant-login');
  };

  const getCategoryEntry = (sportId: string, categoryId: string): CategoryEntry | null => {
    return categoryEntries.find(e => e.sportId === sportId && e.categoryId === categoryId) || null;
  };

  const updateCategoryEntry = (sportId: string, categoryId: string, updates: Partial<CategoryEntry>) => {
    setCategoryEntries(entries => 
      entries.map(e => 
        e.sportId === sportId && e.categoryId === categoryId 
          ? { ...e, ...updates } 
          : e
      )
    );
  };

  const addEntry = (sportId: string, categoryId: string, categoryType: 'tunggal' | 'ganda' | 'beregu') => {
    const category = getCategoryEntry(sportId, categoryId);
    if (!category) return;

    // Validate forms based on category type
    if (categoryType === 'tunggal') {
      const form = participantForms[0];
      if (!form.nama || !form.nik || !form.tanggalLahir || !form.jenisKelamin || 
          !form.nomorTelepon || !form.email || !form.namaSekolah) {
        toast.error('Lengkapi semua field yang wajib diisi');
        return;
      }

      const newEntry: RegistrationEntry = {
        id: generateId(),
        entryNumber: category.entries.length + 1,
        participants: [{
          ...form,
          id: generateId()
        }]
      };

      updateCategoryEntry(sportId, categoryId, {
        entries: [...category.entries, newEntry]
      });

      // Reset form
      setParticipantForms([{
        nama: '',
        nik: '',
        tanggalLahir: '',
        jenisKelamin: '',
        alamat: '',
        kota: '',
        provinsi: '',
        nomorTelepon: '',
        email: '',
        namaSekolah: '',
        jenisSekolah: ''
      }]);

      toast.success('Peserta ditambahkan');
    } else if (categoryType === 'ganda') {
      // Validate both participants
      if (participantForms.length < 2) {
        toast.error('Kategori ganda memerlukan 2 peserta');
        return;
      }

      const form1 = participantForms[0];
      const form2 = participantForms[1];

      if (!form1.nama || !form1.nik || !form1.tanggalLahir || !form1.jenisKelamin || 
          !form1.nomorTelepon || !form1.email || !form1.namaSekolah) {
        toast.error('Lengkapi data Peserta 1');
        return;
      }

      if (!form2.nama || !form2.nik || !form2.tanggalLahir || !form2.jenisKelamin || 
          !form2.nomorTelepon || !form2.email || !form2.namaSekolah) {
        toast.error('Lengkapi data Peserta 2');
        return;
      }

      const newEntry: RegistrationEntry = {
        id: generateId(),
        entryNumber: category.entries.length + 1,
        participants: [
          { ...form1, id: generateId() },
          { ...form2, id: generateId() }
        ]
      };

      updateCategoryEntry(sportId, categoryId, {
        entries: [...category.entries, newEntry]
      });

      // Reset forms
      setParticipantForms([{
        nama: '',
        nik: '',
        tanggalLahir: '',
        jenisKelamin: '',
        alamat: '',
        kota: '',
        provinsi: '',
        nomorTelepon: '',
        email: '',
        namaSekolah: '',
        jenisSekolah: ''
      }]);

      toast.success('Pasangan ditambahkan');
    } else if (categoryType === 'beregu') {
      // Validate team
      if (!teamForm.namaTim || !teamForm.kategori || !teamForm.namaManager || 
          !teamForm.kontakManager || !teamForm.namaSekolah) {
        toast.error('Lengkapi informasi tim');
        return;
      }

      if (teamForm.members.length < 6) {
        toast.error('Minimal 6 pemain untuk tim');
        return;
      }

      const incompleteMembers = teamForm.members.filter(m => !m.nama || !m.nik || !m.tanggalLahir);
      if (incompleteMembers.length > 0) {
        toast.error('Lengkapi data semua anggota tim');
        return;
      }

      const newEntry: RegistrationEntry = {
        id: generateId(),
        entryNumber: category.entries.length + 1,
        participants: [],
        team: {
          ...teamForm,
          id: generateId()
        }
      };

      updateCategoryEntry(sportId, categoryId, {
        entries: [...category.entries, newEntry]
      });

      // Reset form
      setTeamForm({
        namaTim: '',
        kategori: '',
        namaManager: '',
        kontakManager: '',
        namaSekolah: '',
        jenisSekolah: '',
        members: [{ nama: '', nik: '', tanggalLahir: '', posisi: '' }]
      });

      toast.success('Tim ditambahkan');
    }
  };

  const removeEntry = (sportId: string, categoryId: string, entryId: string) => {
    const category = getCategoryEntry(sportId, categoryId);
    if (!category) return;

    const updatedEntries = category.entries.filter(e => e.id !== entryId);
    
    // Renumber entries
    const renumberedEntries = updatedEntries.map((entry, index) => ({
      ...entry,
      entryNumber: index + 1
    }));

    updateCategoryEntry(sportId, categoryId, {
      entries: renumberedEntries
    });

    toast.info('Entri dihapus');
  };

  const addTeamMember = () => {
    if (teamForm.members.length < 12) {
      setTeamForm({
        ...teamForm,
        members: [...teamForm.members, { nama: '', nik: '', tanggalLahir: '', posisi: '' }]
      });
    }
  };

  const removeTeamMember = (index: number) => {
    if (teamForm.members.length > 1) {
      setTeamForm({
        ...teamForm,
        members: teamForm.members.filter((_, i) => i !== index)
      });
    }
  };

  const initializeGandaForms = () => {
    if (participantForms.length === 1) {
      setParticipantForms([
        ...participantForms,
        {
          nama: '',
          nik: '',
          tanggalLahir: '',
          jenisKelamin: '',
          alamat: '',
          kota: '',
          provinsi: '',
          nomorTelepon: '',
          email: '',
          namaSekolah: '',
          jenisSekolah: ''
        }
      ]);
    }
  };

  const handleContinue = () => {
    // Validate that at least one entry is added
    const hasEntries = categoryEntries.some(cat => cat.entries.length > 0);

    if (!hasEntries) {
      toast.error('Tambahkan minimal 1 entri pendaftaran');
      return;
    }

    // Save Step 2 completion
    completeStep2(categoryEntries);

    // Navigate to Step 3
    navigate('/registration/step-3');
  };

  const getTotalEntries = () => {
    return categoryEntries.reduce((sum, cat) => sum + cat.entries.length, 0);
  };

  const getTotalCost = () => {
    return categoryEntries.reduce((sum, cat) => 
      sum + (cat.entries.length * cat.pricePerEntry), 0
    );
  };

  // Show error state if no sports selected
  if (selectedSports.length === 0) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <ParticipantSidebar 
          registrationProgress={registrationProgress}
          onLogout={handleLogout}
        />
        <div className="flex-1 flex items-center justify-center p-8">
          <Card className="max-w-md border-2 border-yellow-400">
            <CardContent className="pt-6 text-center">
              <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#0C2C4A] mb-2">
                Data Kategori Tidak Ditemukan
              </h3>
              <p className="text-gray-600 mb-6">
                Silakan pilih cabang dan kategori lomba terlebih dahulu pada tahap Pilih Cabang Lomba.
              </p>
              <Button
                onClick={() => navigate('/registration/step-1')}
                className="bg-[#1FA84A] hover:bg-[#1FA84A]/90"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali ke Step 1
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <ParticipantSidebar 
        registrationProgress={registrationProgress}
        onLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0C2C4A] to-[#1FA84A] text-white py-8 px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Step 2: Data Peserta</h1>
            <p className="text-white/90">
              Tambahkan entri pendaftaran untuk setiap kategori (bisa lebih dari 1 entri per kategori)
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-8 py-8 w-full">
          <RegistrationWizard 
            currentStep={2}
            step1Complete={registrationProgress.step1Complete}
            step2Complete={registrationProgress.step2Complete}
            step3Complete={registrationProgress.step3Complete}
          />

          {/* Summary Banner */}
          <Card className="mb-6 bg-gradient-to-r from-[#1FA84A]/10 to-[#1FA84A]/5 border-2 border-[#1FA84A]">
            <CardContent className="pt-6">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Kategori Dipilih</p>
                  <p className="text-3xl font-bold text-[#1FA84A]">{selectedSports.length}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Entri</p>
                  <p className="text-3xl font-bold text-[#D92B2B]">{getTotalEntries()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Estimasi Biaya</p>
                  <p className="text-2xl font-bold text-[#0C2C4A]">
                    Rp {getTotalCost().toLocaleString('id-ID')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category Entries */}
          <div className="space-y-6 mb-6">
            {selectedSports.map((sport) => {
              const categoryKey = `${sport.sportId}-${sport.categoryId}`;
              const category = getCategoryEntry(sport.sportId, sport.categoryId);
              const isExpanded = expandedCategory === categoryKey;
              
              if (!category) return null;

              const isTunggal = sport.categoryType === 'tunggal';
              const isGanda = sport.categoryType === 'ganda';
              const isBeregu = sport.categoryType === 'beregu';

              return (
                <Card key={categoryKey} className={`${category.entries.length > 0 ? 'border-2 border-[#1FA84A]' : ''}`}>
                  <CardHeader 
                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setExpandedCategory(isExpanded ? '' : categoryKey)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {isBeregu ? (
                          <Users className="w-6 h-6 text-[#1FA84A]" />
                        ) : (
                          <User className="w-6 h-6 text-[#1FA84A]" />
                        )}
                        <div>
                          <CardTitle className="text-[#0C2C4A]">
                            {sport.sportName} - {sport.categoryName}
                          </CardTitle>
                          <CardDescription>
                            {isTunggal ? 'Tunggal (1 peserta/entri)' : isGanda ? 'Ganda (2 peserta/entri)' : 'Beregu (1 tim/entri)'} 
                            {' • '}Rp {sport.price.toLocaleString('id-ID')}/entri
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Entri Terdaftar</p>
                          <p className="text-2xl font-bold text-[#1FA84A]">{category.entries.length}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  {isExpanded && (
                    <CardContent className="border-t pt-6">
                      {/* Existing Entries */}
                      {category.entries.length > 0 && (
                        <div className="mb-6">
                          <h4 className="font-semibold text-[#0C2C4A] mb-3">
                            Entri Pendaftaran ({category.entries.length})
                          </h4>
                          <div className="space-y-3">
                            {category.entries.map((entry) => {
                              const entryKey = `${categoryKey}-${entry.id}`;
                              const isEntryExpanded = expandedEntry === entryKey;

                              return (
                                <Card key={entry.id} className="border-2 border-gray-200">
                                  <CardHeader 
                                    className="cursor-pointer hover:bg-gray-50 py-3"
                                    onClick={() => setExpandedEntry(isEntryExpanded ? '' : entryKey)}
                                  >
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-3">
                                        <div className="bg-[#1FA84A] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                                          {entry.entryNumber}
                                        </div>
                                        <div>
                                          <p className="font-semibold text-[#0C2C4A]">
                                            Entri #{entry.entryNumber}
                                            {entry.team && ` - ${entry.team.namaTim}`}
                                          </p>
                                          <p className="text-sm text-gray-600">
                                            {isTunggal && entry.participants[0] && entry.participants[0].nama}
                                            {isGanda && entry.participants.length === 2 && 
                                              `${entry.participants[0].nama} & ${entry.participants[1].nama}`}
                                            {isBeregu && entry.team && 
                                              `${entry.team.members.length} pemain • ${entry.team.namaSekolah}`}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            removeEntry(sport.sportId, sport.categoryId, entry.id);
                                          }}
                                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                        >
                                          <X className="w-4 h-4 mr-1" />
                                          Hapus
                                        </Button>
                                        <Button variant="ghost" size="sm">
                                          {isEntryExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                                        </Button>
                                      </div>
                                    </div>
                                  </CardHeader>
                                  
                                  {isEntryExpanded && (
                                    <CardContent className="border-t bg-gray-50 py-4">
                                      {/* Show participant details */}
                                      {entry.participants.map((participant, idx) => (
                                        <div key={participant.id} className="mb-3 p-3 bg-white rounded border">
                                          <h5 className="font-semibold text-sm text-[#0C2C4A] mb-2">
                                            {isGanda ? `Peserta ${idx + 1}` : 'Peserta'}
                                          </h5>
                                          <div className="grid grid-cols-2 gap-2 text-xs">
                                            <div><span className="text-gray-600">Nama:</span> {participant.nama}</div>
                                            <div><span className="text-gray-600">NIK:</span> {participant.nik}</div>
                                            <div><span className="text-gray-600">Sekolah:</span> {participant.namaSekolah}</div>
                                            <div><span className="text-gray-600">Telepon:</span> {participant.nomorTelepon}</div>
                                          </div>
                                        </div>
                                      ))}
                                      
                                      {/* Show team details */}
                                      {entry.team && (
                                        <div className="p-3 bg-white rounded border">
                                          <h5 className="font-semibold text-sm text-[#0C2C4A] mb-2">Tim</h5>
                                          <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                                            <div><span className="text-gray-600">Nama Tim:</span> {entry.team.namaTim}</div>
                                            <div><span className="text-gray-600">Manager:</span> {entry.team.namaManager}</div>
                                            <div><span className="text-gray-600">Sekolah:</span> {entry.team.namaSekolah}</div>
                                            <div><span className="text-gray-600">Jumlah Pemain:</span> {entry.team.members.length}</div>
                                          </div>
                                          <details className="text-xs">
                                            <summary className="cursor-pointer text-[#1FA84A] font-semibold">Lihat Anggota Tim</summary>
                                            <div className="mt-2 space-y-1">
                                              {entry.team.members.map((member, idx) => (
                                                <div key={idx} className="p-2 bg-gray-50 rounded">
                                                  {idx + 1}. {member.nama} - {member.posisi}
                                                </div>
                                              ))}
                                            </div>
                                          </details>
                                        </div>
                                      )}
                                    </CardContent>
                                  )}
                                </Card>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Add New Entry Form */}
                      <div className="border-t pt-6">
                        <h4 className="font-semibold text-[#0C2C4A] mb-4">
                          {isTunggal && '➕ Tambah Peserta Baru'}
                          {isGanda && '➕ Tambah Pasangan Baru'}
                          {isBeregu && '➕ Tambah Tim Baru'}
                        </h4>

                        {/* Tunggal Form */}
                        {isTunggal && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Nama Lengkap *</Label>
                                <Input
                                  value={participantForms[0].nama}
                                  onChange={(e) => {
                                    const updated = [...participantForms];
                                    updated[0].nama = e.target.value;
                                    setParticipantForms(updated);
                                  }}
                                  placeholder="Nama sesuai KTP"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>NIK / NIS *</Label>
                                <Input
                                  value={participantForms[0].nik}
                                  onChange={(e) => {
                                    const updated = [...participantForms];
                                    updated[0].nik = e.target.value;
                                    setParticipantForms(updated);
                                  }}
                                  placeholder="16 digit"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Tanggal Lahir *</Label>
                                <Input
                                  type="date"
                                  value={participantForms[0].tanggalLahir}
                                  onChange={(e) => {
                                    const updated = [...participantForms];
                                    updated[0].tanggalLahir = e.target.value;
                                    setParticipantForms(updated);
                                  }}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Jenis Kelamin *</Label>
                                <Select
                                  value={participantForms[0].jenisKelamin}
                                  onValueChange={(value) => {
                                    const updated = [...participantForms];
                                    updated[0].jenisKelamin = value;
                                    setParticipantForms(updated);
                                  }}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Pilih" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="laki-laki">Laki-laki</SelectItem>
                                    <SelectItem value="perempuan">Perempuan</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label>Nomor Telepon *</Label>
                                <Input
                                  type="tel"
                                  value={participantForms[0].nomorTelepon}
                                  onChange={(e) => {
                                    const updated = [...participantForms];
                                    updated[0].nomorTelepon = e.target.value;
                                    setParticipantForms(updated);
                                  }}
                                  placeholder="08xxxxxxxxxx"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Email *</Label>
                                <Input
                                  type="email"
                                  value={participantForms[0].email}
                                  onChange={(e) => {
                                    const updated = [...participantForms];
                                    updated[0].email = e.target.value;
                                    setParticipantForms(updated);
                                  }}
                                  placeholder="email@example.com"
                                />
                              </div>
                              <div className="space-y-2 col-span-2">
                                <Label>Nama Sekolah/Universitas *</Label>
                                <Input
                                  value={participantForms[0].namaSekolah}
                                  onChange={(e) => {
                                    const updated = [...participantForms];
                                    updated[0].namaSekolah = e.target.value;
                                    setParticipantForms(updated);
                                  }}
                                  placeholder="Nama lengkap institusi"
                                />
                              </div>
                            </div>
                            <Button
                              className="w-full bg-[#1FA84A] hover:bg-[#1FA84A]/90"
                              onClick={() => addEntry(sport.sportId, sport.categoryId, 'tunggal')}
                            >
                              <Plus className="w-4 h-4 mr-2" />
                              Tambah Peserta
                            </Button>
                          </div>
                        )}

                        {/* Ganda Form */}
                        {isGanda && (
                          <div className="space-y-4">
                            {participantForms.length === 1 && (
                              <Button
                                variant="outline"
                                className="w-full"
                                onClick={initializeGandaForms}
                              >
                                Inisialisasi Form Ganda (2 Peserta)
                              </Button>
                            )}
                            
                            {participantForms.length === 2 && participantForms.map((form, formIdx) => (
                              <div key={formIdx} className="border rounded-lg p-4 bg-gray-50">
                                <h5 className="font-semibold mb-3 text-[#0C2C4A]">Peserta {formIdx + 1}</h5>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label>Nama Lengkap *</Label>
                                    <Input
                                      value={form.nama}
                                      onChange={(e) => {
                                        const updated = [...participantForms];
                                        updated[formIdx].nama = e.target.value;
                                        setParticipantForms(updated);
                                      }}
                                      placeholder="Nama sesuai KTP"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>NIK / NIS *</Label>
                                    <Input
                                      value={form.nik}
                                      onChange={(e) => {
                                        const updated = [...participantForms];
                                        updated[formIdx].nik = e.target.value;
                                        setParticipantForms(updated);
                                      }}
                                      placeholder="16 digit"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Tanggal Lahir *</Label>
                                    <Input
                                      type="date"
                                      value={form.tanggalLahir}
                                      onChange={(e) => {
                                        const updated = [...participantForms];
                                        updated[formIdx].tanggalLahir = e.target.value;
                                        setParticipantForms(updated);
                                      }}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Jenis Kelamin *</Label>
                                    <Select
                                      value={form.jenisKelamin}
                                      onValueChange={(value) => {
                                        const updated = [...participantForms];
                                        updated[formIdx].jenisKelamin = value;
                                        setParticipantForms(updated);
                                      }}
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Pilih" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="laki-laki">Laki-laki</SelectItem>
                                        <SelectItem value="perempuan">Perempuan</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Nomor Telepon *</Label>
                                    <Input
                                      type="tel"
                                      value={form.nomorTelepon}
                                      onChange={(e) => {
                                        const updated = [...participantForms];
                                        updated[formIdx].nomorTelepon = e.target.value;
                                        setParticipantForms(updated);
                                      }}
                                      placeholder="08xxxxxxxxxx"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Email *</Label>
                                    <Input
                                      type="email"
                                      value={form.email}
                                      onChange={(e) => {
                                        const updated = [...participantForms];
                                        updated[formIdx].email = e.target.value;
                                        setParticipantForms(updated);
                                      }}
                                      placeholder="email@example.com"
                                    />
                                  </div>
                                  <div className="space-y-2 col-span-2">
                                    <Label>Nama Sekolah/Universitas *</Label>
                                    <Input
                                      value={form.namaSekolah}
                                      onChange={(e) => {
                                        const updated = [...participantForms];
                                        updated[formIdx].namaSekolah = e.target.value;
                                        setParticipantForms(updated);
                                      }}
                                      placeholder="Nama lengkap institusi"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}

                            {participantForms.length === 2 && (
                              <Button
                                className="w-full bg-[#1FA84A] hover:bg-[#1FA84A]/90"
                                onClick={() => addEntry(sport.sportId, sport.categoryId, 'ganda')}
                              >
                                <Plus className="w-4 h-4 mr-2" />
                                Tambah Pasangan
                              </Button>
                            )}
                          </div>
                        )}

                        {/* Beregu/Team Form - same as before but integrated */}
                        {isBeregu && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Nama Tim *</Label>
                                <Input
                                  value={teamForm.namaTim}
                                  onChange={(e) => setTeamForm({...teamForm, namaTim: e.target.value})}
                                  placeholder="Nama tim"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Kategori *</Label>
                                <Select
                                  value={teamForm.kategori}
                                  onValueChange={(value) => setTeamForm({...teamForm, kategori: value})}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Pilih kategori" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="putra">Tim Putra</SelectItem>
                                    <SelectItem value="putri">Tim Putri</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label>Nama Manager *</Label>
                                <Input
                                  value={teamForm.namaManager}
                                  onChange={(e) => setTeamForm({...teamForm, namaManager: e.target.value})}
                                  placeholder="Nama manager"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Kontak Manager *</Label>
                                <Input
                                  type="tel"
                                  value={teamForm.kontakManager}
                                  onChange={(e) => setTeamForm({...teamForm, kontakManager: e.target.value})}
                                  placeholder="08xxxxxxxxxx"
                                />
                              </div>
                              <div className="space-y-2 col-span-2">
                                <Label>Nama Sekolah/Universitas *</Label>
                                <Input
                                  value={teamForm.namaSekolah}
                                  onChange={(e) => setTeamForm({...teamForm, namaSekolah: e.target.value})}
                                  placeholder="Nama institusi"
                                />
                              </div>
                            </div>

                            <div className="border-t pt-4">
                              <h5 className="font-semibold text-[#0C2C4A] mb-3">Anggota Tim (Min. 6)</h5>
                              <div className="space-y-3">
                                {teamForm.members.map((member, idx) => (
                                  <div key={idx} className="border rounded p-3 bg-white">
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="font-medium text-sm">Pemain {idx + 1}</span>
                                      {teamForm.members.length > 1 && (
                                        <Button
                                          type="button"
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => removeTeamMember(idx)}
                                          className="text-red-600"
                                        >
                                          <X className="w-4 h-4" />
                                        </Button>
                                      )}
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                      <Input
                                        placeholder="Nama"
                                        value={member.nama}
                                        onChange={(e) => {
                                          const updated = [...teamForm.members];
                                          updated[idx].nama = e.target.value;
                                          setTeamForm({...teamForm, members: updated});
                                        }}
                                      />
                                      <Input
                                        placeholder="NIK/NIS"
                                        value={member.nik}
                                        onChange={(e) => {
                                          const updated = [...teamForm.members];
                                          updated[idx].nik = e.target.value;
                                          setTeamForm({...teamForm, members: updated});
                                        }}
                                      />
                                      <Input
                                        type="date"
                                        value={member.tanggalLahir}
                                        onChange={(e) => {
                                          const updated = [...teamForm.members];
                                          updated[idx].tanggalLahir = e.target.value;
                                          setTeamForm({...teamForm, members: updated});
                                        }}
                                      />
                                      <Select
                                        value={member.posisi}
                                        onValueChange={(value) => {
                                          const updated = [...teamForm.members];
                                          updated[idx].posisi = value;
                                          setTeamForm({...teamForm, members: updated});
                                        }}
                                      >
                                        <SelectTrigger>
                                          <SelectValue placeholder="Posisi" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="spiker">Spiker</SelectItem>
                                          <SelectItem value="setter">Setter</SelectItem>
                                          <SelectItem value="libero">Libero</SelectItem>
                                          <SelectItem value="blocker">Blocker</SelectItem>
                                          <SelectItem value="cadangan">Cadangan</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>
                                ))}
                                {teamForm.members.length < 12 && (
                                  <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full"
                                    onClick={addTeamMember}
                                  >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Tambah Pemain
                                  </Button>
                                )}
                              </div>
                            </div>

                            <Button
                              className="w-full bg-[#1FA84A] hover:bg-[#1FA84A]/90"
                              onClick={() => addEntry(sport.sportId, sport.categoryId, 'beregu')}
                            >
                              <Plus className="w-4 h-4 mr-2" />
                              Tambah Tim
                            </Button>
                          </div>
                        )}
                      </div>

                      {/* Subtotal per category */}
                      {category.entries.length > 0 && (
                        <div className="mt-6 pt-6 border-t">
                          <div className="bg-gradient-to-r from-[#F6A500]/10 to-[#F6A500]/5 rounded-lg p-4 border-2 border-[#F6A500]">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-gray-600">Subtotal Kategori Ini:</p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {category.entries.length} entri × Rp {category.pricePerEntry.toLocaleString('id-ID')}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-2xl font-bold text-[#D92B2B]">
                                  Rp {(category.entries.length * category.pricePerEntry).toLocaleString('id-ID')}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/registration/step-1')}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Kembali
                </Button>
                <Button
                  className="bg-[#1FA84A] hover:bg-[#1FA84A]/90 px-8"
                  size="lg"
                  onClick={handleContinue}
                >
                  Lanjut ke Pembayaran & Upload Berkas
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}