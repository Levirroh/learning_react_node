import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import config_icon from "../images/config_icon.svg";

function TeamIcon({nomeDoTime, id_team, funcao, openConfig, setOpenConfig, setSelectedTeamConfig, getTeamMembers }) {
    const navigate = useNavigate();

    function goToTeam(){
        navigate(`/Team/${id_team}`);
    }

    var totalTasks = 5;
    var completedTasks = 0;

    function OpenConfig(){
        setOpenConfig(!openConfig);
        setSelectedTeamConfig([id_team, nomeDoTime, funcao, 'azul', 'time Teste', totalTasks, completedTasks]);
        getTeamMembers(id_team);
    }

    return (
        <div className={`flex border p-2 rounded-2xl mt-3 text-left cursor-pointer items-top min-w-50`}>
            <div onClick={goToTeam} className="w-full flex flex-col justify-evenly">
                <h1 className="w-[90%]">{nomeDoTime}</h1>
                <p>{funcao}</p>
            </div>
            <div className="flex">
                <img src={config_icon} alt="Configurações" className="h-5" onClick={OpenConfig} />
            </div>
        </div> 
    );
}

export default TeamIcon;
