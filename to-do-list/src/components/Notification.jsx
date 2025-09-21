import React from "react";

function Notification({ text, from }) {
    return (
        <li className={`border  rounded-2xl h-12 flex items-center p-3 mt-3 hover:cursor-pointer`} >
            <a href={`${from}`}>
                {text}
            </a>
        </li>
    );
}

export default Notification;
