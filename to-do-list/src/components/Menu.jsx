import React from "react";
import Li from "../components/Li";

function Menu({ onClose, isOpen }) {
    return (
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-blue-400 shadow-lg shadow-black p-4 z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button onClick={onClose} className="mb-4">Fechar</button>
        <div className="h-11/12">
          <div>
            <Li text="Dashboard" link={"/dashboard"} />
            <Li text="Teams" link={"/teams"} />
            <Li text="Configurations" link={"/config"} />
            <Li text="Tasks" link={"/menu"} />
            <Li text="Notifications" link={"/notications"} />
          </div>
          <div>
            <Li text="Logout" link={"/"} />
            </div>
        </div>
      </div>
    );
  }
  
  export default Menu;