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

    @GetMapping(path="/userExists/{username}/{password}")
    public  @ResponseBody
    boolean userExists(@PathVariable("username") String username, @PathVariable("password") String password) {

        boolean usernameFound = false;
        User myUser = null;

        //get all users
        Iterable<User> allUsers = userRepo.findAll();
        Iterator<User> iter = allUsers.iterator();

        //check if username is in database
        while (iter.hasNext() && usernameFound == false) {
            User currentUser = iter.next();
            //System.out.println(currentUser.getUsername() + "-" + username);

            if (currentUser.getUsername().equals(username)) {
                System.out.println("username is found");
                usernameFound = true;
                myUser = currentUser;
            }
        }

        //check if user was found
        if (usernameFound != false) {

            //check if provided password matches password in database
            if (password.equals(myUser.getPassword())) {
                System.out.println("Account Authenticated");
                return true;
            }
        }

        System.out.println("Account NOT Authenticated");
        return false;
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

