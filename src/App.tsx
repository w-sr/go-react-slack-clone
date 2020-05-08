import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './components/Login';
import Chat from './components/Chat';

import './App.css';

import { setPusherClient } from 'react-pusher';
import Pusher from 'pusher-js';

const App = () => {
  const pusherClient = new Pusher('1c26e82bbab3e3492ee0', {
    authEndpoint: '/pusher/auth',
    cluster: 'mt1',
  });

  setPusherClient(pusherClient);

  React.useEffect(() => {
    pusherClient.subscribe('update');
    pusherClient.bind('new-user', function (data) {
      console.log(data.email)
    })
  }, [pusherClient])

  return (
    <Router>
      <Route path="/" exact component={Login} />
      <Route path="/chat" component={Chat} />
    </Router>
  );
}

export default App;
