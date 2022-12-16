import { PlayerCard } from "./PlayerCard"
import { useEffect } from "react";
import { getFaceitRank } from '../player/getFaceitRank'

export const Scoreboard = (props) =>{
   

    return (
        <div className="flex justify-center flex-col bg-black-rgba rounded-lg text-center w-3/5">
        <h2 className="text-2xl font-bold mb-4">Scoreboard</h2>
        <table className="border-gray-400 w-full opacity-120">
        <thead>
          <tr>
            <th className="px-1 py-2">Steam</th>
            <th className="px-1 py-2">ELO</th>
            <th className="px-1 py-2">Rank</th>
            <th className="px-1 py-2">Faceit</th>
          </tr>
        </thead>
        <tbody>
        {props.players.map((player) => (
                <PlayerCard key={player.id} singlePlayer={player}/>
            ))}
        </tbody>
      </table>
        </div>
        
      );
}