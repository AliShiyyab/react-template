import { Pie, PieChart, Cell, Legend } from 'recharts';
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
import type { CategorySalesData } from '@/types/dashboard';

interface CategorySalesChartProps {
  data: CategorySalesData[];
}

const chartConfig = {
  sales: {
    label: 'Sales',
  },
} satisfies ChartConfig;

export function CategorySalesChart({ data }: CategorySalesChartProps) {
  return (
    <Card className="bg-gradient-to-br from-black via-gray-900 to-black border-gray-800 shadow-lg hover:shadow-orange-500/20 transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">Sales by Category</CardTitle>
        <CardDescription style={{ color: '#ff8e47' }}>
          Product category distribution
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={data}
              dataKey="sales"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
