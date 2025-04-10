import React from "react";

function Header({title}) {
    return (
        <section className="bg-blue-400 flex items-center justify-between p-4">
            <h1>{title}</h1>
            <a href="/login"><button>Sair</button></a>
        </section>
    );
}


export default Header;
