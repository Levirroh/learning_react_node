import React, { useState, useEffect } from "react";
import config_icon from "../images/config_icon.svg";

function ChatIcon({idChat, nomeDoTime, description, selectedChat, setSelectedChat}) {
    return (
        <div className={`flex border p-2 text-left cursor-pointer items-top min-w-10 overflow-hidden whitespace-nowrap`}
        onClick={() => setSelectedChat(idChat)}>
            <div className="w-full flex flex-col justify-evenly">
                <h1 className="w-[90%] truncate">{nomeDoTime}</h1>
                <p className="truncate">{description}</p>
            </div>
        </div> 
    );
    
}

export default ChatIcon;
