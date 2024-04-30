import { useEffect, useState, useRef } from "react";
import UserList from "../components/Userlist";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [sender, setSender] = useState([]);
  const [messageId, setMessageId] = useState("");
  const listRef = useRef();
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo(0, listRef.current.scrollHeight);
    }
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      const lobbyid = localStorage.getItem("lobbyid");
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          `https://lockerroom-7dd0015188c2.herokuapp.com/lobby/info/${lobbyid}`,
          {
            method: "GET",
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        const data = await response.json();
        const sortedMessages = data.rows.sort(
          (a, b) => a.message_id - b.message_id
        );

        const temp = sortedMessages.map((message) => message.message_content);
        setMessages(temp);
        setSender(sortedMessages.map((message) => message.user_id));
        setMessageId(sortedMessages.map((message) => message.message_id));

        const senderName = await fetch(
          `https://lockerroom-7dd0015188c2.herokuapp.com/users/${lobbyid}`,
          {
            method: "GET",
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        const senderData = await senderName.json();
        const senderNamesMap = senderData.reduce((map, user) => {
          map[user.user_id] = user.user_name;
          return map;
        }, {});
        const senderNames = data.rows.map(
          (message) => senderNamesMap[message.user_id]
        );
        setSender(senderNames);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSendMessage = async (message) => {
    const lobbyid = localStorage.getItem("lobbyid");
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    console.log(id, lobbyid);
    try {
      const response = await fetch(
        `https://lockerroom-7dd0015188c2.herokuapp.com/lobby/${lobbyid}`,
        {
          method: "POST",
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, message }),
        }
      );
      const data = await response.json();
      setMessages([...messages, data]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
    window.location.reload();
  };

  const [message, setMessage] = useState("");

  const handleDeleteMessage = async (messageId) => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    console.log(messageId);
    try {
      const response = await fetch(
        `https://lockerroom-7dd0015188c2.herokuapp.com/message/${messageId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
          }),
        }
      );
      if (response.ok) {
        console.log("Message deleted");
      } else {
        console.error("Error deleting message");
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
    window.location.reload();
  };

  const handleEditMessage = async (messageId) => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    const newMessage = prompt("Enter the new message:");
    try {
      const response = await fetch(
        `https://lockerroom-7dd0015188c2.herokuapp.comd0015188c2.herokuapp.com/message/${messageId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
            message: newMessage,
          }),
        }
      );
      console.log(response);
      if (response.ok) {
        console.log("Message updated");
      } else {
        console.error("Error updating message");
      }
    } catch (error) {
      console.error("Error updating message:", error);
    }
    window.location.reload();
  };

  const handleAddUser = async () => {
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");
    const lobbyid = localStorage.getItem("lobbyid");
    const personToAdd = prompt(
      "Enter the username of the person you want to add:"
    );
    try {
      const response = await fetch(
        `https://lockerroom-7dd0015188c2.herokuapp.com/lobby/${lobbyid}/add-user`,
        {
          method: "POST",
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            personToAdd: personToAdd,
          }),
        }
      );
      if (response.ok) {
        console.log("User added successfully");
      } else {
        console.error("Error adding user");
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleRemoveUser = async () => {
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");
    const lobbyid = localStorage.getItem("lobbyid");
    const personToRemove = prompt(
      "Enter the username of the person you want to remove:"
    );
    try {
      const response = await fetch(
        `https://lockerroom-7dd0015188c2.herokuapp.com/lobby/${lobbyid}/remove-user`,
        {
          method: "POST",
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            personToRemove: personToRemove,
          }),
        }
      );
      if (response.ok) {
        console.log("User removed successfully");
      } else {
        console.error("Error removing user");
      }
    } catch (error) {
      console.error("Error removing user:", error);
    }
  };

  return (
    <div className="Chat">
      <div className="Chatbuttons">
        <button onClick={handleAddUser}>Add User</button>
        <button onClick={handleRemoveUser}>Remove User</button>
        <UserList />
      </div>
      <h1>Chat</h1>
      <div ref={listRef} className="Chat-container">
        {messages.map((message, index) => (
          <div className="Message" key={index}>
            <span className="Sender">{sender[index]}:</span> {message}{" "}
            <span className="Messagebuttons">
              {" "}
              <button onClick={() => handleDeleteMessage(messageId[index])}>
                Delete
              </button>
              <button onClick={() => handleEditMessage(messageId[index])}>
                Edit
              </button>
            </span>
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type your message..."
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="Sendbtn" onClick={() => handleSendMessage(message)}>
        Send
      </button>
    </div>
  );
};

export default Chat;
