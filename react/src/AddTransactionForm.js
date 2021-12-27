import React, { useState } from 'react';
import axios from 'axios'
import './App.css'


const AddTransactionForm = ({myList, handleClose, show, submitHandler, handleChange,}) => {
    
    const class_placerholder = show ? 'modal display-block' : 'modal display-none';

    return (<>
        <div className={class_placerholder}>
            <div className='modal-main'>
                <h2 className="black">Add Transaction: </h2>
                <form onSubmit={submitHandler}>
                    
                    <label className="black">Expense Category:
                        <select onChange={handleChange}>
                            {myList.map((element) => (
                                <option value={element.expense}>{element.expense}</option>
                            ))}
                        </select>
                    </label>

                    <label className="black">Payee Info: 
                        <input required type="text" name="payee"  placeholder="Eg. Superstore" />
                    </label>
                    <label className="black">Spent: $ 
                        <input required type="number" step="0.01" pattern="^\d*(\.\d{0,2})?$" min="0" name="spent" placeholder="0.00" />
                    </label>
                    <div className="buttons-flex">
                        <button type="submit" onClick={handleClose} className="buttons-invariant">Submit</button>
                        <button type="button" onClick={handleClose} className="buttons-invariant">Close</button>
                    </div>
                    
                </form>
                
            </div>
        </div>
    </>)
}

export default AddTransactionForm