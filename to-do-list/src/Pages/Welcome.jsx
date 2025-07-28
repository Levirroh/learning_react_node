import React from "react";

function Welcome() {
    return (
        <section className="min-h-screen w-full bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center px-4">
            <div className="w-full max-w-screen-lg">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-blue-900">Bem-vindo ao TaskManager</h1>
                    <p className="text-blue-700 mt-2">Organize suas tarefas e equipes com facilidade</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="flex flex-col items-center bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-lg justify-between">
                        <h2 className="text-2xl font-semibold text-blue-800 mb-4">TECHNOLOGY</h2>
                        <p className="text-blue-900 text-center mb-6">
                            Este software foi feito com <strong>Node.js</strong> & <strong>React</strong>. Aqui você pode gerenciar tarefas, usuários, times e bate-papos!
                        </p>
                        <a href="/login">
                            <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all shadow">
                                Entre já!
                            </button>
                        </a>
                    </div>
                    <div className="flex flex-col items-center justify-between bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-lg">
                        <h2 className="text-2xl font-semibold text-blue-800 mb-4">OBJECTIVE</h2>
                        <p className="text-blue-900 text-center mb-6">
                            O <strong>objetivo</strong> desta aplicação é o <strong>gerenciamento de tarefas</strong>, onde você pode trabalhar com <strong>times</strong>, conversar com diferentes pessoas e <strong>times</strong> por <strong>chats</strong> e ter um bom <strong>gerenciamento</strong> dos seus afazeres.
                        </p>
                        <a href="/register">
                            <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all shadow">
                                Cadastre-se já
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Welcome;
