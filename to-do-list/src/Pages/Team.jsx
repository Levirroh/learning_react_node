import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import TeamTasks from "../components/TeamTasks";
import Header from "../components/Header";
import Menu from "../components/Menu";

function Team() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const { id } = useParams();
  const [team, setTeam] = useState(null);

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

  const isAdmin = user;
  
  

  useEffect(() => {
    if (user) {
      async function getTasks() {
        try {
          const response = await fetch("http://localhost:8800/getTeamTasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
          });

          const data = await response.json();

          if (data.length === 0) {
            console.log("Nenhuma tarefa encontrada para este time.");
          }

          setTasks(data);
        } catch (e) {
          console.error("Erro ao buscar tarefas:", e);
        }
      }
      async function getTeamData() {
        try {
          const response = await fetch("http://localhost:8800/getTeamData", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
          });

          const teamData = await response.json();

          if (!teamData) {
          console.log("Nenhum dado encontrado para este time.");
          }
          setTeam(teamData[0]);
         } catch (e) {
          console.error("Erro ao buscar dados do time:", e);
        }
      }
      getTeamData(); 
      getTasks(); 
    }
  }, [user, id]); 

  if (team != null){ // ainda nao carregou os dados
    return (
      <section>
        <Header title="Menu" color={team.color_team} team={true} onToggleMenu={toggleMenu} isAdmin={isAdmin} />
        <Menu isOpen={isMenuOpen} onClose={toggleMenu} />
        {user ? (
          <div>
            <TeamTasks tasks={tasks}/>
          </div>
        ) : (
          <>
            <p>Time não carregou...</p>
            <a href="http://localhost:5173/login">Voltar</a>
          </>
        )}
      </section>
    );
  }
}

export default Team;
