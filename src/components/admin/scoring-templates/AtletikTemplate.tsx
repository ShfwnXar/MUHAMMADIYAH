import React from 'react';

interface Participant {
  no: number;
  nama: string;
  kontingen: string;
  kelas: string;
  catatan: string;
}

interface AtletikTemplateProps {
  sport: string;
  category: string;
  level: string;
  class: string;
  participants: Participant[];
}

export default function AtletikTemplate({ sport, category, level, class: className, participants }: AtletikTemplateProps) {
  // Determine if it's a running or field event
  const isRunningEvent = className.includes('m');
  const isJumpEvent = className.includes('Lompat');
  const isThrowEvent = className.includes('Lempar');

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
            <span className="font-semibold w-32">Nomor Lomba:</span>
            <span className="flex-1 border-b border-slate-400">{className}</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-32">Heat/Final:</span>
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

      {/* Scoring Section - Running Events */}
      {isRunningEvent && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-[#0C2C4A] mb-3 bg-slate-100 px-4 py-2 border-l-4 border-[#D92B2B]">
            Hasil Lomba Lari - {className}
          </h2>
          <table className="w-full border-2 border-slate-300">
            <thead>
              <tr className="bg-[#0C2C4A] text-white">
                <th className="border border-slate-300 px-3 py-2 text-sm">Lintasan</th>
                <th className="border border-slate-300 px-3 py-2 text-sm">BIB</th>
                <th className="border border-slate-300 px-3 py-2 text-sm">Nama Atlet</th>
                <th className="border border-slate-300 px-3 py-2 text-sm">Kontingen</th>
                <th className="border border-slate-300 px-3 py-2 text-sm">Waktu (detik)</th>
                <th className="border border-slate-300 px-3 py-2 text-sm">Ranking</th>
                <th className="border border-slate-300 px-3 py-2 text-sm">Catatan</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((p, idx) => (
                <tr key={p.no}>
                  <td className="border border-slate-300 px-3 py-3 text-center text-sm font-semibold">{idx + 1}</td>
                  <td className="border border-slate-300 px-3 py-3 text-center text-sm">______</td>
                  <td className="border border-slate-300 px-3 py-3 text-sm">{p.nama}</td>
                  <td className="border border-slate-300 px-3 py-3 text-sm">{p.kontingen}</td>
                  <td className="border border-slate-300 px-3 py-3 text-center">
                    <span className="inline-block border-b-2 border-slate-400 w-24">_______</span>
                  </td>
                  <td className="border border-slate-300 px-3 py-3 text-center">
                    <span className="inline-block border-b-2 border-slate-400 w-12">___</span>
                  </td>
                  <td className="border border-slate-300 px-3 py-3 text-sm text-center">______</td>
                </tr>
              ))}
              {/* Empty rows for additional participants */}
              {[...Array(Math.max(0, 8 - participants.length))].map((_, idx) => (
                <tr key={`empty-${idx}`}>
                  <td className="border border-slate-300 px-3 py-3 text-center text-sm font-semibold">{participants.length + idx + 1}</td>
                  <td className="border border-slate-300 px-3 py-3 text-center">______</td>
                  <td className="border border-slate-300 px-3 py-3">___________________</td>
                  <td className="border border-slate-300 px-3 py-3">___________________</td>
                  <td className="border border-slate-300 px-3 py-3 text-center">_______</td>
                  <td className="border border-slate-300 px-3 py-3 text-center">___</td>
                  <td className="border border-slate-300 px-3 py-3 text-center">______</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 p-4 bg-amber-50 border-2 border-[#F6A500]">
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-semibold">Rekor Nasional:</span>
                <span className="ml-2 border-b border-slate-400 inline-block w-32">_______</span>
              </div>
              <div>
                <span className="font-semibold">Rekor Games:</span>
                <span className="ml-2 border-b border-slate-400 inline-block w-32">_______</span>
              </div>
              <div>
                <span className="font-semibold">Rekor Baru:</span>
                <label className="inline-flex items-center ml-2">
                  <input type="checkbox" className="mr-1" />
                  <span>Ya</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scoring Section - Jump Events */}
      {isJumpEvent && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-[#0C2C4A] mb-3 bg-slate-100 px-4 py-2 border-l-4 border-[#D92B2B]">
            Hasil Lomba - {className}
          </h2>
          <table className="w-full border-2 border-slate-300">
            <thead>
              <tr className="bg-[#0C2C4A] text-white">
                <th className="border border-slate-300 px-2 py-2 text-sm">BIB</th>
                <th className="border border-slate-300 px-2 py-2 text-sm">Nama Atlet</th>
                <th className="border border-slate-300 px-2 py-2 text-sm">Kontingen</th>
                <th className="border border-slate-300 px-2 py-2 text-sm">1</th>
                <th className="border border-slate-300 px-2 py-2 text-sm">2</th>
                <th className="border border-slate-300 px-2 py-2 text-sm">3</th>
                <th className="border border-slate-300 px-2 py-2 text-sm">4</th>
                <th className="border border-slate-300 px-2 py-2 text-sm">5</th>
                <th className="border border-slate-300 px-2 py-2 text-sm">6</th>
                <th className="border border-slate-300 px-2 py-2 text-sm">Terbaik</th>
                <th className="border border-slate-300 px-2 py-2 text-sm">Rank</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((p) => (
                <tr key={p.no}>
                  <td className="border border-slate-300 px-2 py-2 text-center text-sm">___</td>
                  <td className="border border-slate-300 px-2 py-2 text-sm">{p.nama}</td>
                  <td className="border border-slate-300 px-2 py-2 text-sm">{p.kontingen}</td>
                  <td className="border border-slate-300 px-2 py-2 text-center text-sm">____</td>
                  <td className="border border-slate-300 px-2 py-2 text-center text-sm">____</td>
                  <td className="border border-slate-300 px-2 py-2 text-center text-sm">____</td>
                  <td className="border border-slate-300 px-2 py-2 text-center text-sm">____</td>
                  <td className="border border-slate-300 px-2 py-2 text-center text-sm">____</td>
                  <td className="border border-slate-300 px-2 py-2 text-center text-sm">____</td>
                  <td className="border border-slate-300 px-2 py-2 text-center font-semibold text-sm">____</td>
                  <td className="border border-slate-300 px-2 py-2 text-center font-semibold text-sm">___</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-xs text-slate-600 mt-2">
            * Gunakan tanda "X" untuk lompatan gagal | Format: meter.sentimeter (contoh: 6.45)
          </div>
        </div>
      )}

      {/* Scoring Section - Throw Events */}
      {isThrowEvent && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-[#0C2C4A] mb-3 bg-slate-100 px-4 py-2 border-l-4 border-[#D92B2B]">
            Hasil Lomba - {className}
          </h2>
          <table className="w-full border-2 border-slate-300">
            <thead>
              <tr className="bg-[#0C2C4A] text-white">
                <th className="border border-slate-300 px-2 py-2 text-sm">BIB</th>
                <th className="border border-slate-300 px-2 py-2 text-sm">Nama Atlet</th>
                <th className="border border-slate-300 px-2 py-2 text-sm">Kontingen</th>
                <th className="border border-slate-300 px-2 py-2 text-sm">1</th>
                <th className="border border-slate-300 px-2 py-2 text-sm">2</th>
                <th className="border border-slate-300 px-2 py-2 text-sm">3</th>
                <th className="border border-slate-300 px-2 py-2 text-sm">4</th>
                <th className="border border-slate-300 px-2 py-2 text-sm">5</th>
                <th className="border border-slate-300 px-2 py-2 text-sm">6</th>
                <th className="border border-slate-300 px-2 py-2 text-sm">Terbaik</th>
                <th className="border border-slate-300 px-2 py-2 text-sm">Rank</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((p) => (
                <tr key={p.no}>
                  <td className="border border-slate-300 px-2 py-2 text-center text-sm">___</td>
                  <td className="border border-slate-300 px-2 py-2 text-sm">{p.nama}</td>
                  <td className="border border-slate-300 px-2 py-2 text-sm">{p.kontingen}</td>
                  <td className="border border-slate-300 px-2 py-2 text-center text-sm">____</td>
                  <td className="border border-slate-300 px-2 py-2 text-center text-sm">____</td>
                  <td className="border border-slate-300 px-2 py-2 text-center text-sm">____</td>
                  <td className="border border-slate-300 px-2 py-2 text-center text-sm">____</td>
                  <td className="border border-slate-300 px-2 py-2 text-center text-sm">____</td>
                  <td className="border border-slate-300 px-2 py-2 text-center text-sm">____</td>
                  <td className="border border-slate-300 px-2 py-2 text-center font-semibold text-sm">____</td>
                  <td className="border border-slate-300 px-2 py-2 text-center font-semibold text-sm">___</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-xs text-slate-600 mt-2">
            * Gunakan tanda "X" untuk lemparan foul | Format: meter.sentimeter (contoh: 45.23)
          </div>
        </div>
      )}

      {/* Weather & Conditions */}
      <div className="mb-6 p-4 bg-slate-50 border-2 border-slate-300">
        <h3 className="font-bold text-[#0C2C4A] mb-3">Kondisi Lapangan & Cuaca</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex">
            <span className="font-semibold w-32">Suhu:</span>
            <span className="flex-1 border-b border-slate-400">__________ °C</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-32">Kelembaban:</span>
            <span className="flex-1 border-b border-slate-400">__________ %</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-32">Kecepatan Angin:</span>
            <span className="flex-1 border-b border-slate-400">__________ m/s</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-32">Arah Angin:</span>
            <span className="flex-1 border-b border-slate-400">__________</span>
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
            <div className="text-sm font-semibold mb-12">Pencatat Waktu</div>
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
