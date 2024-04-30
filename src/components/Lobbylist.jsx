import { useEffect, useState } from "react";

const handleJoin = (lobbyid, teamName) => {
  window.location.href = "/chat";
  localStorage.setItem("lobbyid", lobbyid);
  localStorage.setItem("teamName", teamName);
};

const LobbyList = () => {
  const [lobbies, setLobbies] = useState([]);

  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchLobbies = async () => {
      try {
        const response = await fetch(
          `https://lockerroom-7dd0015188c2.herokuapp.com/lobby/${id}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        const data = await response.json();
        console.log(data);
        const username = data[0].userName;
        localStorage.setItem("username", username);
        setLobbies(data);
      } catch (error) {
        console.error("Error fetching lobbies:", error);
      }
    };

    fetchLobbies();
  }, [id, token]);
  return (
    <div className="Lobbylist">
      <h1>Room List</h1>
      {lobbies.map((lobby) => (
        <div className="Lobby" key={lobby.teamId}>
          <h3>{lobby.teamName}</h3>
          <button onClick={() => handleJoin(lobby.teamId, lobby.teamName)}>
            Chat
          </button>
        </div>
      ))}
    </div>
  );
};

export default LobbyList;
