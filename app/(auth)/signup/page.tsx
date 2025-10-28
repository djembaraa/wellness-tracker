'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function SignupPage() {
  const router = useRouter()
  // Tambahkan state untuk nama dan konfirmasi password
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  // Tambahkan state loading
  const [loading, setLoading] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('') // Hapus error lama
    setLoading(true) // Mulai loading

    // 1. Validasi Password
    if (password !== confirmPassword) {
      setError('Password dan Konfirmasi Password tidak cocok.')
      setLoading(false) // Hentikan loading
      return // Hentikan eksekusi
    }

    // 2. Validasi Panjang Password (Opsional tapi direkomendasikan Supabase)
    if (password.length < 6) {
      setError('Password minimal harus 6 karakter.')
      setLoading(false)
      return
    }

    // 3. Panggil Supabase signUp
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // Ini cara menyimpan nama ke metadata pengguna
        data: {
          full_name: name,
        },
      },
    })

    setLoading(false) // Hentikan loading setelah selesai

    if (error) {
      setError(error.message)
    } else {
      // Sukses! Arahkan ke login
      // Catatan: Pengguna mungkin perlu verifikasi email dulu
      router.push('/login')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md space-y-4"
      >
        <h1 className="text-2xl font-semibold text-center mb-4">Daftar Akun</h1>

        {/* --- Input Nama --- */}
        <Input
          placeholder="Nama Lengkap"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        {/* --- Input Email --- */}
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* --- Input Password --- */}
        <Input
          placeholder="Password (minimal 6 karakter)"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* --- Input Ulangi Password --- */}
        <Input
          placeholder="Ulangi Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {/* Tampilkan error jika ada */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Update Tombol dengan state loading */}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Mendaftar...' : 'Daftar'}
        </Button>

        <p className="text-sm text-center text-gray-600">
          Sudah punya akun?{' '}
          <a href="/login" className="text-blue-600 underline">
            Masuk di sini
          </a>
        </p>
      </form>
    </div>
  )
}