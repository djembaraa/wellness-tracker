// components/dashboard/daily-motivation.tsx
'use client'; // Perlu state & effect, jadi 'use client'

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motivationMessages } from '@/lib/data';
import { Sparkles } from 'lucide-react';

export function DailyMotivation() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Tambahkan timeout agar React tahu ini async (tidak dianggap sinkron)
    const timer = setTimeout(() => {
      const randomMsg =
        motivationMessages[
          Math.floor(Math.random() * motivationMessages.length)
        ];
      setMessage(randomMsg);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow bg-primary/5 border-primary/20">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">
          Pesan Motivasi Harian
        </CardTitle>
        <Sparkles className="h-4 w-4 text-primary" />
      </CardHeader>
      <CardContent>
        <p className="text-lg italic text-gray-700 pt-2">{`"{message}"`}</p>
      </CardContent>
    </Card>
  );
}