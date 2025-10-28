// components/dashboard/counseling-summary.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { counselingSummary } from '@/lib/data';
import { Users, Timer } from 'lucide-react';

export function CounselingSummary() {
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
            {counselingSummary.totalSessions}
          </div>
          <p className="text-xs text-muted-foreground">Total Sesi</p>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-primary">
            {counselingSummary.avgDurationMinutes}
          </div>
          <p className="text-xs text-muted-foreground">Menit/Sesi</p>
        </div>
      </CardContent>
    </Card>
  );
}