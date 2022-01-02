package com.budgetTracker.BudgetTracker;

import org.springframework.data.repository.CrudRepository;

public interface ExpenseRepo extends CrudRepository<Expense, Integer> {

}
