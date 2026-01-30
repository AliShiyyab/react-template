import { RevenueChart } from '../components/charts/RevenueChart';
import { UserGrowthChart } from '../components/charts/UserGrowthChart';
import { CategorySalesChart } from '../components/charts/CategorySalesChart';
import { ActivityChart } from '../components/charts/ActivityChart';
import { PerformanceChart } from '../components/charts/PerformanceChart';
import { StatsCard } from '../components/charts/StatsCard';
import type {
  RevenueData,
  UserGrowthData,
  CategorySalesData,
  ActivityData,
  PerformanceData,
  StatsCardData,
} from '../types/dashboard';

// Mock data with proper typing
const revenueData: RevenueData[] = [
  { month: 'Jan', revenue: 45, expenses: 30 },
  { month: 'Feb', revenue: 52, expenses: 35 },
  { month: 'Mar', revenue: 48, expenses: 32 },
  { month: 'Apr', revenue: 61, expenses: 38 },
  { month: 'May', revenue: 55, expenses: 36 },
  { month: 'Jun', revenue: 67, expenses: 42 },
];

const userGrowthData: UserGrowthData[] = [
  { month: 'Jan', users: 1200 },
  { month: 'Feb', users: 1450 },
  { month: 'Mar', users: 1680 },
  { month: 'Apr', users: 1890 },
  { month: 'May', users: 2100 },
  { month: 'Jun', users: 2340 },
];

const categorySalesData: CategorySalesData[] = [
  { category: 'Electronics', sales: 4500, fill: '#ff6200' },
  { category: 'Clothing', sales: 3200, fill: '#ff8e47' },
  { category: 'Books', sales: 2100, fill: '#ffc39a' },
  { category: 'Home', sales: 1800, fill: '#fff5ee' },
];

const activityData: ActivityData[] = [
  { name: 'Mon', value: 120, fill: '#ff6200' },
  { name: 'Tue', value: 145, fill: '#ff6200' },
  { name: 'Wed', value: 168, fill: '#ff6200' },
  { name: 'Thu', value: 189, fill: '#ff6200' },
  { name: 'Fri', value: 210, fill: '#ff6200' },
  { name: 'Sat', value: 234, fill: '#ff6200' },
  { name: 'Sun', value: 198, fill: '#ff6200' },
];

const performanceData: PerformanceData[] = [
  { quarter: 'Q1', target: 100, actual: 85 },
];

const statsData: StatsCardData[] = [
  {
    title: 'Total Revenue',
    value: '$328k',
    change: '+12.5%',
    trend: 'up',
  },
  {
    title: 'Active Users',
    value: '2,340',
    change: '+5.2%',
    trend: 'up',
  },
  {
    title: 'Total Orders',
    value: '1,234',
    change: '-2.4%',
    trend: 'down',
  },
  {
    title: 'Conversion Rate',
    value: '3.24%',
    change: '+0.5%',
    trend: 'up',
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 p-6">
      <div className="mb-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 bg-clip-text text-transparent animate-gradient">
          Dashboard
        </h1>
        <p className="mt-3 text-lg" style={{ color: '#ff8e47' }}>
          Overview of your business metrics and performance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, index) => (
          <StatsCard key={index} data={stat} />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        <RevenueChart data={revenueData} />
        <UserGrowthChart data={userGrowthData} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <CategorySalesChart data={categorySalesData} />
        <ActivityChart data={activityData} />
        <PerformanceChart data={performanceData} />
      </div>
    </div>
  );
}
