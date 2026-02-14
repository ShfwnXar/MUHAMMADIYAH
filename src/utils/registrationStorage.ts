// Utility functions for managing registration progress in localStorage
// Supports MULTIPLE SPORT SELECTION and MULTIPLE ENTRIES per category

export type CategoryType = 'tunggal' | 'ganda' | 'beregu';

export interface Participant {
  id: string;
  nama: string;
  nik: string;
  tanggalLahir: string;
  jenisKelamin: string;
  alamat?: string;
  kota?: string;
  provinsi?: string;
  nomorTelepon: string;
  email: string;
  namaSekolah: string;
  jenisSekolah?: string;
  documents?: {
    ktp?: boolean;
    pasFoto?: boolean;
    suratKeterangan?: boolean;
    suratSehat?: boolean;
  };
}

export interface TeamMember {
  nama: string;
  nik: string;
  tanggalLahir: string;
  posisi: string;
}

export interface Team {
  id: string;
  namaTim: string;
  kategori: string;
  namaManager: string;
  kontakManager: string;
  namaSekolah: string;
  jenisSekolah?: string;
  members: TeamMember[];
  documents?: {
    ktp?: boolean;
    pasFoto?: boolean;
    suratKeterangan?: boolean;
    suratSehat?: boolean;
  };
}

// NEW: Registration Entry (Entri Pendaftaran)
// Represents ONE competitive unit per category
export interface RegistrationEntry {
  id: string; // Unique entry ID
  entryNumber: number; // Display number (Entri #1, #2, etc)
  
  // For tunggal: 1 participant
  // For ganda: 2 participants (paired)
  // For beregu: empty (uses team instead)
  participants: Participant[];
  
  // For beregu only
  team?: Team;
}

// Category Entry: All entries for one sport+category combination
export interface CategoryEntry {
  sportId: string;
  sportName: string;
  categoryId: string;
  categoryName: string;
  categoryType: CategoryType;
  pricePerEntry: number; // Price per entry (not per participant)
  entries: RegistrationEntry[]; // Multiple entries allowed
}

export interface RegistrationProgress {
  step1Complete: boolean;
  step2Complete: boolean;
  step3Complete: boolean;
  
  // Step 1: Selected sports cart WITH CATEGORIES
  step1Data?: {
    selectedSports: Array<{
      sportId: string;
      sportName: string;
      sportIcon: string;
      sportColor: string;
      categoryId: string;
      categoryName: string;
      categoryType: CategoryType;
      price: number;
      priceLabel: string;
      minParticipants?: number;
      maxParticipants?: number;
    }>;
    selectedAt?: string;
  };
  
  // Step 2: MULTIPLE ENTRIES per category
  step2Data?: {
    categoryEntries: CategoryEntry[];
    totalEntries: number;
  };
  
  // Step 3: Payment summary + Documents per entry
  step3Data?: {
    breakdown: Array<{
      sportName: string;
      categoryName: string;
      numberOfEntries: number;
      pricePerEntry: number;
      subtotal: number;
    }>;
    grandTotal: number;
    entryDocuments?: Record<string, boolean>; // entryId -> all docs uploaded
    paymentProofUploaded?: boolean;
    uploadTimestamp?: string;
    paymentStatus?: 'belum' | 'menunggu' | 'lunas';
    confirmedAt?: string;
  };
}

const STORAGE_KEY = 'muhammadiyah_games_registration';

export const getRegistrationProgress = (): RegistrationProgress => {
  if (typeof window === 'undefined') {
    return {
      step1Complete: false,
      step2Complete: false,
      step3Complete: false
    };
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error reading registration progress:', error);
  }

  return {
    step1Complete: false,
    step2Complete: false,
    step3Complete: false
  };
};

export const updateRegistrationProgress = (updates: Partial<RegistrationProgress>): void => {
  if (typeof window === 'undefined') return;

  try {
    const current = getRegistrationProgress();
    const updated = { ...current, ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error updating registration progress:', error);
  }
};

export const completeStep1 = (selectedSports: any[]): void => {
  updateRegistrationProgress({
    step1Complete: true,
    step1Data: {
      selectedSports: selectedSports,
      selectedAt: new Date().toISOString()
    }
  });
};

export const completeStep2 = (categoryEntries: CategoryEntry[]): void => {
  const totalEntries = categoryEntries.reduce((sum, entry) => 
    sum + entry.entries.length, 0
  );

  updateRegistrationProgress({
    step2Complete: true,
    step2Data: {
      categoryEntries,
      totalEntries
    }
  });
};

export const completeStep3 = (breakdown: any[], grandTotal: number): void => {
  updateRegistrationProgress({
    step3Complete: true,
    step3Data: {
      breakdown,
      grandTotal,
      confirmedAt: new Date().toISOString()
    }
  });
};

export const updateStep3Documents = (data: any): void => {
  const current = getRegistrationProgress();
  updateRegistrationProgress({
    step3Complete: true,
    step3Data: {
      ...current.step3Data,
      ...data
    }
  });
};

export const resetRegistrationProgress = (): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error resetting registration progress:', error);
  }
};

// Helper function to calculate total cost
export const calculateTotalCost = (categoryEntries: CategoryEntry[]): number => {
  return categoryEntries.reduce((total, entry) => {
    const entryCost = entry.entries.length * entry.pricePerEntry;
    return total + entryCost;
  }, 0);
};

// Helper function to generate unique IDs
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};