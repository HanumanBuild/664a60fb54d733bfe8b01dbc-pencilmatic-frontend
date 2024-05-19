import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DrawingPage from './pages/DrawingPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/drawing" component={DrawingPage} />
        <Route path="/" component={LoginPage} />
      </Switch>
    </div>
  );
}

export default App;