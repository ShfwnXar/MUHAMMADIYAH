import React from 'react';
import { Link, useLocation } from 'react-router';
import { Home, FileCheck2, CheckCircle, XCircle, Trophy, Settings, LogOut, Download } from 'lucide-react';

interface AdminSidebarProps {
  onLogout?: () => void;
}

export function AdminSidebar({ onLogout }: AdminSidebarProps) {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    {
      label: 'Dashboard',
      icon: Home,
      path: '/admin/dashboard'
    },
    {
      label: 'Validasi Berkas Peserta',
      icon: FileCheck2,
      path: '/admin/validation'
    },
    {
      label: 'Approved Participants',
      icon: CheckCircle,
      path: '/admin/approved'
    },
    {
      label: 'Rejected Documents',
      icon: XCircle,
      path: '/admin/rejected'
    },
    {
      label: 'Unduh Data Peserta',
      icon: Download,
      path: '/admin/download-data'
    },
    {
      label: 'Hasil Lomba',
      icon: Trophy,
      path: '/admin/competition-results'
    },
    {
      label: 'Pengaturan Tahapan',
      icon: Settings,
      path: '/admin/stage-settings'
    }
  ];

  return (
    <div className="w-64 bg-[#0C2C4A] text-white min-h-screen flex flex-col">
      {/* Logo Header */}
      <div className="p-6 border-b border-white/10">
        <h2 className="font-bold text-white text-lg">Admin Panel</h2>
        <p className="text-sm text-white/60">Muhammadiyah Games 2026</p>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive(item.path)
                ? 'bg-[#1FA84A] text-white'
                : 'text-white/80 hover:bg-white/10'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}