import React, { useEffect, useState } from 'react';
import './index.css';
import Tasks from "./components/Tasks";


function App() {
  const [tasks, setTasks] = useState([]);

  async function getTasks() {

    try {

      const response = await fetch("http://localhost:8800/",  {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
      
    });

      if(!response.ok){
        throw new Error('Error to get users');
      }

      const data = await response.json();
      setTasks(data);

    } catch (e) {
      console.log('Error to get users: ', e);
    }
  };
  useEffect(() => {
    getTasks();
  }, [setTasks])

//      <Users users={users}/>

  return (
    <div className="App">
      <Tasks tasks={tasks}/>
      <button>Buscar</button>
    </div>
  );
}

export default App;