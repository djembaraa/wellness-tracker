// components/layout/main-footer.tsx
import React from 'react';
import Link from 'next/link';

export function MainFooter() {
  return (
    <footer className="border-t bg-gray-50">
      {/* Perubahan:
          - max-w-screen-lg -> max-w-screen-xl (Lebar sama dengan navbar)
          - py-8 -> py-6 (Padding atas/bawah jadi 24px, lebih dekat ke tinggi internal navbar)
          - Tambahkan px-6 (Padding kiri/kanan 24px, sama dengan navbar)
      */}
      <div className="container mx-auto max-w-screen-xl px-6 py-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Bagian Kiri (Copyright) */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-primary">EmergencyyCall</h3>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} EmergencyyCall. All rights reserved.
            </p>
          </div>
          {/* Bagian Kanan (Links) */}
          {/* Jarak 'gap-4' bisa disesuaikan jika perlu */}
          <div className="flex flex-wrap justify-center gap-4 md:justify-end">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Customer Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}