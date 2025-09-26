import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Tasks from "../components/Tasks";
import Header from "../components/Header";
import Menu from "../components/Menu";

function App() {
  const [tasks, setTasks] = useState([]);
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
    if (user) {
      getTasks(); 
    }
  }, [user]); 
  async function getTasks() {
    try {
      const response = await fetch("http://localhost:8800/getUserTasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_user: user.id_user })
      });

      const data = await response.json();

      if (data.length === 0) {
        console.log("Nenhuma tarefa encontrada para este usuário.");
      }

      setTasks(data);
    } catch (e) {
      console.error("Erro ao buscar tarefas:", e);
    }
  }

  return (
    <section>
      <Header title="Menu" onToggleMenu={toggleMenu} />
      <Menu isOpen={isMenuOpen} onClose={toggleMenu} />
      {user ? (
        <div>
          <h1>Bem-vindo, <em>{user.name_user}</em>!</h1>
          <Tasks tasks={tasks} getTasks={getTasks} />
        </div>
      ) : (
        <div>
          <p>usuário não carregou...</p>
          <a href="http://localhost:5173/login">Voltar</a>
        </div>
      )}
    </section>
  );
}

export default App;
