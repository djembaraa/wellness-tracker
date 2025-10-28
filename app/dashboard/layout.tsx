// app/dashboard/layout.tsx
import React from 'react';
import { DashboardSidebar } from '../components/layout/dashboard-sidebar';
import { MobileNav } from '../components/layout/mobile-nav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50/50">
      {/* 1. Sidebar Desktop (Fixed) */}
      <DashboardSidebar />

      {/* 2. Konten Utama (Kanan) */}
      <div className="flex flex-col flex-1 md:ml-64">
        {/* Header Mobile */}
        <MobileNav />

        {/* 'children' adalah app/dashboard/page.tsx kamu */}
        <main className="p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
