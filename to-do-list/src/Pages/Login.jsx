import React from "react"; 
import Header from "../components/Header";


function Login() {
    return(
        <section className="flex flex-col items-center justify-center bg-gray-300 h-dvh w-dvw">
            <form className="flex flex-col bg-blue-300 border-1 p-3 gap-5 rounded-2xl">
                <label>Email de usuário:</label>
                <input type="text" placeholder="email@email.com"  className="border-1 p-2 bg-gray-200 rounded-2xl"/>
                <label>Senha:</label>
                <input type="text" placeholder="..." className="border-1 p-2 bg-gray-200 rounded-2xl"/>
                <div className="flex items-center justify-center">
                    <a href="http://localhost:5173/menu"><button className="bg-gray-200 w-25 p-1 border-1 rounded-2xl shadow-2xl shadow-black cursor-pointer" type="submit">Entrar</button></a>
                </div>
            </form>
        </section>
    );
};

export default Login;