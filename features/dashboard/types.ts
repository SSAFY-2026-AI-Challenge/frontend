export type DashboardCredit = {
  score: number;
  grade: string;
};

export type DashboardRecentTransaction = {
  id: number;
  occurredAt: string;
  description: string;
  amount: number;
};

export type StudentDashboardResponse = {
  period: string;
  job: string;
  incomeThisMonth: number;
  expenseThisMonth: number;
  totalAssets: number;
  savingsBalance: number;
  savingsRate: number;
  credit: DashboardCredit;
  recentTransactions: DashboardRecentTransaction[];
};