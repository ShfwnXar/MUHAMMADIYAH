// Muhammadiyah Games 2026 - Core Constants & Types
// Comprehensive registration system with THB compliance

// ==========================================
// 1. SPORT CATEGORIES (ENUM)
// ==========================================
export type SportSlug = 
  | 'pencak_silat_tapak_suci'
  | 'atletik'
  | 'panahan'
  | 'bulu_tangkis'
  | 'tenis_meja'
  | 'voli_indoor';

export const SPORTS: Record<SportSlug, { 
  name: string; 
  code: string; 
  description: string;
}> = {
  pencak_silat_tapak_suci: {
    name: 'Pencak Silat Tapak Suci',
    code: 'PS',
    description: 'Seni bela diri khas Muhammadiyah'
  },
  atletik: {
    name: 'Atletik',
    code: 'ATL',
    description: 'Nomor lari, lompat, dan lempar'
  },
  panahan: {
    name: 'Panahan',
    code: 'PAN',
    description: 'Divisi standar nasional dan tradisional'
  },
  bulu_tangkis: {
    name: 'Bulutangkis',
    code: 'BD',
    description: 'Beregu, tunggal, dan ganda'
  },
  tenis_meja: {
    name: 'Tenis Meja',
    code: 'TM',
    description: 'Kategori beregu dan perorangan'
  },
  voli_indoor: {
    name: 'Voli Indoor',
    code: 'VOLI',
    description: 'Tim putra dan putri'
  }
};

// ==========================================
// 2. REGISTRATION STATUS (ENUM)
// ==========================================
export type RegistrationStatus =
  | 'draft'
  | 'awaiting_payment'
  | 'awaiting_admin_validation'
  | 'revision_required'
  | 'verified'
  | 'rejected';

export const STATUS_LABELS: Record<RegistrationStatus, string> = {
  draft: 'Draft',
  awaiting_payment: 'Menunggu Pembayaran',
  awaiting_admin_validation: 'Menunggu Validasi Admin',
  revision_required: 'Revisi Diperlukan',
  verified: 'Terverifikasi',
  rejected: 'Ditolak'
};

export const STATUS_COLORS: Record<RegistrationStatus, string> = {
  draft: 'bg-gray-100 text-gray-700 border-gray-300',
  awaiting_payment: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  awaiting_admin_validation: 'bg-blue-100 text-blue-800 border-blue-300',
  revision_required: 'bg-orange-100 text-orange-800 border-orange-300',
  verified: 'bg-green-100 text-green-800 border-green-300',
  rejected: 'bg-red-100 text-red-800 border-red-300'
};

// ==========================================
// 3. DOCUMENT TYPES (WAJIB 6 ITEM)
// ==========================================
export type DocumentType =
  | 'dapodik_pd_dikti'
  | 'ktp_kia'
  | 'kartu_pelajar_ktm'
  | 'raport_khs'
  | 'pas_foto'
  | 'bukti_pembayaran';

export interface DocumentConfig {
  type: DocumentType;
  label: string;
  description: string;
  acceptedFormats: string;
  maxSize: string;
  required: boolean;
  requiredBeforeSubmit: boolean; // false only for bukti_pembayaran
}

export const REQUIRED_DOCUMENTS: DocumentConfig[] = [
  {
    type: 'dapodik_pd_dikti',
    label: 'Bukti Dapodik / PD-Dikti',
    description: 'Data Pokok Pendidikan atau Pangkalan Data Dikti',
    acceptedFormats: 'PDF, JPG, PNG',
    maxSize: '2MB',
    required: true,
    requiredBeforeSubmit: true
  },
  {
    type: 'ktp_kia',
    label: 'KTP / KIA',
    description: 'Kartu Tanda Penduduk atau Kartu Identitas Anak',
    acceptedFormats: 'PDF, JPG, PNG',
    maxSize: '2MB',
    required: true,
    requiredBeforeSubmit: true
  },
  {
    type: 'kartu_pelajar_ktm',
    label: 'Kartu Pelajar Muhammadiyah / KTM',
    description: 'Kartu Pelajar Muhammadiyah atau Kartu Tanda Mahasiswa',
    acceptedFormats: 'PDF, JPG, PNG',
    maxSize: '2MB',
    required: true,
    requiredBeforeSubmit: true
  },
  {
    type: 'raport_khs',
    label: 'Raport / KHS Terakhir',
    description: 'Raport terakhir atau Kartu Hasil Studi',
    acceptedFormats: 'PDF, JPG, PNG',
    maxSize: '2MB',
    required: true,
    requiredBeforeSubmit: true
  },
  {
    type: 'pas_foto',
    label: 'Pas Foto Terbaru',
    description: 'Pas foto terbaru ukuran 3x4',
    acceptedFormats: 'JPG, PNG',
    maxSize: '2MB',
    required: true,
    requiredBeforeSubmit: true
  },
  {
    type: 'bukti_pembayaran',
    label: 'Bukti Pembayaran',
    description: 'Bukti transfer pembayaran pendaftaran',
    acceptedFormats: 'PDF, JPG, PNG',
    maxSize: '2MB',
    required: true,
    requiredBeforeSubmit: false // Can submit without, status becomes awaiting_payment
  }
];

