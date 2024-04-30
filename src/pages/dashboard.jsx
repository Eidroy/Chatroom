import CreateLobby from "../components/Createlobby";
import LobbyList from "../components/Lobbylist";

const handlePM = () => {
  window.location.href = "/private-messages";
};

const Dashboard = () => {
  return (
    <div className="Dashboard">
      <div className="Dashboard-top">
        <button className="pms" onClick={handlePM}>
          Private messages
        </button>
        <CreateLobby />
      </div>
      <LobbyList />
    </div>
  );
};

export default Dashboard;
