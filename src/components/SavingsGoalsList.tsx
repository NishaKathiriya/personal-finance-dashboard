import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useFinance } from "@/context/FinanceContext";
import { Plus, Edit, Trash2, Target } from "lucide-react";
import { useState } from "react";
import { SavingsGoalDialog } from "./SavingsGoalDialog";
import { format, parseISO } from "date-fns";

export function SavingsGoalsList() {
  const { savingsGoals, deleteSavingsGoal } = useFinance();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<string | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const handleEdit = (goalId: string) => {
    setEditingGoal(goalId);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingGoal(null);
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Savings Goals
          </CardTitle>
          <Button onClick={() => setDialogOpen(true)} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Goal
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {savingsGoals.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No savings goals yet. Create your first goal to get started!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {savingsGoals.map((goal) => {
              const progress = (goal.currentAmount / goal.targetAmount) * 100;
              const isOverdue = new Date(goal.deadline) < new Date() && progress < 100;
              
              return (
                <div key={goal.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{goal.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Due: {format(parseISO(goal.deadline), 'MMM dd, yyyy')}
                        {isOverdue && <span className="text-destructive ml-2">(Overdue)</span>}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(goal.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteSavingsGoal(goal.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{formatCurrency(goal.currentAmount)}</span>
                      <span>{formatCurrency(goal.targetAmount)}</span>
                    </div>
                    <Progress value={Math.min(progress, 100)} className="h-2" />
                    <div className="text-right text-sm text-muted-foreground">
                      {Math.round(progress)}% complete
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        <SavingsGoalDialog
          open={dialogOpen}
          onOpenChange={handleCloseDialog}
          goalId={editingGoal}
        />
      </CardContent>
    </Card>
  );
}