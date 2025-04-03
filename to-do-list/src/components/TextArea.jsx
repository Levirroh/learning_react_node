import React from "react";


function Input({label, placeholder, name, id, value, onChange}) {
    return(
        <div className="flex flex-col gap-5">
            <label>{label}</label>
            <textarea id={id} name={name} placeholder={placeholder} value={value} onChange={onChange} className="border-1 p-2 bg-gray-200 rounded-2xl"></textarea>
        </div>
    );
}

export default Input;