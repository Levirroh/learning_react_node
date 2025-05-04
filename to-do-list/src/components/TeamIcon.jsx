import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import config_icon from "../images/config_icon.svg";

function TeamIcon({nomeDoTime, id_team, funcao, openConfig, setOpenConfig, setSelectedTeamConfig }) {
    const navigate = useNavigate();

    function goToTeam(){
        navigate(`/Team/${id_team}`);
    }

    function OpenConfigo(){
        setOpenConfig(!openConfig);
        setSelectedTeamConfig([id_team, nomeDoTime, funcao])
    }

    return (
        <div className={`flex border p-2 rounded-2xl mt-3 text-left cursor-pointer items-top min-w-50`}>
            <div onClick={goToTeam} className="w-full flex flex-col justify-evenly">
                <h1 className="w-[90%]">{nomeDoTime}</h1>
                <p>{funcao}</p>
            </div>
            <div className="flex">
                <img src={config_icon} alt="Configurações" className="h-5" onClick={OpenConfigo} />
            </div>
        </div> 
    );
}

export default TeamIcon;
