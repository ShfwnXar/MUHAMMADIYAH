import React, { useState } from 'react';
import { Link } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { MuGamesLogo } from '../components/MuGamesLogo';
import { User, Mail, Lock, Phone, MapPin, Building2, CheckCircle2, Trophy } from 'lucide-react';

export default function Register() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    institution: '',
    address: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      // Mock registration
      console.log('Registration:', formData);
      setStep(3);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-[540px] space-y-6">
        {/* Header - Centered */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Trophy className="w-10 h-10 text-[#F6A500]" strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[#0C2C4A]">
              Daftar Akun Baru
            </h1>
            <p className="text-gray-600 text-sm mt-2">
              Muhammadiyah Games 2026
            </p>
          </div>
        </div>

        {/* Progress Steps - Centered */}
        {step < 3 && (
          <div className="flex items-center justify-center gap-2">
            <div className={`w-3 h-3 rounded-full ${step >= 1 ? 'bg-[#1FA84A]' : 'bg-gray-300'}`}></div>
            <div className={`w-24 h-1 ${step >= 2 ? 'bg-[#1FA84A]' : 'bg-gray-300'}`}></div>
            <div className={`w-3 h-3 rounded-full ${step >= 2 ? 'bg-[#1FA84A]' : 'bg-gray-300'}`}></div>
          </div>
        )}

        {/* Step 1: Personal Info */}
        {step === 1 && (
          <Card className="border-2 shadow-xl">
            <CardHeader>
              <CardTitle className="text-[#0C2C4A]">Informasi Pribadi</CardTitle>
              <CardDescription>
                Langkah 1 dari 2 - Data diri peserta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nama Lengkap</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="fullName"
                      name="fullName"
                      placeholder="Nama sesuai KTP/Kartu Pelajar"
                      className="pl-10"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="email@example.com"
                        className="pl-10"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">No. Handphone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="08123456789"
                        className="pl-10"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="institution">Asal Sekolah/Universitas/Instansi</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="institution"
                      name="institution"
                      placeholder="Nama institusi"
                      className="pl-10"
                      value={formData.institution}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Alamat Lengkap</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="address"
                      name="address"
                      placeholder="Jalan, Kota, Provinsi"
                      className="pl-10"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-[#1FA84A] hover:bg-[#1FA84A]/90 text-white"
                >
                  Lanjutkan
                </Button>

                <div className="text-center pt-2">
                  <Link 
                    to="/login" 
                    className="text-sm text-gray-600 hover:text-[#1FA84A]"
                  >
                    Sudah punya akun? Masuk di sini
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Password */}
        {step === 2 && (
          <Card className="border-2 shadow-xl">
            <CardHeader>
              <CardTitle className="text-[#0C2C4A]">Buat Password</CardTitle>
              <CardDescription>
                Langkah 2 dari 2 - Keamanan akun
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Minimal 8 karakter"
                      className="pl-10"
                      value={formData.password}
                      onChange={handleChange}
                      minLength={8}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Masukkan ulang password"
                      className="pl-10"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      minLength={8}
                      required
                    />
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
                  <p className="text-blue-800">
                    <strong>Tips keamanan:</strong> Gunakan kombinasi huruf besar, huruf kecil, angka, dan simbol
                  </p>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button 
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setStep(1)}
                  >
                    Kembali
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1 bg-[#1FA84A] hover:bg-[#1FA84A]/90 text-white"
                  >
                    Daftar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <Card className="border-2 shadow-xl">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-20 h-20 bg-[#1FA84A]/10 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-12 h-12 text-[#1FA84A]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#0C2C4A] mb-2">
                    Pendaftaran Berhasil!
                  </h3>
                  <p className="text-gray-600">
                    Akun Anda telah berhasil dibuat. Silakan cek email untuk verifikasi.
                  </p>
                </div>
                <div className="w-full space-y-3 pt-4">
                  <Link to="/dashboard" className="block">
                    <Button className="w-full bg-[#1FA84A] hover:bg-[#1FA84A]/90 text-white">
                      Masuk ke Dashboard
                    </Button>
                  </Link>
                  <Link to="/login" className="block">
                    <Button variant="outline" className="w-full">
                      Kembali ke Login
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}