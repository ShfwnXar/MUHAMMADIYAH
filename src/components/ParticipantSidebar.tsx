import React, { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Home, FileText, ChevronDown, ChevronRight, BarChart3, LogOut, Lock } from 'lucide-react';

interface ParticipantSidebarProps {
  registrationProgress: {
    step1Complete: boolean;
    step2Complete: boolean;
    step3Complete: boolean;
  };
  onLogout?: () => void;
}

export function ParticipantSidebar({ registrationProgress, onLogout }: ParticipantSidebarProps) {
  const location = useLocation();
  const [isPendaftaranExpanded, setIsPendaftaranExpanded] = useState(true);

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    {
      label: 'Dashboard',
      icon: Home,
      path: '/dashboard',
      isExpandable: false
    },
    {
      label: 'Pendaftaran',
      icon: FileText,
      path: '/registration',
      isExpandable: true,
      subItems: [
        {
          label: 'Step 1: Pilih Cabang & Kategori',
          path: '/registration/step-1',
          isLocked: false
        },
        {
          label: 'Step 2: Data Peserta',
          path: '/registration/step-2',
          isLocked: !registrationProgress.step1Complete
        },
        {
          label: 'Step 3: Pembayaran & Upload Berkas',
          path: '/registration/step-3',
          isLocked: !registrationProgress.step2Complete
        }
      ]
    },
    {
      label: 'Tracking Status',
      icon: BarChart3,
      path: '/tracking',
      isExpandable: false
    }
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">
      {/* Logo Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="font-bold text-[#0C2C4A] text-lg">Muhammadiyah Games</h2>
        <p className="text-sm text-gray-500">Portal Peserta</p>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => (
          <div key={item.label}>
            {item.isExpandable ? (
              <div>
                <button
                  onClick={() => setIsPendaftaranExpanded(!isPendaftaranExpanded)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors"
                >
                  <item.icon className="w-5 h-5" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {isPendaftaranExpanded ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>

                {/* Sub-items */}
                {isPendaftaranExpanded && item.subItems && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.subItems.map((subItem) => (
                      <div key={subItem.path} className="relative group">
                        {subItem.isLocked ? (
                          <>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-400 cursor-not-allowed">
                              <Lock className="w-4 h-4" />
                              <span className="text-sm">{subItem.label}</span>
                            </div>
                            {/* Tooltip */}
                            <div className="absolute left-full ml-2 top-0 hidden group-hover:block z-10">
                              <div className="bg-gray-800 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg">
                                Selesaikan tahap sebelumnya terlebih dahulu
                                <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <Link
                            to={subItem.path}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${
                              isActive(subItem.path)
                                ? 'bg-[#1FA84A] text-white'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            {subItem.label}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-[#1FA84A] text-white'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            )}
          </div>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}