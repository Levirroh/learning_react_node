import React from "react";

function Header({ title, onToggleMenu, team }) {
  function abrirMenu(){
    console.log("Abrir menu")
  }
  if (team == true){
    return (
      <section className="bg-green-200 flex items-center justify-between p-4">
        <button onClick={onToggleMenu} className="cursor-pointer">{title}</button>
        <div className="w-40 flex justify-between" onClick={abrirMenu}>
          <button className="cursor-pointer">
            Abrir menu
          </button>
          <a href="/login"><button>Sair</button></a>
        </div>
      </section>
    );
  } else {
    return (
      <section className="bg-blue-400 flex items-center justify-between p-4">
        <button onClick={onToggleMenu} className="cursor-pointer">{title}</button>
        <a href="/login"><button>Sair</button></a>
      </section>
    );
  }
  }
  
  export default Header;