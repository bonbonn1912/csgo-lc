import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"
import { Scoreboard } from "./Scoreboard";
import imgUrl from "../assets/bg.jpg";
import { getFaceitRank } from "../player/getFaceitRank";
import { redirect } from "react-router-dom";



export const Room = (props) =>{
    const [dataReceived, setDataReeceived] = useState(false)
    const [playerData, setPlayerData] = useState()
    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() =>{
        let key = searchParams.get("key")
        if(key != null){
            const getGameData = async () =>{
                try {
                    const response = await fetch(`/api/v1/getgame?key=${key}`, {
                      method: "GET",
                    });
                    let data = await response.json()
                    if(data.players.length > 0){
                    let players = data.players.map((singlePlayer) => {
                            singlePlayer["faceit_rank"] = getFaceitRank(singlePlayer.faceit_elo);
                            return singlePlayer;
                          });
                    setPlayerData(players)
                    setDataReeceived(true)
                    }
                    return data;
                  } catch (err) {
                    return "ERR";
                  }
            }
            getGameData()
            
        }
    },[]) 

    return (<div>
        {
         dataReceived ? <Scoreboard players={playerData} imgUrl={imgUrl}/>: "wrong url "
        //dataReceived ? "dw": <h1> Loading </h1>
        }
    </div>)
}