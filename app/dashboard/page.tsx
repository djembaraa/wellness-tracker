// app/dashboard/page.tsx
import { DashboardHeader } from '../components/dashboard/dashboard-header';
import { HealthStatisticsGrid } from '../components/dashboard/health-statistics-grid';
import { ActivityFeed } from '../components/dashboard/activity-feed';

export default function DashboardPage() {
  return (
    // Ini adalah layout grid utama untuk konten dashboard
    // Kolom 1 (Kiri/Utama) & Kolom 2 (Kanan/Aktivitas)
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      
      {/* Kolom Kiri & Tengah (Konten Utama) */}
      <div className="flex flex-col gap-6 lg:col-span-2">
        {/* 1. "Good Morning, Armin" + Filter */}
        <DashboardHeader />

        {/* 2. "Health Statistics" 6-card grid */}
        <HealthStatisticsGrid />
      </div>

      {/* Kolom Kanan (Activity Sidebar) */}
      <div className="flex flex-col gap-6 lg:col-span-1">
        {/* 3. "Activity" + "Latest Activity" */}
        <ActivityFeed />
      </div>
    </div>
  );
}