import React, { useState } from 'react';
import axios from 'axios'
import './App.css'
import AddExpenseForm from './AddExpenseForm';
import DeleteExpenseForm from './DeleteExpenseForm';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            expense: "",
            budget:0.0,
            expenses: [],
            addExpenseToggle: false,
            deleteExpenseToggle: false
        };

        this.toggleAddExpenseModal = this.toggleAddExpenseModal.bind(this);
        this.toggleDeleteExpenseModal = this.toggleDeleteExpenseModal.bind(this);
        
    }

    submitHandlerAddExpense = e => {
        e.preventDefault()
        axios.post("http://localhost:8080/expense/addRow",{
            expense: this.state.expense,
            budget: this.state.budget
        }).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })   
        
    }

    submitHandlerDeleteExpense (e) {
        this.setState({id: e.target.value})
        console.log(e.target.value)
        axios.delete('http://localhost:8080/expense/deleteRow/' + e.target.value)
        .then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })   
        
    }

    addChangeHandler = e => {
        this.setState({[e.target.name]: e.target.valueAsNumber || e.target.value})
    }
    deleteChangeHandler = e => {
        this.setState({expense: e.target.value})
    }
    toggleAddExpenseModal() {
        this.setState({addExpenseToggle : !this.state.addExpenseToggle});
    }
    toggleDeleteExpenseModal() {
        this.setState({deleteExpenseToggle : !this.state.deleteExpenseToggle});
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

    render() {
        return (
            <div>
                <h1 className="mainTitle">Budget Tracker</h1>
                <button onClick={this.toggleAddExpenseModal}>Add Expense</button>
                <AddExpenseForm  handleClose={this.toggleAddExpenseModal} show={this.state.addExpenseToggle} expense_={this.expense} budget_={this.budget} changeHandler_={this.addChangeHandler} submitHandler_={this.submitHandlerAddExpense}/>
                <button onClick={this.toggleDeleteExpenseModal}>Delete Expense</button>
                <DeleteExpenseForm expense={this.state.expense} expenses={this.state.expenses} show={this.state.deleteExpenseToggle} handleClose_={this.toggleDeleteExpenseModal} submitHandler_={this.submitHandlerDeleteExpense} changeHandler_={this.deleteChangeHandler}/>
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