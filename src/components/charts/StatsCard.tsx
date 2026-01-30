import { ArrowUp, ArrowDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { StatsCardData } from '@/types/dashboard';

interface StatsCardProps {
  data: StatsCardData;
}

export function StatsCard({ data }: StatsCardProps) {
  const { title, value, change, trend } = data;

  return (
    <Card className="bg-gradient-to-br from-black via-gray-900 to-black border-gray-800 hover:border-orange-500/50 shadow-lg hover:shadow-orange-500/30 transition-all duration-300 group">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium group-hover:text-orange-400 transition-colors" style={{ color: '#fff5ee' }}>
          {title}
        </CardTitle>
        {trend === 'up' ? (
          <ArrowUp className="h-4 w-4 text-green-500" />
        ) : (
          <ArrowDown className="h-4 w-4 text-red-500" />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold" style={{ color: '#ff6200' }}>
          {value}
        </div>
        <p
          className="text-xs mt-1"
          style={{
            color: trend === 'up' ? '#10b981' : '#ef4444',
          }}
        >
          {change} from last month
        </p>
      </CardContent>
    </Card>
  );
}
