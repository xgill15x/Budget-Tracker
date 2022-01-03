package com.budgetTracker.BudgetTracker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Controller
@CrossOrigin
@RequestMapping(path="/transaction")
public class TransactionController {

    @Autowired
    private TransactionRepo transactionRepo;

    @GetMapping(path="/allTransactions")
    public @ResponseBody
    Iterable<Transaction> getAllTransactions() {
        return transactionRepo.findAll();
    }

    @PostMapping(path="/addRow",consumes = "application/json")
    public @ResponseBody
    int saveTransaction(@RequestBody Transaction t){
        transactionRepo.save(t);
        return t.getId();
    }

    @DeleteMapping(path="/deleteRow/{transactionID}")
    public @ResponseBody
    int deleteExpense(@PathVariable("transactionID") int transactionID) {
        transactionRepo.deleteById(transactionID);

        return transactionID;
    }

    @DeleteMapping(path="/deleteExpenseTransactions/{expenseID}")
    public @ResponseBody
    int deleteExpenseTransactions(@PathVariable("expenseID") int expenseID) {
        Iterable<Transaction> allTransactions = transactionRepo.findAll();

        for (Transaction currentTransaction : allTransactions) {
            if (currentTransaction.getExpenseID() == expenseID) {
                transactionRepo.deleteById(currentTransaction.getId());
            }
        }

        return expenseID;
    }

    @GetMapping(path= "/selectedTransactions/{selectedMonth}/{selectedYear}")
    public @ResponseBody
    List<Transaction> getSelectedTransactions(@PathVariable("selectedMonth") int selectedMonth, @PathVariable("selectedYear") int selectedYear) {

        Iterable<Transaction> allTransactions = transactionRepo.findAll();
        Iterator<Transaction> iter = allTransactions.iterator();

        List<Transaction> selectedTransactions = new ArrayList<>();

        while (iter.hasNext()) {
            Transaction currentTransaction = iter.next();
            String transactionDate = currentTransaction.getTransactionDate();
            String[] brokenTransactionDate = transactionDate.split("-");

            int TransactionYear = Integer.parseInt(brokenTransactionDate[0]);
            int TransactionMonth = Integer.parseInt(brokenTransactionDate[1]);

            if (TransactionMonth == selectedMonth && TransactionYear == selectedYear) {
                selectedTransactions.add(currentTransaction);
            }
        }
        return selectedTransactions;
    }
}

