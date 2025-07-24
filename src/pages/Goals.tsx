import { SavingsGoalsList } from "@/components/SavingsGoalsList";

export default function Goals() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Savings Goals</h1>
          <p className="text-muted-foreground">
            Set and track your financial goals
          </p>
        </div>
        <SavingsGoalsList />
      </div>
    </div>
  );
}