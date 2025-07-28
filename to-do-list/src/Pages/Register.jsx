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
        <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-blue-400 px-4">
        <div className="absolute top-6 left-6">
            <a href="/">
                <button className="bg-white/80 hover:bg-white text-blue-800 font-semibold px-4 py-2 rounded-full shadow transition duration-300">
                    ← Voltar
                </button>
            </a>
        </div>
        <form
            onSubmit={createUser}
            className="w-full max-w-lg bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-xl flex flex-col gap-6 mt-10"
        >
            <h1 className="text-3xl font-bold text-blue-900 text-center mb-2">Crie sua conta</h1>

            <Input id="name_user" name="name_user" label="Nome:" placeholder="Seu nome completo..." />
            <Input id="email_user" name="email_user" label="Email:" placeholder="email@email.com" />
            <Input id="function_user" name="function_user" label="Função:" placeholder="Desenvolvedor, Designer..." />
            <Input id="password_user" name="password_user" label="Senha:" placeholder="Crie uma senha segura" type="password" />
            <Input id="confirma_senha" name="confirma_senha" label="Confirme sua senha:" placeholder="Repita sua senha" type="password" />

            <div className="flex justify-center">
                <Submit text="Cadastre-se" />
            </div>
        </form>
    </section>

    );
};

export default Register;