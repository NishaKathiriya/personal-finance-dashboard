import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFinance } from "@/context/FinanceContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { MonthlyData } from "@/types/finance";
import { format, parseISO, startOfMonth, isSameMonth } from "date-fns";

export function MonthlyTrendChart() {
  const { transactions } = useFinance();

  // Get last 6 months of data
  const monthsData: MonthlyData[] = [];
  const now = new Date();
  
  for (let i = 5; i >= 0; i--) {
    const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthStr = format(month, 'MMM yyyy');
    
    const monthlyTransactions = transactions.filter(t => {
      const transactionDate = parseISO(t.date);
      return isSameMonth(transactionDate, month);
    });
    
    const income = monthlyTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = monthlyTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    monthsData.push({
      month: monthStr,
      income,
      expenses,
      savings: income - expenses,
    });
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Monthly Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
              <Tooltip formatter={(value) => formatCurrency(value as number)} />
              <Legend />
              <Bar dataKey="income" fill="hsl(var(--income))" name="Income" />
              <Bar dataKey="expenses" fill="hsl(var(--expense))" name="Expenses" />
              <Bar dataKey="savings" fill="hsl(var(--savings))" name="Net Savings" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}