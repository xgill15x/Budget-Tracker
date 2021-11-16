package com.budgetTracker.BudgetTracker;

import org.springframework.data.repository.CrudRepository;
import com.budgetTracker.BudgetTracker.Expense;

public interface ExpenseRepo extends CrudRepository<Expense, Integer> {

}
