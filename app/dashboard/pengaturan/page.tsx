// app/dashboard/pengaturan/page.tsx
'use client'; // Diperlukan untuk form interaktif

import { useState, useEffect, FormEvent } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { User } from 'lucide-react'; // Menggunakan tipe User dari Supabase di bawah

export default function PengaturanPage() {
  const router = useRouter();

  // State untuk data profil
  const [loading, setLoading] = useState(true);
  const [profileMessage, setProfileMessage] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bloodType, setBloodType] = useState('');

  // State untuk ganti password
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 1. Ambil data profil yang ada saat halaman dimuat
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        setEmail(user.email || ''); // Ambil email dari auth

        // Ambil sisa data dari tabel 'profiles'
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('full_name, weight_kg, height_cm, blood_type')
          .eq('id', user.id)
          .single();

        if (profileData) {
          setFullName(profileData.full_name || '');
          setWeight(profileData.weight_kg ? String(profileData.weight_kg) : '');
          setHeight(profileData.height_cm ? String(profileData.height_cm) : '');
          setBloodType(profileData.blood_type || '');
        }
      } else {
        router.push('/login'); // Jika tidak ada user, tendang ke login
      }
      setLoading(false);
    };

    fetchProfile();
  }, [router]);

  // 2. Fungsi untuk update profil
  const handleProfileUpdate = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setProfileMessage('');

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Update tabel 'profiles'
    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        full_name: fullName,
        weight_kg: parseFloat(weight) || null,
        height_cm: parseInt(height) || null,
        blood_type: bloodType || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);
    
    // Update juga metadata di 'auth.users'
    const { error: authError } = await supabase.auth.updateUser({
      data: { full_name: fullName }
    });

    if (profileError || authError) {
      setProfileMessage(`Error: ${profileError?.message || authError?.message}`);
    } else {
      setProfileMessage('Profil berhasil diperbarui!');
    }
    setLoading(false);
  };

  // 3. Fungsi untuk ganti password
  const handlePasswordUpdate = async (e: FormEvent) => {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordMessage('');

    if (newPassword !== confirmPassword) {
      setPasswordMessage('Error: Password tidak cocok!');
      setPasswordLoading(false);
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) {
      setPasswordMessage(`Error: ${error.message}`);
    } else {
      setPasswordMessage('Password berhasil diganti!');
      setNewPassword('');
      setConfirmPassword('');
    }
    setPasswordLoading(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-gray-900">Pengaturan Akun</h1>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="security">Keamanan</TabsTrigger>
        </TabsList>

        {/* --- Tab Konten Profil --- */}
        <TabsContent value="profile">
          <form onSubmit={handleProfileUpdate}>
            <Card>
              <CardHeader>
                <CardTitle>Profil Pengguna</CardTitle>
                <CardDescription>
                  Perbarui informasi pribadi dan kesehatan Anda.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} disabled />
                  <p className="text-xs text-muted-foreground">Email tidak dapat diubah.</p>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="fullName">Nama Lengkap</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Nama lengkap Anda"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="height">Tinggi Badan (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="Contoh: 170"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="weight">Berat Badan (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="Contoh: 78"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="bloodType">Tipe Darah</Label>
                    <Input
                      id="bloodType"
                      value={bloodType}
                      onChange={(e) => setBloodType(e.target.value)}
                      placeholder="Contoh: AB+"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                {profileMessage && (
                  <p className="text-sm text-muted-foreground">{profileMessage}</p>
                )}
                <Button type="submit" disabled={loading}>
                  {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>

        {/* --- Tab Konten Keamanan --- */}
        <TabsContent value="security">
          <form onSubmit={handlePasswordUpdate}>
            <Card>
              <CardHeader>
                <CardTitle>Ganti Password</CardTitle>
                <CardDescription>
                  Masukkan password baru Anda.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="newPassword">Password Baru</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="confirmPassword">Konfirmasi Password Baru</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                {passwordMessage && (
                  <p className="text-sm text-muted-foreground">{passwordMessage}</p>
                )}
                <Button type="submit" disabled={passwordLoading}>
                  {passwordLoading ? 'Menyimpan...' : 'Ganti Password'}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}