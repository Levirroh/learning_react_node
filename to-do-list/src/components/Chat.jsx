import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Message from "./Message.jsx";

function Chat({messagesChat, user}) {
    if (messagesChat != null){
        return (
            <div className="w-full h-[89vh] flex flex-col justify-end">
                {messagesChat.map((message) => (
                     <Message key={message.id_message} message={message} user={user}></Message>
                ))}
            </div> 
        );
    }
}

export default Chat;
