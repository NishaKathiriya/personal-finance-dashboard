import { Transaction, SavingsGoal } from "@/types/finance";

export const sampleTransactions: Transaction[] = [
  {
    id: "1",
    amount: 5000,
    description: "Monthly Salary",
    category: "Salary",
    type: "income",
    date: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    amount: 1200,
    description: "Monthly Rent",
    category: "Rent",
    type: "expense",
    date: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    amount: 300,
    description: "Grocery Shopping",
    category: "Food",
    type: "expense",
    date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "4",
    amount: 500,
    description: "Freelance Project",
    category: "Freelance",
    type: "income",
    date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: "5",
    amount: 150,
    description: "Gas Station",
    category: "Transportation",
    type: "expense",
    date: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    createdAt: new Date(Date.now() - 259200000).toISOString(),
  },
  {
    id: "6",
    amount: 80,
    description: "Netflix & Spotify",
    category: "Entertainment",
    type: "expense",
    date: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
    createdAt: new Date(Date.now() - 432000000).toISOString(),
  },
];

export const sampleSavingsGoals: SavingsGoal[] = [
  {
    id: "1",
    title: "Emergency Fund",
    targetAmount: 10000,
    currentAmount: 3500,
    deadline: new Date(Date.now() + 15552000000).toISOString(), // 6 months from now
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Vacation to Europe",
    targetAmount: 5000,
    currentAmount: 1200,
    deadline: new Date(Date.now() + 31104000000).toISOString(), // 1 year from now
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "New Laptop",
    targetAmount: 2000,
    currentAmount: 800,
    deadline: new Date(Date.now() + 7776000000).toISOString(), // 3 months from now
    createdAt: new Date().toISOString(),
  },
];