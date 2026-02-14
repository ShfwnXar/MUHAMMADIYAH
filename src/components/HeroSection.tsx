// Hero Section Component for Muhammadiyah Games 2026
// Features mascot + official collaboration partners

import React from 'react';
import { LOGO_PATHS } from '../utils/constants';

export function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-[#0C2C4A] via-[#1FA84A] to-[#0C2C4A] py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#F6A500] rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Mascot */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-full max-w-md">
              {/* Soft Ground Shadow */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-2/3 h-6 bg-black/15 rounded-full blur-xl"></div>
              
              {/* Mascot Image */}
              <img 
                src={LOGO_PATHS.mascot} 
                alt="Mascot Muhammadiyah Games 2026"
                className="w-full h-auto object-contain relative z-10"
                style={{
                  filter: 'drop-shadow(0 15px 35px rgba(0, 0, 0, 0.3))'
                }}
                onError={(e) => {
                  // Fallback background if mascot not found
                  const target = e.currentTarget as HTMLImageElement;
                  target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%231FA84A" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="white" font-size="24"%3EMascot%3C/text%3E%3C/svg%3E';
                }}
              />
            </div>

            {/* Mascot Caption */}
            <p className="text-white text-center text-lg font-medium mt-6">
              Siap bertanding di ajang bergengsi Muhammadiyah Games 2026!
            </p>
          </div>

          {/* Right: Partners */}
          <div className="space-y-8">
            {/* Muhammadiyah Slot */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
              <h3 className="text-white text-lg font-bold mb-4">Diselenggarakan oleh</h3>
              <div className="flex items-center justify-center bg-white rounded-lg p-4">
                <img 
                  src={LOGO_PATHS.muhammadiyah} 
                  alt="Muhammadiyah"
                  className="h-16 w-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </div>

            {/* Partners Grid */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
              <h3 className="text-white text-lg font-bold mb-2 text-center">
                Official Collaboration & Strategic Partners
              </h3>
              <p className="text-white/80 text-sm mb-6 text-center">
                Supported by trusted institutions and strategic partners
              </p>

              {/* Adaptive Flex Wrap Grid - Auto adjusts for 1-9 logos */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                {LOGO_PATHS.partners.map((partnerPath, index) => (
                  <div 
                    key={index}
                    className="bg-white rounded-lg p-3 flex items-center justify-center w-24 h-24 hover:shadow-lg transition-shadow"
                  >
                    <img 
                      src={partnerPath} 
                      alt={`Partner ${index + 1}`}
                      className="w-full h-full object-contain opacity-70 hover:opacity-100 transition-opacity"
                      onError={(e) => {
                        // Show placeholder if partner logo not found
                        const target = e.currentTarget as HTMLImageElement;
                        target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23e5e7eb" width="100" height="100"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%236b7280" font-size="10"%3EPartner%3C/text%3E%3C/svg%3E';
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}