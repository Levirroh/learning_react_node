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
                id: userData.id,
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
        <section className="flex flex-col items-center justify-center bg-gray-300 h-dvh w-dvw">
            <form className="flex flex-col bg-blue-300 border-1 p-3 gap-5 rounded-2xl" onSubmit={enter}>
                <Input label="Email de usuário:" placeholder="Digite seu email..." name="login"/>
                <Input label="Senha:" placeholder="Digite sua senha..." name="password" type="password"/>
                {error && <p className="text-red-500">{error}</p>}
                <div className="flex items-center justify-center">
                    <Submit text="Entrar"/>
                </div>
            </form>
        </section>
    );
};

export default Login;
