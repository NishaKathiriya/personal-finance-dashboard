export interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: string;
  type: 'income' | 'expense';
  date: string;
  createdAt: string;
}

export interface SavingsGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  createdAt: string;
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  totalSavings: number;
  netBalance: number;
}

export interface CategoryData {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
  savings: number;
}

export const TRANSACTION_CATEGORIES = {
  income: ['Salary', 'Freelance', 'Investment', 'Business', 'Gift', 'Other Income'],
  expense: ['Food', 'Rent', 'Transportation', 'Entertainment', 'Healthcare', 'Shopping', 'Utilities', 'Education', 'Other Expense']
} as const;

export type TransactionCategory = typeof TRANSACTION_CATEGORIES.income[number] | typeof TRANSACTION_CATEGORIES.expense[number];