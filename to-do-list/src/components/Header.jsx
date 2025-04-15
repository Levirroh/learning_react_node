import React from "react";

function Header({ title, onToggleMenu }) {
    return (
      <section className="bg-blue-400 flex items-center justify-between p-4">
        <button onClick={onToggleMenu}>{title}</button>
        <a href="/login"><button>Sair</button></a>
      </section>
    );
  }
  
  export default Header;