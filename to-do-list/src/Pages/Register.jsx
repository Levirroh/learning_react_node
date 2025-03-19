import React, { useEffect, useState } from "react"; 
import { useNavigate } from "react-router-dom";
import Submit from "../components/Submit"
import Input from "../components/Input"


function Register() {
    const navigate = useNavigate();
    
    async function createUser(event){
        event.preventDefault(); 
        const formData = new FormData(event.target);
        const name_user = formData.get("name_user");
        const email_user = formData.get("email_user");
        const function_user = formData.get("function_user");
        const password_user = formData.get("password_user");
        const confirma_senha = formData.get("confirma_senha");

        if (password_user !== confirma_senha) {
            alert("As senhas não coincidem!");
            return;
        }

        try {

            const response = await fetch("http://localhost:8800/createUser",  {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name_user, email_user, function_user, password_user })
        });
            const userData = await response.json();

            if(!response.ok){
                throw new Error('Error to create user');
            }

            localStorage.setItem("user", JSON.stringify({
                id: userData.id,
                name_user: userData.name_user,
                email_user: userData.email_user,
                function_user: userData.function_user
            }));

            alert("Cadastro realizado com sucesso!");
            navigate("/menu")    

        } catch (e) {
            console.log('Error to create user: ', e);
        }

    }; 

    return(
        <section className="flex flex-col items-center justify-center bg-gray-300 h-dvh w-dvw">
            <form className="flex flex-col bg-blue-300 border-1 p-3 gap-5 rounded-2xl" onSubmit={createUser}>
                <Input id="name_user" name="name_user" label="Nome:" placeholder="..."/>
                <Input id="email_user" name="email_user" label="Email:" placeholder="email@email.com"/>
                <Input id="function_user" name="function_user" label="Função:" placeholder="..."/>
                <Input id="password_user" name="password_user" label="Senha:" placeholder="..."/>
                <Input id="confirma_senha" name="confirma_senha" label="Confirme sua senha:" placeholder="..."/>
                <div className="flex items-center justify-center">
                    <Submit text="Cadastre-se"/>
                </div>
            </form>
        </section>
    );
};

export default Register;