import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { LucideIcon, Lock } from 'lucide-react';

interface SportCardProps {
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  secondaryColor: string;
  onSelect: () => void;
  isLocked?: boolean;
  lockMessage?: string;
}

export function SportCard({ 
  name, 
  description, 
  icon: Icon, 
  color, 
  secondaryColor, 
  onSelect,
  isLocked = false,
  lockMessage = 'Selesaikan Tahap 1 untuk membuka'
}: SportCardProps) {
  return (
    <div className="relative">
      <Card className={`transition-all overflow-hidden ${
        isLocked 
          ? 'opacity-60 cursor-not-allowed' 
          : 'hover:shadow-lg cursor-pointer group'
      }`}>
        <div 
          className={`h-2 transition-all ${!isLocked && 'group-hover:h-3'}`}
          style={{ 
            background: `linear-gradient(90deg, ${color} 0%, ${secondaryColor} 100%)` 
          }}
        />
        <CardHeader>
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${color}15` }}
            >
              <Icon className="w-6 h-6" style={{ color }} />
            </div>
            <CardTitle>{name}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <CardDescription>{description}</CardDescription>
          <Button 
            onClick={isLocked ? undefined : onSelect}
            disabled={isLocked}
            className="w-full"
            style={!isLocked ? { 
              backgroundColor: color,
              color: 'white'
            } : {}}
          >
            {isLocked && <Lock className="w-4 h-4 mr-2" />}
            Daftar Cabang Ini
          </Button>
        </CardContent>
      </Card>

      {/* Lock Overlay */}
      {isLocked && (
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center pointer-events-none z-10">
          <div className="bg-white/90 backdrop-blur-md rounded-full p-4 mb-3 shadow-lg">
            <Lock className="w-8 h-8 text-[#F6A500]" />
          </div>
          <div className="text-center px-4">
            <p className="text-sm font-semibold text-slate-700">
              🔒 {lockMessage}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}