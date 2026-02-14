// Registration Status Badge Component
// Uses official status enum with proper colors

import React from 'react';
import { Badge } from './ui/badge';
import { 
  RegistrationStatus, 
  STATUS_LABELS, 
  STATUS_COLORS 
} from '../utils/constants';
import {
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
  FileEdit,
  DollarSign
} from 'lucide-react';

interface RegistrationStatusBadgeProps {
  status: RegistrationStatus;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function RegistrationStatusBadge({ 
  status, 
  showIcon = true,
  size = 'md'
}: RegistrationStatusBadgeProps) {
  
  const getIcon = () => {
    const iconSize = size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';
    
    switch (status) {
      case 'draft':
        return <FileEdit className={iconSize} />;
      case 'awaiting_payment':
        return <DollarSign className={iconSize} />;
      case 'awaiting_admin_validation':
        return <Clock className={iconSize} />;
      case 'revision_required':
        return <AlertCircle className={iconSize} />;
      case 'verified':
        return <CheckCircle2 className={iconSize} />;
      case 'rejected':
        return <XCircle className={iconSize} />;
      default:
        return null;
    }
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5'
  };

  return (
    <Badge 
      className={`${STATUS_COLORS[status]} border ${sizeClasses[size]} inline-flex items-center gap-1.5`}
    >
      {showIcon && getIcon()}
      {STATUS_LABELS[status]}
    </Badge>
  );
}
