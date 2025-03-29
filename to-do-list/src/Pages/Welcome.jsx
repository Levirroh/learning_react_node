import React from "react"; 

function Welcome() {
    return(
        <section className="bg-blue-400 h-screen w-screen">
            <div className="flex flex-col justify-between items-center">
                <div className="text-center flex justify-center items-center h-30">
                    <h1 className="text-2xl">Bem-vindo</h1>
                </div>
                <div className="cem flex justify-between items-center p-5">
                    <div className="bg-blue-100 cem flex justify-center items-center p-7 rounded-2xl shadow-black shadow-2xl border">
                        <p>Este software foi feito com Node.js & React, aqui você pode gerenciar tarefas e usuários, além disso, possui um banco de dados completo, aproveite!</p>
                    </div>
                    <div className="cem flex flex-col items-center gap-5">
                        <a href="/login">
                            <button className="bg-orange-300 rounded-2xl p-3 border hover:bg-blue-700 hover:text-white transition-all cursor-pointer">Entre já!</button>
                        </a>
                        <br/>
                        <a href="/register"><button className="bg-orange-300 rounded-2xl p-3 border hover:bg-blue-700 hover:text-white transition-all cursor-pointer">Cadastre-se já</button></a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Welcome;