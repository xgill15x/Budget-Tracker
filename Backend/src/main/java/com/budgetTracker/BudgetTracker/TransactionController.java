package com.budgetTracker.BudgetTracker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Iterator;
import java.util.List;
import java.util.Optional;

@Controller
@CrossOrigin
@RequestMapping(path="/transaction")
public class TransactionController {
    @Autowired
    private TransactionRepo transactionRepo;
    @GetMapping(path="/allTransactions")
    public @ResponseBody
    Iterable<Transaction> getAllTransactions() {
        Iterable<Transaction> allTransactions = transactionRepo.findAll();
        System.out.println("Component Mounted: Transaction Table Data rendered.");
        return allTransactions;
    }

    @PostMapping(path="/addRow",consumes = "application/json")
    public @ResponseBody
    int saveTransaction(@RequestBody Transaction t){
        System.out.println(t.getExpenseID());
        transactionRepo.save(t);
        return t.getId();
    }

    // getTransactionsByMonth with param month (number of month or string)
    //

}

