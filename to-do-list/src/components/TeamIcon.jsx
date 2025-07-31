import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import config_icon from "../images/config_icon.svg";

function TeamIcon({nomeDoTime, id_team, funcao, openConfig, setOpenConfig, setSelectedTeamConfig, getTeamMembers, color }) {
    const navigate = useNavigate();

    function goToTeam(){
        navigate(`/Team/${id_team}`);
    }

    var totalTasks = 5;
    var completedTasks = 0;

    const OpenConfig = (e) => {
        e.stopPropagation(); 
        setOpenConfig(!openConfig);
        setSelectedTeamConfig([
        id_team,
        nomeDoTime,
        funcao,
        color || "azul",
        "time Teste",
        totalTasks,
        completedTasks
        ]);
        getTeamMembers(id_team);
    };

    return (
        <div
        className={`relative flex flex-col justify-between rounded-2xl shadow-md transition transform hover:scale-[1.02] cursor-pointer w-48 min-h-[120px] p-4 text-white ${color}`}
        onClick={goToTeam}
        >
        {funcao === "Administrador" && (
            <div className="absolute top-2 right-2">
            <img
                src={config_icon}
                alt="Config"
                onClick={OpenConfig}
                className="w-5 h-5 hover:scale-110 transition"
            />
            </div>
        )}

        <div className="flex flex-col justify-between h-full">
            <h2 className="text-lg font-bold truncate">{nomeDoTime}</h2>
            <p className="text-sm opacity-90 mt-1">{funcao}</p>
        </div>
        </div>
    );
}

export default TeamIcon;