// ==========================================
// 4. PRICING RULES (WAJIB)
// ==========================================
export const PRICING = {
  fee_participant: 100000, // Rp 100.000 per participant
  fee_voli_team: 1200000,  // Rp 1.200.000 per volleyball team
  fee_official: 50000       // Rp 50.000 per official
} as const;

// ==========================================
// 5. BANK ACCOUNT INFO
// ==========================================
export const BANK_ACCOUNT = {
  bank: 'BSI',
  accountNumber: '4000444338',
  accountName: 'LPO PP Muhammadiyah'
} as const;

// ==========================================
// 6. EDUCATION LEVELS
// ==========================================
export type EducationLevel = 'SMP' | 'SMA' | 'MAHASISWA' | 'UMUM';

export const EDUCATION_LEVELS: { value: EducationLevel; label: string }[] = [
  { value: 'SMP', label: 'SMP/MTs' },
  { value: 'SMA', label: 'SMA/SMK/MA' },
  { value: 'MAHASISWA', label: 'Mahasiswa' },
  { value: 'UMUM', label: 'Umum' }
];

// ==========================================
// 7. GENDER
// ==========================================
export type Gender = 'M' | 'F';

export const GENDERS: { value: Gender; label: string }[] = [
  { value: 'M', label: 'Laki-laki' },
  { value: 'F', label: 'Perempuan' }
];

// ==========================================
// 8. DOCUMENT VALIDATION STATUS (ADMIN)
// ==========================================
export type DocumentValidationStatus = 
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'revision_required';

// ==========================================
// 9. PAYMENT VALIDATION STATUS (ADMIN)
// ==========================================
export type PaymentValidationStatus =
  | 'pending'
  | 'valid'
  | 'invalid';

// ==========================================
// 10. LOGO ASSETS PATHS
// ==========================================
export const LOGO_PATHS = {
  muhGames: '/assets/logo/logo-muh-games.png',
  muhammadiyah: '/assets/logo/logo-muhammadiyah.png',
  mascot: '/assets/logo/mascot.png',
  partners: Array.from({ length: 9 }, (_, i) => `/assets/logo/partner-${String(i + 1).padStart(2, '0')}.png`)
} as const;

// ==========================================
// 11. CONTACT INFO
// ==========================================
export const CONTACT_INFO = {
  email: 'contact@muhammadiyahgames2026.com',
  phone: '+62 812-3456-7890',
  whatsapp: '+62 812-3456-7890',
  address: 'Sekretariat Panitia Muhammadiyah Games 2026'
} as const;

// ==========================================
// 12. API BASE URL
// ==========================================
export const API_BASE_URL = '/api/v1';

// ==========================================
// 13. FILE UPLOAD CONSTRAINTS
// ==========================================
export const FILE_CONSTRAINTS = {
  maxSize: 2 * 1024 * 1024, // 2MB in bytes
  acceptedImageFormats: ['image/jpeg', 'image/png'],
  acceptedPdfFormats: ['application/pdf'],
  acceptedFormats: ['image/jpeg', 'image/png', 'application/pdf']
} as const;

// ==========================================
// 14. REGISTRATION NUMBER FORMAT
// ==========================================
export function generateRegistrationNumber(sportSlug: SportSlug, sequence: number): string {
  const sportCode = SPORTS[sportSlug].code;
  const sequenceStr = String(sequence).padStart(4, '0');
  return `MG2026-${sportCode}-${sequenceStr}`;
}

// Example: MG2026-PS-0043