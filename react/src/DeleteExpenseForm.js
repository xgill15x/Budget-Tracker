import React, { useState } from 'react';
import axios from 'axios'
import './App.css'

import Select from 'react-select'


const DeleteExpenseForm = ({expense, expenses, show, handleClose_, submitHandler_, onChange_}) => {

    const class_placerholder = show ? 'modal display-block' : 'modal display-none';

    return (
          
        <div className={class_placerholder}>
                <div className='modal-main'>
                    <h2 className="black"> Expense: </h2>
                    <div>
                        
                        <Select options={expenses}/>
                        
                    </div>
                </div>
             
        </div>
        
    )
    
}

export default DeleteExpenseForm