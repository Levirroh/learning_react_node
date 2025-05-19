import React from "react";

function Header({ title, onToggleMenu, team }) {
  if (team == true){
    return (
      <section className="bg-green-200 flex items-center justify-between p-4">
        <button onClick={onToggleMenu} className="cursor-pointer">{title}</button>
        <a href="/login"><button>Sair</button></a>
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