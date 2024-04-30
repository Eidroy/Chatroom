import { useState } from "react";

function CreateLobby() {
  const [lobbyName, setLobbyName] = useState("");

  const handleCreateLobby = () => {
    const nickname = localStorage.getItem("username");
    const token = localStorage.getItem("token");
    fetch("https://lockerroom-7dd0015188c2.herokuapp.com/lobby", {
      method: "POST",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Teamname: lobbyName,
        nickname: nickname,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error creating lobby:", error);
      });
    window.location.reload();
  };

  const handleLobbyNameChange = (event) => {
    setLobbyName(event.target.value);
  };

  return (
    <div className="Createlobby">
      <input
        type="text"
        value={lobbyName}
        onChange={handleLobbyNameChange}
        placeholder="Enter room name"
      />
      <button onClick={handleCreateLobby}>Create Room</button>
    </div>
  );
}

export default CreateLobby;
