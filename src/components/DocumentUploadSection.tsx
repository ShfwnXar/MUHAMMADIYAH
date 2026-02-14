// Document Upload Component for 6 Mandatory Documents
// Backend-ready with validation and preview

import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2, X, Eye, Download, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { REQUIRED_DOCUMENTS, DocumentType, FILE_CONSTRAINTS } from '../utils/constants';

interface UploadedFile {
  file: File;
  url: string;
  uploadedAt: Date;
  validationStatus?: 'pending' | 'approved' | 'rejected' | 'revision_required';
  validationNote?: string;
}

interface DocumentUploadSectionProps {
  documents: Record<DocumentType, UploadedFile | null>;
  onUpload: (docType: DocumentType, file: File) => Promise<void>;
  onRemove: (docType: DocumentType) => void;
  isUploading?: DocumentType | null;
  readOnly?: boolean;
}

export function DocumentUploadSection({
  documents,
  onUpload,
  onRemove,
  isUploading,
  readOnly = false
}: DocumentUploadSectionProps) {
  const [uploadProgress, setUploadProgress] = useState<Record<DocumentType, number>>({} as any);

  const handleFileSelect = async (docType: DocumentType, file: File) => {
    // Validate file size
    if (file.size > FILE_CONSTRAINTS.maxSize) {
      alert(`Ukuran file terlalu besar. Maksimal ${FILE_CONSTRAINTS.maxSize / 1024 / 1024}MB`);
      return;
    }

    // Validate file type
    const docConfig = REQUIRED_DOCUMENTS.find(d => d.type === docType);
    if (docConfig?.type === 'pas_foto') {
      if (!FILE_CONSTRAINTS.acceptedImageFormats.includes(file.type)) {
        alert('Format file harus JPG atau PNG untuk pas foto');
        return;
      }
    } else {
      if (!FILE_CONSTRAINTS.acceptedFormats.includes(file.type)) {
        alert('Format file harus PDF, JPG, atau PNG');
        return;
      }
    }

    // Simulate upload progress (in real app, track actual upload)
    setUploadProgress(prev => ({ ...prev, [docType]: 0 }));
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const current = prev[docType] || 0;
        if (current >= 100) {
          clearInterval(interval);
          return prev;
        }
        return { ...prev, [docType]: current + 10 };
      });
    }, 100);

    try {
      await onUpload(docType, file);
    } finally {
      clearInterval(interval);
      setUploadProgress(prev => ({ ...prev, [docType]: 100 }));
      setTimeout(() => {
        setUploadProgress(prev => {
          const newProgress = { ...prev };
          delete newProgress[docType];
          return newProgress;
        });
      }, 500);
    }
  };

  const getValidationBadge = (status?: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-600 text-white">Diterima</Badge>;
      case 'rejected':
        return <Badge className="bg-red-600 text-white">Ditolak</Badge>;
      case 'revision_required':
        return <Badge className="bg-orange-600 text-white">Perlu Revisi</Badge>;
      default:
        return <Badge className="bg-blue-600 text-white">Pending Validasi</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-[#0C2C4A] mb-1">Dokumen Wajib (6 Item)</h4>
            <p className="text-sm text-gray-700">
              Upload semua dokumen yang diperlukan. Format: PDF/JPG/PNG, Max 2MB per file.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {REQUIRED_DOCUMENTS.map((docConfig) => {
          const uploadedDoc = documents[docConfig.type];
          const isCurrentlyUploading = isUploading === docConfig.type;
          const progress = uploadProgress[docConfig.type];

          return (
            <div
              key={docConfig.type}
              className={`border-2 rounded-lg transition-all ${
                uploadedDoc
                  ? uploadedDoc.validationStatus === 'approved'
                    ? 'border-green-500 bg-green-50'
                    : uploadedDoc.validationStatus === 'rejected'
                    ? 'border-red-500 bg-red-50'
                    : uploadedDoc.validationStatus === 'revision_required'
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 bg-white hover:border-gray-400'
              }`}
            >
              <div className="p-4">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {uploadedDoc ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex-shrink-0" />
                      )}
                      <h4 className="font-semibold text-[#0C2C4A] text-sm">{docConfig.label}</h4>
                    </div>
                    <p className="text-xs text-gray-500 ml-7">{docConfig.acceptedFormats} • Max {docConfig.maxSize}</p>
                    {docConfig.description && (
                      <p className="text-xs text-gray-600 ml-7 mt-1">{docConfig.description}</p>
                    )}
                  </div>
                  {uploadedDoc && !readOnly && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemove(docConfig.type)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-100 h-8 w-8 p-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                {/* Upload Area or File Info */}
                {!uploadedDoc && !isCurrentlyUploading ? (
                  <label
                    className={`flex flex-col items-center justify-center w-full h-28 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                      readOnly
                        ? 'border-gray-200 bg-gray-50 cursor-not-allowed'
                        : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex flex-col items-center justify-center py-4">
                      <Upload className="w-6 h-6 mb-2 text-gray-400" />
                      <p className="text-xs text-gray-500 text-center px-2">
                        {readOnly ? (
                          <span>Upload disabled</span>
                        ) : (
                          <>
                            <span className="font-semibold">Klik untuk upload</span> atau drag & drop
                          </>
                        )}
                      </p>
                    </div>
                    {!readOnly && (
                      <input
                        type="file"
                        accept={docConfig.type === 'pas_foto' ? 'image/jpeg,image/png' : 'image/*,.pdf'}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileSelect(docConfig.type, file);
                          e.target.value = ''; // Reset input
                        }}
                        className="hidden"
                      />
                    )}
                  </label>
                ) : isCurrentlyUploading ? (
                  <div className="space-y-2 p-4 bg-white rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-600">Uploading...</p>
                    <Progress value={progress || 0} className="h-2" />
                    <p className="text-xs text-gray-500">{progress || 0}%</p>
                  </div>
                ) : uploadedDoc ? (
                  <div className="space-y-3">
                    {/* File Preview */}
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                      {uploadedDoc.file.type.startsWith('image/') ? (
                        <img
                          src={uploadedDoc.url}
                          alt={docConfig.label}
                          className="w-12 h-12 object-cover rounded flex-shrink-0"
                        />
                      ) : (
                        <FileText className="w-12 h-12 text-red-600 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#0C2C4A] truncate">{uploadedDoc.file.name}</p>
                        <p className="text-xs text-gray-500">
                          {(uploadedDoc.file.size / 1024).toFixed(0)} KB
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(uploadedDoc.url, '_blank')}
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Validation Status */}
                    {uploadedDoc.validationStatus && (
                      <div className="space-y-2">
                        {getValidationBadge(uploadedDoc.validationStatus)}
                        {uploadedDoc.validationNote && (
                          <div className="bg-white rounded p-2 border border-gray-200">
                            <p className="text-xs text-gray-600 font-semibold mb-1">Catatan Admin:</p>
                            <p className="text-xs text-gray-700">{uploadedDoc.validationNote}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-[#0C2C4A]">
              Dokumen Terupload: {Object.values(documents).filter(d => d !== null).length} / {REQUIRED_DOCUMENTS.length}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              {Object.values(documents).filter(d => d !== null).length === REQUIRED_DOCUMENTS.length
                ? '✓ Semua dokumen sudah diupload'
                : `${REQUIRED_DOCUMENTS.length - Object.values(documents).filter(d => d !== null).length} dokumen belum diupload`}
            </p>
          </div>
          <div className="text-right">
            <Progress 
              value={(Object.values(documents).filter(d => d !== null).length / REQUIRED_DOCUMENTS.length) * 100} 
              className="w-32 h-2 mb-1"
            />
            <p className="text-xs text-gray-600">
              {Math.round((Object.values(documents).filter(d => d !== null).length / REQUIRED_DOCUMENTS.length) * 100)}% Complete
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
