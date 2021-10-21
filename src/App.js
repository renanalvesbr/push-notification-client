import React, { Component } from 'react';

import Notifications from './Notifications';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Push Notifications Client</h1>
        </header>
       <div>
         <Notifications />
       </div>
      </div>
    );
  }
}

export default App;
