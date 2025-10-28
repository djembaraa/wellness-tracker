// app/(auth)/login/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

// 1. Impor Navbar dan Footer
import { MainNavbar } from '../../components/layout/main-navbar';
import { MainFooter } from '../../components/layout/main-footer';

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (authError) throw authError;

      if (authData.user) {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('id, full_name')
          .eq('id', authData.user.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') {
          throw profileError;
        }

        if (!profileData) {
          router.push('/setup-profile');
        } else {
          router.push('/dashboard');
        }
      }

    } catch (error) {
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
    // 2. Gunakan flex-col untuk menata Navbar, Konten, Footer secara vertikal
    <div className="min-h-screen flex flex-col bg-gray-50">
      
      {/* 3. Panggil Navbar di bagian atas */}
      <MainNavbar />

      {/* 4. Buat area utama yang mengisi sisa ruang dan men-center Card */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        {/* Card Login kamu tetap di sini */}
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6">
          <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
            Sign In
          </h1>

          <form className="space-y-4" onSubmit={handleSignIn}>
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <Input
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

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
      </main>

      {/* 5. Panggil Footer di bagian bawah */}
      <MainFooter />
    </div>
  );
}