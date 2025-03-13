import React, { useEffect, useState } from 'react';
import './index.css';
import Users from "./components/Users.js"

function App() {
  const [users, setUsers] = useState([]);
  async function getUsers() {

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
      setUsers(data);

    } catch (e) {
      console.log('Error to get users: ', e);
    }
  };
  useEffect(() => {
    getUsers();
  }, [setUsers])


  return (
    <div className="App">
      <Users users={users}/>
      <button>Buscar</button>
    </div>
  );
}

export default App;