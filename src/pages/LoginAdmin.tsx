import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { ShieldCheck, User, Lock, AlertTriangle, FileCheck2 } from 'lucide-react';

export default function LoginAdmin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock admin login
    console.log('Admin login attempt:', { username, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#0C2C4A] via-[#1FA84A] to-[#0C2C4A] relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#F6A500] rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D92B2B] rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-md rounded-full mb-4 border-2 border-white/20">
            <ShieldCheck className="w-10 h-10 text-white" strokeWidth={2} />
          </div>
          <h1 className="text-white text-3xl font-bold mb-2">
            Admin Panel
          </h1>
          <p className="text-white/80">
            Validasi Berkas Peserta
          </p>
        </div>

        {/* Warning Banner */}
        <div className="bg-[#D92B2B]/20 backdrop-blur-md border border-[#D92B2B]/30 rounded-lg p-3 mb-6">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-[#D92B2B] mt-0.5 flex-shrink-0" />
            <p className="text-white text-sm">
              <strong>Khusus Panitia:</strong> Hanya panitia resmi yang dapat mengakses halaman ini.
            </p>
          </div>
        </div>

        {/* Login Card */}
        <Card className="border-2 border-white/20 bg-white/95 backdrop-blur-sm shadow-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-[#0C2C4A] flex items-center gap-2">
              <FileCheck2 className="w-6 h-6 text-[#1FA84A]" />
              Login Admin
            </CardTitle>
            <CardDescription>
              Masukkan kredensial admin untuk melanjutkan
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Demo Credentials Info Box */}
            <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                Demo Admin Account
              </h4>
              <div className="text-sm text-blue-800 space-y-1">
                <p><strong>Username:</strong> admin_panitia</p>
                <p><strong>Password:</strong> Muhammadiyah2026!</p>
                <p className="mt-2 text-xs text-blue-600">
                  Note: Only official committee can access document validation panel
                </p>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-[#0C2C4A]">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="admin_username"
                    className="pl-10 border-gray-300"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#0C2C4A]">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 border-gray-300"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-[#D92B2B] hover:bg-[#D92B2B]/90 text-white"
                size="lg"
              >
                <ShieldCheck className="w-4 h-4 mr-2" />
                Login Admin
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer Info */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-[#1FA84A] rounded-full animate-pulse"></div>
            <p className="text-white text-xs">
              Muhammadiyah Games 2026 - Admin Portal
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}