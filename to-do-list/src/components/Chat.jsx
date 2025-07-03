import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Message from "./Message.jsx";

function Chat({messagesChat, formCreateChat, setFormCreateChat, getUserChats}) {
    const [teams, setTeams] = useState([]);
    const [user, setUser] = useState([]);
    const [newChatName, setNewChatName] = useState("");
    const [newChatTeam, setNewChatTeam] = useState("");
    const [newChatImage, setNewChatImage] = useState("");
    const [newChatDesc, setNewChatDesc] = useState("");
    const [newChatSubject, setNewChatSubject] = useState("");
    const navigate = useNavigate();
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

    async function createChat(e) {
        e.preventDefault();

        if (newChatName && newChatDesc && newChatSubject && newChatTeam != "") {
            try {
                const response = await fetch("http://localhost:8800/createNewChat", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        id_team: newChatTeam,
                        chat_name: newChatName,
                        chat_desc: newChatDesc,
                        chat_subject: newChatSubject,
                        chat_image: newChatImage
                    })
                });

                const data = await response.json();
                setFormCreateChat(false); 
                getUserChats();
            } catch (e) {
                console.error("Erro ao criar chat:", e);
            }
        } else {
            console.warn("Preencha todos os campos obrigatórios.");
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
                <form className="flex flex-col gap-10" onSubmit={createChat}>
                    <div>
                        <label htmlFor="chatName">Nome</label>
                        <input className='bg-white p-2' id="chatName" placeholder='Ex.: Chat do trabalho' onChange={(e) => setNewChatName(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="chatTeam">Time do chat</label>
                        <select id="chatTeam" className='bg-white p-2' onChange={(e) => setNewChatTeam(e.target.value)}>
                            {teams.map((team) => (
                                <option key={team.id_team} value={team.id_team}>{team.name_team}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="chatDesc">Descrição</label>
                        <input className='bg-white p-2' id="chatDesc" placeholder='Ex.: Chat para trabalho' onChange={(e) => setNewChatDesc(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="chatImage">Imagem</label>
                        <input className='bg-white p-2' id="chatImage" type="image" onChange={(e) => setNewChatImage(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="chatSubject">Assunto</label>
                        <input className='bg-white p-2' id="chatSubject" placeholder='Ex.: Trabalho' onChange={(e) => setNewChatSubject(e.target.value)} />
                    </div>
                    <button type="submit">Criar chat</button>
                </form>
            </div> 
        )
    }
}

export default Chat;
