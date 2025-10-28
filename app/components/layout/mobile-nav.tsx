// components/layout/mobile-nav.tsx
import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

// Kita akan re-use Sidebar
import  { DashboardSidebar }  from './dashboard-sidebar';

export function MobileNav() {
  return (
    <header className="md:hidden flex items-center justify-between h-14 px-4 border-b bg-white">
      <h1 className="text-lg font-bold text-primary">EmergencyyCall</h1>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu size={20} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          {/* Render Sidebar di dalam Sheet */}
          <DashboardSidebar />
        </SheetContent>
      </Sheet>
    </header>
  );
}