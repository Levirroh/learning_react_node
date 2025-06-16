import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

function Chat({messagesChat}) {
    if (messagesChat != null){
        return (
            <div className="w-full">
                {messagesChat.map((message) => (
                     <div key={message.id_message}>
                        <h1 className="font-bold">{message.content_message}</h1>
                        <p></p>
                    </div>
                ))}
            </div> 
        );
    }
}

export default Chat;
