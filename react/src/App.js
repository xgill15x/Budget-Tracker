import logo from './logo.svg';
import './App.css';
import Home from './Home';
import React from 'react';
import { render } from '@testing-library/react';

export default class App extends React.Component {
  state = {
    
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Home/>
          
        </header>
      </div>
    );
  }
}
