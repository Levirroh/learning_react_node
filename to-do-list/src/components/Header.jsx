import React, { useEffect, useState } from 'react';

function Header({ title, onToggleMenu, team, color }) {
  const [OpenMenu, setOpenMenu] = useState(false);

  function abrirMenu(){
    setOpenMenu(!OpenMenu);
  }
  if (team == true){
    return (
      <section className={`${color} flex items-center justify-between px-6 py-4 shadow-md`}>
      <button onClick={onToggleMenu} className="text-white font-semibold text-lg hover:underline transition">
        {title}
      </button>
      <div className="flex items-center gap-4 relative">
        <div className="relative">
          <button
            onClick={abrirMenu}
            className="bg-white text-blue-800 px-4 py-2 rounded-md shadow hover:bg-gray-100 transition"
          >
            Menu
          </button>
          {OpenMenu && (
            <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-gray-300 rounded-md shadow-2xl z-50 flex flex-col text-sm">
              <a href="#" className="px-4 py-2 hover:bg-blue-100 transition">Configurações do time</a>
              <a href="#" className="px-4 py-2 hover:bg-blue-100 transition">Usuários</a>
              <a href="#" className="px-4 py-2 hover:bg-blue-100 transition">Chat</a>
            </div>
          )}
        </div>
        <a href="/login">
          <button className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600 transition">
            Sair
          </button>
        </a>
      </div>
    </section>

    );
  } else {
    return (
      <section className="bg-blue-400 flex items-center justify-between px-6 py-3 fixed top-0 left-0 w-full z-50 shadow-md">
      <button onClick={onToggleMenu} className="text-white font-semibold text-lg hover:underline transition">
        {title}
      </button>
      <a href="/login">
        <button className="bg-red-400 text-white px-4 py-2 rounded-md shadow hover:bg-red-600 transition">
          Sair
        </button>
      </a>
    </section>
    );
  }
  }
  
  export default Header;