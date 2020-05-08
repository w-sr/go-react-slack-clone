import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Pusher from 'pusher-js';

import {
  updateRoom,
  updateChannel,
  addUsers
} from '../../actions'
import { ObjectArray, ChatState } from '../../reducers/user.reducer'

import '../styles.css'

const pusher = new Pusher('1c26e82bbab3e3492ee0', {
  authEndpoint: '/pusher/auth',
  cluster: 'mt1',
});

const ChatComponent = () => {
  const storeEmail = useSelector((state: ChatState) => state.email);
  const contacts: ObjectArray = useSelector((state: ChatState) => state.subscribedUsers);
  const [endUser, setEndUser] = React.useState('');
  const dispatch = useDispatch()

  React.useEffect(() => {
    var publicChannel = pusher.subscribe('update');

    publicChannel.bind('new-user', function (data: any) {
      if (data.email !== storeEmail) {
        dispatch(updateChannel(pusher.subscribe('private-' + data.email)))
        dispatch(addUsers(data))
      }
    })

    if (storeEmail) {
      pusher.subscribe('private-' + storeEmail)
    }
  }, [pusher])

  const loadChatRoom = (e) => {
    e.preventDefault();

    dispatch(updateRoom({
      currentRoom: e.target.dataset.currentRoom,
      currentChannel: e.target.dataset.currentChannel,
      endUserName: e.target.dataset.endUserName,
    }))

    if (e.target.dataset.currentRoom !== undefined) {
      setEndUser(e.target.dataset.endUserName)
    }
  }

  return (
    <div className="contain-root">
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <a className="navbar-brand" href="#">Welcome Slack Chat!</a>
      </nav>
      <div className="main-body">
        <nav className="sidebar">
          <ul className="nav nav-pills flex-column">
            {contacts && contacts.length > 0 && contacts.map((user, index) => {
              return (
                <li className="nav-item" key={index}>
                  <a
                    href="#"
                    className="nav-link"
                    data-room-id={user.email}
                    data-user-name={user.name}
                    data-channel-id={index}
                    onClick={loadChatRoom}
                  >{user.name}</a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="main">
          <h1>Chats</h1>
          <p>👉 Select a chat to load the messages</p>
          <p>&nbsp;</p>
          <div className="chat" style={{ marginBottom: 150 }}>
            {endUser &&
              <h5>{endUser}</h5>
            }
            <p>&nbsp;</p>
            <div className="table-responsive">
              <table className="table table-striped">
                <tbody>
                </tbody>
              </table>
            </div>
            <input type="text" placeholder="Enter Message" className="form-control message" name="message" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatComponent;