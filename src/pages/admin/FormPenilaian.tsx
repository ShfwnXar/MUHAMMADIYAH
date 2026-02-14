import React, { useState } from 'react';
import { FileDown, Printer, FileSpreadsheet, ChevronDown } from 'lucide-react';
import TapakSuciTemplate from '../components/admin/scoring-templates/TapakSuciTemplate';
import AtletikTemplate from '../components/admin/scoring-templates/AtletikTemplate';
import PanahanTemplate from '../components/admin/scoring-templates/PanahanTemplate';
import RacketSportTemplate from '../components/admin/scoring-templates/RacketSportTemplate';
import VoliTemplate from '../components/admin/scoring-templates/VoliTemplate';

// Sport-specific data
const sportsData = {
  'Tapak Suci': {
    categories: ['Putra', 'Putri'],
    levels: ['SMP', 'SMA', 'Mahasiswa'],
    classes: ['Jurus Tunggal', 'Jurus Beregu', 'Tanding Kelas A', 'Tanding Kelas B', 'Tanding Kelas C']
  },
  'Atletik': {
    categories: ['Putra', 'Putri'],
    levels: ['SMP', 'SMA', 'Mahasiswa'],
    classes: ['100m', '200m', '400m', '800m', '1500m', 'Lompat Jauh', 'Lompat Tinggi', 'Lempar Lembing']
  },
  'Panahan': {
    categories: ['Putra', 'Putri'],
    levels: ['SMP', 'SMA', 'Mahasiswa'],
    classes: ['Recurve Individual', 'Compound Individual', 'Recurve Beregu', 'Compound Beregu']
  },
  'Badminton': {
    categories: ['Putra', 'Putri', 'Ganda Campuran'],
    levels: ['SMP', 'SMA', 'Mahasiswa'],
    classes: ['Tunggal', 'Ganda']
  },
  'Tenis Meja': {
    categories: ['Putra', 'Putri', 'Ganda Campuran'],
    levels: ['SMP', 'SMA', 'Mahasiswa'],
    classes: ['Tunggal', 'Ganda']
  },
  'Voli Indoor': {
    categories: ['Putra', 'Putri'],
    levels: ['SMP', 'SMA', 'Mahasiswa'],
    classes: ['Beregu']
  }
};

// Mock participant data
const mockParticipants = [
  { no: 1, nama: 'Ahmad Fauzi', kontingen: 'Yogyakarta', kelas: 'Kelas A', catatan: '-' },
  { no: 2, nama: 'Budi Santoso', kontingen: 'Jakarta Pusat', kelas: 'Kelas A', catatan: '-' },
  { no: 3, nama: 'Cahyo Nugroho', kontingen: 'Semarang', kelas: 'Kelas A', catatan: '-' },
  { no: 4, nama: 'Dimas Prasetyo', kontingen: 'Surabaya', kelas: 'Kelas A', catatan: '-' }
];

