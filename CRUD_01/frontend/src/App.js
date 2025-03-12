import GlobalStyle from './styles/global.js';
import styled from "styled-components";
import Form from "./components/Form.js";
import Grid from "./components/Grid.js"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  return (
    <>
      <Container>
        <Title>Usuários</Title>
        <Form />
      </Container>
      <ToastContainer autoClose={3000}/>
      <GlobalStyle/>
    </>
  );
}

export default App;
