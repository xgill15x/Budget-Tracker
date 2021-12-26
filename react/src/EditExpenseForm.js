import React, { useState } from 'react';
import axios from 'axios'
import './App.css'

import Select from 'react-select'


const EditExpenseForm = ({myList, handleClose, handleChange, show, submitHandler, oldExpenseName}) => {

    const class_placerholder = show ? 'modal display-block' : 'modal display-none';
    
    return (
          
        <div className={class_placerholder}>
                <div className='modal-main'>
                    <h2 className="black">Edit Expense: </h2>
                    <div>
                        <form onSubmit={submitHandler}>
                            
                            <label className="black">Expense to be Changed:
                                <select onChange={handleChange}>
                                    {myList.map((element) => (
                                        <option value={element.expense}>{element.expense}</option>
                                    ))}
                                </select>
                            </label>
                            
                            <label className="black">New Expense Name: 
                                <input required type="text" name=" newExpense"  placeholder={oldExpenseName} />
                            </label>
                            <label className="black">New Monthly Budget: $ 
                                <input required type="number" step="0.01" pattern="^\d*(\.\d{0,2})?$" min="0" name="newBudget" placeholder="0.00" />
                            </label>
                            <div className="buttons-flex">
                                <button type="submit" onClick={handleClose} className="buttons-invariant">Submit</button>
                                <button type="button" onClick={ () => {handleClose();}} className="buttons-invariant">Close</button>
                            </div>
                        </form>
                    </div>
                </div>
             
        </div>
        
    )
    
}

export default EditExpenseForm