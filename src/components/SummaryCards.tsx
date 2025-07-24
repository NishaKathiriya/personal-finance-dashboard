import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFinance } from "@/context/FinanceContext";
import { DollarSign, TrendingUp, TrendingDown, Target } from "lucide-react";

export function SummaryCards() {
  const { getFinancialSummary } = useFinance();
  const summary = getFinancialSummary();

  const cards = [
    {
      title: "Total Income",
      value: summary.totalIncome,
      icon: TrendingUp,
      color: "text-income",
      bgColor: "bg-income/10",
    },
    {
      title: "Total Expenses",
      value: summary.totalExpenses,
      icon: TrendingDown,
      color: "text-expense",
      bgColor: "bg-expense/10",
    },
    {
      title: "Net Balance",
      value: summary.netBalance,
      icon: DollarSign,
      color: summary.netBalance >= 0 ? "text-income" : "text-expense",
      bgColor: summary.netBalance >= 0 ? "bg-income/10" : "bg-expense/10",
    },
    {
      title: "Total Savings",
      value: summary.totalSavings,
      icon: Target,
      color: "text-savings",
      bgColor: "bg-savings/10",
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.title} className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <div className={`p-2 rounded-full ${card.bgColor}`}>
                <Icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${card.color}`}>
                {formatCurrency(card.value)}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}