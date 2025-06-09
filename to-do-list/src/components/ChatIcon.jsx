import React, { useState, useEffect } from "react";
import config_icon from "../images/config_icon.svg";

function ChatIcon({nomeDoTime, description}) {
    return (
        <div className={`flex border p-2 rounded-2xl mt-3 text-left cursor-pointer items-top min-w-50`}>
            <div className="w-full flex flex-col justify-evenly">
                <h1 className="w-[90%]">nome: {nomeDoTime}</h1>
                <p>descricao: {description}</p>
            </div>
        </div> 
    );
    
}

export default ChatIcon;
