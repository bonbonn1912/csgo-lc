import { useState } from "react";
import { Input } from "./components/Input";
import { getPlayerObjects } from "./player/getSteamID";
import { Scoreboard } from "./components/Scoreboard";
import { Room } from "./components/Room";
import { getFaceitRank } from "./player/getFaceitRank";
import imgUrl from "./assets/bg.jpg";
import { BrowserRouter as Router,Route, Routes } from "react-router-dom";

function App() {
  const [playerDataReceived, setPlayerDataReceived] = useState(false);
  const [playerData, setPlayerData] = useState();

  const handleClick = async (statusMessage) => {
    let playerObjects = getPlayerObjects(statusMessage);
    let resp = await sendRequest(playerObjects);
    if (resp.players.length > 0) {
      setPlayerDataReceived(true);
      let players = resp.players.map((singlePlayer) => {
        singlePlayer["faceit_rank"] = getFaceitRank(singlePlayer.faceit_elo);
        return singlePlayer;
      });
      console.log(players);

      setPlayerData(players);
    }
  };

  const sendRequest = async (playerObjects) => {
    const data = JSON.stringify({ player: playerObjects });
    try {
      const response = await fetch("/api/v1/status", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: data,
      });
      return response.json();
    } catch (err) {
      return "ERR";
    }
  };

  if (playerDataReceived) {
    return(<Scoreboard players={playerData} imgUrl={imgUrl} />)
    
  } else {
    return (
      <Router>
        <Routes>
        <Route path="/" element={<Input handleClick={handleClick} message={"Check"} imgUrl={imgUrl} />}/>
        <Route path="/room" element={<Room/>}/>
        </Routes>
      
      </Router>
     
    );
  }
}

export default App;
