// components/dashboard/mood-graph.tsx
'use client'; // Grafik perlu interaksi, jadi 'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { moodHistory } from '@/lib/data';
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export function MoodGraph() {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Grafik Perubahan Mood (7 Hari)</CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={moodHistory}
            margin={{ top: 5, right: 10, left: -20, bottom: 5 }} // Atur margin agar YAxis terlihat
          >
            <XAxis dataKey="name" stroke="#888888" fontSize={12} />
            <YAxis
              stroke="#888888"
              fontSize={12}
              domain={[0, 10]} // Skala 0-10
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
              }}
            />
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
      </CardContent>
    </Card>
  );
}