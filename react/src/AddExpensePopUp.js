import React, { useState } from 'react';
import axios from 'axios'
import './App.css'


const AddExpensePopUp = ({handleClose, show}) => {
    
    const class_placerholder = show ? 'modal display-block' : 'modal display-none';

    return (
        <div className={class_placerholder}>
            <div className='modal-main'>
                <h2 className="black">Add an Expense: </h2>
                <form>
                    <label className="black">Expense Name: 
                        <input type="text" placeholder="Food" />
                    </label>
                    <label className="black">Budget: 
                        <input type="text" placeholder="300.00" />
                    </label>
                    <div className="buttons-flex">
                        <input type="submit" value="Submit" className="buttons-invariant"/>
                        <button onClick={handleClose} className="buttons-invariant">Close</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddExpensePopUp