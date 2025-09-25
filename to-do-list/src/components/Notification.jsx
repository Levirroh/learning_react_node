import React from "react";

function Notification({ text, from }) {
    return (
        <li className={`border border-blue-600 bg-blue-500 text-white rounded-2xl h-12 flex items-center p-2 mt-3`} >
            <a href={`${from}`}>
                {text}
            </a>
        </li>
    );
}

export default Notification;
