import './App.css';
import Home from './Components/Home';
import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Transactions from './Components/Transactions';
import Register from './Components/Register';
import Login from './Components/Login'

export default class App extends React.Component {
  state = {
    
  };

  render() {
    return (
      <div className="App">
        <header>
          <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
              <Route exact path="/home/:username" element={<Home auth={false} />}/>
              <Route exact path="/transactionsTable/:username" element={<Transactions/>}/>
              <Route exact path="/registerPage" element={<Register/>}/>
              <Route exact path="/index.html" element={<Login/>}/>
              <Route exact path="/" element={<Login/>}/>
            </Routes>
          </BrowserRouter>
        </header>
      </div>
    );
  }
}
