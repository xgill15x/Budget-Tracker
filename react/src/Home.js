import React, { useState } from 'react';
import axios from 'axios'
import './App.css'
import AddExpenseForm from './AddExpenseForm';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expense: "",
            budget:0.0,
            expenses: [],
            addExpenseToggle: false
        };

        this.toggleModal = this.toggleModal.bind(this);
    
    }

    submitHandler = e => {
        e.preventDefault()
        axios.post("http://localhost:8080/expense/newRow",{
            expense: this.state.expense,
            budget: this.state.budget
        }).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })   
        
    }

    changeHandler = e => {
        this.setState({[e.target.name]: e.target.valueAsNumber || e.target.value})
    }

    toggleModal() {
        this.setState({addExpenseToggle : !this.state.addExpenseToggle});
    }

    renderTableData() {
        return this.state.expenses.map((element) => {
           const { id, expense, budget, spent } = element //destructuring
           return (
              <tr>
                 <td>{expense}</td>
                 <td>{budget}</td>
                 <td>{spent}</td>
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
                <button onClick={this.toggleModal}> click me </button>
                <AddExpenseForm show={this.state.addExpenseToggle} handleClose={this.toggleModal} expense_={this.expense} budget_={this.budget} changeHandler_={this.changeHandler} submitHandler_={this.submitHandler}/>
                
                <table className="expense-table">
                    <thead>
                        <tr>
                            <th>Expense</th>
                            <th>Budget</th>
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