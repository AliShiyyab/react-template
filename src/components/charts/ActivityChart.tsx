import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import type { ActivityData } from '@/types/dashboard';

interface ActivityChartProps {
  data: ActivityData[];
}

const chartConfig = {
  value: {
    label: 'Activity',
    color: '#ff6200',
  },
} satisfies ChartConfig;

export function ActivityChart({ data }: ActivityChartProps) {
  return (
    <Card className="bg-gradient-to-br from-black via-gray-900 to-black border-gray-800 shadow-lg hover:shadow-orange-500/20 transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">Daily Activity</CardTitle>
        <CardDescription style={{ color: '#ff8e47' }}>
          User engagement throughout the week
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff6200" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ff6200" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis
              dataKey="name"
              stroke="#fff5ee"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#fff5ee"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#ff6200"
              fillOpacity={1}
              fill="url(#colorActivity)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
