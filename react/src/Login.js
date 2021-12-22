import React, { useState } from 'react';
import axios from 'axios'
import './App.css'
import Button from 'react-bootstrap/Button'
import Home from './Home';
//import 'bootstrap/dist/css/bootstrap.min.css'


export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            username: '',
            showHome: false,
            showLogin: true
        }

        this.submitUser = this.submitUser.bind(this);
    }

    submitUser = e => {
        e.preventDefault();
        
        let usernameFound = false;
        let targetPassword = '';
        
        //check if username exists
        this.state.users.map((user) => {
            if (e.target[0].value === user.username) {
                targetPassword = user.password;
                usernameFound = true;
            }
        })

        if (usernameFound) {
            //check if password matches
            if (e.target[1].value === targetPassword) {
                this.setState({username: e.target[0].value, showHome: true, showLogin: false}, function() {
                    console.log("Login Successful for: ", e.target[0].value);
                });
            }
            else {
                e.target[0].value = '';
                e.target[1].value = '';

                console.log("login failed");
                window.alert("Username/Password is wrong. Try Again.");
            }
        }
        else {
            e.target[0].value = '';
            e.target[1].value = '';
            console.log("login failed");
            window.alert("Username/Password is wrong. Try Again.");
        }
            // return(<>
            //     <Home username={this.props.username}/>
            // </>);
        
        // <Home username={this.props.username}/>

    }

    componentDidMount() {
        axios.get("http://localhost:8080/user/allUsers")
        .then(res => {
            this.setState({users: res.data}, function() {
                console.log(this.state.users);
            })
            
        })
    }

    

    render() {
        
        return (<>
            <div>
                <div className="registerBox" id={this.state.showLogin ? "showLoginBox":"hideLoginBox"}>
                        <h1 className="mainTitle" id='formText'>Login</h1>
                        <form onSubmit={this.submitUser}>
                            <label className="black">Username: 
                            <div>
                                <input id="registerInput" required type="text" name="expense"  placeholder="Username_99" />
                            </div>
                            </label>
                            <label className="black">Password:  
                                <input name="password" placeholder="Password123" required type="password"/>
                            </label>
                            <div className="buttons-flex">
                                <button type="submit" className="buttons-invariant">Submit</button>
                                <button type="button" className="buttons-invariant">Close</button>
                            </div>
                            
                        </form>
                </div>
            </div>
            {this.state.showHome ? <Home username={this.state.username}/> : null} 
        </>)
    }
}