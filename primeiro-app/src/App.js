import { useState } from 'react';

function App() {
  const [input, setInput] = useState('')
  const [tasks,setTasks] = useState([
    'Pagar conta de luz',
    'Estudar React JS'
  ]);

  function handleRegister(e){
    e.preventDefault();

    setTasks([...tasks, input]) // pega todas as que já tinham na array e soma as do useState input que está sendo lido ao enviar o formulário
    setInput(''); // limpa campo digitado
  } 

  return (
    <div>
      <h1>Cadastrando Usuário</h1>
      <form onSubmit={handleRegister}>
        <label>Nome da tarefa:</label><br/>
        <input placeholder='Digite uma tarefa' value={input} onChange={ (e) => setInput(e.target.value)}/>
       
        <button type='submit'>Adicionar</button>
      </form>
      <br/>
      <br/>
      <ul>
        {tasks.map( task => (
          <li key={task}>{task}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
