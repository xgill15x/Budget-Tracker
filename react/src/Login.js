import React, { useState } from 'react';
import axios from 'axios'
import './App.css'
import Button from 'react-bootstrap/Button'
import Home from './Home';
import {Link, Route, Routes} from "react-router-dom";
import {createBrowserHistory} from "history";
import Register from './Register';
//import 'bootstrap/dist/css/bootstrap.min.css'


export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            username: '',
            showHome: false,
            showLogin: true,
            showRegister: false
        }

        this.submitUser = this.submitUser.bind(this);
        this.renderLogin = this.renderLogin.bind(this);
        this.renderHome = this.renderHome.bind(this);
        this.changeRegisterState = this.changeRegisterState.bind(this);
        this.renderRegister = this.renderRegister.bind(this);
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
            const myUsername = e.target[0].value;
            const homePage = { 
                pathname: "/home/" + myUsername, 
            };

            if (e.target[1].value === targetPassword) {
                localStorage.setItem("auth", "authenticated");
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

    }

    componentDidMount() {
        axios.get("http://localhost:8080/user/allUsers")
        .then(res => {
            this.setState({users: res.data}, function() {
                console.log(this.state.users);
            })
            
        })
        
        localStorage.setItem("auth", "notAuthenticated");
        this.setState({showHome: false, showLogin: true, showRegister: false})
    }

    renderLogin() {
        return (
            <div className='App-header'>
                <div className="registerBox">
                    <h1 className="mainTitle" id='formText'>{"Budget Tracker\n\nLogin"}</h1>
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
                            <button type="button" onClick={() => {this.changeRegisterState()}} className="buttons-invariant">Register</button>
                        </div>
                        
                    </form>
                </div>
            </div>
        );
    }

    changeRegisterState() {
        this.setState({showLogin: false, showRegister: true, showHome: false})
    }
    renderRegister() {
        const history = createBrowserHistory();
        history.push('/registerPage');   //changes address and bottom code changes the rendering

        return (<>
            {/* <Link to={homePage}>{<Home username={this.state.username}/>}</Link> */}
            <Register />
        </>)
    }

    renderHome() {
        // const homePage = { 
        //     pathname: "/home" + this.state.username, 
        // };
        
        const history = createBrowserHistory();
        history.push('/home/' + this.state.username);   //changes address and bottom code changes the rendering

        return (<>
            {/* <Link to={homePage}>{<Home username={this.state.username}/>}</Link> */}
            <Home />
        </>)

    }
    

    render() {
        
        return (<>
            <div>
                {this.state.showLogin && this.renderLogin()}
                {this.state.showHome && this.renderHome()}
                {this.state.showRegister && this.renderRegister()}
                
                {/* {this.renderLinkIf(
                    <Home username={this.state.username} />,
                    this.state.showHome,
                    '/home',
                )} */}
                
            </div>
            
        </>)
    }
}