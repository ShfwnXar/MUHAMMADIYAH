import React from 'react';
import { Trophy, Medal } from 'lucide-react';

interface MuGamesLogoProps {
  size?: 'sm' | 'md' | 'lg';
}

export function MuGamesLogo({ size = 'md' }: MuGamesLogoProps) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`${sizeClasses[size]} relative flex items-center justify-center bg-gradient-to-br from-[#1FA84A] to-[#0C2C4A] rounded-full shadow-lg`}>
        <Trophy className="w-2/3 h-2/3 text-white" strokeWidth={2} />
        <Medal className="absolute -bottom-1 -right-1 w-1/3 h-1/3 text-[#F6A500]" fill="#F6A500" />
      </div>
    </div>
  );
}
