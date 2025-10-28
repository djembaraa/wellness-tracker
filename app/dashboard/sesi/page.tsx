// app/dashboard/sesi/page.tsx
'use client'; // Diperlukan karena MoodGraph & DailyMotivation adalah client components

// Kita gunakan path relative berdasarkan struktur folder di screenshot-mu
import { CounselingSummary } from '../../../app/components/dashboard/consulting-summary';
import { DailyMotivation } from '../../../app/components/dashboard/daily-motivation';
import { MoodGraph } from '../../../app/components/dashboard/mood-graph';

export default function SesiPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Judul Halaman */}
      <h1 className="text-3xl font-bold text-gray-900">
        Ringkasan Sesi & Keseharian
      </h1>

      {/* 1. Grafik Mood (Komponen lama, lebar penuh) */}
      <MoodGraph />

      {/* 2. Ringkasan & Motivasi (Komponen lama, side-by-side) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CounselingSummary />
        <DailyMotivation />
      </div>
    </div>
  );
}