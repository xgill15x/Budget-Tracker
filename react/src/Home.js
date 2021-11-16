import React from 'react';
import axios from 'axios'

export default class Home extends React.Component {
    state = {
        expenses: []
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
            <ul>
                {this.state.expenses.map(expense => <li>{expense.expense}</li>)}
            </ul>
        )
    }
}