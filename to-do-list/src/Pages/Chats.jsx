import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Menu from "../components/Menu";
import { useNavigate } from "react-router-dom";
import TeamIcon from "../components/TeamIcon"
import NewTeam from "../components/NewTeam"

function Chats() {


    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        } else {
        navigate("/login");
        }
    }, [navigate]);

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
        
                setTeams(data);
            } catch (e) {
                console.error("Erro ao buscar chats:", e);
            }
        }
    }


    return(
        <section>
            <Header title="Your chats" onToggleMenu={toggleMenu} />
            <Menu isOpen={isMenuOpen} onClose={toggleMenu} />
            {chats.map((chat) => (
                            <ChatIcon key={chat.id_chat}
                            nomeDoTime={chat.name_chat}
                            description={chat.description_chat}
                            />
                        ))}
        </section>
    )
}

export default Chats;