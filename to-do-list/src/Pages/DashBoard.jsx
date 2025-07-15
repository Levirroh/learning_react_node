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
  const [chat, setChats] = useState(null);
  
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
      getChatsData();
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
      setTasks(data);
    } catch (e) {
        console.error("Erro ao buscar chats:", e);
    } 
  }
  async function getChatsData() {
    try {
      const response = await fetch("http://localhost:8800/GetAllChatData", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id_user: user.id_user })
      });

      const data = await response.json();
      if (data.length === 0) {
          console.log("Nenhum chat encontrado para este usuário.");
      }
      setTasks(data);
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
          console.log("Nenhum time encontrado para este usuário.");
      }
      setTeams(data);
    } catch (e) {
        console.error("Erro ao buscar times:", e);
    } 
  }

  console.log(tasks)
  console.log(teams)
  return (
    <section className="h-screen overflow-hidden">
      <Header title="Dashboard"  />
      <section className="flex flex-col w-full h-full pt-12 pl-3 pr-3">
        <div className="w-full">
            <Card text={"Tasks"} gradientFrom={"from-red-300"} gradientTo={"to-purple-600"} to={"/tasks"}/>
            <Card text={"Teams"} gradientFrom={"from-green-500"} gradientTo={"to-blue-600"} to={"/teams"}/>
            <Card text={"Chats"} gradientFrom={"from-purple-800"} gradientTo={"to-yellow-500"} to={"/chats"}/>
            <Card text={"Notifications"} gradientFrom={"from-blue-700"} gradientTo={"to-white"} to={"/notifications"}/>
            <Card text={"Configurations"} gradientFrom={"from-black"} gradientTo={"to-purple-600"} to={"/configurations"}/>

        </div>
      </section>
    </section>
  );
}

export default App;
