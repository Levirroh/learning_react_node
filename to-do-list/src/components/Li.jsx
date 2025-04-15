import React from "react";

function Li({ link, text }) {
    return (
        <li className="border border-blue-600 bg-blue-500 rounded-2xl
        h-12 flex items-center text-white p-3 mt-3 hover:cursor-pointer"><a href={`${link}`} >{text}</a></li>
    );
  }
  
  export default Li;