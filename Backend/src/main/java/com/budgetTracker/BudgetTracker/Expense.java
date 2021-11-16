package com.budgetTracker.BudgetTracker;

import javax.persistence.*;

@Entity
@Table(name = "expenses")
public class Expense {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name="id_info")
    private int id;

    @Column(name="expense_info")
    private String expense;

    @Column(name="budget_info")
    private float budget;

    @Column(name="spent_info")
    private float spent;

    public int getId() {
        return id;
    }

    public String getExpense() {
        return expense;
    }

    public void setExpense(String expense) {
        this.expense = expense;
    }

    public float getBudget() {
        return budget;
    }

    public void setBudget(float budget) {
        this.budget = budget;
    }

    public float getSpent() {
        return spent;
    }

    public void setSpent(float spent) {
        this.spent = spent;
    }

}
