import React from "react"; 

function Submit({text}) {
    return(
        <button className="bg-gray-200 w-30 p-1 border-1 rounded-2xl shadow-2xl shadow-black cursor-pointer hover:bg-blue-400 hover:text-white hover:border-black transition-all duration-400" type="submit">
            {text}
        </button>
    );
}

export default Submit;