import * as React from 'react';

const ChatRoom = () => {
  return (
    <React.Fragment>
      <h1>Chats</h1>
      <p>👉 Select a chat to load the messages</p>
      <p>&nbsp;</p>
      <div className="chat" style={{ marginBottom: 150 }}>
        <h5></h5>
        <p>&nbsp;</p>
        <div className="response">
          <form>
            <div className="form-group">
              <input type="text" placeholder="Enter Message" className="form-control" name="message" />
            </div>
          </form>
        </div>
        <div className="table-responsive">
          <table className="table table-striped">
            <tbody>
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ChatRoom;