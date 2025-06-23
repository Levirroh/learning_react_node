import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Message from "./Message.jsx";

function ChatInput() {
    return (
        <div className="w-full h-10 pl-3 pr-3">
            <input type="text" className="h-10 bg-gray-300 w-full p-2" placeholder="Digite aqui..."/>
        </div> 
    );
}

export default ChatInput;
