import React, { useState } from 'react';
import axios from 'axios'
import './App.css'
import AddExpenseForm from './AddExpenseForm';
import DeleteExpenseForm from './DeleteExpenseForm';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expense: "",
            budget:0.0,
            expenses: [],
            addExpenseToggle: false,
            deleteExpenseToggle: false,
        };

        this.toggleAddExpenseModal = this.toggleAddExpenseModal.bind(this);
        this.toggleDeleteExpenseModal = this.toggleDeleteExpenseModal.bind(this);
    }

    submitHandler = e => {
        e.preventDefault()
        axios.post("http://localhost:8080/expense/newRow",{
            expense: this.state.expense,
            budget: this.state.budget.toFixed(2)
        }).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })   
        
    }

    changeHandler = e => {
        this.setState({[e.target.name]: e.target.valueAsNumber || e.target.value})
    }

    toggleAddExpenseModal() {
        this.setState({addExpenseToggle : !this.state.addExpenseToggle});
    }
    toggleDeleteExpenseModal() {
        this.setState({deleteExpenseToggle : !this.state.deleteExpenseToggle});
    }

    renderTableData() {
        return this.state.expenses.map((element) => {
           const {expense, budget, spent } = element //destructuring
           return (
              <tr>
                 <td>{expense}</td>
                 <td>{budget}</td>
                 <td>{spent}</td>
                 <td>{budget-spent}</td>
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
                <AddExpenseForm show={this.state.addExpenseToggle} handleClose={this.toggleAddExpenseModal} expense_={this.expense} budget_={this.budget} changeHandler_={this.changeHandler} submitHandler_={this.submitHandler}/>
                <button onClick={this.toggleDeleteExpenseModal}>Delete Expense</button>
                <DeleteExpenseForm expenses={this.state.expenses} show={this.state.deleteExpenseToggle} handleClose={this.toggleDeleteExpenseModal} submitHandler_={this.submitHandler}/>
                <table className="expense-table">
                    <thead>
                        <tr>
                            <th>Expense</th>
                            <th>Budget</th>
                            <th>Spent</th>
                            <th>Remaining</th>
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