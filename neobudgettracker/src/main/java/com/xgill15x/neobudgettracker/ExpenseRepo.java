package com.xgill15x.neobudgettracker;

import org.springframework.data.repository.CrudRepository;

public interface ExpenseRepo extends CrudRepository<Expense, Integer> {
}
