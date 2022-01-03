import axios from 'axios';

const api = 'https://www.bijoubudgetbackend.be';
const localApi = 'http://localhost:5000'

export const checkIfUserExistsEndpoint = (myUsername, myPassword) => {
    return axios.get(api + "/user/userExists/" + myUsername + "/" + myPassword);
}

export const checkIfUsernameExistsEndpoint = (myUsername) => {
    return axios.get(api + "/user/usernameTaken/" + myUsername);
}

export const addNewUserEndpoint = (myUserAccount) => {
    return axios.post(api + "/user/addRow", myUserAccount);
}

export const getAllExpensesEndpoint = () => {
    return axios.get(api + "/expense/allExpenses");
}

export const getAllTransactionsEndpoint = () => {
    return axios.get(api + "/transaction/allTransactions");
}

export const addExpenseEndpoint = (myExpense, myBudget, myUser) => {
    return axios.post(api + "/expense/addRow",{
        expense: myExpense,
        budget: myBudget,
        userName: myUser
    });
}

export const addTransactionEndpoint = (myExpenseID, myPayee, mySpent, myTransactionDate, myUser) => {
    return axios.post(api + "/transaction/addRow",{
        expenseID: myExpenseID,
        payee: myPayee,
        spent: mySpent,
        transactionDate: myTransactionDate,
        userName: myUser
    });
}

export const updateSpentEndpoint = (myExpenseID, myUpdatedSpentData) => {
    return axios.patch(api + '/expense/editSpent/' + myExpenseID, myUpdatedSpentData);
}

export const deleteExpenseEndpoint = (myExpenseID) => {
    return axios.delete(api + '/expense/deleteRow/' + myExpenseID);
}

export const deleteTransactionsOfExpenseEndpoint = (myExpenseID) => {
    return axios.delete(api + '/transaction/deleteExpenseTransactions/' + myExpenseID);
}

export const editExpenseEndpoint = (myExpenseID, myUpdatedData) => {
    return axios.patch(api + '/expense/editRow/' + myExpenseID, myUpdatedData);
}

export const transactionsForSelectedDateEndpoint = (myUpdatedMonth, myUpdatedYear) => {
    return axios.get(api + "/transaction/selectedTransactions/" + myUpdatedMonth + "/" + myUpdatedYear);
}

export const deleteTransactionsEndpoint = (myTransactionID) => {
    return axios.delete(api + '/transaction/deleteRow/' + myTransactionID);
}