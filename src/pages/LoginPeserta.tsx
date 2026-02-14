import React, { useState } from 'react';
import { Link } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { Footer } from '../components/Footer';
import { Mail, Lock, Users, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function LoginPeserta() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Call API endpoint POST /api/v1/auth/login
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock success
      toast.success('Login berhasil!');
      // Navigate to dashboard (will be handled by actual API response)
      window.location.href = '/dashboard';
    } catch (error) {
      toast.error('Login gagal. Periksa kembali email dan password Anda.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header variant="public" />

      {/* Hero Section */}
      <HeroSection />

      {/* Login Form Section */}
      <section className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#0C2C4A] mb-2">
              Portal Peserta
            </h2>
            <p className="text-gray-600">
              Masuk untuk melanjutkan pendaftaran
            </p>
          </div>

          <Card className="border-2 shadow-xl">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-[#0C2C4A]">Masuk ke Akun</CardTitle>
              <CardDescription>
                Masukkan kredensial Anda untuk melanjutkan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email / Nomor Registrasi</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="text"
                      placeholder="email@example.com atau MG2026-PS-0001"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Link 
                    to="/forgot-password" 
                    className="text-sm text-[#1FA84A] hover:underline"
                  >
                    Lupa Password?
                  </Link>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-[#1FA84A] hover:bg-[#168f3d] text-white"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>Memproses...</>
                  ) : (
                    <>
                      <Users className="w-4 h-4 mr-2" />
                      Masuk
                    </>
                  )}
                </Button>

                <div className="text-center pt-4">
                  <p className="text-sm text-gray-600">
                    Belum punya akun?{' '}
                    <Link 
                      to="/register" 
                      className="text-[#1FA84A] font-medium hover:underline"
                    >
                      Daftar Sekarang
                    </Link>
                  </p>
                </div>
              </form>

              {/* Info Alert */}
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-blue-800">
                    Setelah login, lengkapi pendaftaran dan upload 6 dokumen wajib untuk verifikasi panitia.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center text-xs text-gray-500 mt-6">
            <p>Dengan masuk, Anda menyetujui syarat dan ketentuan</p>
            <p className="mt-1">Muhammadiyah Games 2026</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}