import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './components/login';
import Chat from './components/chat';

import './App.css';

function App() {
  return (
    <Router>
      <Route path="/" exact component={Login} />
      <Route path="/chat" component={Chat} />
    </Router>
  );
}

export default App;
