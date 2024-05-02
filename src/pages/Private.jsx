import { useState, useEffect, useRef } from "react";

const Private = () => {
  const [messages, setMessages] = useState([]);
  const [originalMessages, setOriginalMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const listRef = useRef();
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo(0, listRef.current.scrollHeight);
    }
  }, [messages]);

  useEffect(() => {
    const fetchPrivateMessages = async () => {
      const token = localStorage.getItem("token");
      const username = localStorage.getItem("username");
      const response = await fetch(
        "https://lockerroom-7dd0015188c2.herokuapp.com/message/private-message",
        {
          headers: {
            Authorization: token,
            username,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      const sortedMessages = data.sort((a, b) => a.id - b.id);
      setOriginalMessages(sortedMessages);

      const users = sortedMessages.reduce((uniqueUsers, message) => {
        if (
          message.reciever_username !== username &&
          !uniqueUsers.some(
            (user) => user.username === message.reciever_username
          )
        ) {
          uniqueUsers.push({
            id: message.reciever_id,
            username: message.reciever_username,
          });
        }
        return uniqueUsers;
      }, []);

      setUsers(users);
    };

    fetchPrivateMessages();
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setMessages(
      originalMessages.filter(
        (message) =>
          message.sender_username === user.username ||
          message.reciever_username === user.username
      )
    );
  };

  const handleSendpm = async () => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const reciever = selectedUser.username;
    const message = messageInput;
    const response = await fetch(
      "https://lockerroom-7dd0015188c2.herokuapp.com/message/private-message",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          reciever_username: reciever,
          message,
          username,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    window.location.reload();
  };

  return (
    <div className="Private">
      <h1>Private Messages</h1>
      <div className="Private-container">
        <div className="sidebar">
          {users.map((user, index) => (
            <button key={index} onClick={() => handleUserClick(user)}>
              {user.username}
            </button>
          ))}
        </div>
        <div className="Private-chat">
          <div ref={listRef} className="Private-list">
            {messages.map((message) => (
              <div
                className={
                  message.sender_id == localStorage.getItem("id")
                    ? "Send"
                    : "Recieved"
                }
                key={message.id}
              >
                {message.message}
              </div>
            ))}
          </div>
          <div className="Input">
            <input
              type="text"
              placeholder="Enter message"
              onChange={(e) => setMessageInput(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter username"
              onChange={(e) => setSelectedUser({ username: e.target.value })}
            />
            <button onClick={handleSendpm}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Private;
