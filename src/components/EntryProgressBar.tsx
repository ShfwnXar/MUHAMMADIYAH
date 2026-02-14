import React from 'react';
import { Card, CardContent } from './ui/card';

interface EntryProgressBarProps {
  uploaded: number;
  total: number;
}

export function EntryProgressBar({ uploaded, total }: EntryProgressBarProps) {
  const percentage = total > 0 ? (uploaded / total) * 100 : 0;
  
  const getStatusColor = () => {
    if (percentage === 0) return 'bg-red-500';
    if (percentage < 100) return 'bg-yellow-500';
    return 'bg-[#1FA84A]';
  };

  const getStatusText = () => {
    if (percentage === 0) return '🔴 Belum ada dokumen';
    if (percentage < 100) return '🟡 Sedang proses';
    return '🟢 Lengkap';
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-[#0C2C4A]">
          Progress: {uploaded}/{total} dokumen
        </span>
        <span className="text-sm font-semibold">{getStatusText()}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ${getStatusColor()}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
