import { useState, useEffect } from 'react';

function App() {
  const [input, setInput] = useState('')
  const [tasks,setTasks] = useState([
    'Pagar conta de luz',
    'Estudar React JS'
  ]);

  useEffect(() => {
    alert("Teste")
  }, [tasks]);

  function handleRegister(e){
    e.preventDefault();
    if (input.trim() === ""){ // .trim() -> remove espaços em branco, ou seja, se digitar um monte de espaço ainda não é aceito
      alert("Digite um valor válido para a tarefa!")
    } else{
      setTasks([...tasks, input]) // pega todas as que já tinham na array e soma as do useState input que está sendo lido ao enviar o formulário
    }
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
