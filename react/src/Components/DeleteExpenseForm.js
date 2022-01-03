import React from 'react';
import '../App.css';

const DeleteExpenseForm = ({show, handleClose, deleteConfirm, handleDeleteConfirm}) => {

    const class_placerholder = show ? 'modal display-block' : 'modal display-none';

    return (
          
        <div className={class_placerholder}>
                <div className='modal-main'>
                
                    
                        
                        <h1 className="black">Confirm Deletion</h1>
                        <h2 className="black">Are you sure you want to delete this expense? </h2>

                        <form onSubmit={handleDeleteConfirm(deleteConfirm)}>
                            <div className="buttons-flex">
                                <button type="button" onClick={handleClose}>Cancel</button>
                                <button type="submit" onClick={() => {handleClose()}}>Yes</button>
                            </div>
                        </form>
                    
                </div>
             
        </div>
        
    )
    
}

export default DeleteExpenseForm