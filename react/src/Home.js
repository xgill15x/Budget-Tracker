import React, { useState } from 'react';
import axios from 'axios'
import './App.css'
import AddExpenseForm from './AddExpenseForm';
import DeleteExpenseForm from './DeleteExpenseForm';
import EditExpenseForm from './EditExpenseForm';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            expense: "",
            budget:0.0,
            expenses: [],
            dropDownSelection:0,
            addExpenseToggle: false,
            deleteExpenseToggle: false,
            editExpenseToggle: false
        };

        this.toggleAddExpenseModal = this.toggleAddExpenseModal.bind(this);
        this.toggleDeleteExpenseModal = this.toggleDeleteExpenseModal.bind(this);
        this.toggleEditExpenseModal = this.toggleEditExpenseModal.bind(this);
        
        this.handleDropDownChange = this.handleDropDownChange.bind(this);
        this.initDropDown = this.initDropDown.bind(this);
        this.submitHandlerEditExpense = this.submitHandlerEditExpense.bind(this);
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
            })
        }).catch(error => {
            console.log(error)
        })  
        //window.location.reload(); 
    }

    submitHandlerDeleteExpense (e) {
        //this.setState({id: e.target.value}) // value = expense id
        //console.log(e.target.value)
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
    }

    submitHandlerEditExpense (e) {
        e.preventDefault();
        //console.log(e);

        const data = {
            expense: e.target[1].value,
            budget: parseFloat(e.target[2].value)
        }
        axios.patch('http://localhost:8080/expense/editRow/' + this.state.dropDownSelection, data)
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

    initDropDown() {
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

        this.setState({dropDownSelection: elementWithSmallestIndex});
    }

    handleDropDownChange(e) {
        //console.log(e);
        let selectedElement=0;
        {this.state.expenses.map((element) => {
            if (element.expense === e.target.value) {
                selectedElement = element.id;
            }
        })}
        this.setState({ dropDownSelection: selectedElement });
    }

    toggleAddExpenseModal() {
        this.setState({addExpenseToggle : !this.state.addExpenseToggle});
    }
    toggleDeleteExpenseModal() {
        this.setState({deleteExpenseToggle : !this.state.deleteExpenseToggle});
    }
    toggleEditExpenseModal() {
        this.setState({editExpenseToggle: !this.state.editExpenseToggle});
    }

    renderTableData() {
        return this.state.expenses.map((element) => {
            
           return (
              <tr>
                 <td>{element.expense}</td>
                 <td>{element.budget}</td>
                 <td>{element.spent}</td>
                 <td>{element.budget-element.spent}</td>
                 <td><button name="deleteButton" value={element.id} onClick={(e) => this.submitHandlerDeleteExpense(e)}>Delete</button></td>
              </tr>
           )
        })
        
    }

    componentDidMount() {
        axios.get("http://localhost:8080/expense/allExpenses")
        .then(res => {
            const expenses = res.data;
            this.setState({expenses});
        })
    }

    // componentDidUpdate() {
    //     axios.get("http://localhost:8080/expense/allExpenses")
    //     .then(res => {
    //         const expenses = res.data;
    //         this.setState({expenses});
    //     })
    // }

    render() {
        return (
            <div>
                <h1 className="mainTitle">Budget Tracker</h1>
                <button onClick={this.toggleAddExpenseModal}>Add Expense</button>
                <button onClick={ () => {this.toggleEditExpenseModal();this.initDropDown();}}>Edit Expense</button>
                <AddExpenseForm  handleClose={this.toggleAddExpenseModal} show={this.state.addExpenseToggle} submitHandler={this.submitHandlerAddExpense}/>
                <EditExpenseForm myList={this.state.expenses} handleClose={this.toggleEditExpenseModal} handleChange={this.handleDropDownChange} show={this.state.editExpenseToggle} submitHandler={this.submitHandlerEditExpense}/>
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