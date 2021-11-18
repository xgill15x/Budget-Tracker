import React, { useState } from 'react';
import axios from 'axios'
import './App.css'


const AddExpenseForm = ({handleClose, show, expense_, budget_, changeHandler_, submitHandler_}) => {
    
    const class_placerholder = show ? 'modal display-block' : 'modal display-none';

    return (
        <div className={class_placerholder}>
            <div className='modal-main'>
                <h2 className="black">Add Expense: </h2>
                <form onSubmit={submitHandler_}>
                    <label className="black">Expense Name: 
                        <input required type="text" name="expense" value={expense_} onChange={changeHandler_} placeholder="Food" />
                    </label>
                    <label className="black">Monthly Budget: $ 
                        <input required type="number" step="0.01" pattern="^\d*(\.\d{0,2})?$" min="0" name="budget" value={budget_} onChange={changeHandler_} placeholder="300.00" />
                    </label>
                    <div className="buttons-flex">
                        <button type="submit" onClick={handleClose} className="buttons-invariant">Submit</button>
                        <button onClick={handleClose} className="buttons-invariant">Close</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddExpenseForm