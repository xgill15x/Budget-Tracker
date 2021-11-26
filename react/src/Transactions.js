import React, { useState } from 'react';
import axios from 'axios'
import './App.css'


export default class Transactions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: []
        };

        this.renderTableData = this.renderTableData.bind(this);
    }

    

    renderTableData() {
        return this.state.transactions.map((element) => {
            
           return (
              <tr>
                 <td>{element.expenseID}</td>
                 <td>{element.payee}</td>
                 <td>{element.spent}</td>
              </tr>
           )
        })
        
    }

    componentDidMount() {
        axios.get("http://localhost:8080/transaction/allTransactions")
        .then(res => {
            const transactions = res.data;
            this.setState({transactions});
        })
    }

    render() {
        return (
            <div>
                <h1 className="mainTitle">All Transactions</h1>
                
                <table className="expense-table">
                    <thead>
                        <tr>
                            <th>Expense Category</th>
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