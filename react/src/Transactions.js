import React, { useState } from 'react';
import axios from 'axios'
import './App.css'
import {Link} from "react-router-dom";
import { ThemeProvider } from 'react-bootstrap';
import Home from './Home';
import {createBrowserHistory} from "history";
import Login from './Login'



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
            
            today: new Date(),

            showTransactions: true,
            showHome: false,
            showLogin: false
        };

        this.handleSelectedMonthDropDownChange = this.handleSelectedMonthDropDownChange.bind(this);
        this.handleSelectedYearDropDownChange = this.handleSelectedYearDropDownChange.bind(this);
        this.handleSortByChange = this.handleSortByChange.bind(this);

        this.renderTableData = this.renderTableData.bind(this);
        this.renderTransactions = this.renderTransactions.bind(this);
        this.renderHome = this.renderHome.bind(this);
        this.renderLogin = this.renderLogin.bind(this);
        this.changeLoginSetState = this.changeLoginSetState.bind(this);
    }

    handleSelectedMonthDropDownChange(e) {
        
        const pathName = window.location.pathname;
        const username = pathName.split('/')[2];
        
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
                    console.log(res.data);

                    let userTransactions = (res.data).filter((transaction) => {
                        if (transaction.userName === username) {
                            return transaction;
                        }
                    })
                    
                    let updatedMap = new Map(this.state.spentValsForAllExpenses);

                    this.state.expenses.map((expense) => {
                        updatedMap.set(expense.id, 0.0);
                    })
                    
                    this.setState({selectedTransactions: userTransactions, spentValsForAllExpenses: userTransactions}, function(){
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
        
        const pathName = window.location.pathname;
        const username = pathName.split('/')[2];

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
                    // console.log("newTransactionDate(YearChange): " ,res.data);
                    
        
                    // this.setState({selectedTransactions: res.data, allTransactionsForSelectedDate: res.data}, function() {
                        
                        
                    // });
                    console.log(res.data);

                    let userTransactions = (res.data).filter((transaction) => {
                        if (transaction.userName === username) {
                            return transaction;
                        }
                    })
                    console.log("users transactions", userTransactions)
                    this.setState({selectedTransactions: userTransactions, allTransactionsForSelectedDate: userTransactions}, function() {
                        console.log(this.state.selectedTransactions)
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

    renderLogin() {
        
        const history = createBrowserHistory();
        history.push('/');   //changes address and bottom code changes the rendering
            return (<>
                {/* <Link to={homePage}>{<Home username={this.state.username}/>}</Link> */}
                
                <Login />
            </>)
    }
    changeLoginSetState() {
        this.setState({showLogin: true, showHome: false, showTransactions: false});
    }

    renderTransactions() {
        const pathName = window.location.pathname;
        const username = pathName.split('/')[2];
        
        if (localStorage.getItem("auth") === "authenticated"){
            return (
                <div>
                    <h1 className="mainTitle">My Transactions</h1>
                    <div>
                        {/* <Link to="/"> */}
                            <button onClick={() => {this.setState({showHome: true, showTransactions: false})}}className="buttons-invariant">Go Back</button>
                        {/* </Link> */}
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
        else {
            
            return (<>
                {/* <Link to={homePage}>{<Home username={this.state.username}/>}</Link> */}
                <div><h2>You need to sign in to access this page.</h2></div>
                <div className="buttons-flex"><button id="signIn-button" onClick={() => this.changeLoginSetState()}>Sign in</button></div>
                
            </>)
        }
    }

    renderHome() {
        const pathName = window.location.pathname;
        const username = pathName.split('/')[2];
        
        const history = createBrowserHistory();
        history.push('/home/' + username);   //changes address and bottom code changes the rendering
        return (<>
            {/* <Link to={homePage}>{<Home username={this.state.username}/>}</Link> */}
            <Home />
        </>)
    }

    componentDidMount() {

        const pathName = window.location.pathname;
        const username = pathName.split('/')[2];
        
        axios.get("http://localhost:8080/transaction/allTransactions") //getting all transactions in db
        .then(res => { 
            const transactions = res.data;
            this.setState({allTransactions: transactions});
        })

        axios.get("http://localhost:8080/expense/allExpenses")  //getting all expenses in db
        .then(res => {

            let userExpenses = (res.data).filter((expense) => {
                if (expense.userName === username) {
                    return expense;
                }
            })
            this.setState({expenses: userExpenses}, function() {
                console.log("User Expense",this.state.expenses)
            });
            
            
        })
        
        const today = new Date();
        this.setState({selectedMonth: today.getMonth()+1, selectedYear: today.getFullYear()}, function () {
            axios.get("http://localhost:8080/transaction/selectedTransactions/" + this.state.selectedMonth +"/"+ this.state.selectedYear)
                .then(res => {
                    console.log(res.data);
                    
                    
                    

                    let userTransactions = (res.data).filter((transaction) => {
                        if (transaction.userName === username) {
                            return transaction;
                        }
                    })
                    console.log("users transactions", userTransactions)
                    this.setState({selectedTransactions: userTransactions, allTransactionsForSelectedDate: userTransactions}, function() {
                        console.log(this.state.selectedTransactions)
                    });
                    
                    //this.setState({selectedTransactions: res.data, allTransactionsForSelectedDate: res.data});
                    console.log("selectedMOnth", this.state.selectedMonth)
                    console.log("selectedYear", this.state.selectedYear)
                })
            
        });
        
    }

    render() {

        return(<>
            <div>
                {this.state.showTransactions && this.renderTransactions()}
                {this.state.showHome && this.renderHome()}
                {this.state.showLogin && this.renderLogin()}
            </div>
        </>)
        
    }
}