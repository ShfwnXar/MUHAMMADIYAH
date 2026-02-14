import React from 'react';
import { DocumentUploadCard } from './DocumentUploadCard';
import { REQUIRED_DOCUMENTS, DocumentType } from '../utils/constants';

interface DocumentUpload {
  file: File | null;
  uploaded: boolean;
  url?: string;
}

interface ParticipantDocumentUploadProps {
  participantName: string;
  participantId: string;
  documents: Record<DocumentType, DocumentUpload>;
  onUpload: (docType: DocumentType, file: File) => void;
  onRemove: (docType: DocumentType) => void;
}

export function ParticipantDocumentUpload({
  participantName,
  participantId,
  documents,
  onUpload,
  onRemove
}: ParticipantDocumentUploadProps) {
  return (
    <div className="mb-6 last:mb-0">
      <div className="bg-gradient-to-r from-[#1FA84A]/10 to-[#1FA84A]/5 p-3 rounded-t-lg border-2 border-b-0 border-gray-200">
        <h4 className="font-bold text-[#0C2C4A]">
          {participantName}
        </h4>
        <p className="text-sm text-gray-600">
          {REQUIRED_DOCUMENTS.length} Dokumen Wajib
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 border-2 border-t-0 border-gray-200 rounded-b-lg">
        {REQUIRED_DOCUMENTS.map((docConfig) => {
          const doc = documents[docConfig.type];
          return (
            <DocumentUploadCard
              key={docConfig.type}
              documentName={docConfig.type}
              documentLabel={docConfig.label}
              file={doc?.file || null}
              uploaded={doc?.uploaded || false}
              onUpload={(file) => onUpload(docConfig.type, file)}
              onRemove={() => onRemove(docConfig.type)}
              acceptedFormats={docConfig.acceptedFormats}
              maxSize={docConfig.maxSize}
            />
          );
        })}
      </div>
    </div>
  );
}
