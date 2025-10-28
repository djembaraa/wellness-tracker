// components/layout/sidebar.tsx
import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, BarChart3, User } from 'lucide-react';

// Kamu harus ekspor logo dari Figma/Gambar 1 sebagai PNG/SVG
// import Image from 'next/image'; 
// import Logo from '@/public/logo.png';

export function Sidebar() {
  return (
    <aside className="hidden md:block w-64 bg-gray-50 border-r h-screen p-4">
      <div className="flex items-center gap-2 h-10 mb-6">
        {/* <Image src={Logo} alt="EmergencyyCall Logo" width={30} height={30} /> */}
        <h1 className="text-xl font-bold text-gray-800">EmergencyyCall</h1>
      </div>
      <nav>
        <ul className="space-y-2">
          <li>
            <Link
              href="/dashboard"
              className="flex items-center gap-3 p-2 rounded-lg bg-primary/10 text-primary font-semibold transition-all hover:bg-primary/20"
            >
              <LayoutDashboard size={20} />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center gap-3 p-2 rounded-lg text-gray-600 transition-all hover:bg-gray-200"
            >
              <BarChart3 size={20} />
              Sesi Saya
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center gap-3 p-2 rounded-lg text-gray-600 transition-all hover:bg-gray-200"
            >
              <User size={20} />
              Profil
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}