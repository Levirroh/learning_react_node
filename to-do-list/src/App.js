import React, { useEffect, useState } from 'react';
import './index.css';
import Tasks from "./components/Tasks";
import Header from "./components/Header";

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

  return (
    <div className="App">
      <Header />
      <Tasks tasks={tasks}/>
    </div>
  );
}

export default App;