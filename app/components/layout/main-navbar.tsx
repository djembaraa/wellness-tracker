// components/layout/main-navbar.tsx
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function MainNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-screen-xl items-center justify-between px-6">
        {/* === Bagian Kiri (Logo) === */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            {/* <Logo /> */}
            <span className="text-xl font-bold tracking-tight text-[#8CB459]">
              {" "}
              {/* <-- Ganti di sini */}
              EmergencyyCall
            </span>
          </Link>
        </div>

        {/* === Bagian Tengah (Navigasi) === */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#features"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Features
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Products
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Pricing
          </Link>
        </nav>

        {/* === Bagian Kanan (Tombol) === */}
        <div className="flex items-center gap-3">
          <Button variant="outline" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button
            asChild
            className="bg-[#8CB459] hover:bg-[#7a9d4d]" // <-- TAMBAHKAN CLASS INI
          >
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
