// app/(dashboard)/page.tsx
import { CounselingSummary } from '../components/dashboard/consulting-summary';
import { DailyMotivation } from '../components/dashboard/daily-motivation';
import { MoodGraph } from '../components/dashboard/mood-graph';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Selamat Datang, Pengguna!
        </h1>
        <p className="text-muted-foreground">
          Berikut ringkasan kesehatan mentalmu.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Komponen-komponen wajib */}
        <CounselingSummary />
        <MoodGraph />
        <DailyMotivation />

        {/* Tambahkan card lain jika ada waktu */}
        {/* <Card><CardHeader><CardTitle>Aktivitas Lain</CardTitle></CardHeader></Card> */}
      </div>
    </div>
  );
}