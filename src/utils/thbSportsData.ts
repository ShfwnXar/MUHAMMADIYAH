// Muhammadiyah Games 2026 - Technical Handbook (THB) Sport Categories
// Official competition categories and pricing with THB compliance

import { CategoryType } from './registrationStorage';

// Education Level (Jenjang Peserta)
export type EducationLevel = 'smp' | 'sma' | 'mahasiswa';

export interface EducationLevelOption {
  id: EducationLevel;
  label: string;
  description: string;
}

export const EDUCATION_LEVELS: EducationLevelOption[] = [
  {
    id: 'smp',
    label: 'SMP/MTs',
    description: 'Siswa Sekolah Menengah Pertama / Madrasah Tsanawiyah'
  },
  {
    id: 'sma',
    label: 'SMA/SMK/MA',
    description: 'Siswa Sekolah Menengah Atas / Kejuruan / Madrasah Aliyah'
  },
  {
    id: 'mahasiswa',
    label: 'Mahasiswa',
    description: 'Mahasiswa Perguruan Tinggi (D3/D4/S1/S2)'
  }
];

// Technical Parameters for specific sports
export interface TechnicalParameter {
  id: string;
  label: string;
  description: string;
  required: boolean;
  options: {
    id: string;
    label: string;
    description?: string;
  }[];
}

export interface SportCategory {
  id: string;
  name: string;
  categoryType: CategoryType;
  price: number;
  priceLabel: string;
  minParticipants?: number;
  maxParticipants?: number;
  description: string;
  // THB-specific fields
  requiresEducationLevel: boolean; // Always true for all categories
  technicalParameters?: TechnicalParameter[]; // Conditional based on sport
}

export interface Sport {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  categories: SportCategory[];
  // Sport-level technical parameters that apply to all categories
  globalTechnicalParameters?: TechnicalParameter[];
}

