import React from 'react';
import { Badge } from './ui/badge';

type BadgeStatus = 'pending' | 'uploaded' | 'verified' | 'rejected';

interface StatusBadgeProps {
  status: BadgeStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const badgeConfig = {
    pending: { 
      label: 'Menunggu', 
      className: 'bg-[#F6A500] text-white hover:bg-[#F6A500]/90' 
    },
    uploaded: { 
      label: 'Diunggah', 
      className: 'bg-blue-500 text-white hover:bg-blue-600' 
    },
    verified: { 
      label: 'Terverifikasi', 
      className: 'bg-[#1FA84A] text-white hover:bg-[#1FA84A]/90' 
    },
    rejected: { 
      label: 'Ditolak', 
      className: 'bg-[#D92B2B] text-white hover:bg-[#D92B2B]/90' 
    }
  };

  const config = badgeConfig[status];

  return (
    <Badge className={config.className}>
      {config.label}
    </Badge>
  );
}
