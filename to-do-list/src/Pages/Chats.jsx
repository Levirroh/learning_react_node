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
    const [unreadMessages, setUnreadMessages] = useState([]); 
    

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
        getUserChats();
    }, [user]);
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
    async function getChatMessages() {
        if (selectedChat) {
            try {
                const response = await fetch("http://localhost:8800/getChatMessages", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id_chat: selectedChat, id_user: user.id_user })
                });

                const data = await response.json();
                console.log("Mensagens recebidas:", data);
                const unreadIds = data.filter(message => !message.was_read_by_user).map(message => message.id_message);

                setUnreadMessages(unreadIds);
                setMessagesChat(data);
            } catch (e) {
                console.error("Erro ao buscar mensagens:", e);
            }
        }
    }
    async function ReadMessages() {
        if (selectedChat) {
            try {
                const response = await fetch("http://localhost:8800/updateReadMessages", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ messages: unreadMessages, id_user: user.id_user })
                });

                setUnreadMessages([]);
            } catch (e) {
                console.error("Erro ao atualizar mensagens:", e);
            }
        }
    }
    
useEffect(() => {
    setMessagesChat([]);
    setUnreadMessages([]);
    getChatMessages();
}, [selectedChat]);


    useEffect(() => {
        if (unreadMessages && unreadMessages.length > 0) {
            ReadMessages();
        }
    }, [unreadMessages]);


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
        setSelectedChat(null);
        setFormCreateChat(true);
    }   

    return(
        <section className="h-screen overflow-hidden">
            <Header title="Chats" onToggleMenu={toggleMenu}/>
            <Menu isOpen={isMenuOpen} onClose={toggleMenu} />
            <div className="flex w-full h-full pt-16">
                <div className="w-1/3 max-w-sm border-r border-gray-300 bg-white/70 backdrop-blur-md h-full overflow-y-auto shadow-inner">
                    <div
                        onClick={openCreateChat}
                        className="flex items-center justify-center border-b border-gray-200 p-4 cursor-pointer hover:bg-blue-100 transition"
                    >
                        <img src={new_task} alt="Criar novo chat" className="h-8 w-8" />
                    </div>

                    <div className="flex flex-col divide-y divide-gray-200">
                        {allChats.map((chat) => (
                        <ChatIcon
                            key={chat.id_chat}
                            idChat={chat.id_chat}
                            nomeDoTime={chat.name_chat}
                            description={chat.description_chat}
                            selectedChat={selectedChat}
                            setSelectedChat={setSelectedChat}
                            setFormCreateChat={setFormCreateChat}
                            formCreateChat={formCreateChat}
                        />
                        ))}
                    </div>
                </div>
                <div className="w-full h-[90vh]">
                    <Chat messagesChat={messagesChat} user={user} setFormCreateChat={setFormCreateChat} formCreateChat={formCreateChat} getUserChats={getUserChats} selectedChat={selectedChat}/>
                    {selectedChat != null && (
                        <ChatInput selectedChat={selectedChat} newMessage={newMessage}/>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Chats;