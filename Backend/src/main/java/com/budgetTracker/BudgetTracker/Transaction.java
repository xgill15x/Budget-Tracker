package com.budgetTracker.BudgetTracker;

import javax.persistence.*;

@Entity
@Table(name = "transactions")
public class Transaction {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name="trans_id")
    private int id;

    @Column(name="expenseID_info")
    private int expenseID;

    @Column(name="payee_info")
    private String payee;

    @Column(name="spent_info")
    private float spent;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getExpenseID() { return expenseID; }

    public void setExpenseID(int expenseID) { this.expenseID = expenseID; }

    public String getPayee() {
        return payee;
    }

    public void setPayee(String payee) {
        this.payee = payee;
    }

    public float getSpent() {
        return spent;
    }

    public void setSpent(float spent) {
        this.spent = spent;
    }

    public Transaction(){

    }

}
