import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Tasks from "../components/Tasks";
import Header from "../components/Header";

function App() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
        setUser(JSON.parse(storedUser));
    } else {
        navigate("/login");
    }
  }, []);

  async function getTasks() {

    try {

      const response = await fetch("http://localhost:8800/",  {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
      
    });

      if(!response.ok){
        throw new Error('Error to get tasks');
      }

      const data = await response.json();
      setTasks(data);

    } catch (e) {
      console.log('Error to get tasks: ', e);
    }
  };
  useEffect(() => {
    if (user) { 
        getTasks();
    }
}, [user]);

  return (
    <section>
      <Header title="Menu"/>
      {user ? (
            <>
                <h1>Bem-vindo, {user.name_user}!</h1>
                <Tasks tasks={tasks} />
            </>
        ) : (
          <>
            <p>usuário não carregou...</p>
            <a href="http://localhost:5173/login">Voltar</a>
          </>
        )}
    </section>
  );
}

export default App;