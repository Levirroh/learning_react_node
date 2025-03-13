import React, { useEffect, useState } from 'react';
import './index.css';
import Test from "./components/Test"


function mostrarNome(){
    console.log("asd");

}

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
      <Test getUsers={getUsers} users={users} setUsers={setUsers}/>
      <button>Buscar</button>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.name_user} - {user.email_user}</li> 
        ))}
      </ul>
    </div>
  );
}

export default App;