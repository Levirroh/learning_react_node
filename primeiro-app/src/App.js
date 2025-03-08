import { useState } from 'react';

function App() {
  const [input, setInput] = useState('')
  const [tasks,setTasks] = useState([]);

  function handleRegister(e){
    e.preventDefault();
  } 

  return (
    <div>
      <h1>Cadastrando Usuário</h1>
      <form onSubmit={handleRegister}>
        <label>Nome da tarefa:</label><br/>
        <input placeholder='Digite uma tarefa' value={input} onChange={ (e) => setInput(e.target.value)}/>
       
        <button type='submit'>Registrar</button>
      </form>
      <br/>
      <br/>
      <div>
        <p>Tarefas</p>
      </div>
    </div>
  );
}

export default App;
