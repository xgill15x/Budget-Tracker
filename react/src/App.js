import logo from './logo.svg';
import './App.css';
import Home from './Home';
import React from 'react';
import { render } from '@testing-library/react';
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Transactions from './Transactions';
import Register from './Register';
import Login from './Login'

export default class App extends React.Component {
  state = {
    
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <BrowserRouter>
            <Routes>
              <Route exact path="/home/:username" element={<Home auth={false} />}/>
              <Route exact path="/transactionsTable/:username" element={<Transactions/>}/>
              <Route exact path="/registerPage" element={<Register/>}/>
              <Route exact path="/" element={<Login/>}/>
            </Routes>
          </BrowserRouter>
        </header>
      </div>
    );
  }
}
