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
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
      } else {
          navigate("/login");
      }
  }, []);

  async function getTasks() {
    try {
        const response = await fetch('http://localhost:8800/getTasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_user: user.id_user })
        });

        if (!response.ok) {
            throw new Error('Error on the tasks response');
        }

        const data = await response.json();;

        if (Array.isArray(data)) {
            setTasks(data);
        } else {
            setTasks([]); 
        }

    } catch (e) {
        console.log('Error to get tasks: ', e);
    }
}


  return (
    <section>
      <Header title="Menu"/>
      {user ? (
            <div>
                <h1>Bem-vindo, <em>{user.name_user}</em>!</h1>
                <Tasks tasks={tasks} />
            </div>
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