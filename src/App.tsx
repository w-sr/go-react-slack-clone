import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/Login';
import ChatComponent from './components/Chat';

import './App.css';

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Login} />
      <Route path="/chat" component={ChatComponent} />
    </Router>
  );
}

export default App;
