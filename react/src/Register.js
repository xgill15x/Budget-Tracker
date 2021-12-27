import React, { useState } from 'react';
import axios from 'axios'
import './App.css'
import Button from 'react-bootstrap/Button'
import { faWindowRestore } from '@fortawesome/free-solid-svg-icons';
import {createBrowserHistory} from "history";
import Login from './Login';
//import 'bootstrap/dist/css/bootstrap.min.css'

const api = 'Budgettracker-env.eba-vithmiis.us-east-2.elasticbeanstalk.com';

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            showLogin: false,
            showRegister: true
        }

        this.submitUser = this.submitUser.bind(this);
        this.renderLogin = this.renderLogin.bind(this);
        this.changeLoginState = this.changeLoginState.bind(this);
        this.renderRegister = this.renderRegister.bind(this);
    }

    submitUser = e => {
        e.preventDefault();

        let isUsernameTaken = false;
        this.state.users.map(user => {
            if (e.target[0].value === user.username) {
                isUsernameTaken = true;
            }
        })
        
        if (isUsernameTaken === false) {
            if (e.target[1].value === e.target[2].value) {
                axios.post(api + "/user/addRow",{
                    username: e.target[0].value,
                    password: e.target[1].value
                }).then(response => {
                    console.log("status: ", "user created")
                    console.log("Response:", response)
                    const  newUser = {
                        id: response.data,
                        username: e.target[0].value,
                        password: e.target[1].value
                    }

                    this.setState({ users: [...this.state.users, newUser] }, function() {
                        // console.log("username", newUser.username);
                        // console.log("pass", newUser.password);
                        // console.log("usersList",this.state.users);
                        e.target[0].value = '';
                        e.target[1].value = '';
                        e.target[2].value = '';
                    })
                    
                }).catch(error => {
                    console.log(error)
                }) 
                
                window.alert("User has been created!") 
            }
            else {
                
                e.target[1].value = '';
                e.target[2].value = '';
                
                window.alert("Passwords do not match.Try again.")
            }
        }
        else {
            window.alert("Username is taken. Try another.")
            e.target[0].value = '';
            e.target[1].value = '';
            e.target[2].value = '';
        }
    }

    componentDidMount() {
        axios.get(api + "/user/allUsers")
        .then(res => {
            this.setState({users: res.data}, function() {
                console.log(this.state.users);
            })
            
        })
    }

    changeLoginState() {
        this.setState({showLogin: true, showRegister: false})
    }
    renderLogin() {
        console.log("signed OUt")
        const pathName = window.location.pathname;
        const username = pathName.split('/')[2];
        localStorage.setItem("auth", false);


        const history = createBrowserHistory();
        history.push('/');   //changes address and bottom code changes the rendering
        return (<>
            {/* <Link to={homePage}>{<Home username={this.state.username}/>}</Link> */}
            <Login />
        </>)
    }

    renderRegister() {
        return (<>
            <div className='modal-main'>
                    <h1 className="mainTitle" id='formText'>Register</h1>
                    <form onSubmit={this.submitUser}>
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
                            <button type="submit" className="buttons-invariant">Submit</button>
                            <button type="button" onClick={() => {this.changeLoginState()}}className="buttons-invariant">to Login</button>
                        </div>
                        
                    </form>
                    
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