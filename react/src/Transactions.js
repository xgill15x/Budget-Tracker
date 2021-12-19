import React, { useState } from 'react';
import axios from 'axios'
import './App.css'
import {Link} from "react-router-dom";
import { ThemeProvider } from 'react-bootstrap';


export default class Transactions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTransactions: [],   //selected trans
            allTransactions: [], //all transactions
            allTransactionsForSelectedDate: [],
            expenses: [],
            listOfMonths: [{month:"January", monthNum: 1}, {month:"February", monthNum: 2}, {month:"March", monthNum: 3}, {month:"April", monthNum: 4}, {month:"May", monthNum: 5}, {month:"June", monthNum: 6}, {month:"July", monthNum: 7}, {month:"August", monthNum: 8}, {month:"September", monthNum: 9}, {month:"October", monthNum: 10}, {month:"November", monthNum: 11}, {month:"December", monthNum: 12}],
            selectedMonth: -1,
            selectedYear: -1,
            
            today: new Date()
        };

        this.handleSelectedMonthDropDownChange = this.handleSelectedMonthDropDownChange.bind(this);
        this.handleSelectedYearDropDownChange = this.handleSelectedYearDropDownChange.bind(this);
        this.handleSortByChange = this.handleSortByChange.bind(this);

        this.renderTableData = this.renderTableData.bind(this);
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
                    
        
                    this.setState({selectedTransactions: res.data, allTransactionsForSelectedDate: res.data}, function() {
                        
                        
                    });
                    
                })
            });
        }
    }

    handleSortByChange(e) {
        
        console.log("e.target.val",e.target.value)
        let selectionVal = -1; //temp var

        this.state.expenses.map((element) => {
                    if (element.id === parseInt(e.target.value)) {
                        selectionVal = parseInt(element.id);
                        console.log("myselectionVal: ",selectionVal)
                    }
        });

        if (selectionVal === -1) {
            this.setState({selectedTransactions: this.state.allTransactionsForSelectedDate})
        }
        else {
            
            
            const updatedTransactions = this.state.allTransactionsForSelectedDate.filter((transaction) => {
                
                
                if (transaction.expenseID === selectionVal) {
                    return transaction;
                }
            })

            this.setState({selectedTransactions: updatedTransactions})
        }
    }

    submitHandlerDeleteTransaction(e) {
        
        console.log(e.target.value)
        
        //if (this.state.deleteConfirmVal) {
            axios.delete('http://localhost:8080/transaction/deleteRow/' + e.target.value)
            .then(response => {
                const idOfDeletedTransaction = response.data;
                
                const updatedAllTransactions = this.state.allTransactions.filter((transaction) => {
                    if (transaction.id !== idOfDeletedTransaction) {
                        return transaction; // fix syntax
                    }
                });
                
                const updatedallTransactionsForSelectedDate = this.state.allTransactionsForSelectedDate.filter((transaction) => {
                    if (transaction.id !== idOfDeletedTransaction) {
                        return transaction; // fix syntax
                    }
                });

                const updatedSelectedTransactions = this.state.selectedTransactions.filter((transaction) => {
                    if (transaction.id !== idOfDeletedTransaction) {
                        return transaction; // fix syntax
                    }
                });

                this.setState({allTransaction: updatedAllTransactions, allTransactionsForSelectedDate: updatedallTransactionsForSelectedDate, selectedTransactions: updatedSelectedTransactions});
                console.log(response)
            }).catch(error => {
                console.log(error)
            }) 
            //window.location.reload();  
        //}
    }

    renderTableData() {
        return this.state.selectedTransactions.reverse().map((transaction) => {
           let expenseName;
           this.state.expenses.map((expense) => {
               if (expense.id === transaction.expenseID) {
                   expenseName = expense.expense;
               }
           })
           return (
              <tr>
                 <td>{transaction.transactionDate}</td>
                 <td>{expenseName}</td>
                 <td>{transaction.payee}</td>
                 <td>${(transaction.spent).toFixed(2)}</td>
                 <td><button name="deleteButton" value={transaction.id} onClick={(e) => {this.submitHandlerDeleteTransaction(e);}}>Delete</button></td>
              </tr>
           )
        })
        
    }

    componentDidMount() {
        axios.get("http://localhost:8080/transaction/allTransactions")
        .then(res => {
            const transactions = res.data;
            this.setState({allTransactions: transactions});
        })
        axios.get("http://localhost:8080/expense/allExpenses")
        .then(res => {
            console.log(res.data);
            const expenses = res.data;
            this.setState({expenses});
            this.setState({staticExpenses: expenses})
        })
        
        const today = new Date();
        this.setState({selectedMonth: today.getMonth()+1, selectedYear: today.getFullYear()}, function () {
            axios.get("http://localhost:8080/transaction/selectedTransactions/" + this.state.selectedMonth +"/"+ this.state.selectedYear)
                .then(res => {
                    console.log(res);
                    this.setState({selectedTransactions: res.data, allTransactionsForSelectedDate: res.data});
                    console.log("selectedMOnth", this.state.selectedMonth)
                    console.log("selectedYear", this.state.selectedYear)
                })
            
        });
        
    }

    render() {
        return (
            <div>
                <h1 className="mainTitle">All Transactions</h1>
                <div>
                    <Link to="/">
                        <button className="buttons-invariant">Go Back</button>
                    </Link>
                </div>
                
                <div className="dropdown-flex" id="dateDropDown">
                    <select value={this.state.selectedMonth} onChange={this.handleSelectedMonthDropDownChange}>
                        <option disabled value="-1">--Month--</option>
                        {
                        this.state.listOfMonths.map((element) => (
                            <option value={element.monthNum}>{element.month}</option>
                        ))}
                    </select>
                    <select onChange={this.handleSelectedYearDropDownChange}>
                        <option disabled value="-1">--Year--</option>
                        <option value={this.state.today.getFullYear()-4}>{this.state.today.getFullYear()-4}</option>
                        <option value={this.state.today.getFullYear()-3}>{this.state.today.getFullYear()-3}</option>
                        <option value={this.state.today.getFullYear()-2}>{this.state.today.getFullYear()-2}</option>
                        <option value={this.state.today.getFullYear()-1}>{this.state.today.getFullYear()-1}</option>
                        <option selected value={this.state.today.getFullYear()}>{this.state.today.getFullYear()}</option>
                    </select>
                    <select onChange={this.handleSortByChange}>
                            <option value="All">--Filter/All--</option>
                            {this.state.expenses.map((element) => (
                                <option value={element.id}>{element.expense}</option>
                            ))}
                    </select>
                </div>
                
                
                <table className="expense-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Category</th>
                            <th>Payee</th>
                            <th>Spent</th>
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