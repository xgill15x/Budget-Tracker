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

        System.out.println("Component Mounted: Table Data rendered.");

        return allExpenses;
    }

    @PostMapping(path="/addRow",consumes = "application/json")
    public @ResponseBody
    void saveExpense(@RequestBody Expense e){
        System.out.println(e.getExpense());
        expenseRepo.save(e);
        return;
    }
    @DeleteMapping(path="/deleteRow/{expenseID}")
    public @ResponseBody
    int deleteExpense(@PathVariable("expenseID") int expenseID){

        expenseRepo.deleteById(expenseID);
        return expenseID;
    }

}
