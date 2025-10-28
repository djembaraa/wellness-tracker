// app/setup-profile/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { User } from 'lucide-react';

export default function SetupProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [fullName, setFullName] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [userId, setUserId] = useState<string | null>(null);

  // 1. Dapatkan ID pengguna saat halaman dimuat
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        // Cek apakah nama sudah diisi saat sign up
        setFullName(user.user_metadata.full_name || '');
      } else {
        router.push('/login'); // Jika tidak ada user, tendang ke login
      }
    };
    fetchUser();
  }, [router]);

  // 2. Fungsi untuk menyimpan data
  const handleProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (!userId) {
      setMessage('Error: User ID not found.');
      setLoading(false);
      return;
    }

    // 3. Simpan ke tabel 'profiles'
    const { error } = await supabase.from('profiles').upsert({
      id: userId,
      full_name: fullName,
      weight_kg: parseFloat(weight) || null,
      height_cm: parseInt(height) || null,
      blood_type: bloodType || null,
      updated_at: new Date().toISOString(),
    });

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      // 4. Jika sukses, update juga metadata auth
      // (Ini agar nama konsisten antara auth dan tabel)
      await supabase.auth.updateUser({
        data: { full_name: fullName }
      });
      
      setMessage('Profil berhasil disimpan! Mengarahkan ke dashboard...');
      router.push('/dashboard'); // 5. Redirect ke dashboard
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">
            Satu Langkah Lagi!
          </CardTitle>
          <CardDescription className="text-center">
            Harap lengkapi profil Anda untuk melanjutkan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleProfileSubmit}>
            <div>
              <label className="text-sm font-medium">Nama Lengkap</label>
              <Input
                type="text"
                placeholder="Nama Lengkap Anda"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Berat Badan (kg)</label>
                <Input
                  type="number"
                  placeholder="Contoh: 78"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Tinggi Badan (cm)</label>
                <Input
                  type="number"
                  placeholder="Contoh: 170"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Tipe Darah</label>
              <Input
                type="text"
                placeholder="Contoh: AB+"
                value={bloodType}
                onChange={(e) => setBloodType(e.target.value)}
              />
            </div>

            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Menyimpan..." : "Simpan & Lanjutkan"}
            </Button>
            {message && <p className="text-sm text-center text-red-500">{message}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}