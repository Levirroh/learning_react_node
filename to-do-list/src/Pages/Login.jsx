import React from "react"; 
import Submit from "../components/Submit";
import Input from "../components/Input";

function Login() {
    return(
        <section className="flex flex-col items-center justify-center bg-gray-300 h-dvh w-dvw">
            <form className="flex flex-col bg-blue-300 border-1 p-3 gap-5 rounded-2xl">
                <Input label="Email de usuário:" placeholder="..."/>
                <Input label="Senha:" placeholder="..."/>
                <div className="flex items-center justify-center">
                    <a href="http://localhost:5173/menu">
                        <Submit text="Entrar"/>
                    </a>
                </div>
            </form>
        </section>
    );
};

export default Login;