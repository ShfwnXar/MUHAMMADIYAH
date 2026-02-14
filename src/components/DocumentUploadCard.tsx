import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { Button } from './ui/button';

interface DocumentUploadCardProps {
  documentName: string;
  documentLabel: string;
  file: File | null;
  uploaded: boolean;
  onUpload: (file: File) => void;
  onRemove: () => void;
  acceptedFormats?: string;
  maxSize?: string;
}

export function DocumentUploadCard({
  documentName,
  documentLabel,
  file,
  uploaded,
  onUpload,
  onRemove,
  acceptedFormats = 'JPG, PNG, PDF',
  maxSize = '2MB'
}: DocumentUploadCardProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      onUpload(droppedFile);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      onUpload(selectedFile);
    }
  };

  return (
    <div
      className={`relative border-2 rounded-lg transition-all ${
        uploaded
          ? 'border-[#1FA84A] bg-green-50'
          : isDragging
          ? 'border-[#1FA84A] bg-green-50/50'
          : 'border-gray-300 bg-white hover:border-gray-400'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            {uploaded ? (
              <CheckCircle2 className="w-5 h-5 text-[#1FA84A] flex-shrink-0" />
            ) : (
              <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex-shrink-0" />
            )}
            <div>
              <h4 className="font-semibold text-[#0C2C4A] text-sm">{documentLabel}</h4>
              <p className="text-xs text-gray-500">{acceptedFormats} • Max {maxSize}</p>
            </div>
          </div>
          {uploaded && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onRemove}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Upload Area */}
        {!uploaded ? (
          <div className="space-y-3">
            <label
              className={`flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                isDragging
                  ? 'border-[#1FA84A] bg-[#1FA84A]/5'
                  : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
              }`}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className={`w-6 h-6 mb-2 ${isDragging ? 'text-[#1FA84A]' : 'text-gray-400'}`} />
                <p className="text-xs text-gray-500">
                  <span className="font-semibold">Klik untuk upload</span> atau drag & drop
                </p>
              </div>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
          </div>
        ) : (
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-green-200">
            <FileText className="w-8 h-8 text-[#1FA84A] flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#0C2C4A] truncate">{file?.name}</p>
              <p className="text-xs text-gray-500">
                {file ? (file.size / 1024).toFixed(0) + ' KB' : ''}
              </p>
            </div>
            <CheckCircle2 className="w-5 h-5 text-[#1FA84A] flex-shrink-0" />
          </div>
        )}
      </div>
    </div>
  );
}
