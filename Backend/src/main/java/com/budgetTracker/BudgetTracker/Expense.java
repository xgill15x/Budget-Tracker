package com.budgetTracker.BudgetTracker;

import javax.persistence.*;

@Entity
@Table(name = "expenses")
public class Expense {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name="id")
    private int id;

    @Column(name="expense")
    private String expense;

    @Column(name="budget")
    private float budget;

    @Column(name="spent")
    private float spent;

    @Column(name="username")
    private String userName;

    public Expense(){

    }

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

    public String getUserName() { return userName; }

    public void setUserName(String userName) { this.userName = userName; }
}
