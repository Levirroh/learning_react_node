import React from "react";

function TeamIcon({nomeDoTime, id}) {
    return (
        <div 
            className={`flex flex-col border p-2 rounded-2xl mt-3 text-left cursor-pointer`} 
        >
          <h1>{nomeDoTime}</h1>
          <p>{id}</p>
        </div> 
    );
}

export default TeamIcon;
