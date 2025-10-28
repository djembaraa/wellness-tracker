// components/dashboard/counseling-summary.tsx
'use client'; // Diperlukan untuk state & effect

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export function CounselingSummary() {
  // State untuk menyimpan data non-dummy
  const [totalSessions, setTotalSessions] = useState<number | null>(null);
  const [avgDuration, setAvgDuration] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessionData = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // Ambil data durasi dari semua sesi pengguna
        const { data, error } = await supabase
          .from('counseling_sessions')
          .select('duration_minutes')
          .eq('user_id', user.id);

        if (data && data.length > 0) {
          // Hitung total sesi
          setTotalSessions(data.length);

          // Hitung rata-rata durasi
          const totalMinutes = data.reduce((sum, session) => sum + (session.duration_minutes || 0), 0);
          const average = data.length > 0 ? Math.round(totalMinutes / data.length) : 0;
          setAvgDuration(average);
        } else {
          // Jika tidak ada data
          setTotalSessions(0);
          setAvgDuration(0);
        }
      }
      setLoading(false);
    };

    fetchSessionData();
  }, []);

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">
          Ringkasan Sesi
        </CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="flex justify-around pt-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-primary">
            {loading ? '...' : totalSessions ?? '0'}
          </div>
          <p className="text-xs text-muted-foreground">Total Sesi</p>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-primary">
            {loading ? '...' : avgDuration ?? '0'}
          </div>
          <p className="text-xs text-muted-foreground">Menit/Sesi</p>
        </div>
      </CardContent>
    </Card>
  );
}