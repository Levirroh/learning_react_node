import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Message from "./Message.jsx";
import configIcon from "../images/config_icon.svg";
import Li from "../components/Li";

function Chat({ messagesChat, formCreateChat, setFormCreateChat, getUserChats, selectedChat }) {
    const [teams, setTeams] = useState([]);
    const [user, setUser] = useState(null);
    const [newChatName, setNewChatName] = useState("");
    const [newChatTeam, setNewChatTeam] = useState("");
    const [newChatImage, setNewChatImage] = useState("");
    const [newChatDesc, setNewChatDesc] = useState("");
    const [newChatSubject, setNewChatSubject] = useState("");
    const [popUpChatConfig, setPopUpChatConfig] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            navigate("/login");
        }
    }, [navigate]);

    useEffect(() => {
        async function getUserTeams() {
            if (!user) return;
            try {
                const response = await fetch("http://localhost:8800/getUserTeams", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id_user: user.id_user })
                });

                const data = await response.json();
                setTeams(data);
            } catch (e) {
                console.error("Erro ao buscar times:", e);
            }
        }

        getUserTeams();
    }, [user]);

    async function createChat(e) {
        e.preventDefault();

        if ([newChatName, newChatDesc, newChatSubject, newChatTeam].some(field => !field)) {
            alert("Preencha todos os campos obrigatórios.");
            return;
        }

        try {
            await fetch("http://localhost:8800/createNewChat", {
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

            setFormCreateChat(false);
            getUserChats();
        } catch (e) {
            console.error("Erro ao criar chat:", e);
        }
    }

    function openChatConfig() {
        setPopUpChatConfig(!popUpChatConfig);
    }

    function getChatUsers() {
        console.log("Abrir lista de integrantes do chat (ainda não implementado).");
    }

    if (formCreateChat) {
        return (
            <div className="w-full h-[89vh] flex flex-col justify-center items-center">
                <form className="flex flex-col gap-10 bg-slate-300 p-10 rounded-2xl" onSubmit={createChat}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="chatName" className="text-slate-500 font-semibold">Nome:</label>
                        <input className='bg-white p-2 rounded-2xl' id="chatName" placeholder='Ex.: Chat do trabalho' onChange={(e) => setNewChatName(e.target.value)} autoFocus />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="chatTeam" className="text-slate-500 font-semibold">Time do chat</label>
                        <select id="chatTeam" className='bg-white p-2 rounded-2xl' onChange={(e) => setNewChatTeam(e.target.value)} value={newChatTeam}>
                            <option value="" disabled>Selecione o time do chat</option>
                            {teams.map((team) => (
                                <option key={team.id_team} value={team.id_team}>{team.name_team}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="chatDesc" className="text-slate-500 font-semibold">Descrição</label>
                        <input className='bg-white p-2 rounded-2xl' id="chatDesc" placeholder='Ex.: Chat para trabalho' onChange={(e) => setNewChatDesc(e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="chatImage" className="text-slate-500 font-semibold">Imagem (URL)</label>
                        <input className='bg-white p-2 rounded-2xl' id="chatImage" type="text" placeholder='https://exemplo.com/imagem.png' onChange={(e) => setNewChatImage(e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="chatSubject" className="text-slate-500 font-semibold">Assunto</label>
                        <input className='bg-white p-2 rounded-2xl' id="chatSubject" placeholder='Ex.: Trabalho' onChange={(e) => setNewChatSubject(e.target.value)} />
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="bg-white font-semibold rounded-2xl text-slate-600 w-32 h-10 hover:bg-slate-600 hover:text-white transition cursor-pointer">Criar chat</button>
                    </div>
                </form>
            </div>
        );
    }
    if (selectedChat){

        return (
            <div className="w-full h-[89vh] flex flex-col justify-end relative">
                <div className="fixed top-13 right-3">
                    {selectedChat && (
                        <div className="w-full flex justify-end p-2">
                            <img src={configIcon} alt="Configurações" className="h-8 cursor-pointer" onClick={openChatConfig} />
                        </div>
                    )}
                </div>
    
                {messagesChat && messagesChat.length > 0 ? (
                    messagesChat.map((message) => (
                        <Message key={message.id_message} message={message} user={user} />
                    ))
                ) : (
                    <div className="w-full flex justify-center items-end mb-10 h-full">
                        <div className="bg-gray-300 rounded-t-2xl rounded-l-2xl  h-fit px-4 flex items-center w-1/2 p-5">
                            <p>Ainda não há mensagens nesse chat, mande a primeira mensagem!</p>
                        </div>
                    </div>
                )}
    
                <div className={`fixed top-12 right-0 w-64 h-fit bg-blue-400 shadow-lg shadow-black pt-1 pb-10 pl-3 pr-3 z-50 transform transition-transform duration-300 ease-in-out ${popUpChatConfig ? "translate-x-0" : "translate-x-full"}`}>
                    <div className="w-full flex justify-end p-2">
                        <img src={configIcon} alt="Configurações" className="h-8 cursor-pointer" onClick={openChatConfig} />
                    </div>
                    <div className="flex flex-col">
                        <Li text="Integrantes" onclick={getChatUsers} />
                        <Li text="Moderação" onclick={getChatUsers} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;
