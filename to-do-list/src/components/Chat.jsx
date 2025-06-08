import React from "react";

function Chat(id, name, description) {
    
    return (
        <div>
            <p>ID: {id}</p>
            <p>Nome do chat: {name}</p>
            <p>Descricao: {description}</p>
        </div> 
    );
}

export default Chat;
