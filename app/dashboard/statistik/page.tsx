// app/dashboard/statistik/page.tsx
'use client'; // Diperlukan untuk Tabs dan Grafik

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import {
  HeartPulse,
  Scale,
  BedDouble,
  Droplet,
  Footprints,
  TrendingUp,
} from 'lucide-react';

// --- Data Dummy (tetap sama) ---
const weightTrendData = Array.from({ length: 30 }, (_, i) => ({
  hari: i + 1,
  berat: 78 + Math.sin(i / 3) * 1.5 + Math.random() * 0.5,
}));
const sleepDetailData = [
  { day: 'Sen', Deep: 4, Light: 2.5, REM: 1.5 },
  { day: 'Sel', Deep: 3.5, Light: 3, REM: 1 },
  { day: 'Rab', Deep: 5, Light: 2, REM: 1.2 },
  { day: 'Kam', Deep: 4.2, Light: 2.8, REM: 1.3 },
  { day: 'Jum', Deep: 3.8, Light: 2.5, REM: 1.7 },
  { day: 'Sab', Deep: 6, Light: 2, REM: 1.5 },
  { day: 'Min', Deep: 4.5, Light: 2.5, REM: 1.1 },
];
const bloodCheckData = {
  cholesterol: 195,
  glucose: 90,
  hba1c: 5.4,
};
const activityData = [
  { day: 'Sen', steps: 8500 },
  { day: 'Sel', steps: 9200 },
  { day: 'Rab', steps: 7800 },
  { day: 'Kam', steps: 10500 },
  { day: 'Jum', steps: 8800 },
  { day: 'Sab', steps: 12400 },
  { day: 'Min', steps: 9500 },
];
// --- Akhir Data Dummy ---

// --- Komponen Halaman Statistik ---
export default function StatistikPage() {
  return (
    // ======================================================
    // PERBAIKAN STRUKTUR DIMULAI DI SINI
    // ======================================================
    <Tabs defaultValue="bulanan" className="w-full">
      <div className="flex flex-col gap-6">
        {/* 1. Header Halaman dan Filter Tab */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Laporan Statistik
          </h1>
          {/* TabsList sekarang ada di dalam Tabs utama */}
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="mingguan">Mingguan</TabsTrigger>
            <TabsTrigger value="bulanan">Bulanan</TabsTrigger>
            <TabsTrigger value="tahunan">Tahunan</TabsTrigger>
          </TabsList>
        </div>

        {/* --- KONTEN TAB BULANAN --- */}
        <TabsContent value="bulanan" className="mt-0">
          <div className="flex flex-col gap-6">
            {/* 2. Kartu Ringkasan Statistik */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard
                title="Rata-rata Detak Jantung"
                value="74 BPM"
                icon={HeartPulse}
                trend="2%"
              />
              <StatCard
                title="Perubahan Berat Badan (30 Hari)"
                value="-1.2 kg"
                icon={Scale}
                trend="-1.5%"
              />
              <StatCard
                title="Rata-rata Tidur"
                value="7j 15m"
                icon={BedDouble}
                trend="5%"
              />
            </div>

            {/* 3. Grafik Besar - Tren Berat Badan */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="h-5 w-5" />
                  Tren Berat Badan (30 Hari Terakhir)
                </CardTitle>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weightTrendData}>
                    <defs>
                      <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="hari" unit=" Hari" fontSize={12} />
                    <YAxis domain={['dataMin - 2', 'dataMax + 2']} unit="kg" fontSize={12} />
                    <Tooltip formatter={(value: number) => [value.toFixed(1) + ' kg', 'Berat']} />
                    <Area type="monotone" dataKey="berat" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorWeight)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* 4. Grid Detail 2x2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Kartu Detail Tidur */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BedDouble className="h-5 w-5" />
                    Detail Aktivitas Tidur (Mingguan)
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={sleepDetailData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="day" fontSize={12} />
                          <YAxis unit=" jam" fontSize={12} />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="Deep" stackId="a" fill="#34A89A" name="Tidur Pulas" />
                          <Bar dataKey="Light" stackId="a" fill="#88D4CD" name="Tidur Ringan" />
                          <Bar dataKey="REM" stackId="a" fill="#C0FDFB" name="REM" radius={[4, 4, 0, 0]}/>
                      </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Kartu Aktivitas (Langkah Kaki) */}
               <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Footprints className="h-5 w-5" />
                    Aktivitas Langkah (Mingguan)
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={activityData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="day" fontSize={12} />
                          <YAxis unit=" langkah" fontSize={12} />
                          <Tooltip />
                          <Bar dataKey="steps" fill="hsl(var(--primary))" name="Langkah" radius={[4, 4, 0, 0]} />
                      </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Kartu Cek Darah */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Droplet className="h-5 w-5" />
                    Hasil Cek Darah (Statis)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="divide-y divide-gray-200">
                    <BloodStatItem title="Kolesterol Total" value={`${bloodCheckData.cholesterol} mg/dL`} status="Normal" />
                    <BloodStatItem title="Glukosa (Puasa)" value={`${bloodCheckData.glucose} mg/dL`} status="Normal" />
                    <BloodStatItem title="HbA1c" value={`${bloodCheckData.hba1c} %`} status="Normal" />
                  </ul>
                  <p className="mt-4 text-xs text-muted-foreground">
                    *Data ini adalah placeholder dan harus diisi oleh profesional medis.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* --- KONTEN TAB MINGGUAN (TAMBAHAN) --- */}
        <TabsContent value="mingguan" className="mt-0">
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Konten Mingguan</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Ini adalah konten untuk tab mingguan.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* --- KONTEN TAB TAHUNAN (TAMBAHAN) --- */}
        <TabsContent value="tahunan" className="mt-0">
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Konten Tahunan</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Ini adalah konten untuk tab tahunan.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </div>
    </Tabs> // <-- <Tabs> DITUTUP DI SINI, MEMBUNGKUS SEMUA <TabsContent>
  );
}

// --- Komponen Helper (tetap sama) ---

function StatCard({ title, value, icon: Icon, trend }: {
  title: string;
  value: string;
  icon: React.ElementType;
  trend: string;
}) {
  const isPositive = trend.startsWith('+') || !trend.startsWith('-');
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          <TrendingUp className="inline h-3 w-3 mr-1" />
          {trend} vs bulan lalu
        </p>
      </CardContent>
    </Card>
  );
}

function BloodStatItem({ title, value, status }: {
  title: string;
  value: string;
  status: string;
}) {
  return (
    <li className="flex items-center justify-between py-3">
      <span className="text-sm font-medium text-gray-700">{title}</span>
      <div className="text-right">
        <span className="text-sm font-semibold text-gray-900">{value}</span>
        <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
          {status}
        </span>
      </div>
    </li>
  );
}