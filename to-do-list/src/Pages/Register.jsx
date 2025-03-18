import React from "react"; 
import { useNavigate } from "react-router-dom";
import Submit from "../components/Submit"
import Input from "../components/Input"


function Register() {
    const navigate = useNavigate();
    
    function createUser(event){
        event.preventDefault(); 
        const formData = new FormData(event.target);
        const nome = formData.get("nome");
        const email = formData.get("email");
        const senha = formData.get("senha");
        const confirma_senha = formData.get("confirma_senha");

        if (senha === confirma_senha) {
            alert("Usuário cadastrado com sucesso!");
        } else {
            alert("As senhas não coincidem!");
        }
    }

    return(
        <section className="flex flex-col items-center justify-center bg-gray-300 h-dvh w-dvw">
            <form className="flex flex-col bg-blue-300 border-1 p-3 gap-5 rounded-2xl" onSubmit={createUser}>
                <Input id="name" name="nome" label="Nome:" placeholder="..."/>
                <Input id="email" name="email" label="Email:" placeholder="email@email.com"/>
                <Input id="senha" name="senha" label="Senha:" placeholder="..."/>
                <Input id="confirma_senha" name="confirma_senha" label="Confirme sua senha:" placeholder="..."/>
                <div className="flex items-center justify-center">
                    <a href="http://localhost:5173/menu">
                    <Submit text="Cadastre-se"/>
                    </a>
                </div>
            </form>
        </section>
    );
};

export default Register;