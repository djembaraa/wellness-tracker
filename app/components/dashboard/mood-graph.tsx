// components/dashboard/mood-graph.tsx
'use client'; // Diperlukan untuk state, effect, dan grafik

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid, // Tambahkan ini untuk grid
} from 'recharts';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { format } from 'date-fns'; // Untuk format tanggal

// Tipe data untuk log mood dari Supabase
interface MoodLog {
  created_at: string;
  mood_rating: number;
}

export function MoodGraph() {
  // State untuk menyimpan data non-dummy
  const [moodData, setMoodData] = useState<any[]>([]); // Ganti 'any' jika kamu punya tipe spesifik
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMoodData = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // Hitung tanggal 7 hari yang lalu
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        // Ambil data mood 7 hari terakhir
        const { data, error } = await supabase
          .from('mood_logs')
          .select('created_at, mood_rating')
          .eq('user_id', user.id)
          .gte('created_at', sevenDaysAgo.toISOString()) // Filter >= 7 hari lalu
          .order('created_at', { ascending: true }); // Urutkan dari terlama

        if (data) {
          // Format data agar sesuai dengan Recharts
          const formattedData = data.map((log: MoodLog) => ({
            // Format tanggal menjadi 'Sen', 'Sel', dst. atau 'DD/MM'
            name: format(new Date(log.created_at), 'EEE'), // 'EEE' = Mon, Tue, ...
            // name: format(new Date(log.created_at), 'dd/MM'), // Alternatif
            mood: log.mood_rating,
            fullDate: format(new Date(log.created_at), 'dd MMM yyyy'), // Untuk tooltip
          }));
          setMoodData(formattedData);
        }
      }
      setLoading(false);
    };

    fetchMoodData();
  }, []);

  // Komponen Tooltip Kustom
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow text-sm">
          <p className="font-semibold">{`Tanggal: ${payload[0].payload.fullDate}`}</p>
          <p className="text-primary">{`Mood: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Grafik Perubahan Mood (7 Hari Terakhir)</CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        {loading ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            Memuat data mood...
          </div>
        ) : moodData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={moodData}
              margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" stroke="#888888" fontSize={12} />
              <YAxis
                stroke="#888888"
                fontSize={12}
                domain={[0, 10]} // Skala 0-10
                allowDecimals={false} // Jangan tampilkan desimal
              />
              {/* Gunakan Tooltip Kustom */}
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="mood"
                stroke="hsl(var(--primary))" // Ambil warna dari variabel CSS
                strokeWidth={3}
                dot={{
                  fill: 'hsl(var(--primary))',
                  r: 4,
                }}
                activeDot={{
                  r: 6,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Belum ada data mood untuk 7 hari terakhir.
          </div>
        )}
      </CardContent>
    </Card>
  );
}