import { Line, LineChart, CartesianGrid, XAxis, YAxis } from 'recharts';
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
import type { RevenueData } from '@/types/dashboard';

interface RevenueChartProps {
  data: RevenueData[];
}

const chartConfig = {
  revenue: {
    label: 'Revenue',
    color: '#ff6200',
  },
  expenses: {
    label: 'Expenses',
    color: '#ff8e47',
  },
} satisfies ChartConfig;

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <Card className="bg-gradient-to-br from-black via-gray-900 to-black border-gray-800 shadow-lg hover:shadow-orange-500/20 transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">Revenue Overview</CardTitle>
        <CardDescription style={{ color: '#ff8e47' }}>
          Monthly revenue and expenses comparison
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <LineChart data={data}>
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
              tickFormatter={(value) => `$${value}k`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="var(--color-revenue)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="expenses"
              stroke="var(--color-expenses)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
