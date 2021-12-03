import React, { useState } from 'react';
import axios from 'axios'
import './App.css'
import AddExpenseForm from './AddExpenseForm';
import DeleteExpenseForm from './DeleteExpenseForm';
import EditExpenseForm from './EditExpenseForm';
import AddTransactionForm from './AddTransactionForm';
import {Link} from "react-router-dom";
import Moment from 'moment';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
            expenses: [],
            editDropDownSelection:0,
            transactionDropDownSelection:0,

            addExpenseToggle: false,
            addTransactionToggle: false,
            deleteExpenseToggle: false,
            deleteConfirmVal: false,
            editExpenseToggle: false,

            selectedTransactions: [],
            listOfMonths: [{month:"January", monthNum: 1}, {month:"February", monthNum: 2}, {month:"March", monthNum: 3}, {month:"April", monthNum: 4}, {month:"May", monthNum: 5}, {month:"June", monthNum: 6}, {month:"July", monthNum: 7}, {month:"August", monthNum: 8}, {month:"September", monthNum: 9}, {month:"October", monthNum: 10}, {month:"November", monthNum: 11}, {month:"December", monthNum: 12}],
            selectedMonth: -1,
            selectedYear: -1,
            
            today: new Date(),
            spentValsForAllExpenses: new Map()
        };

        this.toggleAddExpenseModal = this.toggleAddExpenseModal.bind(this);
        this.toggleAddTransactionModal = this.toggleAddTransactionModal.bind(this)
        this.toggleDeleteExpenseModal = this.toggleDeleteExpenseModal.bind(this);
        this.toggleEditExpenseModal = this.toggleEditExpenseModal.bind(this);
        
        this.handleConfirmDelete = this.handleConfirmDelete.bind(this);
        this.handleEditDropDownChange = this.handleEditDropDownChange.bind(this);
        this.handleTransactionDropDownChange = this.handleTransactionDropDownChange.bind(this);
        this.handleSelectedMonthDropDownChange = this.handleSelectedMonthDropDownChange.bind(this);
        this.handleSelectedYearDropDownChange = this.handleSelectedYearDropDownChange.bind(this);

        this.initEditDropDown = this.initEditDropDown.bind(this);
        this.initTransactionDropDown = this.initTransactionDropDown.bind(this);
        this.submitHandlerEditExpense = this.submitHandlerEditExpense.bind(this);
        //this.listOfMonths = this.listOfMonths.bind(this);
        
    }

    submitHandlerAddExpense = e => {
        e.preventDefault();
        axios.post("http://localhost:8080/expense/addRow",{
            expense: e.target[0].value,
            budget: e.target[1].value
        }).then(response => {
            
            const newId = response.data;
            const newExpense = e.target[0].value;
            const newBudget = parseFloat(e.target[1].value);
            
            console.log("Expense: " + e.target[0].value + "\n" + "Budget: " + e.target[1].value + "\n" + "Assigned ID: " + response.data)
            const newExpenseObject = {
                id: newId,
                expense: newExpense,
                budget: newBudget,
                spent: 0.0,
                remaining: newBudget
            }
            this.setState({
                expenses: [...this.state.expenses, newExpenseObject]
            }, function() {
                let updatedMap = new Map(this.state.spentValsForAllExpenses);
                updatedMap.set(newExpenseObject.id, 0.0);
                this.setState({spentValsForAllExpenses: updatedMap});
            })
        }).catch(error => {
            console.log(error)
        })  
        //window.location.reload(); 
    }

    submitHandlerAddTransaction = e => {
        e.preventDefault();
        
        const today = Moment(new Date()).format('YYYY-MM-DD');
        console.log('test', Moment(today).format('YYYY-MM-DD'));
        // const todayYear = today.getFullYear()
        // const todayMonth = today.getMonth()+1
        // const todayDay = today.getDate()
        
        let expenseSpent;
        let nameOfExpense; 
        this.state.expenses.filter((element) => {
            if (element.id === this.state.transactionDropDownSelection) {
                nameOfExpense = element.expense;
                expenseSpent = element.spent;
            }
        })

        axios.post("http://localhost:8080/transaction/addRow",{
            expenseID: this.state.transactionDropDownSelection,
            payee: e.target[1].value,
            spent: parseFloat(e.target[2].value),
            expenseValue: nameOfExpense, 
            transactionDate: today
        }).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })

        const updateData = {
            spent: expenseSpent + parseFloat(e.target[2].value)
        }

        axios.patch('http://localhost:8080/expense/editSpent/' + this.state.transactionDropDownSelection, updateData)
        
        let updatedMap = new Map(this.state.spentValsForAllExpenses);
        let targetID;
        this.state.expenses.map((expense) => {
            console.log("dropdownselection",this.state.transactionDropDownSelection)
            if (expense.id === this.state.transactionDropDownSelection) {
                targetID = expense.id;
                console.log("targetID",targetID)
            }
        })

        this.state.expenses.map((expense) => {
            if (expense.id === targetID) {
                console.log("in here");
                updatedMap.set(expense.id, updatedMap.get(expense.id) + parseFloat(e.target[2].value))
                console.log(updatedMap.get(expense.id));
            }
        })

        const updatedExpenses = this.state.expenses.filter( (element) => {
            if (element.id === this.state.transactionDropDownSelection) {
                element.spent = expenseSpent + parseFloat(e.target[2].value)
                return element;
            }
            else {
                return element;
            }
        })

        this.setState({expenses: updatedExpenses, spentValsForAllExpenses: updatedMap})
    
    }

    handleConfirmDelete(element){
        // Update the document title using the browser API
        element = true;
    }
    submitHandlerDeleteExpense (e) {
        //this.setState({id: e.target.value}) // value = expense id
        console.log(e.target.value)
        
        //if (this.state.deleteConfirmVal) {
            axios.delete('http://localhost:8080/expense/deleteRow/' + e.target.value)
            .then(response => {
                const idOfDeletedExpense = response.data;
                const updatedExpenses = this.state.expenses.filter((expense) => {
                    if (expense.id !== idOfDeletedExpense) {
                        return expense; // fix syntax
                    }
                });
                this.setState({expenses: updatedExpenses});
                console.log(response)
            }).catch(error => {
                console.log(error)
            }) 
            //window.location.reload();  
        //}
    }

    submitHandlerEditExpense (e) {
        e.preventDefault();
        //console.log(e);

        const data = {
            expense: e.target[1].value,
            budget: parseFloat(e.target[2].value)
        }
        axios.patch('http://localhost:8080/expense/editRow/' + this.state.editDropDownSelection, data)
        .then(response => {
            console.log(response)
            const idOfEditedExpense = response.data;
            const updatedExpenses = this.state.expenses.filter((element) => {
                if (element.id !== idOfEditedExpense) {
                    return element;
                }
                else{
                    element.expense = e.target[1].value;
                    element.budget = parseFloat(e.target[2].value);
                    return element;
                }
                
            })
            this.setState({expenses: updatedExpenses});
        }).catch(error => {
            console.log(error)
        })

        
    }

    initEditDropDown() {
        let lowestIndexExpense = -1;
        {this.state.expenses.map((element) => {
            if (lowestIndexExpense === -1) {
                lowestIndexExpense = element.id;
            }
            else {
                if (element.id < lowestIndexExpense) {
                    lowestIndexExpense = element.id;
                }
            }
        })}
        
        let elementWithSmallestIndex = "";
        {this.state.expenses.map((element) => {
            if (element.id === lowestIndexExpense) {
                elementWithSmallestIndex = element.id;
            }
        })}

        this.setState({editDropDownSelection: elementWithSmallestIndex});
    }
    handleEditDropDownChange(e) {
        //console.log(e);
        let selectedElement=0;
        {this.state.expenses.map((element) => {
            if (element.expense === e.target.value) {
                selectedElement = element.id;
            }
        })}
        this.setState({ editDropDownSelection: selectedElement });
    }

    initTransactionDropDown() {
        let lowestIndexExpense = -1;
        {this.state.expenses.map((element) => {
            if (lowestIndexExpense === -1) {
                lowestIndexExpense = element.id;
            }
            else {
                if (element.id < lowestIndexExpense) {
                    lowestIndexExpense = element.id;
                }
            }
        })}
        
        let elementWithSmallestIndex = "";
        {this.state.expenses.map((element) => {
            if (element.id === lowestIndexExpense) {
                elementWithSmallestIndex = element.id;
            }
        })}

        this.setState({transactionDropDownSelection: elementWithSmallestIndex});
    }
    handleTransactionDropDownChange(e) {
        let selectedElement=0;
        {this.state.expenses.map((element) => {
            if (element.expense === e.target.value) {
                selectedElement = element.id;
            }
        })}
        this.setState({ transactionDropDownSelection: selectedElement });
    }

    handleSelectedMonthDropDownChange(e) {
        let selectedElement=0;
        //console.log(e.target.value)
        if (e.target.value === "-1") {
            console.log("No month selected.")
            return;
        }
        else{
            {this.state.listOfMonths.map((element) => {
                if (element.monthNum === parseInt(e.target.value)) {
                    selectedElement = element.monthNum;
                }
            })}
            this.setState({selectedMonth: selectedElement}, function () {
                axios.get("http://localhost:8080/transaction/selectedTransactions/" + this.state.selectedMonth +"/"+ this.state.selectedYear)
                .then(res => {
                    console.log("newTransactionDate(MonthChange): ", res.data);
                    
                    let updatedMap = new Map(this.state.spentValsForAllExpenses);

                    this.state.expenses.map((expense) => {
                        updatedMap.set(expense.id, 0.0);
                    })
                    
                    this.setState({selectedTransactions: res.data, spentValsForAllExpenses: updatedMap}, function(){
                        let changingSpentMap = new Map(this.state.spentValsForAllExpenses);
                        
                        this.state.selectedTransactions.map((transaction) => {
                            const expenseSpentVal = changingSpentMap.get(transaction.expenseID)
                            changingSpentMap.set(transaction.expenseID, expenseSpentVal + transaction.spent);
                
                        })
                        this.setState({spentValsForAllExpenses: changingSpentMap})
                    })
                })
            });
        }
    }

    handleSelectedYearDropDownChange(e) {
        let selectedElement=0;
        //console.log(e.target.value)
        if (e.target.value === "-1") {
            console.log("No Year selected.")
            return;
        }
        else{
            selectedElement = e.target.value;
            
            this.setState({selectedYear: selectedElement}, function () {
                axios.get("http://localhost:8080/transaction/selectedTransactions/" + this.state.selectedMonth +"/"+ this.state.selectedYear)
                .then(res => {
                    console.log("newTransactionDate(YearChange): " ,res.data);

                    let updatedMap = new Map(this.state.spentValsForAllExpenses);
                                       
                    this.state.expenses.map((expense) => {
                        updatedMap.set(expense.id, 0.0);
                    })
                    
        
                    this.setState({selectedTransactions: res.data, spentValsForAllExpenses: updatedMap}, function() {
                        let changingSpentMap = new Map(this.state.spentValsForAllExpenses);
                        
                        this.state.selectedTransactions.map((transaction) => {
                            const expenseSpentVal = changingSpentMap.get(transaction.expenseID)
                            changingSpentMap.set(transaction.expenseID, expenseSpentVal + transaction.spent);
                
                        })
                        this.setState({spentValsForAllExpenses: changingSpentMap})
                    });
                    
                })
            });
        }
    }

    toggleAddExpenseModal() {
        this.setState({addExpenseToggle : !this.state.addExpenseToggle});
    }
    toggleAddTransactionModal() {
        this.setState({addTransactionToggle: !this.state.addTransactionToggle});
    }
    toggleDeleteExpenseModal() {
        this.setState({deleteExpenseToggle : !this.state.deleteExpenseToggle});
    }
    toggleEditExpenseModal() {
        this.setState({editExpenseToggle: !this.state.editExpenseToggle});
    }

    renderTableData() {

        return this.state.expenses.map((element) => {
            
           const amountSpent = this.state.spentValsForAllExpenses.get(element.id);
           //console.log(amountSpent);
           return (
              <tr>
                 <td>{element.expense}</td>
                 <td>${(element.budget).toFixed(2)}</td>
                 <td>${(amountSpent)}</td>
                 <td>${(element.budget-amountSpent).toFixed(2)}</td>
                 <td><button name="deleteButton" value={element.id} onClick={(e) => {this.submitHandlerDeleteExpense(e);this.toggleDeleteExpenseModal()}}>Delete</button></td>
              </tr>
           )
        })
        
    }

    componentDidMount() {
        axios.get("http://localhost:8080/expense/allExpenses")  // gets all expenses from mysql
        .then(res => {
            const expenses = res.data;
            console.log('axios expenses: ', expenses);
            this.setState({expenses});

            const today = new Date();
            this.setState({selectedMonth: today.getMonth()+1, selectedYear: today.getFullYear()}, function () { //gets transactions for current month and year
                axios.get("http://localhost:8080/transaction/selectedTransactions/" + this.state.selectedMonth +"/"+ this.state.selectedYear)
                .then(res => {
                    this.setState({selectedTransactions: res.data});
                    
                    let updatedSpentValsForAllExpenses = new Map(); // rename to better name
                    this.state.expenses.map((expense) => {
                        updatedSpentValsForAllExpenses.set(expense.id, 0.0);
            
                    });
            
                    this.setState({spentValsForAllExpenses: updatedSpentValsForAllExpenses});

                    this.state.selectedTransactions.map((transaction) => {
                        let tempMap = new Map(this.state.spentValsForAllExpenses);
                        const expenseSpentVal = tempMap.get(transaction.expenseID)
                        tempMap.set(transaction.expenseID, expenseSpentVal + transaction.spent);
                        this.setState({spentValsForAllExpenses: tempMap})
                    })

                
                    // let newMap = new Map(myHashMap);
                    // console.log('newMap', newMap);

                    // newMap.filter((expenseId){
                    //     if (expenseId === transactions.expenseId)
                    //     {
                    //        newMap.set(expenseId, newMap.get(expenseId) + transaction.spentVal) 
                    //     }
                    // });
                })
            });
    
            
        })

    }


    render() {
        return (
            <div>
                <h1 className="mainTitle">Budget Tracker</h1>
                <div className="buttons-flex">
                    <button onClick={this.toggleAddExpenseModal}>Add Expense</button>
                    <button onClick={ () => {this.toggleAddTransactionModal();this.initTransactionDropDown();}}>Add Transaction</button>
                    <button onClick={ () => {this.toggleEditExpenseModal();this.initEditDropDown();}}>Edit Expense</button>
                    <Link to="/transactionsTable">
                        <button className="buttons-flex">Show Transactions</button>
                    </Link>
                </div>
                <AddExpenseForm  handleClose={this.toggleAddExpenseModal} show={this.state.addExpenseToggle} submitHandler={this.submitHandlerAddExpense}/>
                {/*<DeleteExpenseForm show={this.state.deleteExpenseToggle} handleClose={this.toggleDeleteExpenseModal} deletConfirm={this.state.deleteConfirmVal} handleDeleteConfirm={this.handleConfirmDelete} /> */}
                <EditExpenseForm myList={this.state.expenses} handleClose={this.toggleEditExpenseModal} handleChange={this.handleEditDropDownChange} show={this.state.editExpenseToggle} submitHandler={this.submitHandlerEditExpense}/>
                <AddTransactionForm  myList={this.state.expenses} handleClose={this.toggleAddTransactionModal} show={this.state.addTransactionToggle} submitHandler={this.submitHandlerAddTransaction} handleChange={this.handleTransactionDropDownChange}/>
                
                <div className="dropdown-flex">
                    <select value={this.state.selectedMonth} onChange={this.handleSelectedMonthDropDownChange}>
                        <option disabled value="-1">--Month--</option>
                        {
                        this.state.listOfMonths.map((element) => (
                            <option value={element.monthNum}>{element.month}</option>
                        ))}
                    </select>
                    <select onChange={this.handleSelectedYearDropDownChange}>
                        <option disabled value="-1">--Year--</option>
                        <option value={this.state.today.getFullYear()-2}>{this.state.today.getFullYear()-2}</option>
                        <option value={this.state.today.getFullYear()-1}>{this.state.today.getFullYear()-1}</option>
                        <option selected value={this.state.today.getFullYear()}>{this.state.today.getFullYear()}</option>
                        <option value={this.state.today.getFullYear()+1}>{this.state.today.getFullYear()+1}</option>
                        <option value={this.state.today.getFullYear()+2}>{this.state.today.getFullYear()+2}</option>
                    </select>
                </div>
                
                <table className="expense-table">
                    <thead>
                        <tr>
                            <th>Expense</th>
                            <th>Budget</th>
                            <th>Spent</th>
                            <th>Remaining</th>
                            <th>Delete()</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTableData()}
                    </tbody>
                </table>
            </div>
        )
    }
}