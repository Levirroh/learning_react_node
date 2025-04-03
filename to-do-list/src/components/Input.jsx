import React from "react";

function Input({ label, placeholder, name, id, value, onChange }) {
    return (
        <div className="flex flex-col gap-5">
            <label htmlFor={id}>{label}</label>
            <input 
                type="text" 
                id={id} 
                name={name} 
                placeholder={placeholder} 
                value={value} 
                onChange={onChange} 
                className="border p-2 bg-gray-200 rounded-2xl"
            />
        </div>
    );
}

export default Input;
