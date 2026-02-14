import React from 'react';

interface Participant {
  no: number;
  nama: string;
  kontingen: string;
  kelas: string;
  catatan: string;
}

interface RacketSportTemplateProps {
  sport: string;
  category: string;
  level: string;
  class: string;
  participants: Participant[];
}

export default function RacketSportTemplate({ sport, category, level, class: className, participants }: RacketSportTemplateProps) {
  const isBadminton = sport === 'Badminton';
  const maxGames = isBadminton ? 3 : 5; // Badminton best of 3, Table Tennis best of 5

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
            <span className="font-semibold w-32">Nomor Pertandingan:</span>
            <span className="flex-1 border-b border-slate-400">__________</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-32">Tanggal:</span>
            <span className="flex-1 border-b border-slate-400">__________</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-32">Waktu Mulai:</span>
            <span className="flex-1 border-b border-slate-400">__________</span>
          </div>
        </div>
      </div>

      {/* Players/Teams */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-[#0C2C4A] mb-3 bg-slate-100 px-4 py-2 border-l-4 border-[#1FA84A]">
          Data Pemain/Tim
        </h2>
        <div className="grid grid-cols-2 gap-6">
          {/* Player/Team A */}
          <div className="border-2 border-[#D92B2B] p-4 bg-red-50">
            <div className="text-center mb-3">
              <span className="inline-block bg-[#D92B2B] text-white px-4 py-1 rounded font-semibold">
                PEMAIN/TIM A
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex">
                <span className="font-semibold w-24">Nama:</span>
                <span className="flex-1 border-b border-slate-400">_________________</span>
              </div>
              <div className="flex">
                <span className="font-semibold w-24">Kontingen:</span>
                <span className="flex-1 border-b border-slate-400">_________________</span>
              </div>
              {className === 'Ganda' && (
                <div className="flex">
                  <span className="font-semibold w-24">Partner:</span>
                  <span className="flex-1 border-b border-slate-400">_________________</span>
                </div>
              )}
              <div className="flex">
                <span className="font-semibold w-24">BIB:</span>
                <span className="flex-1 border-b border-slate-400">_________________</span>
              </div>
            </div>
          </div>

          {/* Player/Team B */}
          <div className="border-2 border-[#0C2C4A] p-4 bg-blue-50">
            <div className="text-center mb-3">
              <span className="inline-block bg-[#0C2C4A] text-white px-4 py-1 rounded font-semibold">
                PEMAIN/TIM B
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex">
                <span className="font-semibold w-24">Nama:</span>
                <span className="flex-1 border-b border-slate-400">_________________</span>
              </div>
              <div className="flex">
                <span className="font-semibold w-24">Kontingen:</span>
                <span className="flex-1 border-b border-slate-400">_________________</span>
              </div>
              {className === 'Ganda' && (
                <div className="flex">
                  <span className="font-semibold w-24">Partner:</span>
                  <span className="flex-1 border-b border-slate-400">_________________</span>
              </div>
              )}
              <div className="flex">
                <span className="font-semibold w-24">BIB:</span>
                <span className="flex-1 border-b border-slate-400">_________________</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Score Sheet */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-[#0C2C4A] mb-3 bg-slate-100 px-4 py-2 border-l-4 border-[#D92B2B]">
          Skor Pertandingan
        </h2>
        
        <table className="w-full border-2 border-slate-300 mb-4">
          <thead>
            <tr className="bg-[#0C2C4A] text-white">
              <th className="border border-slate-300 px-4 py-2 text-sm">Game</th>
              <th className="border border-slate-300 px-4 py-2 text-sm">Pemain/Tim A</th>
              <th className="border border-slate-300 px-4 py-2 text-sm">Pemain/Tim B</th>
              <th className="border border-slate-300 px-4 py-2 text-sm">Pemenang</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(maxGames)].map((_, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                <td className="border border-slate-300 px-4 py-3 text-center font-semibold">
                  Game {idx + 1}
                </td>
                <td className="border border-slate-300 px-4 py-3 text-center">
                  <span className="inline-block border-b-2 border-slate-400 w-16 text-lg">____</span>
                </td>
                <td className="border border-slate-300 px-4 py-3 text-center">
                  <span className="inline-block border-b-2 border-slate-400 w-16 text-lg">____</span>
                </td>
                <td className="border border-slate-300 px-4 py-3 text-center text-sm">
                  <label className="inline-flex items-center mr-3">
                    <input type="checkbox" className="mr-1" />
                    <span>A</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="checkbox" className="mr-1" />
                    <span>B</span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Final Result */}
        <div className="p-4 bg-[#1FA84A] text-white">
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold">HASIL AKHIR</div>
            <div className="flex gap-8">
              <div className="text-center">
                <div className="text-sm mb-1">Game Dimenangkan A</div>
                <div className="text-3xl font-bold border-2 border-white px-4 py-1 rounded">___</div>
              </div>
              <div className="text-2xl font-bold self-center">VS</div>
              <div className="text-center">
                <div className="text-sm mb-1">Game Dimenangkan B</div>
                <div className="text-3xl font-bold border-2 border-white px-4 py-1 rounded">___</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Match Details */}
      <div className="mb-6 grid grid-cols-2 gap-4">
        <div className="p-4 bg-slate-50 border-2 border-slate-300">
          <h3 className="font-bold text-[#0C2C4A] mb-3 text-sm">Detail Pertandingan</h3>
          <div className="space-y-2 text-sm">
            <div className="flex">
              <span className="font-semibold w-32">Durasi:</span>
              <span className="flex-1 border-b border-slate-400">________ menit</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-32">Waktu Selesai:</span>
              <span className="flex-1 border-b border-slate-400">__________</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-32">Shuttle/Bola:</span>
              <span className="flex-1 border-b border-slate-400">__________</span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-amber-50 border-2 border-[#F6A500]">
          <h3 className="font-bold text-[#0C2C4A] mb-3 text-sm">Peringatan & Pelanggaran</h3>
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-semibold">Pemain A:</span>
              <div className="mt-1">___________________________________</div>
            </div>
            <div>
              <span className="font-semibold">Pemain B:</span>
              <div className="mt-1">___________________________________</div>
            </div>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="mb-6 p-4 bg-slate-50 border-2 border-slate-300">
        <h3 className="font-bold text-[#0C2C4A] mb-2">Catatan Wasit</h3>
        <div className="border border-slate-300 p-3 min-h-[100px] bg-white">
          <div className="text-slate-400 text-sm">
            (Tulis catatan penting atau insiden selama pertandingan)
          </div>
        </div>
      </div>

      {/* Signature Section */}
      <div className="border-2 border-[#F6A500] p-4 bg-amber-50">
        <h2 className="text-lg font-bold text-[#0C2C4A] mb-4">Pengesahan</h2>
        <div className="grid grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-sm font-semibold mb-12">Wasit Utama</div>
            <div className="border-t-2 border-slate-400 pt-1">
              <div className="text-xs text-slate-600">Nama & Tanda Tangan</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm font-semibold mb-12">Hakim Garis</div>
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
