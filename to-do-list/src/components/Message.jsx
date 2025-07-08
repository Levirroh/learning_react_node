import React, { useState, useEffect } from "react";

function Message({message, user}) {
    console.log(message);
    console.log(user);
    if(user.id_user == message.id_user){
        return (
            <div className="flex w-full justify-end p-3">
                <div className="bg-green-300 p-3 rounded-bl-2xl
                rounded-tl-2xl
                rounded-t-2xl">
                    <p className="text-sm font-thin text-end">Você</p>
                    <p>{message.content_message}</p>
                </div>
            </div> 
        );
    } else {
        return (
            <div className="flex w-full justify-baseline p-3">
                <div className="bg-gray-400 p-3 rounded-br-2xl
                rounded-tl-2xl
                rounded-t-2xl">
                    <p className="text-sm font-thin">{message.name_user}</p>
                    <p>{message.content_message}</p>
                </div>
            </div> 
        );
    }

    
}

export default Message;
