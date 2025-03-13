import React, { useEffect, useState } from 'react';
import './index.css';
import Test from "./components/Test"


function mostrarNome(){
    console.log("asd");

}

function App() {
  async function getUsers() {

    try {

      const response = await fetch("http://localhost:8000/",  {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
      
    });

      if(!response.ok){
        throw new Error('Error to get users');
      }

      const data = await response.json();
      getUsers(data);

    } catch{
      console.log('Error to get users: ', error);
    }
  };


  return (
    <div className="App">
      <Test />
      <button getUsers={getUsers}>Buscar</button>
    </div>
  );
}

export default App;