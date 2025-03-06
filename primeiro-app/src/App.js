import { useState } from 'react';

function App() {
  const [nome,setNome] = useState('');
  const [email,setEmail] = useState('');
  const [idade,setIdade] = useState('');

  return (
    <div>
      <h1>Cadastrando Usuário</h1>
      <form>
        <label>Nome:</label><br/>
        <input placeholder='Digite seu nome' value={nome} onChange={ (e) => setNome(e.target.value)}/>
        <br/>
        <label>Email:</label><br/>
        <input placeholder='Digite seu email' value={email} onChange={ (e) => setEmail(e.target.value)}/>
        <br/>
        <label>Idade:</label><br/>
        <input placeholder='Digite seu idade' value={idade} onChange={ (e) => setIdade(e.target.value)}/>
        <br/>
        <button type='submit'>Registrar</button>
      </form>
      <br/>
      <br/>
      <div>
        <p>Bem-vindo: Matheus</p><br/>
        <p>idade: 25</p><br/>
        <p>Email: teste@teste.com</p><br/>
      </div>
    </div>
  );
}

export default App;
