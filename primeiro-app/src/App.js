import { useState } from 'react';

function App() {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [age,setAge] = useState();

  const [user, setUser] = useState('');

  function handleRegister(e){
    e.preventDefault();
    alert("usuário cadastrado com sucesso!")
    setUser({
      name: name,
      age: age,
      email: email
    })
  } 

  return (
    <div>
      <h1>Cadastrando Usuário</h1>
      <form onSubmit={handleRegister}>
        <label>Nome:</label><br/>
        <input placeholder='Digite seu nome' value={name} onChange={ (e) => setName(e.target.value)}/>
        <br/>
        <label>Email:</label><br/>
        <input placeholder='Digite seu email' value={email} onChange={ (e) => setEmail(e.target.value)}/>
        <br/>
        <label>Idade:</label><br/>
        <input placeholder='Digite seu idade' value={age} onChange={ (e) => setAge(e.target.value)}/>
        <br/>
        <button type='submit'>Registrar</button>
      </form>
      <br/>
      <br/>
      <div>
        <p>Bem-vindo: {user.name}</p><br/>
        <p>idade: {user.age}</p><br/>
        <p>Email: {user.email}</p><br/>
      </div>
    </div>
  );
}

export default App;
