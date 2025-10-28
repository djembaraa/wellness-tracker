// components/layout/main-navbar.tsx
"use client"; // Needed for DropdownMenu

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Import Dropdown components
import { Menu } from "lucide-react"; // Import Menu icon

export function MainNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Container with correct height and padding */}
      <div className="container mx-auto flex h-16 max-w-screen-xl items-center justify-between px-6">
        {/* === Left Section (Logo) - Always Visible === */}
        <div className="flex items-center gap-2">
          {" "}
          {/* Removed flex-1 for tighter layout if needed, adjust if logo should push content */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-primary">
              EmergencyyCall
            </span>
          </Link>
        </div>

        {/* === Center Section (Desktop Navigation) - Hidden on Mobile === */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#features"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Fitur
          </Link>
          <Link
            href="#faq"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            FAQ
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Help
          </Link>
        </nav>

        {/* === Right Section (Desktop Buttons) - Hidden on Mobile === */}
        <div className="hidden md:flex items-center gap-3">
          {" "}
          {/* Added hidden md:flex */}
          <Button variant="outline" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild className="bg-[#8CB459] hover:bg-[#7a9d4d]">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>

        {/* === Mobile Hamburger Menu - Only Visible on Mobile === */}
        <div className="md:hidden">
          {" "}
          {/* Added md:hidden */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {/* Mobile Menu Items */}
              <DropdownMenuItem asChild>
                <Link href="#features">Fitur</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="#faq">FAQ</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="#">Help</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {/* Mobile Auth Buttons */}
              <DropdownMenuItem asChild>
                <Button variant="outline" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Button asChild className="bg-[#8CB459] hover:bg-[#7a9d4d]">
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
