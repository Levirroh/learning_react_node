import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Message from "./Message.jsx";

function Chat({messagesChat, user}) {
    if (messagesChat != null){
        return (
            <div className="w-full h-[90vh] flex flex-col justify-end">
                {messagesChat.map((message) => (
                     <Message key={message.id_message} message={message} user={user}></Message>
                ))}
                <input type="text" />
            </div> 
        );
    }
}

export default Chat;
