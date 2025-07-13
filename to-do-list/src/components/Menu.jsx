import React from "react";
import Li from "../components/Li";

function Menu({ onClose, isOpen }) {
    return (
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-blue-400 shadow-lg shadow-black p-4 z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button onClick={onClose} className="mb-4 cursor-pointer">Fechar</button>
        <div className="h-11/12 flex flex-col justify-between">
          <div>
            <Li text="Dashboard" link={"/dashboard"} />
            <Li text="Teams" link={"/teams"} />
            <Li text="Configurations" link={"/config"} />
            <Li text="Tasks" link={"/menu"} />
            <Li text="Notifications" link={"/notications"} />
            <Li text="Chats" link={"/chats"} />
          </div>
          <div>
            <Li text="Logout" link={"/"} color={"bg-red-500"} textColor={"text-white"} borderColor={"border-black"}/>
            </div>
        </div>
      </div>
    );
  }
  
  export default Menu;