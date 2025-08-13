import React from "react";

function Notification({ link, text, onClick, color, borderColor, textColor }) {
    const borderClass = borderColor ? borderColor : "border-blue-600";
    const bgClass = color ? color : "bg-blue-500";
    const txtColor = textColor ? textColor : "text-white";

    const liContent = (
        <li
            className={`border ${borderClass} ${bgClass} rounded-2xl h-12 flex items-center p-3 mt-3 hover:cursor-pointer ${txtColor}`}
            onClick={onClick}
        >
            {text}
        </li>
    );

    if (onClick) {
        return liContent;
    }

    return <a href={link}>{liContent}</a>;
}

export default Notification;
