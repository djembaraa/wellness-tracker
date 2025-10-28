// components/dashboard/health-statistics-grid.tsx
'use client'; // Grafik adalah 'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { HeartPulse, Footprints, Zap, BedDouble, Droplet, Scale, Ruler } from 'lucide-react';

// --- Data Dummy untuk Grafik ---
const heartRateData = [
  { time: '00:00', bpm: 70 }, { time: '03:00', bpm: 65 }, { time: '06:00', bpm: 75 },
  { time: '09:00', bpm: 80 }, { time: '12:00', bpm: 85 }, { time: '15:00', bpm: 90 },
  { time: '18:00', bpm: 82 }, { time: '21:00', bpm: 75 },
];

const stepsData = [
  { time: '09:00', steps: 200 }, { time: '10:00', steps: 1500 }, { time: '12:00', steps: 3000 },
  { time: '15:00', steps: 4000 }, { time: '18:00', steps: 5000 },
];

const energyData = [
  { day: 'Mon', kcal: 320 }, { day: 'Tue', kcal: 450 }, { day: 'Wed', kcal: 280 },
  { day: 'Thu', kcal: 500 }, { day: 'Fri', kcal: 420 }, { day: 'Sat', kcal: 600 },
  { day: 'Sun', kcal: 310 },
];

const sleepData = [
  { type: 'Sleep', hours: 7.5 },
  { type: 'Nap', hours: 0.5 },
];
// --- Akhir Data Dummy ---

export function HealthStatisticsGrid() {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">Health Statistics</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* --- 3 Kartu Statis Kecil --- */}
        <StatCard icon={Ruler} title="Height" value="170" unit="cm" />
        <StatCard icon={Scale} title="Weight" value="78" unit="kg" />
        <StatCard icon={Droplet} title="Blood" value="AB+" unit="blood type" />
        
        {/* --- 4 Kartu Grafik Besar --- */}
        {/* Kartu Heart Rate */}
        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-medium">
              <HeartPulse className="h-5 w-5 text-red-500" /> Heart Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold">77</span>
              <span className="text-sm text-muted-foreground">BPM</span>
            </div>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={heartRateData}>
                  <Tooltip contentStyle={{ backgroundColor: 'white', borderRadius: '8px' }} />
                  <Line type="monotone" dataKey="bpm" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                  <XAxis dataKey="time" hide />
                  <YAxis domain={['dataMin - 10', 'dataMax + 10']} hide />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Kartu Steps */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-medium">
              <Footprints className="h-5 w-5 text-primary" /> Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold">1000</span>
              <span className="text-sm text-muted-foreground">Steps</span>
            </div>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stepsData}>
                  <Tooltip contentStyle={{ backgroundColor: 'white', borderRadius: '8px' }} />
                  <Line type="step" dataKey="steps" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                  <XAxis dataKey="time" hide />
                  <YAxis domain={[0, 'dataMax + 1000']} hide />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Kartu Active Energy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-medium">
              <Zap className="h-5 w-5 text-yellow-500" /> Active Energy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold">41.5</span>
              <span className="text-sm text-muted-foreground">Kcal</span>
            </div>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={energyData}>
                  <Tooltip contentStyle={{ backgroundColor: 'white', borderRadius: '8px' }} />
                  <Bar dataKey="kcal" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <XAxis dataKey="day" hide />
                  <YAxis domain={[0, 'dataMax + 100']} hide />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Kartu Sleep Activity */}
        <Card className="md:col-span-2 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-medium">
              <BedDouble className="h-5 w-5 text-blue-500" /> Sleep Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold">9</span>
              <span className="text-sm text-muted-foreground">Hours</span>
            </div>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sleepData} layout="vertical">
                  <Tooltip contentStyle={{ backgroundColor: 'white', borderRadius: '8px' }} />
                  <Bar dataKey="hours" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={20} />
                  <XAxis type="number" hide />
                  <YAxis dataKey="type" type="category" axisLine={false} tickLine={false} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}

// Komponen helper kecil untuk 3 kartu statis di atas
function StatCard({ icon: Icon, title, value, unit }: { icon: React.ElementType, title: string, value: string, unit: string }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{unit}</p>
      </CardContent>
    </Card>
  );
}