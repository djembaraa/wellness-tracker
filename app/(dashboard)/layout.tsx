// app/(dashboard)/layout.tsx
import React from 'react';
import { Sidebar } from '../components/layout/sidebar';
import { MobileNav } from '../components/layout/mobile-nav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100/50">
      {/* Modifikasi: Buat Sidebar fixed di desktop */}
      <aside className="hidden md:block w-64 bg-gray-50 border-r fixed h-full p-4">
         {/* Panggil komponen Sidebar asli */}
         <div className="flex items-center gap-2 h-10 mb-6">
           <h1 className="text-xl font-bold text-gray-800">EmergencyyCall</h1>
         </div>
         {/* ... (Navigasi link di sini, copy dari sidebar.tsx) ... */}
      </aside>

      <div className="flex flex-col flex-1 md:ml-64">
        <MobileNav />
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}