import React, { useState } from 'react';
import axios from 'axios'
import './App.css'

import Select from 'react-select'


const EditExpenseForm = ({myList, handleClose, handleChange, show, submitHandler}) => {

    const class_placerholder = show ? 'modal display-block' : 'modal display-none';
    const customStyles = {
        control: (base, state) => ({
          ...base,
          background: "black",
          // match with the menu
          borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
          // Overwrittes the different states of border
          borderColor: state.isFocused ? "yellow" : "green",
          // Removes weird border around container
          boxShadow: state.isFocused ? null : null,
          "&:hover": {
            // Overwrittes the different states of border
            borderColor: state.isFocused ? "red" : "blue"
          }
        }),
        menu: base => ({
          ...base,
          // override border radius to match the box
          borderRadius: 0,
          // kill the gap
          //marginTop: 0
        }),
        menuList: base => ({
          ...base,
          // kill the white space on first and last option
          padding: 0
        })
    };
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
                                <input required type="text" name=" newExpense"  placeholder="Food" />
                            </label>
                            <label className="black">New Monthly Budget: $ 
                                <input required type="number" step="0.01" pattern="^\d*(\.\d{0,2})?$" min="0" name="newBudget" placeholder="300.00" />
                            </label>
                            <div className="buttons-flex">
                                <button type="submit" onClick={handleClose} className="buttons-invariant">Submit</button>
                                <button type="button" onClick={handleClose} className="buttons-invariant">Close</button>
                            </div>
                        </form>
                    </div>
                </div>
             
        </div>
        
    )
    
}

export default EditExpenseForm