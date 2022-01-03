package com.budgetTracker.BudgetTracker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Iterator;

@Controller
@CrossOrigin
@RequestMapping(path="/user")
public class UserController {

    @Autowired
    private UserRepo userRepo;

    @GetMapping(path="/userExists/{username}/{password}")
    public  @ResponseBody
    boolean userExists(@PathVariable("username") String username, @PathVariable("password") String password) {

        boolean usernameFound = false;
        User myUser = null;

        //get all users
        Iterable<User> allUsers = userRepo.findAll();
        Iterator<User> iter = allUsers.iterator();

        //check if username is in database
        while (iter.hasNext() && !usernameFound) {
            User currentUser = iter.next();

            if (currentUser.getUsername().equals(username)) {
                usernameFound = true;
                myUser = currentUser;
            }
        }

        if (usernameFound) {
            return password.equals(myUser.getPassword());
        }

        return false;
    }

    @GetMapping(path="/usernameTaken/{username}")
    public @ResponseBody
    boolean usernameIsTaken (@PathVariable String username) {
        boolean usernameIsTaken = false;

        //get all users
        Iterable<User> allUsers = userRepo.findAll();
        Iterator<User> iter = allUsers.iterator();

        //check if username is in database
        while (iter.hasNext() && !usernameIsTaken) {
            User currentUser = iter.next();

            if (currentUser.getUsername().equals(username)) {
                usernameIsTaken = true;
            }
        }
        return usernameIsTaken;
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

