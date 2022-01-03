import React from 'react';
import '../App.css';
import Home from './Home';
import {createBrowserHistory} from "history";
import Login from './Login'
import { Trash } from 'react-bootstrap-icons';
import {
    transactionsForSelectedDateEndpoint,
    getAllExpensesEndpoint,
    deleteTransactionsEndpoint,
    getAllTransactionsEndpoint} from '../Resources/Resources';

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
            selectedExpense: -1,
            today: new Date(),
            showTransactions: true,
            showHome: false,
            showLogin: false
        };

        this.handleSelectedMonthDropDownChange = this.handleSelectedMonthDropDownChange.bind(this);
        this.handleSelectedYearDropDownChange = this.handleSelectedYearDropDownChange.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.renderTableData = this.renderTableData.bind(this);
        this.renderTransactions = this.renderTransactions.bind(this);
        this.renderHome = this.renderHome.bind(this);
        this.renderLogin = this.renderLogin.bind(this);
        this.changeLoginSetState = this.changeLoginSetState.bind(this);
    }

    handleSelectedMonthDropDownChange(e) {
        
        const pathName = window.location.pathname;
        const username = pathName.split('/')[2];
        const numOfSelectedMonth = parseInt(e.target.value);
        
        let selectedElement=0;

        if (e.target.value === "-1") {
            console.log("No month selected.")
            return;
        }
        else{

            {this.state.listOfMonths.map((month) => {
                if (month.monthNum === numOfSelectedMonth) {
                    selectedElement = month.monthNum;
                }
            })}
            
            this.setState({selectedMonth: selectedElement}, function () {
                
                const updatedMonth = this.state.selectedMonth;
                const updatedYear = this.state.selectedYear;

                transactionsForSelectedDateEndpoint(updatedMonth, updatedYear)
                .then(response => {

                    //filter transactions of user
                    let userTransactions = (response.data).filter((transaction) => {
                        if (transaction.userName === username) {
                            return transaction;
                        }
                    })

                    //if condition is based on chosen filter value, (-1) repersents "all"
                    if (this.state.selectedExpense === -1) {
                        this.setState({selectedTransactions: userTransactions, allTransactionsForSelectedDate: userTransactions})
                    }
                    else {
                        let filteredUserTransactions = userTransactions.filter((transaction) => {
                            if (transaction.expenseID === this.state.selectedExpense) {
                                return transaction;
                            }
                        })
                        this.setState({selectedTransactions: filteredUserTransactions, allTransactionsForSelectedDate: userTransactions});
                    }
                })
            });
        }
    }

    handleSelectedYearDropDownChange(e) {
        
        const pathName = window.location.pathname;
        const username = pathName.split('/')[2];
        const numOfSelectedYear = parseInt(e.target.value);

        console.log("This is the selected expense: ", this.state.selectedExpense);

        if (e.target.value === "-1") { //-1 repersents no year selected
            return;
        }
        else{
            
            this.setState({selectedYear: numOfSelectedYear}, function () {
                
                const updatedMonth = this.state.selectedMonth;
                const updatedYear = this.state.selectedYear;

                transactionsForSelectedDateEndpoint(updatedMonth, updatedYear)
                .then(response => {
                    
                    //filter users transactions
                    let userTransactions = (response.data).filter((transaction) => {
                        console.log("this is my selected expense", this.state.selectedExpense);
                        if (transaction.userName === username) {
                            return transaction;
                        }
                    })

                    //factor in the current filterted expense
                    if (this.state.selectedExpense === -1) {
                        this.setState({selectedTransactions: userTransactions, allTransactionsForSelectedDate: userTransactions})
                    }
                    else {
                        let filteredUserTransactions = userTransactions.filter((transaction) => {
                            if (transaction.expenseID === this.state.selectedExpense) {
                                return transaction;
                            }
                        })
                        this.setState({selectedTransactions: filteredUserTransactions, allTransactionsForSelectedDate: userTransactions}, function() {
                    });
                    }  
                })
            });
        }
    }

    handleFilter(e) {
        
        const expenseID = parseInt(e.target.value);
        let selectionVal = -1;

        this.state.expenses.map((element) => {
            if (element.id === expenseID) {
                selectionVal = parseInt(element.id);
            }
        });

        this.setState({selectedExpense: selectionVal}, function() {
            
            //-1 repersents "all"
            if (selectionVal === -1) {
                this.setState({selectedTransactions: this.state.allTransactionsForSelectedDate})
            }
            else {

                const updatedTransactions = this.state.allTransactionsForSelectedDate.filter((transaction) => {
                    if (transaction.expenseID === selectionVal) {
                        return transaction;
                    }
                })
                this.setState({selectedTransactions: updatedTransactions});
            }
        });
    }

    submitHandlerDeleteTransaction(e) {
        
        const transactionID = e;
        
        deleteTransactionsEndpoint(transactionID)
        .then(response => {
                
            const idOfDeletedTransaction = response.data;

            //update transaction table
            const updatedAllTransactions = this.state.allTransactions.filter((transaction) => {
                if (transaction.id !== idOfDeletedTransaction) {
                    return transaction;
                }
            });
                
            const updatedallTransactionsForSelectedDate = this.state.allTransactionsForSelectedDate.filter((transaction) => {
                if (transaction.id !== idOfDeletedTransaction) {
                    return transaction;
                }
            });

            const updatedSelectedTransactions = this.state.selectedTransactions.filter((transaction) => {
                if (transaction.id !== idOfDeletedTransaction) {
                    return transaction;
                }
            });

            this.setState({allTransaction: updatedAllTransactions, allTransactionsForSelectedDate: updatedallTransactionsForSelectedDate, selectedTransactions: updatedSelectedTransactions});
            console.log(response)
        }).catch(error => {
            console.log(error)
        }) 
    }

    renderTableData() {

        let sumOfSpent = 0;

        return(<>
            {this.state.selectedTransactions.reverse().map((transaction) => {
                let expenseName;
                this.state.expenses.map((expense) => {
                    if (expense.id === transaction.expenseID) {
                        expenseName = expense.expense;
                    }
                })
                sumOfSpent += transaction.spent;
                return (
                    <tr>
                        <td>{transaction.transactionDate}</td>
                        <td>{expenseName}</td>
                        <td>{transaction.payee}</td>
                        <td>${(transaction.spent).toFixed(2)}</td>
                        {/* <td><button name="deleteButton" id='trashCan' value={transaction.id} onClick={(e) => {this.submitHandlerDeleteTransaction(e);}}><IconContext.Provider value={{ style: {   fontSize: '25px', color: "crimson"}}}><FaTrash/></IconContext.Provider></button></td> */}
                        <td><button onClick={(e) => {this.submitHandlerDeleteTransaction(transaction.id);}} id='trashCan'><Trash color="crimson" size={"2em"} onClick={(e) => {this.submitHandlerDeleteTransaction(transaction.id);}}/></button></td>
                    </tr>
                )
            })}
            <tr>
                <td className='bold'>Total Spent : </td>
                <td className='bold'></td>
                <td className='bold'></td>
                <td className='bold'>${sumOfSpent.toFixed(2)}</td>
                <td></td>
            </tr>
        </>)
        
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
        
        if (localStorage.getItem("auth") === "authenticated"){
            return (
                <div className='App-header'>
                    <h1 className="mainTitle" id='trans-title'>My Transactions</h1>
                    <div>
                        {/* <Link to="/"> */}
                            <button onClick={() => {this.setState({showHome: true, showTransactions: false})}} id='goBack-button' className="button-25">Go Back</button>
                        {/* </Link> */}
                    </div>
                    
                    <div className="dropdown-flex" id="transDropDown">
                        <select id='selectColor' value={this.state.selectedMonth} onChange={this.handleSelectedMonthDropDownChange}>
                            <option disabled value="-1">--Month--</option>
                            {
                            this.state.listOfMonths.map((element) => (
                                <option value={element.monthNum}>{element.month}</option>
                            ))}
                        </select>
                        <select id='selectColor' onChange={this.handleSelectedYearDropDownChange}>
                            <option disabled value="-1">--Year--</option>
                            <option value={this.state.today.getFullYear()-4}>{this.state.today.getFullYear()-4}</option>
                            <option value={this.state.today.getFullYear()-3}>{this.state.today.getFullYear()-3}</option>
                            <option value={this.state.today.getFullYear()-2}>{this.state.today.getFullYear()-2}</option>
                            <option value={this.state.today.getFullYear()-1}>{this.state.today.getFullYear()-1}</option>
                            <option selected value={this.state.today.getFullYear()}>{this.state.today.getFullYear()}</option>
                        </select>
                        <select id='selectColor' onChange={this.handleFilter}>
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
                                <th></th>
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
                <div className="buttons-flex"><button className="button-25" id="modalButtons" onClick={() => this.changeLoginSetState()}>Sign in</button></div>
                
            </>)
        }
    }

    renderHome() {
        const pathName = window.location.pathname;
        const username = pathName.split('/')[2];
        
        const history = createBrowserHistory();
        history.push('/home/' + username);   //changes address and bottom code changes the rendering
        return (<>
            <Home />
        </>)
    }

    componentDidMount() {

        const pathName = window.location.pathname;
        const username = pathName.split('/')[2];
        
        getAllTransactionsEndpoint() //getting all transactions in db
        .then(response => { 
            const transactions = response.data;
            this.setState({allTransactions: transactions});
        })

        getAllExpensesEndpoint()  //getting all expenses in db
        .then(response => {

            //filter out users expenses
            let userExpenses = (response.data).filter((expense) => {
                if (expense.userName === username) {
                    return expense;
                }
            })
            this.setState({expenses: userExpenses})
        
        })
        
        const today = new Date();
        this.setState({selectedMonth: today.getMonth()+1, selectedYear: today.getFullYear()}, function () {
            const updatedMonth = this.state.selectedMonth;
            const updatedYear = this.state.selectedYear;
            transactionsForSelectedDateEndpoint(updatedMonth, updatedYear)
                .then(response => {
        
                    let userTransactions = (response.data).filter((transaction) => {
                        if (transaction.userName === username) {
                            return transaction;
                        }
                    })
                    
                    this.setState({selectedTransactions: userTransactions, allTransactionsForSelectedDate: userTransactions})
                    
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