import React from "react";
import { data } from "react-router-dom";

function Card({ to, text, onClick, color, borderColor, textColor, data1, data2, data3, gradientFrom, gradientTo, type }) {
    const borderClass = borderColor ? borderColor : "border-blue-600";
    const bgClass = color ? color : "bg-blue-500";
    const txtColor = textColor ? textColor : "text-white";
     let extraContent = null;
    if (type === "tasks") {
        extraContent = (
        <p>{data1 ?? "?"} / {data2 ?? "?"} / {data3 ?? "?"}</p>
        );
    } else if (type === "chat") {
        extraContent = (
        <p>Notificações: {data1 ?? "?"}</p>
        );
    }
   return (
    <a
      className={`border ${bgClass} ${borderClass} rounded-2xl h-25 flex flex-col w-70 p-3 mt-3 hover:cursor-pointer ${txtColor} bg-gradient-to-br ${gradientFrom} ${gradientTo}`}
      onClick={onClick}
      href={to}
    >
      <div>
        <p className="font-semibold text-2xl">{text}</p>
      </div>
      {extraContent && (
        <div className="mt-2">
          {extraContent}
        </div>
      )}
    </a>
  );

}

export default Card;
