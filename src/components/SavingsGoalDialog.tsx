import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFinance } from "@/context/FinanceContext";
import { useToast } from "@/hooks/use-toast";

interface SavingsGoalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  goalId?: string | null;
}

export function SavingsGoalDialog({ open, onOpenChange, goalId }: SavingsGoalDialogProps) {
  const { savingsGoals, addSavingsGoal, updateSavingsGoal } = useFinance();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: "",
    targetAmount: "",
    currentAmount: "",
    deadline: "",
  });

  const editingGoal = goalId ? savingsGoals.find(g => g.id === goalId) : null;
  const isEditing = !!editingGoal;

  useEffect(() => {
    if (editingGoal) {
      setFormData({
        title: editingGoal.title,
        targetAmount: editingGoal.targetAmount.toString(),
        currentAmount: editingGoal.currentAmount.toString(),
        deadline: editingGoal.deadline.split('T')[0], // Convert to YYYY-MM-DD format
      });
    } else {
      setFormData({
        title: "",
        targetAmount: "",
        currentAmount: "",
        deadline: "",
      });
    }
  }, [editingGoal, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.targetAmount || !formData.deadline) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const goalData = {
      title: formData.title,
      targetAmount: parseFloat(formData.targetAmount),
      currentAmount: parseFloat(formData.currentAmount) || 0,
      deadline: new Date(formData.deadline).toISOString(),
    };

    if (isEditing && goalId) {
      updateSavingsGoal(goalId, goalData);
      toast({
        title: "Success",
        description: "Savings goal updated successfully",
      });
    } else {
      addSavingsGoal(goalData);
      toast({
        title: "Success",
        description: "Savings goal created successfully",
      });
    }

    onOpenChange(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Savings Goal" : "Add New Savings Goal"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Goal Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="e.g., Emergency Fund, Vacation, New Car"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetAmount">Target Amount *</Label>
            <Input
              id="targetAmount"
              type="number"
              step="0.01"
              min="0"
              value={formData.targetAmount}
              onChange={(e) => handleInputChange("targetAmount", e.target.value)}
              placeholder="0.00"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="currentAmount">Current Amount</Label>
            <Input
              id="currentAmount"
              type="number"
              step="0.01"
              min="0"
              value={formData.currentAmount}
              onChange={(e) => handleInputChange("currentAmount", e.target.value)}
              placeholder="0.00"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="deadline">Deadline *</Label>
            <Input
              id="deadline"
              type="date"
              value={formData.deadline}
              onChange={(e) => handleInputChange("deadline", e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {isEditing ? "Update Goal" : "Create Goal"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}