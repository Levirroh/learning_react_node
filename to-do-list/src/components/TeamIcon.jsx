import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function TeamIcon({nomeDoTime, id_team }) {
    const [team, setTeam] = useState(null);
    const navigate = useNavigate();

    let aFazer = 0; 
    let Fazendo = 0;
    let Feitas = 0;
    useEffect(() => {
            async function getTasks() {
            try {
                const response = await fetch("http://localhost:8800/getStatusTeam", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id_team })
                });
    
                const data = await response.json();
    
                if (data.length === 0) {
                    console.log("Nenhum status de time encontrado para este usuário.");
                }
                setTeam(data);

                for (var i; i <= data.lenght; i++){
                    if (data[i].status_task == 1){
                        aFazer += 1;
                    } else if(data[i].status_task == 2){
                        Fazendo += 1;
                    } else{
                        Feitas += 1;
                    }
                }
            } catch (e) {
                console.error("Erro ao buscar tarefas:", e);
            }
            }
    
            getTasks(); 
        }, []);

    return (
        <div 
            className={`flex flex-col border p-2 rounded-2xl mt-3 text-left cursor-pointer`} 
        >
          <h1>{nomeDoTime}</h1>
          <p>{id_team}</p>
          <p>{aFazer} / {Fazendo} / {Feitas}</p>
        </div> 
    );
}

export default TeamIcon;