export default function FormPenilaian() {
  const [selectedSport, setSelectedSport] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [formGenerated, setFormGenerated] = useState(false);

  const handleGenerateForm = () => {
    if (selectedSport && selectedCategory && selectedLevel && selectedClass) {
      setFormGenerated(true);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    alert('Fitur Download PDF akan segera tersedia');
  };

  const handleExportExcel = () => {
    alert('Fitur Export Excel akan segera tersedia');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-[#0C2C4A] text-white py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Download Form Penilaian Pertandingan</h1>
          <p className="text-slate-300">Generate dan cetak form penilaian untuk setiap pertandingan cabang olahraga</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-[#0C2C4A] mb-6">Filter Data Pertandingan</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Cabang Olahraga */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Cabang Olahraga
              </label>
              <div className="relative">
                <select
                  value={selectedSport}
                  onChange={(e) => {
                    setSelectedSport(e.target.value);
                    setSelectedCategory('');
                    setSelectedLevel('');
                    setSelectedClass('');
                    setFormGenerated(false);
                  }}
                  className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-lg appearance-none cursor-pointer focus:outline-none focus:border-[#1FA84A] transition-colors"
                >
                  <option value="">Pilih Cabor</option>
                  {Object.keys(sportsData).map((sport) => (
                    <option key={sport} value={sport}>{sport}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Kategori */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Kategori
              </label>
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setFormGenerated(false);
                  }}
                  disabled={!selectedSport}
                  className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-lg appearance-none cursor-pointer focus:outline-none focus:border-[#1FA84A] transition-colors disabled:bg-slate-100 disabled:cursor-not-allowed"
                >
                  <option value="">Pilih Kategori</option>
                  {selectedSport && sportsData[selectedSport as keyof typeof sportsData].categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Jenjang */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Jenjang
              </label>
              <div className="relative">
                <select
                  value={selectedLevel}
                  onChange={(e) => {
                    setSelectedLevel(e.target.value);
                    setFormGenerated(false);
                  }}
                  disabled={!selectedSport}
                  className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-lg appearance-none cursor-pointer focus:outline-none focus:border-[#1FA84A] transition-colors disabled:bg-slate-100 disabled:cursor-not-allowed"
                >
                  <option value="">Pilih Jenjang</option>
                  {selectedSport && sportsData[selectedSport as keyof typeof sportsData].levels.map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Kelas / Nomor Lomba */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Kelas / Nomor Lomba
              </label>
              <div className="relative">
                <select
                  value={selectedClass}
                  onChange={(e) => {
                    setSelectedClass(e.target.value);
                    setFormGenerated(false);
                  }}
                  disabled={!selectedSport}
                  className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-lg appearance-none cursor-pointer focus:outline-none focus:border-[#1FA84A] transition-colors disabled:bg-slate-100 disabled:cursor-not-allowed"
                >
                  <option value="">Pilih Kelas</option>
                  {selectedSport && sportsData[selectedSport as keyof typeof sportsData].classes.map((cls) => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <button
            onClick={handleGenerateForm}
            disabled={!selectedSport || !selectedCategory || !selectedLevel || !selectedClass}
            className="w-full md:w-auto px-8 py-3 bg-[#1FA84A] text-white font-semibold rounded-lg hover:bg-[#168f3d] transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <FileDown className="w-5 h-5" />
            Generate Form Penilaian
          </button>
        </div>

        {/* Preview Section - Only show when form is generated */}
        {formGenerated && (
          <>
            <div id="printable-form" className="bg-white rounded-lg shadow-md p-8 mb-6 print:shadow-none">
              {/* Render appropriate template based on sport */}
              {selectedSport === 'Tapak Suci' && (
                <TapakSuciTemplate
                  sport={selectedSport}
                  category={selectedCategory}
                  level={selectedLevel}
                  class={selectedClass}
                  participants={mockParticipants}
                />
              )}
              {selectedSport === 'Atletik' && (
                <AtletikTemplate
                  sport={selectedSport}
                  category={selectedCategory}
                  level={selectedLevel}
                  class={selectedClass}
                  participants={mockParticipants}
                />
              )}
              {selectedSport === 'Panahan' && (
                <PanahanTemplate
                  sport={selectedSport}
                  category={selectedCategory}
                  level={selectedLevel}
                  class={selectedClass}
                  participants={mockParticipants}
                />
              )}
              {(selectedSport === 'Badminton' || selectedSport === 'Tenis Meja') && (
                <RacketSportTemplate
                  sport={selectedSport}
                  category={selectedCategory}
                  level={selectedLevel}
                  class={selectedClass}
                  participants={mockParticipants}
                />
              )}
              {selectedSport === 'Voli Indoor' && (
                <VoliTemplate
                  sport={selectedSport}
                  category={selectedCategory}
                  level={selectedLevel}
                  class={selectedClass}
                  participants={mockParticipants}
                />
              )}
            </div>

            {/* Download Actions */}
            <div className="bg-white rounded-lg shadow-md p-6 print:hidden">
              <div className="flex flex-wrap gap-4 justify-end">
                <button
                  onClick={handleExportExcel}
                  className="px-6 py-3 bg-white border-2 border-[#0C2C4A] text-[#0C2C4A] font-semibold rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2"
                >
                  <FileSpreadsheet className="w-5 h-5" />
                  Export Excel
                </button>
                <button
                  onClick={handleDownloadPDF}
                  className="px-6 py-3 bg-white border-2 border-[#0C2C4A] text-[#0C2C4A] font-semibold rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2"
                >
                  <FileDown className="w-5 h-5" />
                  Download PDF
                </button>
                <button
                  onClick={handlePrint}
                  className="px-6 py-3 bg-[#1FA84A] text-white font-semibold rounded-lg hover:bg-[#168f3d] transition-colors flex items-center gap-2"
                >
                  <Printer className="w-5 h-5" />
                  Print Now
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body {
            background: white;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          @page {
            size: A4;
            margin: 1cm;
          }
          /* Ensure content fits on one page */
          #printable-form {
            page-break-inside: avoid;
          }
          /* Hide screen elements */
          header, nav, .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}