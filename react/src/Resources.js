import React from 'react';
import axios from 'axios';

const api = 'https://www.bijoubudgetbackend.be';

export const addExpenseCall = (myExpense, myBudget, myUser) => {
    return axios.post(api + "/expense/addRow",{
        expense: myExpense,
        budget: myBudget,
        userName: myUser
    });
}

