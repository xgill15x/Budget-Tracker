package com.budgetTracker.BudgetTracker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Iterator;
import java.util.List;
import java.util.Optional;

@Controller
@CrossOrigin
@RequestMapping(path="/expense")
public class ExpenseController {
    @Autowired
    private ExpenseRepo expenseRepo;

    @GetMapping(path="/allExpenses")
    public @ResponseBody
    Iterable<Expense> getAllExpenses() {
        System.out.println("In getAllExpenses()");
        Iterable<Expense> allExpenses = expenseRepo.findAll();
        Iterator<Expense> expenseIterator = allExpenses.iterator();
        Expense current = new Expense();
        Iterator<Expense> e = allExpenses.iterator();

        while (e.hasNext()){
            System.out.println(e.next().getExpense());
        }


        return allExpenses;
    }

}
