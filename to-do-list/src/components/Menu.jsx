import React from "react";
import Li from "../components/Li";

function Menu({ onClose, isOpen }) {
    return (
      <div className={`fixed top-0 left-0 w-64 h-full bg-gradient-to-b from-blue-500 to-blue-300 shadow-2xl p-6 z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
    <div className="flex justify-end mb-6">
      <button
        onClick={onClose}
        className="text-white bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded-full transition duration-300 shadow"
      >
        ✕
      </button>
    </div>
    <div className="h-[calc(100%-3rem)] flex flex-col justify-between overflow-y-auto scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-blue-200">
      <nav className="space-y-3">
        <Li text="Dashboard" link="/dashboard" />
        <Li text="Teams" link="/teams" />
        <Li text="Configurations" link="/config" />
        <Li text="Tasks" link="/tasks" />
        <Li text="Notifications" link="/notications" />
        <Li text="Chats" link="/chats" />
      </nav>
      <div className="mt-8 border-t pt-4">
        <Li
          text="Logout"
          link="/"
          color="bg-red-600 hover:bg-red-700"
          textColor="text-white"
          borderColor="border-transparent"
        />
      </div>
    </div>
  </div>

    );
  }
  
  export default Menu;