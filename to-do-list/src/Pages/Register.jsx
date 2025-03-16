import React from "react"; 
import Submit from "../components/Submit"
import Input from "../components/Input"

function Register() {
    return(
        <section className="flex flex-col items-center justify-center bg-gray-300 h-dvh w-dvw">
            <form className="flex flex-col bg-blue-300 border-1 p-3 gap-5 rounded-2xl">
                <Input label="Nome:" placeholder="..."/>
                <Input label="Email:" placeholder="email@email.com"/>
                <Input label="Senha:" placeholder="..."/>
                <Input label="Confirme sua senha:" placeholder="..."/>
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