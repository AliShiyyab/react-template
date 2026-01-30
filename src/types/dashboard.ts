// Dashboard Data Types
export interface RevenueData {
  month: string;
  revenue: number;
  expenses: number;
}

export interface UserGrowthData {
  month: string;
  users: number;
}

export interface CategorySalesData {
  category: string;
  sales: number;
  fill: string;
}

export interface ActivityData {
  name: string;
  value: number;
  fill: string;
}

export interface PerformanceData {
  quarter: string;
  target: number;
  actual: number;
}

export interface StatsCardData {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
}
