// components/dashboard/activity-feed.tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Flame, Footprints, Dumbbell, Bike } from 'lucide-react';

export function ActivityFeed() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold">Activity</h2>

      {/* Kartu Calorie Burnt (Accordion) */}
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1" className="rounded-lg border bg-white shadow-sm">
          <AccordionTrigger className="px-6">
            <div className="flex items-center gap-3">
              <Flame className="h-5 w-5 text-red-500" />
              <span className="font-semibold">Calorie Burnt</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6">
            <div className="mb-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold">1000</span>
              <span className="text-sm text-muted-foreground">Kcal</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Average calorie burnt over all activity is 500 Kcal.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Daftar Latest Activity */}
      <div>
        <h3 className="mb-4 text-lg font-semibold">Latest Activity</h3>
        <div className="flex flex-col gap-4">
          <ActivityItem
            icon={Footprints}
            iconColor="text-green-500"
            title="Running"
            date="Dec 3, 2023 - 09:00 AM - 10:00 AM"
            stat1="10 km"
            stat2="1 hours"
          />
          <ActivityItem
            icon={Dumbbell}
            iconColor="text-blue-500"
            title="Treadmill"
            date="Dec 2, 2023 - 08:00 AM - 08:30 AM"
            stat1="5 km"
            stat2="30 minutes"
          />
          <ActivityItem
            icon={Bike}
            iconColor="text-purple-500"
            title="Cycling"
            date="Dec 1, 2023 - 07:00 AM - 10:00 AM"
            stat1="40 km"
            stat2="3 hours"
          />
        </div>
      </div>
    </div>
  );
}

// Komponen helper kecil untuk item aktivitas
function ActivityItem({
  icon: Icon,
  iconColor,
  title,
  date,
  stat1,
  stat2,
}: {
  icon: React.ElementType,
  iconColor: string,
  title: string,
  date: string,
  stat1: string,
  stat2: string,
}) {
  return (
    <Card className="flex items-center gap-4 p-4 shadow-sm">
      {/* Ikon */}
      <div className={`rounded-full bg-primary/10 p-3 ${iconColor}`}>
        <Icon className="h-6 w-6" />
      </div>
      
      {/* Info Teks */}
      <div className="flex-1">
        <h4 className="font-semibold">{title}</h4>
        <p className="text-xs text-muted-foreground">{date}</p>
        <div className="mt-1 flex gap-4 text-sm font-medium">
          <span>{stat1}</span>
          <span>{stat2}</span>
        </div>
      </div>
      
      {/* Placeholder Peta */}
      <div className="h-16 w-16 flex-shrink-0 rounded-md bg-gray-200 flex items-center justify-center">
        <span className="text-xs text-gray-500">Map</span>
      </div>
    </Card>
  );
}