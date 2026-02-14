import React, { useState } from 'react';
import { Link } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../components/ui/input-otp';
import { MuGamesLogo } from '../components/MuGamesLogo';
import { Mail, ArrowLeft, KeyRound, Lock, CheckCircle } from 'lucide-react';

type Step = 'email' | 'otp' | 'reset' | 'success';

export default function ForgotPassword() {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock send OTP
    console.log('Sending OTP to:', email);
    setStep('otp');
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock verify OTP
    console.log('Verifying OTP:', otp);
    setStep('reset');
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Password tidak cocok!');
      return;
    }
    // Mock reset password
    console.log('Password reset successful');
    setStep('success');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center">
          <MuGamesLogo size="md" />
          <h1 className="mt-4 text-2xl font-bold text-[#0C2C4A]">
            Reset Password
          </h1>
          <p className="text-gray-600 text-sm mt-2">
            Muhammadiyah Games 2026
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2">
          <div className={`w-3 h-3 rounded-full ${step === 'email' ? 'bg-[#1FA84A]' : step === 'otp' || step === 'reset' || step === 'success' ? 'bg-[#1FA84A]' : 'bg-gray-300'}`}></div>
          <div className={`w-12 h-1 ${step === 'otp' || step === 'reset' || step === 'success' ? 'bg-[#1FA84A]' : 'bg-gray-300'}`}></div>
          <div className={`w-3 h-3 rounded-full ${step === 'otp' ? 'bg-[#1FA84A]' : step === 'reset' || step === 'success' ? 'bg-[#1FA84A]' : 'bg-gray-300'}`}></div>
          <div className={`w-12 h-1 ${step === 'reset' || step === 'success' ? 'bg-[#1FA84A]' : 'bg-gray-300'}`}></div>
          <div className={`w-3 h-3 rounded-full ${step === 'reset' ? 'bg-[#1FA84A]' : step === 'success' ? 'bg-[#1FA84A]' : 'bg-gray-300'}`}></div>
        </div>

        <Card className="border-2 shadow-xl">
          {/* Step 1: Email Input */}
          {step === 'email' && (
            <>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#0C2C4A]">
                  <Mail className="w-5 h-5" />
                  Masukkan Email
                </CardTitle>
                <CardDescription>
                  Kami akan mengirimkan kode OTP ke email Anda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSendOTP} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Terdaftar</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-[#1FA84A] hover:bg-[#1FA84A]/90 text-white"
                  >
                    Kirim Kode OTP
                  </Button>

                  <Link 
                    to="/login" 
                    className="flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-[#1FA84A]"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Kembali ke Login
                  </Link>
                </form>
              </CardContent>
            </>
          )}

          {/* Step 2: OTP Verification */}
          {step === 'otp' && (
            <>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#0C2C4A]">
                  <KeyRound className="w-5 h-5" />
                  Verifikasi OTP
                </CardTitle>
                <CardDescription>
                  Masukkan kode 6 digit yang dikirim ke {email}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleVerifyOTP} className="space-y-6">
                  <div className="flex justify-center">
                    <InputOTP 
                      maxLength={6} 
                      value={otp}
                      onChange={(value) => setOtp(value)}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-[#1FA84A] hover:bg-[#1FA84A]/90 text-white"
                    disabled={otp.length !== 6}
                  >
                    Verifikasi Kode
                  </Button>

                  <div className="text-center">
                    <button 
                      type="button"
                      className="text-sm text-[#1FA84A] hover:underline"
                      onClick={handleSendOTP}
                    >
                      Kirim ulang kode OTP
                    </button>
                  </div>
                </form>
              </CardContent>
            </>
          )}

          {/* Step 3: Reset Password */}
          {step === 'reset' && (
            <>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#0C2C4A]">
                  <Lock className="w-5 h-5" />
                  Buat Password Baru
                </CardTitle>
                <CardDescription>
                  Masukkan password baru untuk akun Anda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Password Baru</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="Minimal 8 karakter"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      minLength={8}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Masukkan ulang password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      minLength={8}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-[#1FA84A] hover:bg-[#1FA84A]/90 text-white"
                  >
                    Reset Password
                  </Button>
                </form>
              </CardContent>
            </>
          )}

          {/* Step 4: Success */}
          {step === 'success' && (
            <>
              <CardHeader>
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 bg-[#1FA84A]/10 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-[#1FA84A]" />
                  </div>
                  <div>
                    <CardTitle className="text-[#0C2C4A]">
                      Password Berhasil Direset!
                    </CardTitle>
                    <CardDescription className="mt-2">
                      Password Anda telah berhasil diubah
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Link to="/login">
                  <Button className="w-full bg-[#1FA84A] hover:bg-[#1FA84A]/90 text-white">
                    Masuk ke Akun
                  </Button>
                </Link>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
