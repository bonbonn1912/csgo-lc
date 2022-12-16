import { useEffect, useState } from "react";

export const PlayerCard = (props) =>{
    const [url, setUrl] = useState("")

    useEffect(() =>{
        if(isNaN(props.singlePlayer.faceit_rank)){
            setUrl("https://i.imgur.com/D9VoLR5.png")
        }else{
            setUrl(`https://beta.leetify.com/assets/images/rank-icons/faceit${props.singlePlayer.faceit_rank}.svg`)
        }
    },[])
    return (
        <tr>
          <td className="border-b text-white px-1 py-2 text-center font-bold text-lg"><a href={`https://steamcommunity.com/profiles/${props.singlePlayer.steam64}`}>{props.singlePlayer.username}</a></td>
          <td className="border-b text-white px-1 py-2 text-center font-bold text-lg">{props.singlePlayer.faceit_elo}</td>
          <td className="border-b text-white px-1 py-2 font-bold text-lg">
            <img className="h-10 text-white w-13 mx-auto" src={props.singlePlayer.mm_rank}></img>
          </td>
          <td className="border-b px-1 py-2 text-center font-bold text-lg flex justify-center">
          <a className="flex justify-center" href={`${props.singlePlayer.faceit_url}`}>
          <img className="px-2 py-2 w-14 h-14 content-center" src={
                url
          }></img>
          <img className="px-1 py-2 w-14 h-14 content-center rounded-full" src={`${props.singlePlayer.avatar}`}>
          </img>
          </a>
          </td>
        </tr>
      );
}