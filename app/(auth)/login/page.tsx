// app/(auth)/login/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Pastikan ini diimpor
import { supabase } from "@/lib/supabaseClient";

export default function SignInPage() {
  // State untuk form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  // Inisialisasi router
  const router = useRouter();

  // Fungsi handleSignIn
  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Mencegah refresh halaman
    setLoading(true);
    setMessage("");

    try {
      // 1. Coba Sign In
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (authError) throw authError; // Jika login gagal, lempar error

      // 2. Jika Login Berhasil, cek tabel 'profiles'
      if (authData.user) {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('id, full_name') // Cukup cek apakah ada datanya
          .eq('id', authData.user.id)
          .single(); // Ambil satu baris

        // Cek jika ada error, TAPI abaikan error 'PGRST116' (Row not found)
        // Karena 'Row not found' BUKAN error, tapi memang datanya kosong.
        if (profileError && profileError.code !== 'PGRST116') {
          throw profileError;
        }

        // 3. Logika Redirect
        if (!profileData) {
          // JIKA TIDAK ADA PROFIL, arahkan ke setup-profile
          router.push('/setup-profile');
        } else {
          // JIKA ADA PROFIL, arahkan ke dashboard
          router.push('/dashboard');
        }
      }
      
    } catch (error) { // Menangani error login atau error database
      if (error instanceof Error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage("Terjadi kesalahan yang tidak diketahui.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Sign In
        </h1>

        {/* Hubungkan form ke fungsi handleSignIn */}
        <form className="space-y-4" onSubmit={handleSignIn}>
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <Input
              type="email"
              placeholder="you@example.com"
              required
              value={email} // Hubungkan state
              onChange={(e) => setEmail(e.target.value)} // Hubungkan state
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              type="password"
              placeholder="••••••••"
              required
              value={password} // Hubungkan state
              onChange={(e) => setPassword(e.target.value)} // Hubungkan state
            />
          </div>

          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        {/* Tampilkan pesan error jika ada */}
        {message && (
          <p className="text-sm text-center mt-4 text-red-500">{message}</p>
        )}

        <p className="text-sm text-center mt-4 text-gray-600">
          Dont have an account?{" "}
          <Link href="/signup" className="text-primary hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}