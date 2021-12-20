import logo from './logo.svg';
import './App.css';
import Home from './Home';
import React from 'react';
import { render } from '@testing-library/react';
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Transactions from './Transactions';
import Register from './Register';

export default class App extends React.Component {
  state = {
    
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route exact path="/transactionsTable" element={<Transactions/>}/>
              <Route exact path="/registerPage" element={<Register/>}/>
            </Routes>
          </BrowserRouter>
        </header>
      </div>
    );
  }
}
