import React, { useState } from 'react';
import axios from 'axios'
import './App.css'


const DeleteExpenseForm = ({expenses, show, handleClose_, submitHandler_}) => {
    console.log(expenses);
    const class_placerholder = show ? 'modal display-block' : 'modal display-none';
    
    const [tempList, setTempList] = useState([]);


    axios.get("http://localhost:8080/expense/allExpenses")
        .then(res => {
            setTempList(res.data)
        })
    

    return (
          
        <div className={class_placerholder}>
                <div className='modal-main'>
                    <h2 className="black"> Expense: </h2>
                    <div>
                        {tempList.map((data) => {
                            const {expense} = data;
                            return <form onSubmit={submitHandler_}>
                                <label for="cars" color="black">Choose a car:</label>
                                    <select name="cars" id="cars">
                                        <option value="volvo">{expense}</option>
                                    </select>
                                                
                                    <button type="submit">Submit</button> 
                                    <button onClick={handleClose_} className="buttons-invariant">Close</button>
                            </form>
                        })}
                    </div>
                </div>
             
        </div>
        
    )
    
}

export default DeleteExpenseForm