import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFinance } from "@/context/FinanceContext";
import { DollarSign, TrendingUp, TrendingDown, Target } from "lucide-react";
import { SummaryCards } from "./SummaryCards";
import { CategoryChart } from "./CategoryChart";
import { MonthlyTrendChart } from "./MonthlyTrendChart";
import { SavingsGoalsList } from "./SavingsGoalsList";

export function Dashboard() {
  const { getFinancialSummary } = useFinance();
  const summary = getFinancialSummary();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Track your finances and achieve your goals
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <SummaryCards />

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <CategoryChart />
        <MonthlyTrendChart />
      </div>

      {/* Savings Goals */}
      <div className="grid gap-6">
        <SavingsGoalsList />
      </div>
    </div>
  );
}