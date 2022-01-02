import React from 'react';
import './App.css';
import AddExpenseForm from './AddExpenseForm';
import EditExpenseForm from './EditExpenseForm';
import AddTransactionForm from './AddTransactionForm';
import Transactions from './Transactions';
import Moment from 'moment';
import {createBrowserHistory} from "history";
import Login from './Login';
import Calendar from 'react-calendar'
import { Trash } from 'react-bootstrap-icons';
import {
    addExpenseEndpoint, 
    addTransactionEndpoint, updateSpentEndpoint, 
    deleteExpenseEndpoint, 
    deleteTransactionsOfExpenseEndpoint,
    editExpenseEndpoint,
    transactionsForSelectedDateEndpoint,
    getAllExpensesEndpoint} from './Resources'

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
            spentValsForAllExpenses: new Map(),
            showHome: true,
            showTransactions: false,
            showLogin: false,
            userOnCurrentDate: true,
            oldExpenseName: ''
        };

        this.toggleAddExpenseModal = this.toggleAddExpenseModal.bind(this);
        this.toggleAddTransactionModal = this.toggleAddTransactionModal.bind(this)
        this.toggleDeleteExpenseModal = this.toggleDeleteExpenseModal.bind(this);
        this.toggleEditExpenseModal = this.toggleEditExpenseModal.bind(this);
        this.handleEditDropDownChange = this.handleEditDropDownChange.bind(this);
        this.handleTransactionDropDownChange = this.handleTransactionDropDownChange.bind(this);
        this.handleSelectedMonthDropDownChange = this.handleSelectedMonthDropDownChange.bind(this);
        this.handleSelectedYearDropDownChange = this.handleSelectedYearDropDownChange.bind(this);
        this.initEditDropDown = this.initEditDropDown.bind(this);
        this.secondaryInitEdit = this.secondaryInitEdit.bind(this);
        this.initTransactionDropDown = this.initTransactionDropDown.bind(this);
        this.submitHandlerEditExpense = this.submitHandlerEditExpense.bind(this);
        this.signOut = this.signOut.bind(this);
        this.signOutSetState = this.signOutSetState.bind(this);
        
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

    signOut() {
        localStorage.setItem("auth", false);

        const history = createBrowserHistory();
        history.push('/');   //changes address and bottom code changes the rendering
        return (<>
            <Login />
        </>)
    }
    signOutSetState() {
        this.setState({showLogin: true, showHome: false, showTransactions: false});
    }

    submitHandlerAddExpense = e => {
        e.preventDefault();

        const pathName = window.location.pathname;
        const username = pathName.split('/')[2];
        const expense = e.target[0].value;
        const budget = e.target[1].value;

        addExpenseEndpoint(expense, budget, username)
        .then( response => {
            
            const newId = response.data;
            const floatBudget = parseFloat(e.target[1].value);
            
            const newExpenseObject = {
                id: newId,
                expense: expense,
                budget: floatBudget,
                spent: 0.0,
                remaining: floatBudget,
                userName: username
            }
            
            this.setState({expenses: [...this.state.expenses, newExpenseObject]}, function() {
                let updatedMap = new Map(this.state.spentValsForAllExpenses);
                updatedMap.set(newExpenseObject.id, 0.0);
                this.setState({spentValsForAllExpenses: updatedMap});
                e.target[0].value = null;
                e.target[1].value = null;
            })
        }).catch(error => {
            console.log(error)
        })   
    }

    submitHandlerAddTransaction = e => {
        e.preventDefault();

        const pathName = window.location.pathname;
        const username = pathName.split('/')[2];
        const today = Moment(this.state.today).format('YYYY-MM-DD');
        
        let expenseTotalSpent; 
        const expenseID = this.state.transactionDropDownSelection;
        const payee = e.target[1].value;
        const spent = parseFloat(e.target[2].value);
        
        this.state.expenses.filter((element) => {
            if (element.id === expenseID) {
                expenseTotalSpent = element.spent;
            }
        })

        addTransactionEndpoint(expenseID, payee, spent, today, username)
        .then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })

        const updatedSpentData = {
            spent: expenseTotalSpent + spent
        }
        updateSpentEndpoint(expenseID, updatedSpentData)
        .then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error);
        })
        
        let updatedMap = new Map(this.state.spentValsForAllExpenses);
        this.state.expenses.map((expense) => {
            if (expense.id === expenseID) {
                const totalSpent = updatedMap.get(expense.id);
                updatedMap.set(expense.id, totalSpent + spent);
            }
        })

        const updatedExpenses = this.state.expenses.filter( (element) => {
            if (element.id === expenseID) {
                element.spent = expenseTotalSpent + spent
                return element;
            }
            else {
                return element;
            }
        })

        this.setState({expenses: updatedExpenses, spentValsForAllExpenses: updatedMap})
        e.target[1].value = null;
        e.target[2].value = null;
    }

    submitHandlerDeleteExpense (expenseID) {

        const idOfDeletedExpense = expenseID
        deleteExpenseEndpoint(expenseID)
        .then( (response) => {

            //updating expenses table
            const updatedExpenses = this.state.expenses.filter((expense) => {
                if (expense.id !== idOfDeletedExpense) {
                    return expense;
                }
            });
            this.setState({expenses: updatedExpenses});
            console.log(response);

        }).catch(error => {
                console.log(error)
        }) 

        deleteTransactionsOfExpenseEndpoint(expenseID)
        .then(response => {
                
            const updatedTransactions = this.state.selectedTransactions.filter((transaction) => {
                if (transaction.expenseID !== expenseID) {
                    return transaction; // fix syntax
                }
            });
            this.setState({selectedTransactions: updatedTransactions});
                
            console.log(response)
        }).catch(error => {
            console.log(error)
        }) 
    }

    submitHandlerEditExpense (e) {
        e.preventDefault();

        const expenseID = this.state.editDropDownSelection;
        const newExpense = e.target[1].value;
        const newBudget = parseFloat(e.target[2].value);

        const updatedData = {
            expense: newExpense,
            budget: newBudget
        }

        editExpenseEndpoint(expenseID, updatedData)
        .then(response => {
            console.log(response)
            
            //updating expenses
            const updatedExpenses = this.state.expenses.filter((element) => {
                if (element.id !== expenseID) {
                    return element;
                }
                else{
                    element.expense = newExpense;
                    element.budget = newBudget;
                    return element;
                }
                
            })
            this.setState({expenses: updatedExpenses, oldExpenseName: updatedData.expense});
            
            e.target[1].value = null;
            e.target[2].value = null;
        }).catch(error => {
            console.log(error)
        })

        
    }

    initEditDropDown() {
        let placeholder;
        
        //if list is empty show "no expenses to change" in new budget input
        if (this.state.expenses.length !== 0) {
            placeholder= this.state.expenses[0].expense;
            let lowestIndexExpense = -1;

            //find element with lowest id 
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
            
            let elementWithSmallestIndex;
            {this.state.expenses.map((element) => {
                if (element.id === lowestIndexExpense) {
                    elementWithSmallestIndex = element.id;
                }
            })}
            
            //setting first element as default on page load
            this.setState({editDropDownSelection: elementWithSmallestIndex}, function() {
                {this.state.expenses.map((expense) => {
                    if (expense.id === elementWithSmallestIndex) {
                        this.setState({oldExpenseName: placeholder});
                    }
                })}
            });
        }
        else {
            this.setState({oldExpenseName: "No Expenses to Change"});
        }  
    }

    secondaryInitEdit() {
        //used when user opens edit modal
        if (this.state.oldExpenseName === "No Expenses to Change") {
            if (this.state.expenses.length !== 0) {
                this.setState({oldExpenseName: this.state.expenses[0].expense});
            }
        }
        else if (this.state.expenses.length === 0) {
            this.setState({oldExpenseName: "No Expenses to Change"});
        }
    }

    handleEditDropDownChange(e) {
        //on Change of selection dropdown, update editDropDownSelection in state
        let selectedElement=0;
        {this.state.expenses.map((element) => {
            if (element.expense === e.target.value) {
                selectedElement = element.id;
            }
        })}
        this.setState({ editDropDownSelection: selectedElement }, function() {
            {this.state.expenses.map((expense) => {
                //changing placeholder on dropdown change
                if (expense.id === selectedElement) {
                    this.setState({oldExpenseName: expense.expense})
                }
            })}
        });
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
        
        let elementWithSmallestIndex;
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
        
        if (e.target.value === "-1") {
            return;
        }
        else{
            //selectedElement is now month number
            {this.state.listOfMonths.map((element) => {
                if (element.monthNum === parseInt(e.target.value)) {
                    selectedElement = element.monthNum;
                }
            })}
            this.setState({selectedMonth: selectedElement}, function () {

                //check to see if user on current date
                if (parseInt(this.state.selectedYear) === this.state.today.getFullYear() && this.state.selectedMonth === this.state.today.getMonth()+1) {
                    this.setState({userOnCurrentDate: true});
                }
                else {
                    this.setState({userOnCurrentDate: false});
                }

                const updatedMonth = this.state.selectedMonth;
                const updatedYear = this.state.selectedYear;

                transactionsForSelectedDateEndpoint(updatedMonth, updatedYear)
                .then(response => {
                    
                    const updatedTransactions = response.data;
                    
                    //setting spent vals to 0
                    let updatedMap = new Map(this.state.spentValsForAllExpenses);
                    this.state.expenses.map((expense) => {
                        updatedMap.set(expense.id, 0.0);
                    })
                    

                    this.setState({selectedTransactions: updatedTransactions, spentValsForAllExpenses: updatedMap}, function(){
                        //adding new spentvals for my expenses on account of date change
                        let changingSpentMap = new Map(this.state.spentValsForAllExpenses);
                        this.state.selectedTransactions.map((transaction) => {
                            
                            const associatedExpenseID = transaction.expenseID;
                            const totalSpentVal = changingSpentMap.get(associatedExpenseID);
                            const spent = transaction.spent;
                            
                            changingSpentMap.set(associatedExpenseID, totalSpentVal + spent);
                
                        })
                        this.setState({spentValsForAllExpenses: changingSpentMap})
                    })
                })
            });
        }
    }

    handleSelectedYearDropDownChange(e) {
        let selectedElement=0;
        
        if (e.target.value === "-1") {
            return;
        }
        else{
            selectedElement = e.target.value;
            
            this.setState({selectedYear: selectedElement}, function () {
                
                //check to see if user on current date
                if (parseInt(this.state.selectedYear) === this.state.today.getFullYear() && this.state.selectedMonth === this.state.today.getMonth()+1) {
                    this.setState({userOnCurrentDate: true});
                }
                else {
                    this.setState({userOnCurrentDate: false});
                }

                const updatedMonth = this.state.selectedMonth;
                const updatedYear = this.state.selectedYear;

                transactionsForSelectedDateEndpoint(updatedMonth, updatedYear)
                .then(response => {
                    
                    const updatedTransactions = response.data
                    //setting spent vals to 0
                    let updatedMap = new Map(this.state.spentValsForAllExpenses);                 
                    this.state.expenses.map((expense) => {
                        updatedMap.set(expense.id, 0.0);
                    })
        
                    this.setState({selectedTransactions: updatedTransactions, spentValsForAllExpenses: updatedMap}, function() {
                        //setting new spent vals for expenses on account of date change
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

    renderTableData() {

        let sumOfBudget = 0;
        let sumOfSpent = 0;

        return (<>
            {this.state.expenses.map((element) => {
            
                const amountSpent = parseFloat(this.state.spentValsForAllExpenses.get(element.id));
                sumOfBudget += element.budget;
                sumOfSpent += amountSpent;
                
                return (
                    <tr>
                        <td>{element.expense}</td>
                        <td>${(element.budget).toFixed(2)}</td>
                        <td>${(amountSpent).toFixed(2)}</td>
                        <td id={(element.budget-amountSpent) >= 0 ? "remainingPos2":"remainingNeg2"}>${(element.budget-amountSpent).toFixed(2)}</td>
                        <td><button onClick={(e) => {this.submitHandlerDeleteExpense(element.id);this.toggleDeleteExpenseModal()}} id='trashCan'><Trash color="crimson" size={"2em"} onClick={(e) => {this.submitHandlerDeleteExpense(element.id);this.toggleDeleteExpenseModal()}}/></button></td>
                    </tr>
                )

            })}
            <tr>
                <td className='bold'>TOTAL : </td>
                <td className='bold'>${sumOfBudget.toFixed(2)}</td>
                <td className='bold'>${sumOfSpent.toFixed(2)}</td>
                <td className='bold' id={(sumOfBudget-sumOfSpent) >= 0 ? "remainingPos":"remainingNeg"}>${(sumOfBudget-sumOfSpent).toFixed(2)}</td>
                <td></td>
            </tr>

        </>)
        
    }

    renderHome() {
        const pathName = window.location.pathname;
        const username = pathName.split('/')[2];

        if (localStorage.getItem("auth") === "authenticated") {
        
            return (
                
                <div className={window.innerWidth >= 740 ? 'App-header':'App-header-phone'}>
                    
                    
                    <h1 id='myLogo'>Bijou Budget</h1>
                    
                    <div id={window.innerWidth >= 740 ? 'credentials':'phoneLogoAndCreds'}>
                        <p id={window.innerWidth >= 740 ? 'signedInUser':'phoneSignedInUser'}>{"Signed In User: " + username}</p>
                        <button id={window.innerWidth >= 740 ? 'signOut-button':'phoneSignOutButton'} onClick={() => {this.signOutSetState()}}>Sign Out</button>
                    </div>
                        
                    <div id="navContainer">
                        <div className='navButtons'>
                            <button disabled={this.state.userOnCurrentDate ? false : true} className='button-25' onClick={ () => {this.toggleAddExpenseModal();}}>Add Expense</button>
                            <button disabled={this.state.userOnCurrentDate ? false : true} className='button-25' onClick={ () => {this.toggleAddTransactionModal();}}>Add Transaction</button>
                            <button disabled={this.state.userOnCurrentDate ? false : true} className='button-25' onClick={ () => {this.toggleEditExpenseModal();this.secondaryInitEdit();}}>Edit Expense</button>
                            <button className='button-25' id='trans-button' onClick={() => {this.setState({showHome: false, showTransactions:true})}}>Show Transactions</button>
                        </div>
                    </div>

                    <div id='homeContent'>
                    
                        <AddExpenseForm  handleClose={this.toggleAddExpenseModal} show={this.state.addExpenseToggle} submitHandler={this.submitHandlerAddExpense}/>
                        <EditExpenseForm myList={this.state.expenses} handleClose={this.toggleEditExpenseModal} handleChange={this.handleEditDropDownChange} show={this.state.editExpenseToggle} submitHandler={this.submitHandlerEditExpense} oldExpenseName={this.state.oldExpenseName}/>
                        <AddTransactionForm  myList={this.state.expenses} handleClose={this.toggleAddTransactionModal} show={this.state.addTransactionToggle} submitHandler={this.submitHandlerAddTransaction} handleChange={this.handleTransactionDropDownChange}/>
                        
                        <div className="dropdown-flex" id={(this.state.addExpenseToggle || this.state.addTransactionToggle || this.state.editExpenseToggle) ? "dateDropDownZ":"dateDropDown"}>
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
                        </div>
                    </div>

                    <table className="expense-table">
                            <thead>
                                <tr>
                                    <th>Expense</th>
                                    <th>Budget</th>
                                    <th>Spent</th>
                                    <th>Net</th>
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

                <div><h2>You need to sign in to access this page.</h2></div>
                <div className="buttons-flex"><button className="button-25" id="modalButtons" onClick={() => this.signOutSetState()}>Sign in</button></div>
                
            </>)
        }
    }

    renderTransactions() {
        const pathName = window.location.pathname;
        const username = pathName.split('/')[2];
        
        const history = createBrowserHistory();
        history.push('/transactionsTable/' + username);   //changes address and bottom code changes the rendering
        return (<>
            <Transactions />
        </>)
    }

    componentDidMount() {
        
        getAllExpensesEndpoint()  // gets all expenses from mysql
        .then(response => {

            const pathName = window.location.pathname;
            const username = pathName.split('/')[2];

            //filter out users expenses
            let userExpenses = (response.data).filter((expense) => {
                if (expense.userName === username) {
                    return expense;
                }
            })
            this.setState({expenses: userExpenses});

            const today = new Date();
            const todayMonth = today.getMonth()+1;
            const todayYear = today.getFullYear();

            this.setState({selectedMonth: todayMonth, selectedYear: todayYear}, function () { 
                transactionsForSelectedDateEndpoint(todayMonth, todayYear) //gets transactions for current month and year
                .then(response => {
                    
                    //filter out users transactions
                    let userTransactions = (response.data).filter((transaction) => {
                        if (transaction.userName === username) {
                            return transaction;
                        }
                    })
                    this.setState({selectedTransactions: userTransactions});

                    //set spent vals to 0
                    let updatedSpentValsForAllExpenses = new Map(); // rename to better name
                    this.state.expenses.map((expense) => {
                        updatedSpentValsForAllExpenses.set(expense.id, 0.0);
            
                    });
                    this.setState({spentValsForAllExpenses: updatedSpentValsForAllExpenses}, function() {
                        let updatedMap = new Map(this.state.spentValsForAllExpenses);
                        this.state.selectedTransactions.map((transaction) => {
                            const totalSpentVal = updatedMap.get(transaction.expenseID);
                            const spent = transaction.spent;
                            updatedMap.set(transaction.expenseID, totalSpentVal + spent);
                            this.setState({spentValsForAllExpenses: updatedMap});
                        })
                        
                        this.initEditDropDown();
                        this.initTransactionDropDown();
                    });
                    
                })
            });
    
            
        })

    }

    render() {
        return (<>
            <div>
                {this.state.showHome && this.renderHome()}
                {this.state.showTransactions && this.renderTransactions()}
                {this.state.showLogin && this.signOut()}
            </div>
            
        </>)
    }
}