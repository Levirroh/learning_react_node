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
    const [chatUsers, setChatUsers] = useState([]);
    const [popUpChatUsers, setPopUpChatUsers] = useState(false);
    const [formRoles, setFormRoles] = useState({});
    
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

    async function getChatUsers(){
        try {
            const response = await fetch("http://localhost:8800/getChatUsers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id_chat: selectedChat })
            });

            const data = await response.json();
            setChatUsers(data);
        } catch (e) {
            console.error("Erro ao buscar times:", e);
        }
        openChatUsers()
    }
    
    useEffect(() => {
    }, [chatUsers]);
    
    function openChatUsers(){
        setPopUpChatUsers(!popUpChatUsers);
    }

    const handleSaveRoles = async (e) => {
    e.preventDefault();

    if (!Array.isArray(chatUsers)) {
        console.error("chatUsers não é um array:", chatUsers);
        return;
    }

    const updatedUsers = chatUsers.map(user => ({
        id_user: user.id_user,
        role_user: formRoles[user.id_user] || user.role_user,
    }));

    try {
        const response = await fetch("http://localhost:8800/UpdateChatUsers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: selectedChat,
                users_roles: updatedUsers
            }),
        });

        const data = await response.json();
        console.log("Resposta do backend:", data);

        setPopUpChatUsers(false);
    } catch (e) {
        console.error("Erro ao salvar cargos:", e);
    }
};
    
    

    if (formCreateChat) {
        return (
            <div className="w-full h-[89vh] flex flex-col justify-center items-center">
                <form className="flex flex-col gap-10 bg-blue-200 p-15 rounded-2xl" onSubmit={createChat}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="chatName" className="text-slate-600 font-semibold">Nome:</label>
                        <input className='bg-white p-2 rounded-2xl' id="chatName" placeholder='Ex.: Chat do trabalho' onChange={(e) => setNewChatName(e.target.value)} autoFocus />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="chatTeam" className="text-slate-600 font-semibold">Time do chat</label>
                        <select id="chatTeam" className='bg-white p-2 rounded-2xl' onChange={(e) => setNewChatTeam(e.target.value)} value={newChatTeam}>
                            <option value="" disabled>Selecione o time do chat</option>
                            {teams.map((team) => (
                                <option key={team.id_team} value={team.id_team}>{team.name_team}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="chatDesc" className="text-slate-600 font-semibold">Descrição</label>
                        <input className='bg-white p-2 rounded-2xl' id="chatDesc" placeholder='Ex.: Chat para trabalho' onChange={(e) => setNewChatDesc(e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="chatImage" className="text-slate-600 font-semibold">Imagem (URL)</label>
                        <input className='bg-white p-2 rounded-2xl' id="chatImage" type="text" placeholder='https://exemplo.com/imagem.png' onChange={(e) => setNewChatImage(e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="chatSubject" className="text-slate-600 font-semibold">Assunto</label>
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
    
                <div className={`fixed top-25 right-0 w-64 h-fit rounded-l-2xl bg-blue-400 shadow-lg shadow-black pt-1 pb-3 pl-3 pr-3 z-50 transform transition-transform duration-300 ease-in-out ${popUpChatConfig ? "translate-x-0" : "translate-x-full"}`}>
                    <div className="flex flex-col">
                        <Li text="Integrantes" onClick={getChatUsers} />
                    </div>
                </div>
               {popUpChatUsers && (
                    <div className="absolute top-0 left-0 w-full h-[89vh] flex justify-center items-center bg-opacity-50 z-50 backdrop-blur-xs">
                        <div className="bg-white w-[90%] max-w-md rounded-lg shadow-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Editar usuários do chat</h2>
                            <button
                            onClick={() => setPopUpChatUsers(false)}
                            className="font-bold text-xl cursor-pointer"
                            >
                            ×
                            </button>
                        </div>

                        <form onSubmit={handleSaveRoles} className="flex flex-col gap-4">
                            {chatUsers.map((user) => (
                            <div key={user.id_user} className="flex items-center gap-4">
                                <label className="w-32">{user.name_user}</label>
                                <select
                                value={formRoles[user.id_user] || user.role_user}
                                onChange={(e) =>
                                    setFormRoles((prev) => ({
                                    ...prev,
                                    [user.id_user]: e.target.value,
                                    }))
                                }
                                className="flex-1 border rounded px-2 py-1 cursor-pointer"
                                >
                                <option disabled value="">
                                    Selecione o cargo
                                </option>
                                <option value="Administrador">Administrador</option>
                                <option value="Moderador">Moderador</option>
                                <option value="Visitante">Visitante</option>
                                </select>
                            </div>
                            ))}

                            <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded mt-4"
                            >
                            Salvar alterações
                            </button>
                        </form>
                        </div>
                    </div>
                    )}
            </div>
        );
    }
}

export default Chat;
