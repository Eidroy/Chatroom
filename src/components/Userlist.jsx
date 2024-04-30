import Modal from "react-modal";
import { useState } from "react";

Modal.setAppElement("#root");

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "20px",
  },
};

const UserList = () => {
  const [userList, setUserList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUserList = async () => {
    const token = localStorage.getItem("token");
    const lobbyid = localStorage.getItem("lobbyid");
    try {
      const response = await fetch(
        `https://lockerroom-7dd0015188c2.herokuapp.com/users/${lobbyid}`,
        {
          method: "GET",
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setUserList(data.map((user) => user.user_name));
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };

  return (
    <div>
      <button onClick={handleUserList}>User List</button>
      <Modal
        isOpen={isModalOpen}
        style={customStyles}
        onRequestClose={() => setIsModalOpen(false)}
      >
        <h2 className="Userlist">User List</h2>
        <ul>
          {userList.map((username) => (
            <li className="Users" key={username}>
              {username}
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
};
export default UserList;
