import React, { useState, useEffect } from "react";

function Message({message, user}) {

    if(user.id_user == message.id_user){
        return (
            <div className="flex w-full justify-end p-3">
                <div className="bg-green-300 p-3">
                    <p>{message.content_message}</p>

                </div>
            </div> 
        );
    } else {
        return (
            <div className="flex w-full justify-baseline p-3">
                <div className="bg-gray-400 p-3">
                    <p>{message.content_message}</p>
                </div>
            </div> 
        );
    }

    
}

export default Message;
