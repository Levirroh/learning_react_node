import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function TeamIcon({nomeDoTime, id_team, funcao }) {
    const [team, setTeam] = useState(null);
    const navigate = useNavigate();

    function goToTeam(){
        navigate(`/Team/${id_team}`);
    }

    return (
        <div className={`flex flex-col border p-2 rounded-2xl mt-3 text-left cursor-pointer`} onClick={goToTeam}>
          <h1>Time: {nomeDoTime}</h1>
          <p>Função: {funcao}</p>
          <p></p>
        </div> 
    );
}

export default TeamIcon;