// THB-compliant sports data
export const THB_SPORTS: Sport[] = [
  {
    id: 'tapak-suci',
    name: 'Tapak Suci',
    icon: 'circle',
    color: 'from-[#1FA84A] to-[#D92B2B]',
    description: 'Seni Bela Diri Khas Muhammadiyah',
    categories: [
      {
        id: 'tapak-suci-tanding',
        name: 'Tanding Perorangan',
        categoryType: 'tunggal',
        price: 100000,
        priceLabel: 'Rp 100.000 per peserta',
        minParticipants: 1,
        maxParticipants: 1,
        description: 'Pertandingan perorangan',
        requiresEducationLevel: true,
        technicalParameters: [
          {
            id: 'kelas-tanding',
            label: 'Kelas Tanding',
            description: 'Kategori berat badan sesuai THB',
            required: true,
            options: [
              { id: 'ringan', label: 'Kelas Ringan', description: '< 55 kg' },
              { id: 'sedang', label: 'Kelas Sedang', description: '55-65 kg' },
              { id: 'berat', label: 'Kelas Berat', description: '> 65 kg' }
            ]
          }
        ]
      },
      {
        id: 'tapak-suci-seni-tunggal',
        name: 'Seni Tunggal',
        categoryType: 'tunggal',
        price: 100000,
        priceLabel: 'Rp 100.000 per peserta',
        minParticipants: 1,
        maxParticipants: 1,
        description: 'Peragaan seni tunggal',
        requiresEducationLevel: true
      },
      {
        id: 'tapak-suci-seni-ganda',
        name: 'Seni Ganda',
        categoryType: 'ganda',
        price: 200000,
        priceLabel: 'Rp 200.000 per pasangan',
        minParticipants: 2,
        maxParticipants: 2,
        description: 'Peragaan seni berpasangan (2 peserta)',
        requiresEducationLevel: true
      },
      {
        id: 'tapak-suci-beregu',
        name: 'Seni Beregu',
        categoryType: 'beregu',
        price: 500000,
        priceLabel: 'Rp 500.000 per tim',
        minParticipants: 3,
        maxParticipants: 5,
        description: 'Peragaan seni beregu (3-5 peserta)',
        requiresEducationLevel: true
      }
    ]
  },
  {
    id: 'atletik',
    name: 'Atletik',
    icon: 'target',
    color: 'from-[#D92B2B] to-[#0C2C4A]',
    description: 'Lari, Lompat, Lempar',
    categories: [
      {
        id: 'atletik-100m',
        name: 'Lari 100m',
        categoryType: 'tunggal',
        price: 100000,
        priceLabel: 'Rp 100.000 per peserta',
        minParticipants: 1,
        maxParticipants: 1,
        description: 'Lari cepat jarak 100 meter',
        requiresEducationLevel: true
      },
      {
        id: 'atletik-400m',
        name: 'Lari 400m',
        categoryType: 'tunggal',
        price: 100000,
        priceLabel: 'Rp 100.000 per peserta',
        minParticipants: 1,
        maxParticipants: 1,
        description: 'Lari jarak 400 meter',
        requiresEducationLevel: true
      },
      {
        id: 'atletik-800m',
        name: 'Lari 800m',
        categoryType: 'tunggal',
        price: 100000,
        priceLabel: 'Rp 100.000 per peserta',
        minParticipants: 1,
        maxParticipants: 1,
        description: 'Lari jarak menengah 800 meter',
        requiresEducationLevel: true
      },
      {
        id: 'atletik-lompat-jauh',
        name: 'Lompat Jauh',
        categoryType: 'tunggal',
        price: 100000,
        priceLabel: 'Rp 100.000 per peserta',
        minParticipants: 1,
        maxParticipants: 1,
        description: 'Lompat jauh',
        requiresEducationLevel: true
      },
      {
        id: 'atletik-tolak-peluru',
        name: 'Tolak Peluru',
        categoryType: 'tunggal',
        price: 100000,
        priceLabel: 'Rp 100.000 per peserta',
        minParticipants: 1,
        maxParticipants: 1,
        description: 'Tolak peluru',
        requiresEducationLevel: true
      }
    ]
  },
  {
    id: 'panahan',
    name: 'Panahan',
    icon: 'target',
    color: 'from-[#1FA84A] to-[#0C2C4A]',
    description: 'Standar Nasional & Barebow',
    globalTechnicalParameters: [
      {
        id: 'divisi-panahan',
        label: 'Divisi/Jenis Busur',
        description: 'Jenis peralatan panahan sesuai THB',
        required: true,
        options: [
          { id: 'recurve', label: 'Recurve', description: 'Busur recurve standar' },
          { id: 'compound', label: 'Compound', description: 'Busur compound dengan sight' },
          { id: 'barebow', label: 'Barebow', description: 'Busur tanpa sight/stabilizer' },
          { id: 'horsebow', label: 'Horsebow', description: 'Busur tradisional' }
        ]
      }
    ],
    categories: [
      {
        id: 'panahan-individu',
        name: 'Individu',
        categoryType: 'tunggal',
        price: 100000,
        priceLabel: 'Rp 100.000 per peserta',
        minParticipants: 1,
        maxParticipants: 1,
        description: 'Panahan individu (divisi dipilih saat pendaftaran)',
        requiresEducationLevel: true
      },
      {
        id: 'panahan-beregu',
        name: 'Beregu',
        categoryType: 'beregu',
        price: 300000,
        priceLabel: 'Rp 300.000 per tim',
        minParticipants: 3,
        maxParticipants: 3,
        description: 'Panahan beregu (3 peserta, divisi sama)',
        requiresEducationLevel: true
      }
    ]
  },
  {
    id: 'badminton',
    name: 'Bulutangkis',
    icon: 'user',
    color: 'from-[#1FA84A] to-[#F6A500]',
    description: 'Tunggal & Ganda',
    categories: [
      {
        id: 'badminton-tunggal-putra',
        name: 'Tunggal Putra',
        categoryType: 'tunggal',
        price: 100000,
        priceLabel: 'Rp 100.000 per peserta',
        minParticipants: 1,
        maxParticipants: 1,
        description: 'Bulutangkis tunggal putra',
        requiresEducationLevel: true
      },
      {
        id: 'badminton-tunggal-putri',
        name: 'Tunggal Putri',
        categoryType: 'tunggal',
        price: 100000,
        priceLabel: 'Rp 100.000 per peserta',
        minParticipants: 1,
        maxParticipants: 1,
        description: 'Bulutangkis tunggal putri',
        requiresEducationLevel: true
      },
      {
        id: 'badminton-ganda-putra',
        name: 'Ganda Putra',
        categoryType: 'ganda',
        price: 200000,
        priceLabel: 'Rp 200.000 per pasangan',
        minParticipants: 2,
        maxParticipants: 2,
        description: 'Bulutangkis ganda putra (2 peserta)',
        requiresEducationLevel: true
      },
      {
        id: 'badminton-ganda-putri',
        name: 'Ganda Putri',
        categoryType: 'ganda',
        price: 200000,
        priceLabel: 'Rp 200.000 per pasangan',
        minParticipants: 2,
        maxParticipants: 2,
        description: 'Bulutangkis ganda putri (2 peserta)',
        requiresEducationLevel: true
      },
      {
        id: 'badminton-ganda-campuran',
        name: 'Ganda Campuran',
        categoryType: 'ganda',
        price: 200000,
        priceLabel: 'Rp 200.000 per pasangan',
        minParticipants: 2,
        maxParticipants: 2,
        description: 'Bulutangkis ganda campuran (1 putra + 1 putri)',
        requiresEducationLevel: true
      }
    ]
  },
  {
    id: 'tenis-meja',
    name: 'Tenis Meja',
    icon: 'user',
    color: 'from-[#D92B2B] to-[#F6A500]',
    description: 'Tunggal & Ganda',
    globalTechnicalParameters: [
      {
        id: 'gaya-pegangan',
        label: 'Gaya Pegangan (Grip)',
        description: 'Gaya pegangan bet sesuai THB untuk pengelompokan',
        required: true,
        options: [
          { id: 'shakehand', label: 'Shakehand', description: 'Pegangan jabat tangan' },
          { id: 'penhold', label: 'Penhold', description: 'Pegangan pena' }
        ]
      }
    ],
    categories: [
      {
        id: 'tenis-meja-tunggal-putra',
        name: 'Tunggal Putra',
        categoryType: 'tunggal',
        price: 100000,
        priceLabel: 'Rp 100.000 per peserta',
        minParticipants: 1,
        maxParticipants: 1,
        description: 'Tenis meja tunggal putra',
        requiresEducationLevel: true
      },
      {
        id: 'tenis-meja-tunggal-putri',
        name: 'Tunggal Putri',
        categoryType: 'tunggal',
        price: 100000,
        priceLabel: 'Rp 100.000 per peserta',
        minParticipants: 1,
        maxParticipants: 1,
        description: 'Tenis meja tunggal putri',
        requiresEducationLevel: true
      },
      {
        id: 'tenis-meja-ganda-putra',
        name: 'Ganda Putra',
        categoryType: 'ganda',
        price: 200000,
        priceLabel: 'Rp 200.000 per pasangan',
        minParticipants: 2,
        maxParticipants: 2,
        description: 'Tenis meja ganda putra (2 peserta)',
        requiresEducationLevel: true
      },
      {
        id: 'tenis-meja-ganda-putri',
        name: 'Ganda Putri',
        categoryType: 'ganda',
        price: 200000,
        priceLabel: 'Rp 200.000 per pasangan',
        minParticipants: 2,
        maxParticipants: 2,
        description: 'Tenis meja ganda putri (2 peserta)',
        requiresEducationLevel: true
      },
      {
        id: 'tenis-meja-ganda-campuran',
        name: 'Ganda Campuran',
        categoryType: 'ganda',
        price: 200000,
        priceLabel: 'Rp 200.000 per pasangan',
        minParticipants: 2,
        maxParticipants: 2,
        description: 'Tenis meja ganda campuran (1 putra + 1 putri)',
        requiresEducationLevel: true
      }
    ]
  },
  {
    id: 'voli',
    name: 'Voli Indoor',
    icon: 'users',
    color: 'from-[#1FA84A] to-[#D92B2B]',
    description: 'Tim Putra & Putri',
    categories: [
      {
        id: 'voli-putra',
        name: 'Tim Putra',
        categoryType: 'beregu',
        price: 1200000,
        priceLabel: 'Rp 1.200.000 per tim',
        minParticipants: 6,
        maxParticipants: 12,
        description: 'Voli indoor tim putra (6-12 pemain)',
        requiresEducationLevel: true
      },
      {
        id: 'voli-putri',
        name: 'Tim Putri',
        categoryType: 'beregu',
        price: 1200000,
        priceLabel: 'Rp 1.200.000 per tim',
        minParticipants: 6,
        maxParticipants: 12,
        description: 'Voli indoor tim putri (6-12 pemain)',
        requiresEducationLevel: true
      }
    ]
  }
];

