// components/dashboard/health-statistics-grid.tsx
'use client'; // Diperlukan untuk state, effect, dan grafik

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip, // Pastikan Tooltip diimpor
} from 'recharts';
import {
  HeartPulse,
  Footprints, // Pastikan Footsteps diimpor
  Zap,
  BedDouble,
  Droplet,
  Scale,
  Ruler,
  Edit,
  BarChartHorizontal,
} from 'lucide-react';

// 1. Impor hook dan supabase client
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

// --- Data Dummy untuk Grafik ---
const heartRateData = [
  { time: '00:00', bpm: 70 }, { time: '03:00', bpm: 65 }, { time: '06:00', bpm: 75 },
  { time: '09:00', bpm: 80 }, { time: '12:00', bpm: 85 }, { time: '15:00', bpm: 90 },
];
// Data dummy baru untuk steps, yang lama terlalu sedikit
const stepsData = [
  { time: '06:00', steps: 50 }, { time: '07:00', steps: 300 }, { time: '08:00', steps: 1000 },
  { time: '12:00', steps: 1200 }, { time: '15:00', steps: 2500 }, { time: '18:00', steps: 3000 },
];
const energyData = [
  { day: 'Mon', kcal: 320 }, { day: 'Tue', kcal: 450 }, { day: 'Wed', kcal: 280 },
  { day: 'Thu', kcal: 500 }, { day: 'Fri', kcal: 420 }, { day: 'Sat', kcal: 600 },
];
// --- Akhir Data Dummy ---

export function HealthStatisticsGrid() {
  const [height, setHeight] = useState<number | null>(null);
  const [weight, setWeight] = useState<number | null>(null);
  const [bloodType, setBloodType] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('height_cm, weight_kg, blood_type')
          .eq('id', user.id)
          .single();
        if (profileData) {
          setHeight(profileData.height_cm);
          setWeight(profileData.weight_kg);
          setBloodType(profileData.blood_type);
        }
      }
      setLoading(false);
    };
    fetchProfileData();
  }, []);

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold text-gray-900">Health Statistics</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        
        {/* --- 3 Kartu Statis (NON-DUMMY) --- */}
        <StatCard
          icon={Edit}
          title="Height"
          value={loading ? '...' : (height ? `${height}` : 'N/A')}
          unit="cm"
        />
        <StatCard
          icon={BarChartHorizontal}
          title="Weight"
          value={loading ? '...' : (weight ? `${weight}` : 'N/A')}
          unit="kg"
        />
        <StatCard
          icon={Droplet}
          title="Blood"
          value={loading ? '...' : (bloodType || 'N/A')}
          unit="blood type"
        />
        
        {/* --- 3 Kartu Grafik Besar --- */}

        {/* =================================== */}
        {/* PERBAIKAN KARTU HEART RATE         */}
        {/* =================================== */}
        <Card>
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
            {/* Mengganti Placeholder dengan Grafik */}
            <div className="h-24 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={heartRateData} margin={{ top: 5, right: 10, left: -30, bottom: 0 }}>
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                    labelFormatter={(label) => `Jam: ${label}`}
                    formatter={(value: number) => [`${value} BPM`, "Detak Jantung"]}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="bpm" 
                    stroke="#ef4444" /* Warna Merah */
                    strokeWidth={2} 
                    dot={false} 
                  />
                  <XAxis dataKey="time" hide />
                  <YAxis domain={['dataMin - 10', 'dataMax + 10']} hide />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* =================================== */}
        {/* PERBAIKAN KARTU STEPS              */}
        {/* =================================== */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-medium">
              <Footprints className="h-5 w-5 text-primary" /> Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold">3000</span>
              <span className="text-sm text-muted-foreground">Steps</span>
            </div>
            {/* Mengganti Placeholder dengan Grafik */}
            <div className="h-24 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stepsData} margin={{ top: 5, right: 10, left: -30, bottom: 0 }}>
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                    labelFormatter={(label) => `Jam: ${label}`}
                    formatter={(value: number) => [`${value} Langkah`, "Langkah"]}
                  />
                  <Line 
                    type="step" /* Grafik 'step' agar terlihat patah-patah */
                    dataKey="steps" 
                    stroke="hsl(var(--primary))" /* Warna Hijau Primer */
                    strokeWidth={2} 
                    dot={false} 
                  />
                  <XAxis dataKey="time" hide />
                  <YAxis domain={[0, 'dataMax + 500']} hide />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Kartu Active Energy (Tetap sama) */}
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
            <div className="h-24 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={energyData}>
                  <Tooltip wrapperStyle={{ outline: 'none' }} contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                  <Bar dataKey="kcal" fill="#1f2937" radius={[4, 4, 0, 0]} />
                  <XAxis dataKey="day" hide />
                  <YAxis domain={[0, 'dataMax + 100']} hide />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}

// Komponen helper (Tetap sama)
function StatCard({ icon: Icon, title, value, unit }: { icon: React.ElementType, title: string, value: string, unit: string }) {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{unit}</p>
      </CardContent>
    </Card>
  );
}