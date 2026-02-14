import React from 'react';
import logoEvent from 'figma:asset/3a4763e9b90ab98c116b468aeb4a4a574ae6c739.png';
import mascot from 'figma:asset/647311f35cffc2565035adb7ca5aa15103bfefa2.png';

interface EventHeaderProps {
  title: string;
  subtitle?: string;
  variant?: 'default' | 'stacked' | 'horizontal';
}

export function EventHeader({ title, subtitle = "Muhammadiyah Games 2026", variant = 'default' }: EventHeaderProps) {
  if (variant === 'horizontal') {
    return (
      <div className="text-center space-y-4">
        {/* Horizontal Layout - Logo and Mascot Side by Side */}
        <div className="flex items-center justify-center gap-4">
          {/* Main Event Logo */}
          <div className="flex-shrink-0">
            <img 
              src={logoEvent} 
              alt="Muhammadiyah Games 2026 Logo" 
              className="w-24 h-auto"
            />
          </div>

          {/* Mascot Badge */}
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#1FA84A]/20 via-[#1FA84A]/10 to-white border-2 border-[#1FA84A]/30 shadow-lg flex items-center justify-center p-2 relative overflow-hidden">
              {/* Gold accent corner */}
              <div className="absolute -top-1 -right-1 w-6 h-6">
                <div className="w-full h-full bg-[#F6A500] rounded-full opacity-60"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#F6A500] rounded-full"></div>
              </div>
              <img 
                src={mascot} 
                alt="Mascot" 
                className="w-16 h-auto relative z-10"
              />
            </div>
          </div>
        </div>

        {/* Title Block */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-[#0C2C4A]">
            {title}
          </h1>
          
          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#1FA84A]"></div>
            <div className="w-16 h-0.5 bg-gradient-to-r from-[#1FA84A] to-[#D92B2B]"></div>
            <div className="w-2 h-2 rounded-full bg-[#D92B2B]"></div>
          </div>

          <p className="text-gray-600 text-sm">
            {subtitle}
          </p>
        </div>
      </div>
    );
  }

  // Default/Stacked Layout - Logo on top, Mascot badge below slightly overlapping
  return (
    <div className="text-center space-y-6 relative">
      {/* Main Event Logo at Top */}
      <div className="flex justify-center">
        <img 
          src={logoEvent} 
          alt="Muhammadiyah Games 2026 Logo" 
          className="w-28 h-auto"
        />
      </div>

      {/* Mascot Badge - Overlapping Effect */}
      <div className="relative -mt-4 flex justify-center">
        <div className="relative inline-block">
          {/* Mascot Circle Badge */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#1FA84A]/20 via-[#1FA84A]/10 to-white border-3 border-white shadow-2xl flex items-center justify-center p-3 relative overflow-hidden">
            {/* Soft inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1FA84A]/30 to-transparent rounded-full"></div>
            
            {/* Gold accent corner shape inspired by sun rays */}
            <div className="absolute -top-2 -right-2 w-8 h-8">
              <div className="w-full h-full bg-gradient-to-br from-[#F6A500] to-[#F6A500]/60 rounded-full opacity-70 shadow-lg"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#F6A500] rounded-full"></div>
              {/* Small ray accents */}
              <div className="absolute top-0 right-2 w-1 h-3 bg-[#F6A500]/50 rounded-full transform rotate-45"></div>
              <div className="absolute top-2 right-0 w-3 h-1 bg-[#F6A500]/50 rounded-full transform rotate-45"></div>
            </div>

            {/* Mascot Image */}
            <img 
              src={mascot} 
              alt="Mascot" 
              className="w-20 h-auto relative z-10"
            />
          </div>
          
          {/* Elevation shadow effect */}
          <div className="absolute inset-0 -z-10 blur-xl opacity-30 bg-[#1FA84A] rounded-full scale-110"></div>
        </div>
      </div>

      {/* Title Block */}
      <div className="space-y-3 -mt-2">
        <h1 className="text-2xl font-bold text-[#0C2C4A]">
          {title}
        </h1>
        
        {/* Decorative Divider - Green dot, gradient line, Red dot */}
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#1FA84A] shadow-sm"></div>
          <div className="w-20 h-0.5 bg-gradient-to-r from-[#1FA84A] via-[#F6A500] to-[#D92B2B]"></div>
          <div className="w-2 h-2 rounded-full bg-[#D92B2B] shadow-sm"></div>
        </div>

        <p className="text-gray-600 text-sm">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
