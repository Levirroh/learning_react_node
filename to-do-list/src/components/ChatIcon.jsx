import React, { useState, useEffect } from "react";
import config_icon from "../images/config_icon.svg";
function ChatIcon({
  idChat,
  nomeDoTime,
  description,
  selectedChat,
  setSelectedChat,
  setFormCreateChat,
}) {
  function openChat() {
    setSelectedChat(idChat);
    setFormCreateChat(false);
  }

  const isSelected = selectedChat === idChat;

  return (
    <div
      onClick={openChat}
      className={`flex flex-col px-4 py-3 cursor-pointer transition 
        ${isSelected ? "bg-blue-100 border-l-4 border-blue-500" : "hover:bg-blue-50"}`}
    >
      <h1 className="text-sm font-semibold text-blue-900 truncate">
        {nomeDoTime}
      </h1>
      <p className="text-xs text-gray-600 truncate">{description}</p>
    </div>
  );
}
export default ChatIcon;