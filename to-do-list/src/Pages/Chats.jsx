import { useNavigate } from "react-router-dom";
import Header from '../components/Header';
import Menu from "../components/Menu";
import ChatIcon from '../components/ChatIcon';
import React, { useEffect, useState } from 'react';
import Chat from '../components/Chat';


function Chats() {
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
 const [isMenuOpen, setIsMenuOpen] = useState(false); 


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
            if (user){
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
                    console.log(data);
                    setChats(data);
                } catch (e) {
                    console.error("Erro ao buscar chats:", e);
                }
            }
        }
        console.log(chats);
        getUserChats();
        }, [user]);


    return(
        <section>
            <Header title="Menu" onToggleMenu={toggleMenu} />
            <Menu isOpen={isMenuOpen} onClose={toggleMenu} />
            <div className="flex w-full">
                <div className="w-[30%]">
                    {chats.map((chat) => (
                        <ChatIcon key={chat.id_chat}
                        nomeDoTime={chat.name_chat}
                        description={chat.description_chat}
                        />
                    ))}
                </div>
                <div className="w-full">
                    <Chat/>
                </div>

            </div>
        </section>
    )
}

export default Chats;