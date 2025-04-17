import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Menu from "../components/Menu";
import { useNavigate } from "react-router-dom";


function Teams() {
    const [teams, setTeams] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false); 
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    
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
        async function getTasks() {
        try {
            const response = await fetch("http://localhost:8800/getUserTeams", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id_user: user.id_user })
            });

            const data = await response.json();

            if (data.length === 0) {
            console.log("Nenhuma tarefa encontrada para este usuário.");
            }

        } catch (e) {
            console.error("Erro ao buscar tarefas:", e);
        }
        }

        getTasks(); 
    });


    return(
        <section>
            <Header title="Teams" onToggleMenu={toggleMenu} />
            <Menu isOpen={isMenuOpen} onClose={toggleMenu} />
            <h1>Times</h1>
            <p>Se participa de times aparece eles aqui</p>
            <small>Lista horizontal que tem setinhas nas extremidades para ver mais</small>
            <div className='flex gap-5'>
                {/* Aqui será a lista de times */ }
                <div className='p-3 bg-black'></div>
                <div className='p-3 bg-black'></div>
                <div className='p-3 bg-black'></div>
                <div className='p-3 bg-black'></div>
                <div className='p-3 bg-black'></div>
                {/* Deve ser feito lógica para um scroll ou setinhas para ver mais pra direita ou esquerda */ }
            </div>
            <p>Criar time</p>
            <small>Botao similar ao de nova tarefa que vai pra uma tela de cadastro de time</small>
            <div className=''>
                <div className='p-3 bg-black w-5'></div>
                {/* Aqui será um botão para criar um novo time */ }
            </div>
            <small>Templates de times prontos</small>
            <div className='flex gap-5'>
                {/* Aqui será a lista de times prontos */ }
                <div className='p-3 bg-black'></div>
                <div className='p-3 bg-black'></div>
                <div className='p-3 bg-black'></div>
                <div className='p-3 bg-black'></div>
                <div className='p-3 bg-black'></div>
                {/* Deve ser feito lógica para um scroll ou setinhas para ver mais pra direita ou esquerda */ }
            </div>
        </section>
    );
}

export default Teams;