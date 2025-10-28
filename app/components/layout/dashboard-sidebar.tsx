// components/layout/dashboard-sidebar.tsx
'use client'; // Pastikan ini ada di baris pertama

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Home,
  LayoutDashboard,
  BarChart3,
  Settings,
  UserCircle,
  LogOut,
} from 'lucide-react';
// 1. Impor useState DAN useEffect
import { useState, useEffect } from 'react'; 
import { supabase } from '@/lib/supabaseClient';

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter(); 
  const [userName, setUserName] = useState<string>('Profil');

  useEffect(() => {
    const fetchUserName = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user && user.user_metadata.full_name) {
        setUserName(user.user_metadata.full_name);
      }
    };
    fetchUserName();
  }, []);

  // 2. DEFINISIKAN handleLogout DI DALAM KOMPONEN, SEBELUM RETURN
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login'); 
  };

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
        {/* Link Home */}
        <Link
          href="/dashboard"
          className={cn(
            "flex items-center gap-3 p-3 rounded-lg transition-all",
            pathname === "/dashboard"
              ? "bg-primary/10 text-primary font-semibold"
              : "text-gray-600 hover:bg-gray-100"
          )}
        >
          <Home className="h-5 w-5" />
          Home
        </Link>
        {/* Link Statistik */}
        <Link
          href="/dashboard/statistik"
          className={cn(
            "flex items-center gap-3 p-3 rounded-lg transition-all",
            pathname === "/dashboard/statistik"
              ? "bg-primary/10 text-primary font-semibold"
              : "text-gray-600 hover:bg-gray-100"
          )}
        >
          <BarChart3 className="h-5 w-5" />
          Statistik
        </Link>
        {/* Link Sesi */}
        <Link
          href="/dashboard/sesi"
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

      {/* Bagian Bawah (Setting & Profile & Logout) */}
      <div className="flex flex-col space-y-2">
        {/* Link Pengaturan */}
        <Link
          href="/dashboard/pengaturan"
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
        {/* Link Profil */}
        <Link
          href="/dashboard/profil" 
          className={cn(
            "flex items-center gap-3 p-3 rounded-lg transition-all",
            pathname === "/dashboard/profil" 
              ? "bg-primary/10 text-primary font-semibold"
              : "text-gray-600 hover:bg-gray-100"
          )}
        >
          <UserCircle className="h-5 w-5" />
          {userName} 
        </Link>
        {/* Tombol Logout (onClick sekarang merujuk ke fungsi yang ada) */}
        <button
          onClick={handleLogout} 
          className={cn(
            "flex items-center gap-3 p-3 rounded-lg transition-all w-full text-left",
            "text-red-500 hover:bg-red-50" 
          )}
        >
          <LogOut className="h-5 w-5" />
          Log Out
        </button>
      </div>
    </aside>
  );
}