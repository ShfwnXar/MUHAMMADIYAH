// API Service Layer for Muhammadiyah Games 2026
// Backend-ready structure with proper endpoints

import { 
  API_BASE_URL, 
  SportSlug, 
  EducationLevel, 
  Gender, 
  RegistrationStatus,
  DocumentType,
  DocumentValidationStatus,
  PaymentValidationStatus
} from './constants';

// ==========================================
// TYPE DEFINITIONS
// ==========================================

export interface Participant {
  full_name: string;
  gender: Gender;
  birth_date: string; // YYYY-MM-DD
  school_or_university: string;
  muhammadiyah_id?: string;
  category: string;
  event: string;
  weight_class?: string; // only for pencak silat
}

export interface Official {
  full_name: string;
  role: string;
  phone: string;
  email?: string;
}

export interface RegistrationPayload {
  sport: SportSlug;
  level: EducationLevel;
  team_name?: string;
  participant_count: number;
  official_count: number;
  participants: Participant[];
  officials: Official[];
  status: RegistrationStatus;
}

export interface Registration extends RegistrationPayload {
  id: string;
  registration_number: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  documents: Record<DocumentType, DocumentUploadInfo | null>;
  total_cost: number;
}

export interface DocumentUploadInfo {
  filename: string;
  url: string;
  uploaded_at: string;
  size: number;
  validation_status: DocumentValidationStatus;
  validation_note?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    full_name: string;
  };
}

// ==========================================
// API HELPER FUNCTIONS
// ==========================================

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('auth_token');
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
}

async function apiUpload<T>(
  endpoint: string,
  file: File
): Promise<T> {
  const token = localStorage.getItem('auth_token');
  
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      ...(token && { Authorization: `Bearer ${token}` })
    },
    body: formData
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Upload failed' }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
}

// ==========================================
// AUTH API
// ==========================================

export const authAPI = {
  // User login
  login: (credentials: LoginCredentials) =>
    apiRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    }),

  // User registration
  register: (data: { email: string; password: string; full_name: string; phone: string }) =>
    apiRequest<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data)
    })
};

// ==========================================
// ADMIN AUTH API
// ==========================================

export const adminAuthAPI = {
  login: (credentials: LoginCredentials) =>
    apiRequest<AuthResponse>('/admin/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    })
};

// ==========================================
// REGISTRATION API (USER)
// ==========================================

export const registrationAPI = {
  // Create new registration (draft)
  create: (data: Partial<RegistrationPayload>) =>
    apiRequest<Registration>('/registrations', {
      method: 'POST',
      body: JSON.stringify(data)
    }),

  // Get all user registrations
  list: () =>
    apiRequest<Registration[]>('/registrations'),

  // Get single registration detail
  get: (id: string) =>
    apiRequest<Registration>(`/registrations/${id}`),

  // Update draft registration
  update: (id: string, data: Partial<RegistrationPayload>) =>
    apiRequest<Registration>(`/registrations/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),

  // Submit registration (change status from draft)
  submit: (id: string) =>
    apiRequest<Registration>(`/registrations/${id}/submit`, {
      method: 'POST'
    }),

  // Get cost calculation
  getCost: (id: string) =>
    apiRequest<{ total: number; breakdown: any }>(`/registrations/${id}/cost`),

  // Upload document
  uploadDocument: (id: string, docType: DocumentType, file: File) =>
    apiUpload<{ url: string; filename: string }>(`/registrations/${id}/documents/${docType}`, file),

  // Delete document
  deleteDocument: (id: string, docType: DocumentType) =>
    apiRequest<{ success: boolean }>(`/registrations/${id}/documents/${docType}`, {
      method: 'DELETE'
    })
};

// ==========================================
// ADMIN REGISTRATION API
// ==========================================

export const adminRegistrationAPI = {
  // List all registrations with filters
  list: (params?: { status?: RegistrationStatus; sport?: SportSlug }) => {
    const query = new URLSearchParams();
    if (params?.status) query.append('status', params.status);
    if (params?.sport) query.append('sport', params.sport);
    
    const queryString = query.toString();
    return apiRequest<Registration[]>(`/admin/registrations${queryString ? `?${queryString}` : ''}`);
  },

  // Get registration detail
  get: (id: string) =>
    apiRequest<Registration>(`/admin/registrations/${id}`),

  // Update registration status
  updateStatus: (id: string, status: RegistrationStatus) =>
    apiRequest<Registration>(`/admin/registrations/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    }),

  // Validate document
  validateDocument: (
    id: string, 
    docType: DocumentType, 
    status: DocumentValidationStatus, 
    note?: string
  ) =>
    apiRequest<{ success: boolean }>(`/admin/registrations/${id}/documents/${docType}`, {
      method: 'PATCH',
      body: JSON.stringify({ status, note })
    }),

  // Validate payment
  validatePayment: (id: string, status: PaymentValidationStatus, note?: string) =>
    apiRequest<{ success: boolean }>(`/admin/registrations/${id}/payment`, {
      method: 'PATCH',
      body: JSON.stringify({ status, note })
    })
};

// ==========================================
// MOCK/DEMO MODE HELPERS
// ==========================================

// For development: simulate API delays
export function simulateAPIDelay(ms: number = 1000): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// For development: mock successful response
export async function mockAPISuccess<T>(data: T, delay: number = 1000): Promise<T> {
  await simulateAPIDelay(delay);
  return data;
}

// For development: mock error response
export async function mockAPIError(message: string, delay: number = 1000): Promise<never> {
  await simulateAPIDelay(delay);
  throw new Error(message);
}
