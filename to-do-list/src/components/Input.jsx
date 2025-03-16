import React from "react";


function Input({label, placeholder}) {
    return(
        <div className="flex flex-col gap-5">
            <label>{label}</label>
            <input type="text" placeholder={placeholder}  className="border-1 p-2 bg-gray-200 rounded-2xl"/>
        </div>
    );
}

export default Input;