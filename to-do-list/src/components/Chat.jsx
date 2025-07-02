import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Message from "./Message.jsx";

function Chat({messagesChat, user, formCreateChat, setFormCreateChat}) {
    const [teams, setTeams] = useState([]);
    const [newChatName, setNewChatName] = useState("");
    const [newChatTeam, setNewChatTeam] = useState("");
    const [newChatImage, setNewChatImage] = useState("");
    const [newChatDesc, setNewChatDesc] = useState("");
    const [newChatSubject, setNewChatSubject] = useState("");

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
            if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            } else {
            navigate("/login");
            }
    }, [navigate]);

    async function getUserTeams() {
        if (user){
            try {
                const response = await fetch("http://localhost:8800/getUserTeams", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id_user: user.id_user })
                });

                const data = await response.json();

                if (data.length === 0) {
                    console.log("Nenhum time encontrado para este usuário.");
                    }
        
                setTeams(data);
            } catch (e) {
                console.error("Erro ao buscar times:", e);
            }
        }
    }

    useEffect(() => {
        getUserTeams()
    },[user]);

    async function createChat(){
        if(newChatDesc != null || newChatDesc != "" || newChatName != null || newChatName != "" || newChatSubject != null || newChatSubject != ""){
            try {
                const response = await fetch("http://localhost:8800/createNewChat", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id_user: user.id_user, chat_name: newChatName, chat_desc: newChatDesc, chat_subject: newChatSubject, chat_image: newChatImage })
                });

                const data = await response.json();
                if (data.length === 0) {
                    console.log("Nenhuma mensagem de chat encontrada.");
                }

                setMessagesChat(data);
            } catch (e) {
                console.error("Erro ao buscar mensagens:", e);
            }
        }
    }


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

                    <label htmlFor="">Time do chat</label>s
                    <select name="" id="" className='bg-white p-2' placeholder='Ex.: Trabalho' onChange={(e) => setNewChatTeam(e.target.value)}>
                        {teams.map((team) => (
                            <option value={team.id_team}>{team.name_team}</option>
                        ))}
                    </select>
                    
                    <label htmlFor="">Descrição</label>
                    <input className='bg-white p-2' name='newChatName' id="newChatName" placeholder='Ex.: Chat para trabalho' onChange={(e) => setNewChatDesc(e.target.value)}/>
                    
                    <label htmlFor="">Imagem</label>
                    <input className='bg-white p-2' type="image" name='newChatName' id="newChatName" onChange={(e) => setNewChatImage(e.target.value)}/>
                    
                    <label htmlFor="">Assunto</label>
                    <input className='bg-white p-2' name='newChatName' id="newChatName" placeholder='Ex.: Trabalho' onChange={(e) => setNewChatSubject(e.target.value)}/>

                    <input type="submit" onClick={createChat}/>
                </form>
            </div> 
        )
    }
}

export default Chat;
