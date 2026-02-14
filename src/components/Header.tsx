// Official Header Component for Muhammadiyah Games 2026
// Contains official logos (MUH Games + Muhammadiyah)

import React from 'react';
import { Link } from 'react-router';
import { LOGO_PATHS } from '../utils/constants';

interface HeaderProps {
  variant?: 'participant' | 'admin' | 'public';
  showNavigation?: boolean;
}

export function Header({ variant = 'public', showNavigation = false }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logos */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3">
              {/* MUH Games Logo */}
              <img 
                src={LOGO_PATHS.muhGames} 
                alt="Muhammadiyah Games 2026"
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  // Fallback if image not found
                  e.currentTarget.style.display = 'none';
                }}
              />
              
              {/* Muhammadiyah Logo */}
              <img 
                src={LOGO_PATHS.muhammadiyah} 
                alt="Muhammadiyah"
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  // Fallback if image not found
                  e.currentTarget.style.display = 'none';
                }}
              />
            </Link>

            {/* Title (mobile hidden) */}
            <div className="hidden md:block border-l border-gray-300 pl-4">
              <h1 className="text-sm font-bold text-[#0C2C4A]">
                Muhammadiyah Games 2026
              </h1>
              <p className="text-xs text-gray-600">
                {variant === 'admin' ? 'Admin Panel' : 'Portal Pendaftaran'}
              </p>
            </div>
          </div>

          {/* Right: Navigation (if enabled) */}
          {showNavigation && (
            <nav className="hidden md:flex items-center gap-6">
              <Link 
                to="/dashboard" 
                className="text-sm text-gray-700 hover:text-[#1FA84A] font-medium transition-colors"
              >
                Dashboard
              </Link>
              <Link 
                to="/tracking" 
                className="text-sm text-gray-700 hover:text-[#1FA84A] font-medium transition-colors"
              >
                Tracking Status
              </Link>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
