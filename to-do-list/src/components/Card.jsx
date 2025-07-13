import React from "react";

function Card({ to, text, onClick, color, borderColor, textColor, data1, data2, data3, gradientFrom, gradientTo }) {
    const borderClass = borderColor ? borderColor : "border-blue-600";
    const bgClass = color ? color : "bg-blue-500";
    const txtColor = textColor ? textColor : "text-white";

    const liContent = (
        <li className={`border ${bgClass} ${borderClass} rounded-2xl h-15 flex max-w-50 items-center p-3 mt-3 hover:cursor-pointer ${txtColor} bg-gradient-to-br ${gradientFrom} ${gradientTo}`}
            onClick={onClick}
            >
            {text}
        </li>
    );

    if (onClick) {
        return liContent;
    }

    return <a href={to}>{liContent}</a>;
}

export default Card;
