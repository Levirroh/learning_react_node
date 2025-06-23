import { useNavigate } from "react-router-dom";
import Header from '../components/Header';
import Menu from "../components/Menu";
import ChatIcon from '../components/ChatIcon';
import React, { useEffect, useState } from 'react';
import Chat from '../components/Chat';
import ChatInput from "../components/ChatInput";


function Chats() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false); 
    const [allChats, setAllChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [messagesChat, setMessagesChat] = useState([]);
    

  function toggleMenu() {
    setIsMenuOpen(prev => !prev);
  }
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        } else {
        navigate("/login");
        }
    }, [navigate]);



    useEffect(() => {
    async function getUserChats() {
        if (user) {
            try {
                const response = await fetch("http://localhost:8800/getUserChats", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id_user: user.id_user })
                });

                const data = await response.json();
                if (data.length === 0) {
                    console.log("Nenhum chat encontrado para este usuário.");
                }
                setAllChats(data);
            } catch (e) {
                console.error("Erro ao buscar chats:", e);
            }
        }
    }

    getUserChats();
    }, [user]);

    useEffect(() => {
        async function getChatMessages() {
            if (selectedChat) {
                try {
                    const response = await fetch("http://localhost:8800/getChatMessages", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ id_chat: selectedChat })
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

        getChatMessages();
    }, [selectedChat]);

    return(
        <section className="h-screen overflow-hidden">
            <Header title="Menu" onToggleMenu={toggleMenu} />
            <Menu isOpen={isMenuOpen} onClose={toggleMenu} />
            <div className="flex w-full h-full">
                <div className="w-1/3 flex border-r h-[94vh]">
                    <div className="w-full border-t">
                        {allChats.map((chat) => (
                            <ChatIcon key={chat.id_chat}
                            idChat={chat.id_chat}
                            nomeDoTime={chat.name_chat}
                            description={chat.description_chat}
                            selectedChat={selectedChat}
                            setSelectedChat={setSelectedChat}
                            />
                        ))}
                    </div>
                </div>
                <div className="w-full h-[90vh]">
                    <Chat messagesChat={messagesChat} user={user}/>
                    {selectedChat != null && (
                        <ChatInput messagesChat={messagesChat}/>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Chats;