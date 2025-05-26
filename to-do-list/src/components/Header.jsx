import React, { useEffect, useState } from 'react';

function Header({ title, onToggleMenu, team, color }) {
  const [OpenMenu, setOpenMenu] = useState(false);

  function abrirMenu(){
    setOpenMenu(!OpenMenu);
  }
  if (team == true){
    return (
      <section className={`${color} flex items-center justify-between p-4`}>
        <button onClick={onToggleMenu} className="cursor-pointer">{title}</button>
        <div className="w-50 flex justify-evenly" onClick={abrirMenu}>
          <div className=''>
            <button className="cursor-pointer w-20">
            Menu
            </button>
            {OpenMenu && 
          (<div className={`absolute ${color} w-45 flex flex-col`}>  
                <a href="" className='hover:bg-white transition'>Configurações do time</a>
                <a href="" className='hover:bg-white transition'>Usuários</a>
                <a href="" className='hover:bg-white transition'>Chat</a>
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