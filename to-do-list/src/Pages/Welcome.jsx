import React from "react"; 

function Welcome() {
    return(
        <section className="bg-blue-300 h-screen w-screen">
            <div className="text-center flex justify-center items-center p-8">
                <h1 className="text-2xl">Bem-vindo</h1>
            </div>
            <div className="flex flex-col gap-45 justify-center items-center h-[80%]">
                <div className="flex flex-col">
                    <div className="flex justify-center items-center p-5">
                        <div className="flex flex-col w-full">
                            <div className="p-3 pl-7 font-bold text-2xl">
                                <h1>TECHNOLOGY</h1>
                            </div>
                            <div className="flex">
                                <div className="bg-blue-100 flex justify-center items-center p-7 rounded-2xl shadow-black shadow-2xl border">
                                    <p>Este software foi feito com Node.js & React, aqui  você pode gerenciar tarefas, usuários, times e bate-papos!</p>
                                </div>
                                <div className="w-full flex flex-col items-center gap-5 justify-center">
                                    <a href="/login">
                                        <button className="bg-orange-300 rounded-2xl p-3 border hover:bg-blue-700 hover:text-white transition-all cursor-pointer">Entre já!</button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-col-reverse text-end w-full pr-5">
                        <div className="flex">
                            <div className="w-full flex flex-col justify-center items-center">
                                <a href="/register">
                                    <button className="bg-orange-300 rounded-2xl p-3 border hover:bg-blue-700 hover:text-white transition-all cursor-pointer">Cadastre-se já</button>
                                </a>
                            </div>
                            <div className="bg-blue-100 flex justify-center items-center p-7 rounded-2xl shadow-black shadow-2xl border text-left">
                                <p>Este software foi feito com Node.js & React, aqui  você pode gerenciar tarefas, usuários, times e bate-papos!</p>
                            </div>
                        </div>
                        <div className="p-3 pr-7 font-bold text-2xl">
                            <h1>OBJECTIVE</h1>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Welcome;