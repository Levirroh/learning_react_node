import React from "react";

function Li({ link, text, onClick }) {
    if (onClick){
        return (
            <li className="border border-blue-600 bg-blue-500 rounded-2xl
            h-12 flex items-center text-white p-3 mt-3 hover:cursor-pointer" onClick={onClick}>{text}</li>
        );    
    }
    return (
        <a href={`${link}`} ><li className="border border-blue-600 bg-blue-500 rounded-2xl
        h-12 flex items-center text-white p-3 mt-3 hover:cursor-pointer">{text}</li></a>
    );
  }
  
  export default Li;