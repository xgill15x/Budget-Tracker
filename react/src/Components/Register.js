import React from 'react';
import '../App.css';
import {createBrowserHistory} from "history";
import Login from './Login';
import { addNewUserEndpoint, checkIfUsernameExistsEndpoint} from '../Resources/Resources';

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showLogin: false,
            showRegister: true
        }

        this.submitRegister = this.submitRegister.bind(this);
        this.renderLogin = this.renderLogin.bind(this);
        this.changeLoginState = this.changeLoginState.bind(this);
        this.renderRegister = this.renderRegister.bind(this);
    }

    submitRegister = e => {
        e.preventDefault();

        const username = e.target[0].value;
        const password = e.target[1].value;
        const rePassword = e.target[2].value;

        checkIfUsernameExistsEndpoint(username)
        .then(response => {
            
            const usernameTaken = response.data;
            if (usernameTaken === false) {
                if (password === rePassword) {
    
                    const userAccount = {
                        username: username,
                        password: password
                    }
                    
                    addNewUserEndpoint(userAccount)
                    .then(response => {
    
                        //clear fields
                        e.target[0].value = '';
                        e.target[1].value = '';
                        e.target[2].value = '';
                    
                        
                    }).catch(error => {
                        //console.log(error);
                    }) 
    
                    this.setState({showLogin: true, showRegister: false});
                    
                    window.alert("User has been created!");
                }
                else {
                    
                    e.target[1].value = '';
                    e.target[2].value = '';
                    
                    window.alert("Passwords do not match.Try again.");
                }
            }
            else {
                window.alert("Username is taken. Try another.");
                e.target[0].value = '';
                e.target[1].value = '';
                e.target[2].value = '';
            }
        })
    }

    changeLoginState() {
        this.setState({showLogin: true, showRegister: false});
    }
    renderLogin() {

        const history = createBrowserHistory();
        history.push('/'); 
        return (<>
            <Login />
        </>)
    }

    renderRegister() {
        return (<>
            <div className='App-header'>
                <div className='registerBox'>
                    <h1 className="mainTitle" id='formText'>Register</h1>
                    <form onSubmit={this.submitRegister}>
                        <label className="black">Username: 
                        <div>
                            <input id="registerInput" required type="text" name="expense"  placeholder="Username_99" />
                        </div>
                        </label>
                        <label className="black">Password:  
                            <input name="password" placeholder="Password123" required type="password"/>
                        </label>
                        <label className="black">Confirm Password:  
                            <input name="confirmPassword" placeholder="Password123" required type="password" />
                        </label>
                        <div className="buttons-flex">
                            <button type="submit" className="button-25" id="modalButtons">Submit</button>
                            <button type="button" className="button-25" id="modalButtons" onClick={() => {this.changeLoginState()}}>Back to Login</button>
                        </div>
                        
                    </form>
                    
                </div>
            </div>
        </>)
    }

    render() {
        return(<>
            <div>
                {this.state.showRegister && this.renderRegister()}
                {this.state.showLogin && this.renderLogin()}
            </div>
        </>)
    }
}