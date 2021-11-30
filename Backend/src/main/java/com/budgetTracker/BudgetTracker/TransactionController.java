package com.budgetTracker.BudgetTracker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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
        System.out.println("Returning Transactions made in " + selectedMonth +"/"+ selectedYear);
        return selectedTransactions;
    }
}

