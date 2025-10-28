// app/(auth)/signin/page.tsx

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react"; // 1. Impor useState
import { useRouter } from "next/navigation"; // 2. Impor useRouter untuk redirect
import { supabase } from "@/lib/supabaseClient"; // 3. Impor Supabase client-mu

export default function SignInPage() {
  // 4. Buat state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter(); // 5. Inisialisasi router

  // 6. Buat fungsi handleSignIn
  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Mencegah refresh halaman
    setLoading(true);
    setMessage("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) throw error;

      router.push("/dashboard");
    
    } catch (error) { // <-- Hapus ': any'
      // Tambahkan pengecekan ini
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

        {/* 9. Hubungkan form ke fungsi handleSignIn */}
        <form className="space-y-4" onSubmit={handleSignIn}>
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <Input
              type="email"
              placeholder="you@example.com"
              required
              value={email} // 9. Hubungkan state
              onChange={(e) => setEmail(e.target.value)} // 9. Hubungkan state
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
              value={password} // 9. Hubungkan state
              onChange={(e) => setPassword(e.target.value)} // 9. Hubungkan state
            />
          </div>

          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        {/* 10. Tampilkan pesan error jika ada */}
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