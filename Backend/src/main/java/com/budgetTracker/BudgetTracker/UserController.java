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
@RequestMapping(path="/user")
public class UserController {
    @Autowired
    private UserRepo userRepo;

    @GetMapping(path="/allUsers")
    public @ResponseBody
    Iterable<User> getAllUsers() {
        Iterable<User> allUsers = userRepo.findAll();
        return allUsers;
    }

    @PostMapping(path="/addRow",consumes = "application/json")
    public @ResponseBody
    int saveUser(@RequestBody User user){
        userRepo.save(user);
        return user.getId();
    }

    @DeleteMapping(path="/deleteRow/{userID}")
    public @ResponseBody
    int deleteExpense(@PathVariable("userID") int userID) {

        userRepo.deleteById(userID);

        return userID;
    }
}

