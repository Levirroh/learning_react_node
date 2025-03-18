import React from "react";


function Input({label, placeholder, name, id}) {
    return(
        <div className="flex flex-col gap-5">
            <label>{label}</label>
            <input type="text" id={id} name={name} placeholder={placeholder}  className="border-1 p-2 bg-gray-200 rounded-2xl"/>
        </div>
    );
}

export default Input;