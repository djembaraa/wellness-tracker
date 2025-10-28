// components/dashboard/dashboard-header.tsx
'use client';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

// --- PERBAIKAN ---
// 1. Hitung tanggalnya di sini, di luar komponen.
// Ini hanya akan berjalan sekali saat file dimuat.
const formattedDate = new Date().toLocaleDateString('id-ID', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
// --- AKHIR PERBAIKAN ---

export function DashboardHeader() {
  const [userName, setUserName] = useState<string | null>(null);
  const [location, setLocation] = useState('Malang City'); // Ini masih statis

  // --- PERBAIKAN ---
  // 2. Gunakan tanggal yang sudah diformat sebagai nilai awal.
  const [date, setDate] = useState(formattedDate);
  // --- AKHIR PERBAIKAN ---

  useEffect(() => {
    // --- PERBAIKAN ---
    // 3. Hapus panggilan setDate dari sini.
    // setDate(new Date()...); // <-- HAPUS INI
    // --- AKHIR PERBAIKAN ---

    // Ambil data pengguna (Ini tetap di sini, sudah benar)
    const fetchUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        setUserName(user.user_metadata.full_name || 'Pengguna');
      }
    };

    fetchUserData();
  }, []); // Dependency array tetap kosong

  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      {/* Salam Pembuka */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Good Morning, {userName || '...'}!
        </h1>
        <p className="text-muted-foreground">
          {date}, Sunny day in {location}
        </p>
      </div>

      {/* Filter Waktu (tetap sama) */}
      <ToggleGroup
        type="single"
        defaultValue="day"
        variant="outline"
        className="self-start sm:self-center"
      >
        <ToggleGroupItem value="day" aria-label="Toggle day">Day</ToggleGroupItem>
        <ToggleGroupItem value="week" aria-label="Toggle week">Week</ToggleGroupItem>
        <ToggleGroupItem value="month" aria-label="Toggle month">Month</ToggleGroupItem>
        <ToggleGroupItem value="year" aria-label="Toggle year">Year</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}