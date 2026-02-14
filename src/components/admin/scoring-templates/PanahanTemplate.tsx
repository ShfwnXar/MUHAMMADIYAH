import React from 'react';

interface Participant {
  no: number;
  nama: string;
  kontingen: string;
  kelas: string;
  catatan: string;
}

interface PanahanTemplateProps {
  sport: string;
  category: string;
  level: string;
  class: string;
  participants: Participant[];
}

export default function PanahanTemplate({ sport, category, level, class: className, participants }: PanahanTemplateProps) {
  return (
    <div className="max-w-[210mm] mx-auto bg-white">
      {/* Header */}
      <div className="border-4 border-[#1FA84A] p-6 mb-6">
        <div className="text-center mb-4">
          <div className="inline-block bg-[#F6A500] text-white px-6 py-2 rounded-full mb-3">
            <span className="font-bold text-lg">MUHAMMADIYAH GAMES 2026</span>
          </div>
          <h1 className="text-2xl font-bold text-[#0C2C4A] mb-1">FORM PENILAIAN PERTANDINGAN</h1>
          <div className="text-lg font-semibold text-[#1FA84A]">{sport.toUpperCase()}</div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex">
            <span className="font-semibold w-32">Kategori:</span>
            <span className="flex-1 border-b border-slate-400">{category}</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-32">Jenjang:</span>
            <span className="flex-1 border-b border-slate-400">{level}</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-32">Kelas:</span>
            <span className="flex-1 border-b border-slate-400">{className}</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-32">Jarak:</span>
            <span className="flex-1 border-b border-slate-400">__________</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-32">Tanggal:</span>
            <span className="flex-1 border-b border-slate-400">__________</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-32">Arena:</span>
            <span className="flex-1 border-b border-slate-400">__________</span>
          </div>
        </div>
      </div>

      {/* Archer Details */}
      <div className="mb-6 p-4 bg-slate-50 border-2 border-slate-300">
        <h2 className="text-lg font-bold text-[#0C2C4A] mb-3">Data Pemanah</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex">
            <span className="font-semibold w-32">Nama Atlet:</span>
            <span className="flex-1 border-b border-slate-400">__________________________</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-32">BIB Number:</span>
            <span className="flex-1 border-b border-slate-400">__________</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-32">Kontingen:</span>
            <span className="flex-1 border-b border-slate-400">__________________________</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-32">Target No:</span>
            <span className="flex-1 border-b border-slate-400">__________</span>
          </div>
        </div>
      </div>

      {/* Scoring Sheet - Arrow by Arrow */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-[#0C2C4A] mb-3 bg-slate-100 px-4 py-2 border-l-4 border-[#D92B2B]">
          Lembar Penilaian Per Seri
        </h2>
        
        <table className="w-full border-2 border-slate-300">
          <thead>
            <tr className="bg-[#0C2C4A] text-white">
              <th className="border border-slate-300 px-2 py-2 text-sm" rowSpan={2}>Seri</th>
              <th className="border border-slate-300 px-2 py-2 text-sm" colSpan={6}>Skor Per Anak Panah</th>
              <th className="border border-slate-300 px-2 py-2 text-sm" rowSpan={2}>Total Seri</th>
              <th className="border border-slate-300 px-2 py-2 text-sm" rowSpan={2}>Total Kumulatif</th>
              <th className="border border-slate-300 px-2 py-2 text-sm" rowSpan={2}>X+10</th>
            </tr>
            <tr className="bg-[#0C2C4A] text-white">
              <th className="border border-slate-300 px-2 py-1 text-xs">1</th>
              <th className="border border-slate-300 px-2 py-1 text-xs">2</th>
              <th className="border border-slate-300 px-2 py-1 text-xs">3</th>
              <th className="border border-slate-300 px-2 py-1 text-xs">4</th>
              <th className="border border-slate-300 px-2 py-1 text-xs">5</th>
              <th className="border border-slate-300 px-2 py-1 text-xs">6</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((seri) => (
              <tr key={seri} className={seri % 2 === 0 ? 'bg-slate-50' : ''}>
                <td className="border border-slate-300 px-2 py-2 text-center font-semibold text-sm">{seri}</td>
                <td className="border border-slate-300 px-2 py-2 text-center">___</td>
                <td className="border border-slate-300 px-2 py-2 text-center">___</td>
                <td className="border border-slate-300 px-2 py-2 text-center">___</td>
                <td className="border border-slate-300 px-2 py-2 text-center">___</td>
                <td className="border border-slate-300 px-2 py-2 text-center">___</td>
                <td className="border border-slate-300 px-2 py-2 text-center">___</td>
                <td className="border border-slate-300 px-2 py-2 text-center bg-amber-50">_____</td>
                <td className="border border-slate-300 px-2 py-2 text-center bg-green-50">_____</td>
                <td className="border border-slate-300 px-2 py-2 text-center">___</td>
              </tr>
            ))}
            <tr className="bg-[#1FA84A] text-white font-bold">
              <td className="border border-slate-300 px-2 py-3 text-center" colSpan={7}>TOTAL KESELURUHAN</td>
              <td className="border border-slate-300 px-2 py-3 text-center text-lg">_______</td>
              <td className="border border-slate-300 px-2 py-3 text-center" colSpan={2}>_______</td>
            </tr>
          </tbody>
        </table>

        <div className="mt-4 p-3 bg-blue-50 border-2 border-blue-300 text-sm">
          <div className="font-semibold mb-2">Keterangan Penilaian:</div>
          <div className="grid grid-cols-2 gap-2">
            <div>• <strong>X</strong> = 10 poin (X-ring)</div>
            <div>• <strong>10</strong> = 10 poin</div>
            <div>• <strong>9</strong> = 9 poin</div>
            <div>• <strong>8</strong> = 8 poin</div>
            <div>• <strong>M</strong> = Miss (0 poin)</div>
            <div>• Total X+10 untuk tie-breaker</div>
          </div>
        </div>
      </div>

      {/* Summary & Ranking */}
      <div className="mb-6 p-4 bg-amber-50 border-2 border-[#F6A500]">
        <h3 className="font-bold text-[#0C2C4A] mb-3">Ringkasan Hasil</h3>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="flex">
            <span className="font-semibold w-32">Total Skor:</span>
            <span className="flex-1 border-b-2 border-slate-400 text-center text-lg font-bold">_______</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-32">X-Count:</span>
            <span className="flex-1 border-b-2 border-slate-400 text-center text-lg font-bold">_______</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-32">Ranking:</span>
            <span className="flex-1 border-b-2 border-slate-400 text-center text-lg font-bold">_______</span>
          </div>
        </div>
      </div>

      {/* Team Score (if applicable) */}
      <div className="mb-6 p-4 bg-slate-50 border-2 border-slate-300">
        <h3 className="font-bold text-[#0C2C4A] mb-3">Skor Beregu (jika beregu)</h3>
        <table className="w-full border border-slate-300">
          <thead>
            <tr className="bg-slate-200">
              <th className="border border-slate-300 px-2 py-2 text-sm">Nama Anggota</th>
              <th className="border border-slate-300 px-2 py-2 text-sm">Total Skor</th>
              <th className="border border-slate-300 px-2 py-2 text-sm">X-Count</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-300 px-2 py-2">1. ______________________</td>
              <td className="border border-slate-300 px-2 py-2 text-center">_______</td>
              <td className="border border-slate-300 px-2 py-2 text-center">_______</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-2 py-2">2. ______________________</td>
              <td className="border border-slate-300 px-2 py-2 text-center">_______</td>
              <td className="border border-slate-300 px-2 py-2 text-center">_______</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-2 py-2">3. ______________________</td>
              <td className="border border-slate-300 px-2 py-2 text-center">_______</td>
              <td className="border border-slate-300 px-2 py-2 text-center">_______</td>
            </tr>
            <tr className="bg-[#1FA84A] text-white font-bold">
              <td className="border border-slate-300 px-2 py-2">TOTAL TIM</td>
              <td className="border border-slate-300 px-2 py-2 text-center">_______</td>
              <td className="border border-slate-300 px-2 py-2 text-center">_______</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Signature Section */}
      <div className="border-2 border-[#F6A500] p-4 bg-amber-50">
        <h2 className="text-lg font-bold text-[#0C2C4A] mb-4">Pengesahan</h2>
        <div className="grid grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-sm font-semibold mb-12">Ketua Wasit</div>
            <div className="border-t-2 border-slate-400 pt-1">
              <div className="text-xs text-slate-600">Nama & Tanda Tangan</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm font-semibold mb-12">Scorer</div>
            <div className="border-t-2 border-slate-400 pt-1">
              <div className="text-xs text-slate-600">Nama & Tanda Tangan</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm font-semibold mb-12">Panitia Pelaksana</div>
            <div className="border-t-2 border-slate-400 pt-1">
              <div className="text-xs text-slate-600">Nama & Tanda Tangan</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-slate-500 mt-6 pt-4 border-t border-slate-300">
        Muhammadiyah Games 2026 • Form Penilaian Resmi • www.muhammadiyahgames.id
      </div>
    </div>
  );
}
