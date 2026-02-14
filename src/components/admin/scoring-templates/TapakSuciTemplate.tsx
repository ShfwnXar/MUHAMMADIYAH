import React from 'react';

interface Participant {
  no: number;
  nama: string;
  kontingen: string;
  kelas: string;
  catatan: string;
}

interface TapakSuciTemplateProps {
  sport: string;
  category: string;
  level: string;
  class: string;
  participants: Participant[];
}

export default function TapakSuciTemplate({ sport, category, level, class: className, participants }: TapakSuciTemplateProps) {
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
            <span className="font-semibold w-32">Arena/Gelanggang:</span>
            <span className="flex-1 border-b border-slate-400">__________</span>
          </div>
        </div>
      </div>

      {/* Participant Info Table */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-[#0C2C4A] mb-3 bg-slate-100 px-4 py-2 border-l-4 border-[#1FA84A]">
          Data Peserta
        </h2>
        <table className="w-full border-2 border-slate-300">
          <thead>
            <tr className="bg-[#0C2C4A] text-white">
              <th className="border border-slate-300 px-3 py-2 text-sm">No</th>
              <th className="border border-slate-300 px-3 py-2 text-sm">Nama Atlet</th>
              <th className="border border-slate-300 px-3 py-2 text-sm">Kontingen</th>
              <th className="border border-slate-300 px-3 py-2 text-sm">Kelas</th>
              <th className="border border-slate-300 px-3 py-2 text-sm">Catatan</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((p) => (
              <tr key={p.no}>
                <td className="border border-slate-300 px-3 py-2 text-center text-sm">{p.no}</td>
                <td className="border border-slate-300 px-3 py-2 text-sm">{p.nama}</td>
                <td className="border border-slate-300 px-3 py-2 text-sm">{p.kontingen}</td>
                <td className="border border-slate-300 px-3 py-2 text-center text-sm">{p.kelas}</td>
                <td className="border border-slate-300 px-3 py-2 text-sm">{p.catatan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Scoring Section - Tapak Suci Specific */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-[#0C2C4A] mb-3 bg-slate-100 px-4 py-2 border-l-4 border-[#D92B2B]">
          Penilaian Pertandingan
        </h2>

        {/* Ronde/Babak */}
        <div className="border-2 border-slate-300 p-4 mb-4">
          <h3 className="font-bold text-[#0C2C4A] mb-3">BABAK 1</h3>
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div>
              <div className="text-center mb-2">
                <span className="inline-block bg-[#D92B2B] text-white px-4 py-1 rounded">SUDUT MERAH</span>
              </div>
              <div className="text-sm mb-1">Nama: _______________________</div>
              <div className="text-sm">Kontingen: ___________________</div>
            </div>
            <div>
              <div className="text-center mb-2">
                <span className="inline-block bg-[#0C2C4A] text-white px-4 py-1 rounded">SUDUT BIRU</span>
              </div>
              <div className="text-sm mb-1">Nama: _______________________</div>
              <div className="text-sm">Kontingen: ___________________</div>
            </div>
          </div>

          {/* Scoring Grid */}
          <table className="w-full border border-slate-300 mb-3">
            <thead>
              <tr className="bg-slate-200">
                <th className="border border-slate-300 px-2 py-1 text-sm">Juri</th>
                <th className="border border-slate-300 px-2 py-1 text-sm">Merah</th>
                <th className="border border-slate-300 px-2 py-1 text-sm">Biru</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-300 px-2 py-2 text-sm">Juri 1</td>
                <td className="border border-slate-300 px-2 py-2 text-center">_______</td>
                <td className="border border-slate-300 px-2 py-2 text-center">_______</td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-2 py-2 text-sm">Juri 2</td>
                <td className="border border-slate-300 px-2 py-2 text-center">_______</td>
                <td className="border border-slate-300 px-2 py-2 text-center">_______</td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-2 py-2 text-sm">Juri 3</td>
                <td className="border border-slate-300 px-2 py-2 text-center">_______</td>
                <td className="border border-slate-300 px-2 py-2 text-center">_______</td>
              </tr>
              <tr className="bg-slate-100 font-bold">
                <td className="border border-slate-300 px-2 py-2 text-sm">TOTAL</td>
                <td className="border border-slate-300 px-2 py-2 text-center">_______</td>
                <td className="border border-slate-300 px-2 py-2 text-center">_______</td>
              </tr>
            </tbody>
          </table>

          <div className="flex gap-6">
            <div className="flex-1">
              <span className="text-sm font-semibold">Hasil: </span>
              <label className="inline-flex items-center ml-2">
                <input type="checkbox" className="mr-1" />
                <span className="text-sm">Merah Menang</span>
              </label>
              <label className="inline-flex items-center ml-3">
                <input type="checkbox" className="mr-1" />
                <span className="text-sm">Biru Menang</span>
              </label>
              <label className="inline-flex items-center ml-3">
                <input type="checkbox" className="mr-1" />
                <span className="text-sm">Seri</span>
              </label>
            </div>
          </div>
        </div>

        {/* Additional rounds can be added here */}
        <div className="border-2 border-slate-300 p-4">
          <h3 className="font-bold text-[#0C2C4A] mb-2">BABAK 2</h3>
          <div className="text-sm text-slate-500 text-center py-8">
            (Jika diperlukan, gunakan format yang sama seperti Babak 1)
          </div>
        </div>
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
            <div className="text-sm font-semibold mb-12">Juri Utama</div>
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
