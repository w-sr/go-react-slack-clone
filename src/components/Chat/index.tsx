import React from 'react';

import Header from './header';
import Contacts from './contacts';
import ChatRoom from './chatroom';

import '../styles.css'

const ChatComponent = () => {
  return (
    <React.Fragment>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <nav className="col-sm-3 col-md-2 d-none d-sm-block bg-light sidebar">
            <Contacts />
          </nav>

          <main role="main" className="col-sm-9 ml-sm-auto col-md-10 pt-3">
            <ChatRoom />
          </main>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ChatComponent;