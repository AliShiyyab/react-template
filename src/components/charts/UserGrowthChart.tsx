import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
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
import type { UserGrowthData } from '@/types/dashboard';

interface UserGrowthChartProps {
  data: UserGrowthData[];
}

const chartConfig = {
  users: {
    label: 'Users',
    color: '#ff6200',
  },
} satisfies ChartConfig;

export function UserGrowthChart({ data }: UserGrowthChartProps) {
  return (
    <Card className="bg-gradient-to-br from-black via-gray-900 to-black border-gray-800 shadow-lg hover:shadow-orange-500/20 transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">User Growth</CardTitle>
        <CardDescription style={{ color: '#ff8e47' }}>
          Monthly active users trend
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis
              dataKey="month"
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
            <Bar dataKey="users" fill="var(--color-users)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
