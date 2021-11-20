import React, { useState } from 'react';
import axios from 'axios'
import './App.css'


const DeleteExpenseForm = ({expense, expenses, show, handleClose_, submitHandler_, onChange_}) => {

    const class_placerholder = show ? 'modal display-block' : 'modal display-none';

    return (
          
        <div className={class_placerholder}>
                <div className='modal-main'>
                    <h2 className="black"> Expense: </h2>
                    <div>
                        
                            
                            <form onSubmit={submitHandler_} onSel>
                                <label>Choose a car:</label>
                                <select>
                                    {expenses.map(element => (
                                        <option name="id" onChange={onChange_} key={element.id} value={expense}>{element.expense}</option>
                                    ))}
                                </select>
                                                
                                <button onClick={handleClose_} type="submit">Submit</button> 
                                <button onClick={handleClose_}>Close</button>
                            </form>
                        
                    </div>
                </div>
             
        </div>
        
    )
    
}

export default DeleteExpenseForm