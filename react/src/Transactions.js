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
            expenses: [],
            sortBySelection: 0
        };

        this.renderTableData = this.renderTableData.bind(this);
        this.handleSortByChange = this.handleSortByChange.bind(this);
        //this.initSortByDropDown = this.initSortByDropDown.bind(this);
    }

    handleSortByChange(e) {
        
        console.log(e.target.value)
        let selectionVal = -1; //temp var

        this.state.expenses.map((element) => {
                    if (element.expense === e.target.value) {
                        selectionVal = element.id;
                        console.log(selectionVal)
                    }
        });

        if (selectionVal === -1) {
            this.setState({selectedTransactions: this.state.allTransactions})
        }
        else {

            

            console.log("All Transactions:" , this.state.allTransactions)
            console.log("SelectVal", selectionVal)
            const updatedTransactions = this.state.allTransactions.filter((element) => {
                if (element.expenseID === selectionVal) {
                    return element;
                }
            })

            this.setState({selectedTransactions: updatedTransactions})
        }
    }

    // initSortByDropDown() {
    //     let lowestIndexExpense = -1;
    //     {this.state.expenses.map((element) => {
    //         if (lowestIndexExpense === -1) {
    //             lowestIndexExpense = element.id;
    //         }
    //         else {
    //             if (element.id < lowestIndexExpense) {
    //                 lowestIndexExpense = element.id;
    //             }
    //         }
    //     })}
        
    //     let elementWithSmallestIndex = "";
    //     {this.state.expenses.map((element) => {
    //         if (element.id === lowestIndexExpense) {
    //             elementWithSmallestIndex = element.expense;
    //         }
    //     })}

    //     this.setState({sortBySelection: lowestIndexExpense});
    // }

    renderTableData() {
        return this.state.selectedTransactions.reverse().map((element) => {
            
           return (
              <tr>
                 <td>{element.transactionDate}</td>
                 <td>{element.expenseValue}</td>
                 <td>{element.payee}</td>
                 <td>${(element.spent).toFixed(2)}</td>
              </tr>
           )
        })
        
    }

    componentDidMount() {
        axios.get("http://localhost:8080/transaction/allTransactions")
        .then(res => {
            const transactions = res.data;
            this.setState({allTransactions: transactions, selectedTransactions: transactions});
        })
        axios.get("http://localhost:8080/expense/allExpenses")
        .then(res => {
            console.log(res.data);
            const expenses = res.data;
            this.setState({expenses});
            this.setState({staticExpenses: expenses})
        })
        
    }

    render() {
        return (
            <div>
                <h1 className="mainTitle">All Transactions</h1>
                <div>
                    <Link to="/">
                        <button>Go Back</button>
                    </Link>
                </div>
                
                    <label>Sort By:
                        <select onChange={this.handleSortByChange}>
                            <option value="All">ALL</option>
                            {this.state.expenses.map((element) => (
                                <option value={element.expense}>{element.expense}</option>
                            ))}
                        </select>
                    </label>
                
                <table className="expense-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Category</th>
                            <th>Payee</th>
                            <th>Spent</th>
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