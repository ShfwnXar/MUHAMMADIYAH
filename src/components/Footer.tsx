// Professional Footer Component for Muhammadiyah Games 2026
// Contains partner logos, contact info, and copyright
// NO BANK ACCOUNT INFO (per requirements)

import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { LOGO_PATHS, CONTACT_INFO } from '../utils/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0C2C4A] text-white mt-auto">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Column 1: About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={LOGO_PATHS.muhGames} 
                alt="MUH Games"
                className="h-8 w-auto"
                onError={(e) => e.currentTarget.style.display = 'none'}
              />
              <img 
                src={LOGO_PATHS.muhammadiyah} 
                alt="Muhammadiyah"
                className="h-8 w-auto"
                onError={(e) => e.currentTarget.style.display = 'none'}
              />
            </div>
            <h3 className="font-bold text-lg mb-2">Muhammadiyah Games 2026</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Kompetisi olahraga tingkat nasional yang diselenggarakan oleh Muhammadiyah untuk meningkatkan prestasi atlet muda Indonesia.
            </p>
          </div>

          {/* Column 2: Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Kontak Panitia</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#F6A500]" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-[#F6A500] transition-colors">
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#F6A500]" />
                <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-[#F6A500] transition-colors">
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#F6A500]" />
                <span className="text-white/80">{CONTACT_INFO.address}</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Official Partners */}
          <div>
            <h3 className="font-bold text-lg mb-4">Official Partners</h3>
            {/* Adaptive Flex Wrap - Auto adjusts for 1-9 logos */}
            <div className="flex flex-wrap items-center justify-start gap-2">
              {LOGO_PATHS.partners.slice(0, 6).map((partnerPath, index) => (
                <div 
                  key={index}
                  className="bg-white rounded p-2 flex items-center justify-center w-16 h-16"
                >
                  <img 
                    src={partnerPath} 
                    alt={`Partner ${index + 1}`}
                    className="w-full h-full object-contain opacity-60"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="50" height="50"%3E%3Crect fill="%23e5e7eb" width="50" height="50"/%3E%3C/svg%3E';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/70 text-center md:text-left">
              © {currentYear} Muhammadiyah Games 2026. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-white/70">
              <a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a>
              <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
              <a href="#" className="hover:text-white transition-colors">FAQ</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}