// Helper functions
export const getSportById = (sportId: string): Sport | undefined => {
  return THB_SPORTS.find(sport => sport.id === sportId);
};

export const getCategoryById = (categoryId: string): SportCategory | undefined => {
  for (const sport of THB_SPORTS) {
    const category = sport.categories.find(cat => cat.id === categoryId);
    if (category) return category;
  }
  return undefined;
};

export const getCategoryTypeLabel = (categoryType: CategoryType): string => {
  switch (categoryType) {
    case 'tunggal':
      return 'Perorangan/Tunggal';
    case 'ganda':
      return 'Ganda/Berpasangan';
    case 'beregu':
      return 'Beregu/Tim';
  }
};

export const getCategoryTypeBadgeColor = (categoryType: CategoryType): string => {
  switch (categoryType) {
    case 'tunggal':
      return 'border-blue-500 text-blue-700 bg-blue-50';
    case 'ganda':
      return 'border-purple-500 text-purple-700 bg-purple-50';
    case 'beregu':
      return 'border-green-500 text-green-700 bg-green-50';
  }
};

export const getEducationLevelLabel = (level: EducationLevel): string => {
  const found = EDUCATION_LEVELS.find(el => el.id === level);
  return found ? found.label : level;
};

// Get all technical parameters for a specific sport + category combination
export const getTechnicalParameters = (sportId: string, categoryId: string): TechnicalParameter[] => {
  const sport = getSportById(sportId);
  if (!sport) return [];

  const category = sport.categories.find(c => c.id === categoryId);
  if (!category) return [];

  const params: TechnicalParameter[] = [];

  // Add global sport-level parameters
  if (sport.globalTechnicalParameters) {
    params.push(...sport.globalTechnicalParameters);
  }

  // Add category-specific parameters
  if (category.technicalParameters) {
    params.push(...category.technicalParameters);
  }

  return params;
};
