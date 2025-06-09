import React, { useState, useEffect } from "react";
import config_icon from "../images/config_icon.svg";

function ChatIcon({nomeDoTime}) {

    return (
        <div className={`${color} flex border p-2 rounded-2xl mt-3 text-left cursor-pointer items-top min-w-50`}>
            <div onClick={goToTeam} className="w-full flex flex-col justify-evenly">
                <h1 className="w-[90%]">{nomeDoTime}</h1>
                <p>{funcao}</p>
            </div>
        </div> 
    );
    
}

export default ChatIcon;
