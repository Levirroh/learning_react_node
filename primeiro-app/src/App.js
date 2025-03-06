import { useState } from 'react';

function App() {
  const [aluno, setAluno] = useState('Sujeito Programador');

  function handleChangeName(nome){
    setAluno(nome);
  }

  return (
    <div>
      <h1>Componente App</h1> <br/>
      <h2>Olá: { aluno }</h2>
      <button onClick={() => handleChangeName('Lucas Oliveira')}>Mudar Nome</button>
    </div>
  );
}

export default App;
