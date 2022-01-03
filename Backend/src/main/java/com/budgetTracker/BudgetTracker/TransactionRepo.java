package com.budgetTracker.BudgetTracker;
import org.springframework.data.repository.CrudRepository;

public interface TransactionRepo extends CrudRepository<Transaction,Integer> {
}
