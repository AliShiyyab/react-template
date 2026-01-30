import { RadialBar, RadialBarChart, PolarAngleAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  type ChartConfig,
} from '@/components/ui/chart';
import type { PerformanceData } from '@/types/dashboard';

interface PerformanceChartProps {
  data: PerformanceData[];
}

const chartConfig = {
  actual: {
    label: 'Actual',
    color: '#ff6200',
  },
  target: {
    label: 'Target',
    color: '#ff8e47',
  },
} satisfies ChartConfig;

export function PerformanceChart({ data }: PerformanceChartProps) {
  const percentage = data.length > 0 
    ? Math.round((data[data.length - 1].actual / data[data.length - 1].target) * 100)
    : 0;

  const chartData = [
    {
      name: 'Performance',
      value: percentage,
      fill: '#ff6200',
    },
  ];

  return (
    <Card className="bg-gradient-to-br from-black via-gray-900 to-black border-gray-800 shadow-lg hover:shadow-orange-500/20 transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">Performance</CardTitle>
        <CardDescription style={{ color: '#ff8e47' }}>
          Current quarter goal achievement
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <RadialBarChart
            data={chartData}
            startAngle={90}
            endAngle={90 - (percentage * 3.6)}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              angleAxisId={0}
              tick={false}
            />
            <RadialBar
              background
              dataKey="value"
              cornerRadius={10}
              fill="var(--color-actual)"
            />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-4xl font-bold"
              fill="#ff6200"
            >
              {percentage}%
            </text>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
