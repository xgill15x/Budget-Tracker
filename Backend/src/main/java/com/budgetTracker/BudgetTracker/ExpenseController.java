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
        System.out.println("Component Mounted: Expense Table Data rendered.");
        return allExpenses;
    }

    @PostMapping(path="/addRow",consumes = "application/json")
    public @ResponseBody
    int saveExpense(@RequestBody Expense e){
        System.out.println(e.getExpense());
        expenseRepo.save(e);
        return e.getId();
    }
    @DeleteMapping(path="/deleteRow/{expenseID}")
    public @ResponseBody
    int deleteExpense(@PathVariable("expenseID") int expenseID) {
        System.out.println(expenseID);
        expenseRepo.deleteById(expenseID);

        return expenseID;
    }

    @PatchMapping(path="/editRow/{expenseID}")
    public @ResponseBody
    int editExpense(@PathVariable("expenseID") int expenseID, @RequestBody Expense e) {
        Optional<Expense> conn = expenseRepo.findById(expenseID);
        Expense oldExpense = conn.get();

        oldExpense.setExpense(e.getExpense());
        oldExpense.setBudget(e.getBudget());

        expenseRepo.save(oldExpense);

        return expenseID;
    }

    @PatchMapping(path="/editSpent/{expenseID}")
    public @ResponseBody
    int editSpent(@PathVariable("expenseID") int expenseID, @RequestBody Expense e) {
        Optional<Expense> conn = expenseRepo.findById(expenseID);
        Expense oldExpense = conn.get();

        oldExpense.setSpent(e.getSpent());
        //oldExpense.setBudget(e.getBudget());

        expenseRepo.save(oldExpense);

        return expenseID;
    }

}