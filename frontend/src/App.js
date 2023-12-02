import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from './SignUp';
import  Login from './Login';
import Profile from './Profile';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>

        <Switch>
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
