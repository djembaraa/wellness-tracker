// components/layout/mobile-nav.tsx
"use client"; // DropdownMenu adalah komponen interaktif

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // 1. Impor komponen DropdownMenu
import {
  Menu,
  Home,
  BarChart3,
  LayoutDashboard,
  Settings,
  UserCircle,
  LogOut,
} from "lucide-react"; // 2. Impor semua ikon yang dibutuhkan
import { usePathname, useRouter } from "next/navigation"; // Untuk logout
import { supabase } from "@/lib/supabaseClient"; // Untuk logout

export function MobileNav() {
  const router = useRouter(); // Untuk logout

  // Fungsi logout (sama seperti di sidebar)
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    // md:hidden -> Hanya tampil di mobile
    <header className="md:hidden sticky top-0 z-40 flex items-center justify-between h-14 px-4 border-b bg-white">
      {/* Logo */}
      <h1 className="text-lg font-bold text-primary">EmergencyyCall</h1>

      {/* 3. Ganti Sheet dengan DropdownMenu */}
      <DropdownMenu>
        {/* Tombol pemicu (Hamburger) tetap sama */}
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu size={20} />
          </Button>
        </DropdownMenuTrigger>

        {/* 4. Konten Dropdown (Menu Links) */}
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Menu Navigasi</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {/* Tambahkan link menu di sini */}
          <DropdownMenuItem asChild>
            <Link href="/dashboard" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href="/dashboard/statistik"
              className="flex items-center gap-2"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Statistik</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/sesi" className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              <span>Sesi</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link
              href="/dashboard/pengaturan"
              className="flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              <span>Pengaturan</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/profil" className="flex items-center gap-2">
              <UserCircle className="h-4 w-4" />
              <span>Profil</span>
              {/* Nama dinamis tidak dimasukkan di sini agar sederhana */}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {/* Tombol Logout */}
          <DropdownMenuItem
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-500 focus:text-red-500 focus:bg-red-50 cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            <span>Log Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
