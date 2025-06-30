import { useNavigate } from "react-router-dom";
import Header from '../components/Header';
import Menu from "../components/Menu";
import ChatIcon from '../components/ChatIcon';
import React, { useEffect, useState, useRef } from 'react';
import Chat from '../components/Chat';
import ChatInput from "../components/ChatInput";
import { io } from "socket.io-client";
import new_task from "../images/new_task.svg";


function Chats() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false); 
    const [allChats, setAllChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [messagesChat, setMessagesChat] = useState([]);
    const socket = useRef(null);
    const [formCreateChat, setFormCreateChat] = useState(false); 
    

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

    useEffect(() => {
        getChatMessages();
    }, [selectedChat]);


    async function newMessage(e) {
        if (e.key !== "Enter") return;

        const message = e.target.value.trim();
        if (message === "") return;

        try {
            await fetch("http://localhost:8800/newMessage", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id_user: user.id_user, id_chat: selectedChat, message: message })
            });
            e.target.value = ""; 
        } catch (err) {
            console.error("Erro ao enviar mensagem:", err);
        }
        await getChatMessages(); 
    }
    
    useEffect(() => {
        socket.current = io("http://localhost:8800");

        socket.current.on("receiveMessage", (msg) => {
            if (msg.id_chat === selectedChat) {
                getChatMessages(); 
            }
        });

        return () => {
            socket.current.disconnect();
        };
    }, [selectedChat]);

    function openCreateChat(){
        setFormCreateChat(true);
    }
    

    return(
        <section className="h-screen overflow-hidden">
            <Header title="Menu" onToggleMenu={toggleMenu}/>
            <Menu isOpen={isMenuOpen} onClose={toggleMenu} />
            <div className="flex w-full h-full pt-12">
                <div className="w-1/3 flex border-r h-[94vh]">
                    <div className="w-full border-t">
                        <div className={`flex border-b p-2 text-left cursor-pointer items-top`}
                            onClick={openCreateChat}>
                                <div className="flex w-full justify-center items-center">
                                    <img src={new_task} alt="Criar novo chat" className="h-15"/>
                                </div>
                            </div> 
                        {allChats.map((chat) => (
                            <ChatIcon key={chat.id_chat}
                            idChat={chat.id_chat}
                            nomeDoTime={chat.name_chat}
                            description={chat.description_chat}
                            selectedChat={selectedChat}
                            setSelectedChat={setSelectedChat}
                            setFormCreateChat={setFormCreateChat} formCreateChat={formCreateChat}
                            />
                        ))}
                    </div>
                </div>
                <div className="w-full h-[90vh]">
                    <Chat messagesChat={messagesChat} user={user} setFormCreateChat={setFormCreateChat} formCreateChat={formCreateChat}/>
                    {selectedChat != null && (
                        <ChatInput selectedChat={selectedChat} id_user={user.id_user} newMessage={newMessage}/>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Chats;