import React from 'react';
import axios from 'axios'

export default class Home extends React.Component {
    state = {
        expenses: []
    }

    renderTableData() {
        return this.state.expenses.map((element) => {
           const { id, expense, budget, spent } = element //destructuring
           return (
              <tr key={id}>
                 <td>{id}</td>
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
            <div className="app">
            <h1 id='title'>React Dynamic Table</h1>
            <table className="moduleSection">
               <thead>
                   <tr>
                       <th>ID</th>
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