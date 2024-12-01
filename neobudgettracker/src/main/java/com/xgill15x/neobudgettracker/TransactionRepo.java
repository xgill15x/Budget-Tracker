package com.xgill15x.neobudgettracker;

import org.springframework.data.repository.CrudRepository;

public interface TransactionRepo extends CrudRepository<Transaction,Integer> {
}
