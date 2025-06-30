import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Message from "./Message.jsx";

function Chat({messagesChat, user, formCreateChat, setFormCreateChat}) {
    const [newChatName, setNewChatName] = useState("");
    const [newChatImage, setNewChatImage] = useState("");
    const [newChatDesc, setNewChatDesc] = useState("");
    const [newChatSubject, setNewChatSubject] = useState("");
    if (!formCreateChat){
        if (messagesChat != null){
            return (
                <div className="w-full h-[89vh] flex flex-col justify-end">
                    {messagesChat.map((message) => (
                         <Message key={message.id_message} message={message} user={user}></Message>
                    ))}
                </div> 
            );
        }
    } else {
        return(
            <div className="w-full h-[89vh] flex flex-col justify-end">
                <form>
                    <label htmlFor="">Nome</label>
                    <input className='bg-white p-2' name='newChatName' id="newChatName" placeholder='Ex.: Chat do trabalho' onChange={(e) => setNewChatName(e.target.value)}/>
                    
                    <label htmlFor="">Descrição</label>
                    <input className='bg-white p-2' name='newChatName' id="newChatName" placeholder='Ex.: Chat para trabalho' onChange={(e) => setNewChatDesc(e.target.value)}/>
                    
                    <label htmlFor="">Imagem</label>
                    <input className='bg-white p-2' type="image" name='newChatName' id="newChatName" onChange={(e) => setNewChatImage(e.target.value)}/>
                    
                    <label htmlFor="">Assunto</label>
                    <input className='bg-white p-2' name='newChatName' id="newChatName" placeholder='Ex.: Trabalho' onChange={(e) => setNewChatSubject(e.target.value)}/>
                </form>
            </div> 
        )
    }
}

export default Chat;
