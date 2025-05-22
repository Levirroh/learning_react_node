import React, { useEffect, useState } from 'react';

function Header({ title, onToggleMenu, team }) {
  const [OpenMenu, setOpenMenu] = useState(false);

  function abrirMenu(){
    setOpenMenu(!OpenMenu);
  }
  if (team == true){
    return (
      <section className="bg-green-200 flex items-center justify-between p-4">
        <button onClick={onToggleMenu} className="cursor-pointer">{title}</button>
        <div className="w-50 flex justify-between" onClick={abrirMenu}>
          <div className=''>
            <button className="cursor-pointer w-20">
            Menu
            </button>
            {OpenMenu && 
              (<div className="absolute bg-green-200 w-45 flex flex-col">  
                <a href="">Configurações do time</a>
                <a href="">Usuários</a>
                <a href="">Chat</a>
              </div>)}
          </div>
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