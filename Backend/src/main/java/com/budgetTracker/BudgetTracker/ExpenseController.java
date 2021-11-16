package com.budgetTracker.BudgetTracker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Iterator;
import java.util.List;
import java.util.Optional;

@Controller
@CrossOrigin
@RequestMapping(path="/expense")
public class ExpenseController {
    @Autowired
    private ExpenseRepo expenseRepo;

    Expense test = new Expense();

    @GetMapping(path="/allExpenses")
    public @ResponseBody
    Iterable<Expense> getAllExpenses() {
        Iterable<Expense> allExpenses = expenseRepo.findAll();
        Iterator<Expense> expenseIterator = allExpenses.iterator();
        Expense current = new Expense();
        Iterator<Expense> e = allExpenses.iterator();

        while (e.hasNext()){
            e.next().getExpense();
        }
        System.out.println("getAllExpenses() finished.");

        return allExpenses;
    }

    @PostMapping(path="/newRow",consumes = "application/json")
    public @ResponseBody
    void saveExpense(@RequestBody Expense e){
        System.out.println(e.getExpense());
        expenseRepo.save(e);
    }

}
