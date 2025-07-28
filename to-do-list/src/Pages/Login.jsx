import React from "react"; 
import { useNavigate } from "react-router-dom";
import Submit from "../components/Submit";
import Input from "../components/Input";

function Login() {
    const navigate = useNavigate(); 
    const [error, setError] = React.useState("");

    async function enter(event){
        event.preventDefault(); 
        setError(""); 
        const formData = new FormData(event.target);
        
        const login = formData.get("login");
        const password = formData.get("password"); 

        try {
            const response = await fetch("http://localhost:8800/loginUser",  {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ login, password })
            });

            const userData = await response.json();

            if (!response.ok) {
                throw new Error(userData.error || "Erro ao fazer login.");
            }

            localStorage.setItem("user", JSON.stringify({
                id_user: userData.id_user,
                name_user: userData.name_user,
                email_user: userData.email_user,
                function_user: userData.function_user
            }));
            navigate("/menu");

        } catch (e) {
            setError(e.message);
        }
    }

    return(
       <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-blue-400 px-4">
        <div className="absolute top-6 left-6">
            <a href="/">
                <button className="bg-white/80 hover:bg-white text-blue-800 font-semibold px-4 py-2 rounded-full shadow transition-all cursor-pointer">
                    ← Voltar
                </button>
            </a>
        </div>
        <form className="w-full max-w-md bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-xl flex flex-col gap-6 mt-8" onSubmit={enter}>
            <h1 className="text-3xl font-bold text-blue-900 text-center mb-2">Entrar na sua conta</h1>
            <Input label="Email de usuário:"
                placeholder="Digite seu email..."
                name="login" />
            <Input label="Senha:"
                placeholder="Digite sua senha..."
                name="password"
                type="password"/>
            {error && (
                <div className="bg-orange-600 p-5 flex rounded-2xl text-center w-50 self-center">
                    <p className="text-white font-bold text-center">{error}</p>
                </div>
            )}

            <div className="flex justify-center">
                <Submit text="Entrar" />
            </div>
        </form>
    </section>

    );
};

export default Login;
