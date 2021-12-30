import React from 'react';
import './App.css'


const AddExpenseForm = ({handleClose, show, submitHandler}) => {
    
    const class_placerholder = show ? 'modal display-block' : 'modal display-none';

    return (<>
        <div className={class_placerholder}>
            <div className='modal-main'>
                <h2 className="black">Add Expense: </h2>
                <form onSubmit={submitHandler}>
                    <label className="black">Expense Name: 
                        <input required type="text" name="expense"  placeholder="Eg. Food" />
                    </label>
                    <label className="black">Monthly Budget: $ 
                        <input required type="number" step="0.01" pattern="^\d*(\.\d{0,2})?$" min="0" name="budget" placeholder="0.00" />
                    </label>
                    <div className="buttons-flex">
                        <button type="submit" onClick={handleClose} className="button-25" id="modalButtons">Submit</button>
                        <button type="button" onClick={handleClose} className="button-25" id="modalButtons">Close</button>
                    </div>
                    
                </form>
                
            </div>
        </div>
    </>)
}

export default AddExpenseForm