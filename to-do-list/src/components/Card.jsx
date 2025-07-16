import React from "react";
import { data } from "react-router-dom";

function Card({ to, text, onClick, color, borderColor, textColor, data1, data2, data3, gradientFrom, gradientTo }) {
    const borderClass = borderColor ? borderColor : "border-blue-600";
    const bgClass = color ? color : "bg-blue-500";
    const txtColor = textColor ? textColor : "text-white";
    if (data1 == null){
        data1 = "?";
    }
    if (data2 == null){
        data2 = "?";
    }
    if (data2 == null){
        data2 = "?";
    }
    return (
        <a className={`border ${bgClass} ${borderClass} rounded-2xl h-25 flex flex-col w-70 p-3 mt-3 hover:cursor-pointer ${txtColor} bg-gradient-to-br ${gradientFrom} ${gradientTo}`}
            onClick={onClick} href={to}
            >
                <div>
                    <p className="font-semibold text-2xl">{text}</p>
                </div>
                <div>
                    <p>{data1} / {data2} / {data3}</p>
                </div>
        </a>
    );
}

export default Card;
