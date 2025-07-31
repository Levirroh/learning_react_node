import React from "react"
import new_task from "../images/new_task.svg";
import team_icon from "../images/team_icon.png";


function NewTeam({popUp, setPopUp}){
    function newTeamPopUp() {
        setPopUp(!popUp);
    }
    return(
       <div className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl shadow-md border border-gray-300 bg-white hover:bg-blue-100 transition duration-200 cursor-pointer w-100 h-48" onClick={newTeamPopUp} >
        <div className="flex justify-center items-center gap-2">
            <img src={team_icon} className="h-16" alt="Ícone de time" />
            <img src={new_task} className="h-10" alt="Nova tarefa" />
        </div>
        <p className="text-gray-700 font-semibold text-center">Criar novo time</p>
    </div>

);
}

export default NewTeam;