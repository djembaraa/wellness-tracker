// app/dashboard/profil/page.tsx
'use client'; // Diperlukan untuk mengambil data

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Scale, Ruler, Droplet, Edit } from 'lucide-react';
import Link from 'next/link';

// Kita tentukan tipe data untuk profil
type ProfileData = {
  full_name: string | null;
  weight_kg: number | null;
  height_cm: number | null;
  blood_type: string | null;
  email: string | null;
};

export default function ProfilPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  // Ambil data profil saat halaman dimuat
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // Ambil data dari tabel 'profiles'
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('full_name, weight_kg, height_cm, blood_type')
          .eq('id', user.id)
          .single();

        if (profileData) {
          // Gabungkan data dari 'profiles' dan 'auth.users'
          setProfile({
            ...profileData,
            email: user.email || null,
          });
        }
      } else {
        router.push('/login'); // Jika tidak ada user, tendang ke login
      }
      setLoading(false);
    };
    fetchProfile();
  }, [router]);

  // Tampilkan pesan loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-muted-foreground">Memuat profil...</p>
      </div>
    );
  }

  // Tampilkan jika profil tidak ada
  if (!profile) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">Profil tidak ditemukan.</p>
      </div>
    );
  }

  // Tampilkan Kartu Profil
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-gray-900">Profil Saya</h1>
      <Card className="max-w-2xl shadow-sm">
        <CardHeader className="flex flex-row items-center gap-6 space-y-0 pb-4">
          <User className="h-16 w-16 text-primary bg-primary/10 p-3 rounded-full" />
          <div>
            <CardTitle className="text-2xl">{profile.full_name}</CardTitle>
            <CardDescription className="text-base">{profile.email}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold mb-4">Statistik Kesehatan</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatItem
              icon={Ruler}
              label="Tinggi Badan"
              value={profile.height_cm ? `${profile.height_cm} cm` : 'N/A'}
            />
            <StatItem
              icon={Scale}
              label="Berat Badan"
              value={profile.weight_kg ? `${profile.weight_kg} kg` : 'N/A'}
            />
            <StatItem
              icon={Droplet}
              label="Tipe Darah"
              value={profile.blood_type || 'N/A'}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild variant="outline">
            <Link href="/dashboard/pengaturan">
              <Edit className="mr-2 h-4 w-4" />
              Edit Profil
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

// Komponen helper kecil untuk menampilkan stat
function StatItem({ icon: Icon, label, value }: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border">
      <Icon className="h-6 w-6 text-muted-foreground" />
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-lg font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
}