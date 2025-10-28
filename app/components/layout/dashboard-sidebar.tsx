// components/layout/dashboard-sidebar.tsx
'use client'; // 1. Tambahkan ini untuk menggunakan hook

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // 2. Impor hook usePathname
import { cn } from '@/lib/utils'; // 3. Impor utilitas 'cn' dari shadcn
import {
  Home,
  LayoutDashboard,
  BarChart3,
  Settings,
  UserCircle,
} from 'lucide-react';

export function DashboardSidebar() {
  // 4. Dapatkan path URL saat ini
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen px-4 py-6 bg-white border-r fixed">
      {/* Bagian Logo */}
      <div className="flex items-center gap-2 h-10 mb-8 px-2">
        <span className="text-xl font-bold text-primary">
          EmergencyyCall
        </span>
      </div>

      {/* Bagian Navigasi */}
      <nav className="flex flex-col flex-1 space-y-2">
        
        {/* 5. Ganti className statis dengan 'cn' yang dinamis */}
        <Link
          href="/dashboard"
          className={cn(
            "flex items-center gap-3 p-3 rounded-lg transition-all",
            pathname === "/dashboard"
              ? "bg-primary/10 text-primary font-semibold" // Style Aktif
              : "text-gray-600 hover:bg-gray-100" // Style Inaktif
          )}
        >
          <Home className="h-5 w-5" />
          Home
        </Link>
        
        <Link
          href="/dashboard/statistik"
          className={cn(
            "flex items-center gap-3 p-3 rounded-lg transition-all",
            pathname === "/dashboard/statistik"
              ? "bg-primary/10 text-primary font-semibold" // Style Aktif
              : "text-gray-600 hover:bg-gray-100" // Style Inaktif
          )}
        >
          <BarChart3 className="h-5 w-5" />
          Statistik
        </Link>
        
        <Link
          href="/dashboard/sesi" // (Nanti kamu akan buat halaman ini)
          className={cn(
            "flex items-center gap-3 p-3 rounded-lg transition-all",
            pathname === "/dashboard/sesi"
              ? "bg-primary/10 text-primary font-semibold"
              : "text-gray-600 hover:bg-gray-100"
          )}
        >
          <LayoutDashboard className="h-5 w-5" />
          Sesi
        </Link>
      </nav>

      {/* Bagian Bawah (Setting & Profile) */}
      <div className="flex flex-col space-y-2">
        <Link
          href="/dashboard/pengaturan" // (Nanti kamu akan buat halaman ini)
          className={cn(
            "flex items-center gap-3 p-3 rounded-lg transition-all",
            pathname === "/dashboard/pengaturan"
              ? "bg-primary/10 text-primary font-semibold"
              : "text-gray-600 hover:bg-gray-100"
          )}
        >
          <Settings className="h-5 w-5" />
          Pengaturan
        </Link>
        
        <Link
          href="/dashboard/profil" // (Nanti kamu akan buat halaman ini)
          className={cn(
            "flex items-center gap-3 p-3 rounded-lg transition-all",
            pathname === "/dashboard/profil"
              ? "bg-primary/10 text-primary font-semibold"
              : "text-gray-600 hover:bg-gray-100"
          )}
        >
          <UserCircle className="h-5 w-5" />
          Armin
        </Link>
      </div>
    </aside>
  );
}