import GlobalStyle from './styles/global.js';
import styled from "styled-components";
import { useState } from "react;"
import Form from "./components/form.js";
import Grid from "./components/grid.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`
const Title = styled.h2`` // vazia pois não há estilização no título


function App() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800/");
      setUsers(res.data.sort((a,b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error){
      toast.error(error);
    }
  }


  return (
    <>
      <Container>
        <Title>Usuários</Title>
        <Form />
        <Grid />
      </Container>
      <ToastContainer autoClose={3000}/>
      <GlobalStyle/>
    </>
  );
}

export default App;
