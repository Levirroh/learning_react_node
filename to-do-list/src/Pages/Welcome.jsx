import React from "react"; 

function Welcome() {
    return(
        <section>
            <div>
                <h1>Bem-vindo</h1>
                <p>Este software foi feito com Node.js & React, aqui você pode gerenciar tarefas e usuários, além disso, possui um banco de dados completo, aproveite!</p>
            </div>
            <div>
                <a href="/login"><button>Entre já!</button></a>
                <br/>
                <a href="/register"><button>Cadastre-se já!</button></a>
            </div>
        </section>
    );
}

export default Welcome;