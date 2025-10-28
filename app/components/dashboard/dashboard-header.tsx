// components/dashboard/dashboard-header.tsx
'use client'; // ToggleGroup adalah komponen interaktif

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export function DashboardHeader() {
  // Data dummy, idealnya ini datang dari user session
  const userName = 'Armin'; 
  const location = 'Malang City';
  const date = new Date().toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      {/* Salam Pembuka */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Good Morning, {userName}!
        </h1>
        <p className="text-muted-foreground">
          {date}, Sunny day in {location}
        </p>
      </div>

      {/* Filter Waktu */}
      <ToggleGroup
        type="single"
        defaultValue="day"
        variant="outline"
        className="self-start sm:self-center"
      >
        <ToggleGroupItem value="day" aria-label="Toggle day">
          Day
        </ToggleGroupItem>
        <ToggleGroupItem value="week" aria-label="Toggle week">
          Week
        </ToggleGroupItem>
        <ToggleGroupItem value="month" aria-label="Toggle month">
          Month
        </ToggleGroupItem>
        <ToggleGroupItem value="year" aria-label="Toggle year">
          Year
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}