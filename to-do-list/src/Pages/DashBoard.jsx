import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Header from "../components/Header";
import Menu from "../components/Menu";
import Card from "../components/Card";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [teams, setTeams] = useState(null);
  const [unreadMessagesByChat, setUnreadMessagesByChat] = useState(null);
  const [toDoTasks, setToDoTasks] = useState(0);
  const [doingTasks, setDoingTasks] = useState(0);
  const [doneTasks, setDoneTasks] = useState(0);
  const [chats, setChats] = useState(null);
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
    if (user) {
      getTasksData();
      getTeamsData();
      getAllChats();
      getAllUnreadMessagesByChat();
    }
  }, [user]);
  
  
  async function getTasksData() {
    try {
      const response = await fetch("http://localhost:8800/GetAllTasksData", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id_user: user.id_user })
      });

      const data = await response.json();
      if (data.length === 0) {
          console.log("Nenhum chat encontrado para este usuário.");
      }
      let toDo = 0;
      let doing = 0;
      let done = 0;

      data.forEach(task => {
        if (task.status_task === 1) toDo++;
        else if (task.status_task === 2) doing++;
        else done++;
      });

      setToDoTasks(toDo);
      setDoingTasks(doing);
      setDoneTasks(done);
      setTasks(data);
    } catch (e) {
        console.error("Erro ao buscar tasks:", e);
    } 
  }

  async function getAllUnreadMessagesByChat() {
    try {
      const response = await fetch("http://localhost:8800/GetAllUnreadMessagesByChat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id_user: user.id_user })
      });

      const data = await response.json();
      if (data.length === 0) {
          console.log("Nenhum chat encontrado para este usuário.");
      }
      setUnreadMessagesByChat(data);
    } catch (e) {
        console.error("Erro ao buscar chats:", e);
    } 
  }
  async function getAllChats() {
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
      setChats(data);
    } catch (e) {
        console.error("Erro ao buscar chats:", e);
    } 
  }

  async function getTeamsData() {
    try {
      const response = await fetch("http://localhost:8800/GetAllTeamsData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_user: user.id_user })
      });

      const data = await response.json();
      if (data.length === 0) {
        console.log("Nenhum dado encontrado para este usuário.");
      }

      setTeams(data);
    } catch (e) {
      console.error("Erro ao buscar times:", e);
    }
  }
  return (
    <section className="h-screen overflow-hidden">
      <Header title="Menu" onToggleMenu={toggleMenu}/>
      <Menu isOpen={isMenuOpen} onClose={toggleMenu} />
      <section className="flex flex-col w-full h-full pt-12 pl-3 pr-3">
        <div className="w-full">
            <Card text={"Your Tasks"} gradientFrom={"from-red-300"} gradientTo={"to-purple-600"} to={"/tasks"} data1={toDoTasks} data2={doingTasks} data3={doneTasks} type="tasks"/>
            <h1>Teams</h1>
            <div className="flex flex-wrap gap-4">
              {teams && teams.map(team => {
                return (
                  <Card
                    key={team.id_team}
                    type="tasks"
                    text={team.name_team}
                    gradientFrom={"from-green-500"}
                    gradientTo={"to-blue-600"}
                    to={`/Team/${team.id_team}`}
                    data1={team.to_do}
                    data2={team.doing}
                    data3={team.done}
                  />
                );
              })}
            </div>
            <h1>Chats</h1>
            <div className="flex flex-wrap gap-4">
              {chats && chats.map(chat => {
                const unreadData = unreadMessagesByChat?.find(un => un.id_chat === chat.id_chat);
                const unreadCount = unreadData ? unreadData.unread_count : 0;

                return (
                  <Card
                    key={chat.id_chat}
                    type="chat"
                    text={chat.name_chat}
                    gradientFrom={"from-purple-800"}
                    gradientTo={"to-yellow-500"}
                    to={`/chats`}
                    data1={unreadCount}
                  />
                );
              })}
            </div>         
            <Card text={"Configurations"} gradientFrom={"from-black"} gradientTo={"to-purple-600"} to={"/configurations"}/>

        </div>
      </section>
    </section>
  );
}

export default App;
